"use client";

/**
 * LanguageProvider — EN ↔ AR
 *
 * Provides whole-site translation without touching downstream
 * components. The pipeline:
 *
 *   1. On switch to AR, walk the live DOM and collect every visible,
 *      translatable text fragment (skipping <script>, <style>, SVG, and
 *      anything marked with `[translate="no"]` or `.notranslate`).
 *   2. Hit the free MyMemory translation API (no key) for any string
 *      that isn't already in our cache.
 *   3. Swap each text node's `nodeValue` to the Arabic translation.
 *   4. A MutationObserver re-applies translations when React mounts new
 *      DOM (e.g. carousel slides, motion exits/enters).
 *   5. Switching back to EN restores originals from the reverse map; if
 *      the user reloads while in AR, the cache is hydrated from
 *      localStorage so there's no extra API traffic on subsequent
 *      visits.
 *
 * Side effects:
 *   • `<html lang>` and `<html dir>` mirror the active language so RTL
 *     layouts flip natively (Tailwind's `rtl:` variants would also be
 *     available if we want to use them later).
 *   • CSS variable swap under `html[lang="ar"]` (in globals.css) re-
 *     points all existing `font-*` utilities at Cairo, so Arabic gets a
 *     proper script font without touching component class lists.
 */

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
    type ReactNode,
} from "react";

export type Lang = "en" | "ar";

interface LanguageContextValue {
    lang: Lang;
    setLang: (l: Lang) => void;
    isReady: boolean;
    isTranslating: boolean;
}

const LanguageContext = createContext<LanguageContextValue>({
    lang: "en",
    setLang: () => { },
    isReady: false,
    isTranslating: false,
});

export const useLanguage = () => useContext(LanguageContext);

const STORAGE_LANG_KEY = "site_lang";
const STORAGE_DICT_KEY = "site_dict_en_ar_v2"; /* bumped to invalidate poisoned v1 caches */
const STATIC_DICT_URL = "/translations/ar.json";
/* Google Translate's lightweight "gtx" client endpoint — unofficial
   but widely used, no API key required, no daily quota. The response
   is a nested array; the first translation candidate lives at [0][0][0]. */
const API_ENDPOINT = "https://translate.googleapis.com/translate_a/single";
const MAX_CONCURRENT_REQUESTS = 6;

/** Tags whose text we never want to send through translation. */
const SKIP_TAGS = new Set([
    "SCRIPT", "STYLE", "NOSCRIPT", "CODE", "PRE",
    "TEXTAREA", "INPUT", "SELECT", "OPTION",
    "SVG", "PATH", "CIRCLE", "RECT", "POLYGON", "LINE", "G",
]);

/** Walk up to ancestors checking for explicit opt-outs. */
const isOptedOut = (el: Element | null): boolean => {
    let cur: Element | null = el;
    while (cur) {
        if (cur.getAttribute && (
            cur.getAttribute("translate") === "no" ||
            cur.classList?.contains("notranslate")
        )) return true;
        cur = cur.parentElement;
    }
    return false;
};

interface TextFragment {
    node: Text;
    original: string;
}

/** Collect every translatable text node in the document. We do a fresh
 *  walk every time we apply translations so dynamic content added by
 *  React re-renders gets picked up. */
const collectTextNodes = (root: Node = document.body): TextFragment[] => {
    const out: TextFragment[] = [];
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
        acceptNode(node) {
            const text = node.nodeValue?.trim() ?? "";
            if (!text) return NodeFilter.FILTER_REJECT;
            // Skip pure punctuation / numerals (nothing to translate).
            if (!/[A-Za-z\u00C0-\u017F]/.test(text)) return NodeFilter.FILTER_REJECT;

            const parent = node.parentElement;
            if (!parent) return NodeFilter.FILTER_REJECT;
            if (SKIP_TAGS.has(parent.tagName)) return NodeFilter.FILTER_REJECT;
            if (isOptedOut(parent)) return NodeFilter.FILTER_REJECT;
            return NodeFilter.FILTER_ACCEPT;
        },
    });

    let current = walker.nextNode();
    while (current) {
        out.push({ node: current as Text, original: (current.nodeValue ?? "") });
        current = walker.nextNode();
    }
    return out;
};

/** Translation fetcher. Returns the AR translation for one EN string,
 *  or the original on any failure. The gtx endpoint can split a long
 *  string into multiple segments — we join them back into one. */
const fetchTranslation = async (text: string): Promise<string> => {
    const params = new URLSearchParams({
        client: "gtx", sl: "en", tl: "ar", dt: "t", q: text,
    });
    try {
        const res = await fetch(`${API_ENDPOINT}?${params.toString()}`);
        if (!res.ok) return text;
        const json = await res.json();
        /* json shape: [[[seg1, src, ...], [seg2, src, ...], ...], src, tgt, ...]
           We concatenate every segment's translation to reconstruct the
           full sentence. */
        const segments: unknown = json?.[0];
        if (!Array.isArray(segments)) return text;
        const out = segments
            .map((s) => (Array.isArray(s) && typeof s[0] === "string" ? s[0] : ""))
            .join("");
        if (!out || out === text) return text;
        return out;
    } catch {
        return text;
    }
};

/** Run `tasks` with at most `limit` in flight at any time. */
const runWithConcurrency = async <T,>(
    tasks: Array<() => Promise<T>>,
    limit: number
): Promise<T[]> => {
    const results: T[] = [];
    let cursor = 0;
    const workers = Array.from({ length: Math.min(limit, tasks.length) }, async () => {
        while (cursor < tasks.length) {
            const i = cursor++;
            results[i] = await tasks[i]();
        }
    });
    await Promise.all(workers);
    return results;
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [lang, setLangState] = useState<Lang>("en");
    const [isReady, setReady] = useState(false);
    const [isTranslating, setTranslating] = useState(false);

    /** en -> ar dictionary, hydrated from localStorage on mount. Only
     *  real translations live here (ar !== en); we filter on load. */
    const enToAr = useRef<Map<string, string>>(new Map());
    /** ar -> en reverse lookup, built lazily as enToAr fills. */
    const arToEn = useRef<Map<string, string>>(new Map());
    /** Per-session set of strings we've already attempted to translate.
     *  Survives MutationObserver bursts but is NOT persisted — a fresh
     *  page load retries previously failed strings instead of caching
     *  the failure forever. */
    const attempted = useRef<Set<string>>(new Set());
    /** Tracks the MutationObserver so we can disconnect it when lang flips. */
    const observerRef = useRef<MutationObserver | null>(null);
    /** True while applyArabic is mid-mutation — used to ignore the
     *  observer's own ricochet. */
    const isApplyingRef = useRef(false);
    /** True while a fetch batch is in flight. Prevents overlapping
     *  applyArabic runs from saturating the API with duplicate work. */
    const isFetchingRef = useRef(false);
    /** Debounce timer for chained mutation bursts. */
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const persistDict = useCallback(() => {
        try {
            const obj: Record<string, string> = {};
            enToAr.current.forEach((v, k) => { obj[k] = v; });
            localStorage.setItem(STORAGE_DICT_KEY, JSON.stringify(obj));
        } catch {
            /* localStorage may be full or disabled — non-fatal */
        }
    }, []);

    /** Replace text in every collected node, fetching missing
     *  translations along the way. Idempotent: skips nodes that already
     *  hold an Arabic string we know about. The `isApplyingRef` flag
     *  silences the MutationObserver while we mutate so it doesn't
     *  recurse on its own writes. */
    const applyArabic = useCallback(async () => {
        if (isFetchingRef.current) return;
        isApplyingRef.current = true;

        const fragments = collectTextNodes();
        const needsFetch = new Set<string>();

        for (const f of fragments) {
            const trimmed = (f.node.nodeValue ?? "").trim();
            if (!trimmed) continue;
            if (arToEn.current.has(trimmed)) continue;
            if (enToAr.current.has(trimmed)) continue;
            if (attempted.current.has(trimmed)) continue;
            needsFetch.add(trimmed);
        }

        if (needsFetch.size > 0) {
            isFetchingRef.current = true;
            setTranslating(true);
            const list = [...needsFetch];
            /* Mark up-front so a MutationObserver burst during the fetch
               doesn't keep re-queueing the same strings. */
            list.forEach((s) => attempted.current.add(s));
            const tasks = list.map((s) => async () => {
                const ar = await fetchTranslation(s);
                if (ar && ar !== s) {
                    enToAr.current.set(s, ar);
                    arToEn.current.set(ar, s);
                }
                /* On failure (ar === s) we deliberately do NOT cache —
                   `attempted` already prevents re-fetch this session,
                   and a fresh page load will retry, so a transient API
                   rate-limit can't poison the persistent dictionary. */
            });
            await runWithConcurrency(tasks, MAX_CONCURRENT_REQUESTS);
            persistDict();
            setTranslating(false);
            isFetchingRef.current = false;
        }

        for (const f of fragments) {
            const raw = f.node.nodeValue ?? "";
            const trimmed = raw.trim();
            if (!trimmed) continue;
            if (arToEn.current.has(trimmed)) continue;
            const ar = enToAr.current.get(trimmed);
            if (ar && ar !== trimmed) f.node.nodeValue = raw.replace(trimmed, ar);
        }

        queueMicrotask(() => {
            isApplyingRef.current = false;
        });
    }, [persistDict]);

    /** Restore original English text by reverse-looking up every text
     *  node currently in the DOM. Anything not in our reverse map is
     *  left as-is (most likely it's already English, e.g. brand names). */
    const restoreEnglish = useCallback(() => {
        isApplyingRef.current = true;
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        let current = walker.nextNode();
        while (current) {
            const raw = current.nodeValue ?? "";
            const trimmed = raw.trim();
            if (trimmed) {
                const en = arToEn.current.get(trimmed);
                if (en) current.nodeValue = raw.replace(trimmed, en);
            }
            current = walker.nextNode();
        }
        queueMicrotask(() => { isApplyingRef.current = false; });
    }, []);

    /** Merge a flat en→ar object into our two ref maps, discarding any
     *  entry whose value is empty or equal to the key (these are stale
     *  negative-cache leftovers from earlier rate-limited fetches). */
    const ingestDict = useCallback((obj: Record<string, string>) => {
        for (const [en, ar] of Object.entries(obj)) {
            if (!en || !ar || ar === en) continue;
            enToAr.current.set(en, ar);
            arToEn.current.set(ar, en);
        }
    }, []);

    /* Mount: hydrate saved lang + cached dictionary, plus any static
       dictionary shipped in /public/translations/ar.json. */
    useEffect(() => {
        const saved = (localStorage.getItem(STORAGE_LANG_KEY) as Lang | null) ?? "en";

        try {
            const dictRaw = localStorage.getItem(STORAGE_DICT_KEY);
            if (dictRaw) ingestDict(JSON.parse(dictRaw) as Record<string, string>);
        } catch {
            /* corrupt cache — start fresh */
        }

        /* Static dict is best-effort: a 404 just means we don't have a
           pre-built one yet, and the live fetcher will fill in instead. */
        fetch(STATIC_DICT_URL)
            .then((res) => (res.ok ? res.json() : null))
            .then((obj) => {
                if (obj && typeof obj === "object") ingestDict(obj);
            })
            .catch(() => { /* ignore */ })
            .finally(() => {
                setLangState(saved);
                setReady(true);
            });
    }, [ingestDict]);

    /* React to lang changes: flip html attrs, translate or restore,
       attach a MutationObserver in AR so newly mounted React content is
       caught and translated too. */
    useEffect(() => {
        if (!isReady) return;

        localStorage.setItem(STORAGE_LANG_KEY, lang);
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

        if (observerRef.current) {
            observerRef.current.disconnect();
            observerRef.current = null;
        }

        if (lang === "ar") {
            applyArabic();

            /* Re-apply on any DOM mutation so AnimatePresence exits,
               carousel re-renders, etc. don't drop back to English.
               We listen only on childList — `applyArabic` rewrites
               nodeValue and would loop forever if we also watched
               characterData. The `isApplyingRef` guard plus a small
               debounce keep us from re-translating during our own writes. */
            const obs = new MutationObserver(() => {
                if (isApplyingRef.current) return;
                if (debounceRef.current) clearTimeout(debounceRef.current);
                debounceRef.current = setTimeout(() => { applyArabic(); }, 60);
            });
            obs.observe(document.body, { subtree: true, childList: true });
            observerRef.current = obs;
        } else {
            restoreEnglish();
        }

        return () => {
            if (observerRef.current) observerRef.current.disconnect();
            observerRef.current = null;
            if (debounceRef.current) clearTimeout(debounceRef.current);
        };
    }, [lang, isReady, applyArabic, restoreEnglish]);

    const setLang = useCallback((l: Lang) => setLangState(l), []);

    return (
        <LanguageContext.Provider value={{ lang, setLang, isReady, isTranslating }}>
            {children}
        </LanguageContext.Provider>
    );
};

export default LanguageProvider;
