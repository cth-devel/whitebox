"use client";

/**
 * LanguageToggle
 *
 * Floating pill anchored at the bottom-left of the viewport. Visible
 * inside the hero, fades + slides away once the user has scrolled past
 * ~70 % of the viewport height (i.e. once the hero is mostly off-screen),
 * and re-appears if they scroll back up.
 *
 * Reads/writes the active language from `useLanguage`; the heavy lifting
 * (DOM translation, dir/lang attribute, font swap) is owned by
 * LanguageProvider, so this component is purely presentational.
 */

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Languages, Loader2 } from "lucide-react";
import { useLanguage } from "./LanguageProvider";

const SCROLL_HIDE_RATIO = 0.7;

const LanguageToggle = () => {
    const { lang, setLang, isReady, isTranslating } = useLanguage();
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            const threshold = window.innerHeight * SCROLL_HIDE_RATIO;
            setVisible(window.scrollY < threshold);
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleToggle = () => {
        if (isTranslating) return;
        setLang(lang === "en" ? "ar" : "en");
    };

    if (!isReady) return null;

    const nextLangLabel = lang === "en" ? "العربية" : "English";
    const ariaLabel = isTranslating
        ? "Translating, please wait"
        : lang === "en"
            ? "Switch language to Arabic"
            : "Switch language to English";

    return (
        <AnimatePresence>
            {visible && (
                <motion.button
                    type="button"
                    onClick={handleToggle}
                    disabled={isTranslating}
                    aria-label={ariaLabel}
                    aria-busy={isTranslating}
                    initial={{ opacity: 0, y: 24, scale: 0.94 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 24, scale: 0.94 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={isTranslating ? {} : { scale: 1.04 }}
                    whileTap={isTranslating ? {} : { scale: 0.96 }}
                    className="notranslate fixed bottom-6 left-6 z-40 flex items-center gap-2.5 rounded-full px-4 py-2.5 bg-white/12 backdrop-blur-xl border border-white/25 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.18)] text-white text-sm font-semibold tracking-tight hover:bg-white/20 hover:border-white/40 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 disabled:cursor-progress"
                    translate="no"
                >
                    {isTranslating ? (
                        <Loader2 size={16} aria-hidden className="shrink-0 animate-spin opacity-90" />
                    ) : (
                        <Languages size={16} aria-hidden className="shrink-0 opacity-90" />
                    )}
                    <span className="leading-none">{nextLangLabel}</span>
                </motion.button>
            )}
        </AnimatePresence>
    );
};

export default LanguageToggle;
