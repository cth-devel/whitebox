"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, Send, Info } from "lucide-react";
import RevealOnScroll from "./RevealOnScroll";
import {
  RATE_TABLE,
  EXTRA_KG_RATE,
  MIN_MONTHLY_SHIPMENTS,
  calculateRate,
} from "@/lib/data/rates";
import type { ServiceArea, DeliverySpeed } from "@/lib/data/rates";
import { CONTACT } from "@/lib/data/contact";

const AREA_LABELS: Record<ServiceArea, string> = {
  "inside-riyadh":  "Inside Riyadh",
  "outside-riyadh": "Outside Riyadh",
};

const RateQuote = () => {
  const [area,   setArea]   = useState<ServiceArea>("inside-riyadh");
  const [weight, setWeight] = useState<string>("");
  const [speed,  setSpeed]  = useState<DeliverySpeed>("same-day");
  const [result, setResult] = useState<number | null>(null);

  const weightNum    = parseFloat(weight);
  const isValidWeight = !isNaN(weightNum) && weightNum > 0;

  const handleCalculate = () => {
    if (!isValidWeight) return;
    setResult(calculateRate(area, weightNum, speed));
  };

  const handleWhatsApp = () => {
    if (result === null) return;
    const speedLabel =
      area === "inside-riyadh"
        ? speed === "same-day" ? "Same Day" : "Next Day"
        : "Within 2–3 Days";
    const msg = [
      "Hello WhiteBox, I'd like to confirm a rate quote.",
      "",
      `📍 Zone: ${AREA_LABELS[area]}`,
      `⚖️ Weight: ${weightNum} kg`,
      `🚀 Speed: ${speedLabel}`,
      `💰 Estimated Rate: ${result} SAR (excl. VAT)`,
      "",
      "Please confirm availability. Thank you!",
    ].join("\n");
    window.open(`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <section
      id="rates"
      className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-gray-50"
      aria-label="Rate Quotation"
    >
      <div className="mx-auto max-w-7xl">
        <RevealOnScroll>
          <div className="text-center mb-14">
            <div className="label-eyebrow bg-accent/10 text-accent mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block" />
              Transparent Pricing
            </div>
            <h2 className="text-display-section font-black text-charcoal mb-4">
              Rate <span className="text-brand-grad">Quotation</span>
            </h2>
            <p className="text-charcoal/60 font-exo text-lg max-w-2xl mx-auto">
              Domestic logistics &amp; delivery services within Saudi Arabia.
              Rates are <strong className="text-charcoal">excl. VAT</strong> and valid for{" "}
              <strong className="text-charcoal">{MIN_MONTHLY_SHIPMENTS}+</strong> monthly shipments.
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">

          {/* ─── Pricing Table ─────────────────────────────── */}
          <RevealOnScroll delay={0.05}>
            <div className="rounded-3xl bg-white border border-gray-100 shadow-[0_4px_30px_rgb(0,0,0,0.04)] overflow-hidden h-full flex flex-col">

              <div className="bg-charcoal px-6 py-5 flex items-center justify-between flex-shrink-0">
                <h3 className="text-white font-premium text-xl font-semibold">
                  Domestic Rates (SAR)
                </h3>
                <span className="text-white/40 text-xs font-exo uppercase tracking-wide">
                  Excl. VAT
                </span>
              </div>

              <div className="overflow-x-auto flex-1">
                <table className="w-full text-sm" aria-label="Domestic shipping rate table">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50/80">
                      <th scope="col" className="text-left py-3 px-5 font-bold text-charcoal/60 font-exo uppercase text-xs tracking-wide">
                        Zone
                      </th>
                      <th scope="col" className="text-left py-3 px-3 font-bold text-charcoal/60 font-exo uppercase text-xs tracking-wide">
                        Weight
                      </th>
                      <th scope="col" className="text-center py-3 px-3 font-bold text-primary font-exo uppercase text-xs tracking-wide">
                        SAR
                      </th>
                      <th scope="col" className="text-left py-3 px-3 font-bold text-charcoal/60 font-exo uppercase text-xs tracking-wide">
                        Speed
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {RATE_TABLE.map((row, i) => (
                      <tr
                        key={i}
                        className={`border-b border-gray-50 ${i % 2 === 0 ? "bg-white" : "bg-gray-50/40"}`}
                      >
                        <td className="py-4 px-5 font-premium font-semibold text-charcoal">
                          {AREA_LABELS[row.area]}
                        </td>
                        <td className="py-4 px-3 font-exo text-charcoal/70 whitespace-nowrap">
                          {row.minWeight === 0
                            ? `up to ${row.maxWeight}`
                            : `${row.minWeight}–${row.maxWeight}`}{" "}
                          kg
                        </td>
                        <td className="py-4 px-3 text-center">
                          <div className="flex flex-col items-center gap-1.5">
                            <span className="inline-block px-3 py-1 rounded-lg bg-primary text-white font-bold text-sm tabular-nums">
                              {row.sameDayRate}
                            </span>
                            {row.nextDayRate !== null && (
                              <span className="inline-block px-3 py-1 rounded-lg bg-accent/15 text-accent font-bold text-sm tabular-nums">
                                {row.nextDayRate}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-3 font-exo text-charcoal/55 text-xs leading-relaxed">
                          {row.deliveryNote}
                          {row.nextDayRate !== null && (
                            <span className="block text-primary/70 mt-0.5">
                              red = same · orange = next
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Footnotes */}
              <div className="px-6 py-5 bg-gray-50 border-t border-gray-100 space-y-2.5 flex-shrink-0">
                <div className="flex items-start gap-2 text-xs text-charcoal/60 font-exo">
                  <Info size={13} className="text-accent flex-shrink-0 mt-0.5" aria-hidden />
                  <span>
                    After 15 kg:{" "}
                    <strong className="text-charcoal">+{EXTRA_KG_RATE} SAR</strong> per additional kg.
                  </span>
                </div>
                <div className="flex items-start gap-2 text-xs text-charcoal/60 font-exo">
                  <Info size={13} className="text-primary flex-shrink-0 mt-0.5" aria-hidden />
                  <span>
                    Valid for{" "}
                    <strong className="text-charcoal">{MIN_MONTHLY_SHIPMENTS}+ monthly shipments.</strong>{" "}
                    Delivery timing may vary by location &amp; conditions.
                  </span>
                </div>
                <div className="flex items-start gap-2 text-xs text-charcoal/60 font-exo">
                  <Info size={13} className="text-charcoal/35 flex-shrink-0 mt-0.5" aria-hidden />
                  <span>Fragile items must be properly packed before dispatch.</span>
                </div>
              </div>
            </div>
          </RevealOnScroll>

          {/* ─── Calculator ───────────────────────────────── */}
          <RevealOnScroll delay={0.15}>
            <div className="relative rounded-3xl bg-white border border-gray-100 shadow-[0_4px_30px_rgb(0,0,0,0.04)] p-8 overflow-hidden h-full">

              {/* Decorative glow */}
              <div
                className="absolute top-0 right-0 w-52 h-52 bg-primary/5 rounded-full blur-3xl -mr-12 -mt-12 pointer-events-none"
                aria-hidden
              />
              <div
                className="absolute bottom-0 left-0 w-40 h-40 bg-accent/5 rounded-full blur-3xl -ml-10 -mb-10 pointer-events-none"
                aria-hidden
              />

              <h3 className="relative text-2xl font-premium text-charcoal mb-8 flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-accent/10 text-accent">
                  <Calculator className="w-6 h-6" aria-hidden />
                </div>
                Calculate Your Rate
              </h3>

              <div className="relative space-y-6">

                {/* Area selector */}
                <fieldset>
                  <legend className="block text-xs font-bold text-charcoal/60 uppercase tracking-wider mb-3 font-exo">
                    Delivery Zone
                  </legend>
                  <div className="grid grid-cols-2 gap-3">
                    {(["inside-riyadh", "outside-riyadh"] as ServiceArea[]).map((a) => (
                      <label
                        key={a}
                        className={`flex items-center justify-center py-3 px-4 rounded-2xl border-2 cursor-pointer font-exo text-sm font-semibold transition-all duration-200 ${
                          area === a
                            ? "border-primary bg-primary/5 text-primary"
                            : "border-gray-200 text-charcoal/60 hover:border-gray-300"
                        }`}
                      >
                        <input
                          type="radio"
                          name="area"
                          value={a}
                          checked={area === a}
                          onChange={() => { setArea(a); setResult(null); }}
                          className="sr-only"
                        />
                        {AREA_LABELS[a]}
                      </label>
                    ))}
                  </div>
                </fieldset>

                {/* Weight input */}
                <div>
                  <label
                    htmlFor="calc-weight"
                    className="block text-xs font-bold text-charcoal/60 uppercase tracking-wider mb-2 font-exo"
                  >
                    Weight (kg)
                  </label>
                  <input
                    id="calc-weight"
                    type="number"
                    min="0.1"
                    step="0.1"
                    value={weight}
                    onChange={(e) => { setWeight(e.target.value); setResult(null); }}
                    placeholder="e.g. 3.5"
                    className="w-full rounded-2xl border-0 bg-gray-50 px-5 py-4 text-charcoal text-lg font-semibold shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-primary transition-all placeholder:text-gray-400 placeholder:font-normal placeholder:text-base"
                    aria-describedby="weight-hint"
                  />
                  <p id="weight-hint" className="mt-1.5 text-xs text-charcoal/40 font-exo">
                    Over 15 kg: +{EXTRA_KG_RATE} SAR/kg added automatically.
                  </p>
                </div>

                {/* Speed selector — Inside Riyadh only */}
                {area === "inside-riyadh" && (
                  <fieldset>
                    <legend className="block text-xs font-bold text-charcoal/60 uppercase tracking-wider mb-3 font-exo">
                      Delivery Speed
                    </legend>
                    <div className="grid grid-cols-2 gap-3">
                      {([
                        { value: "same-day" as DeliverySpeed, label: "Same Day"  },
                        { value: "next-day" as DeliverySpeed, label: "Next Day"  },
                      ]).map((opt) => (
                        <label
                          key={opt.value}
                          className={`flex items-center justify-center py-3 px-4 rounded-2xl border-2 cursor-pointer font-exo text-sm font-semibold transition-all duration-200 ${
                            speed === opt.value
                              ? "border-accent bg-accent/5 text-accent"
                              : "border-gray-200 text-charcoal/60 hover:border-gray-300"
                          }`}
                        >
                          <input
                            type="radio"
                            name="speed"
                            value={opt.value}
                            checked={speed === opt.value}
                            onChange={() => { setSpeed(opt.value); setResult(null); }}
                            className="sr-only"
                          />
                          {opt.label}
                        </label>
                      ))}
                    </div>
                  </fieldset>
                )}

                {/* Calculate button */}
                <button
                  type="button"
                  onClick={handleCalculate}
                  disabled={!isValidWeight}
                  className="w-full rounded-2xl bg-brand-grad px-6 py-4 font-bold text-white text-lg shadow-md hover:shadow-lg hover:opacity-95 hover:-translate-y-0.5 active:translate-y-0 active:opacity-100 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  aria-label="Calculate shipping rate"
                >
                  Calculate Rate
                </button>

                {/* Result */}
                {result !== null && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="rounded-2xl bg-gradient-to-br from-charcoal to-[#2a2a2a] p-6 text-center"
                    role="status"
                    aria-live="polite"
                  >
                    <p className="text-white/55 text-sm font-exo uppercase tracking-wide mb-2">
                      Estimated Rate
                    </p>
                    <p className="text-5xl font-bold text-brand-grad tabular-nums">
                      {result}
                      <span className="text-2xl text-white/60 font-normal ml-2">SAR</span>
                    </p>
                    <p className="text-white/40 text-xs font-exo mt-2">
                      {AREA_LABELS[area]} · {weightNum} kg ·{" "}
                      {area === "inside-riyadh"
                        ? speed === "same-day" ? "Same Day" : "Next Day"
                        : "Within 2–3 Days"}{" "}
                      · Excl. VAT
                    </p>

                    <button
                      type="button"
                      onClick={handleWhatsApp}
                      className="mt-5 group relative w-full overflow-hidden rounded-2xl bg-gradient-to-br from-[#25D366] to-[#128C7E] px-6 py-4 font-bold text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex items-center justify-center gap-3 focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
                      aria-label="Confirm rate quote on WhatsApp"
                    >
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 ease-in-out" />
                      <Send className="w-5 h-5 relative z-10" strokeWidth={2.5} aria-hidden />
                      <span className="relative z-10">Confirm on WhatsApp</span>
                    </button>
                  </motion.div>
                )}

              </div>
            </div>
          </RevealOnScroll>

        </div>
      </div>
    </section>
  );
};

export default RateQuote;
