"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Calculator, MapPin, Phone, Mail } from "lucide-react";
import RevealOnScroll from "./RevealOnScroll";
import { CONTACT } from "@/lib/data/contact";

const ContactSection = () => {
  const [activeTab, setActiveTab] = useState<"tuwaiq" | "laban">("tuwaiq");

  const [quoteData, setQuoteData] = useState({
    name: "",
    location: "",
    destination: "",
    items: "",
    weight: "",
    dimensions: "",
  });

  const handleQuoteChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setQuoteData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGetQuote = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, location, destination, items, weight, dimensions } = quoteData;

    if (!name || !location || !destination || !items || !weight) {
      alert("Please fill in all required fields.");
      return;
    }

    const message = `Halo WhiteBox, I would like to get a quote.
    
👤 Name: ${name}
📍 Location: ${location}
🏁 Destination: ${destination}
📦 Items: ${items}
⚖️ Weight: ${weight} kg
📏 Dimensions: ${dimensions || "Not specified"}

Please let me know the estimated cost. Thank you!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${CONTACT.whatsapp}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");
  };

  return (
    <section
      id="contact"
      className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-secondary/30"
      aria-label="Contact"
    >
      <div className="mx-auto max-w-7xl">
        <RevealOnScroll>
          <div className="flex justify-center mb-7">
            <div className="eyebrow-rule text-primary">
              <span>Get in touch</span>
            </div>
          </div>
          <h2 className="text-display-section font-black text-charcoal text-center mb-5 tracking-tight">
            Visit us &amp; <span className="serif-accent text-brand-grad">get a quote</span>
          </h2>
          <p className="text-charcoal/65 text-center max-w-2xl mx-auto text-lg font-exo leading-relaxed">
            Find our nearest branch or request a quote instantly via WhatsApp.
          </p>
        </RevealOnScroll>

        {/* Contact card — editorial 3-up with hairline borders */}
        <RevealOnScroll delay={0.05}>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 mb-2">
            <a
              href={`tel:${CONTACT.mainPhone}`}
              className="group relative flex items-center gap-4 p-6 rounded-2xl bg-white border border-gray-100/80 shadow-editorial hover:shadow-editorial-lg hover:border-primary/20 hover:-translate-y-0.5 transition-all duration-500 overflow-hidden"
              aria-label={`Call main number ${CONTACT.mainPhone}`}
            >
              <span className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="w-12 h-12 rounded-xl bg-primary/8 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white group-hover:shadow-[0_8px_20px_-6px_rgba(247,42,66,0.45)] transition-all duration-500 flex-shrink-0">
                <Phone size={18} strokeWidth={2} aria-hidden />
              </div>
              <div className="min-w-0">
                <p className="text-[0.65rem] text-charcoal/45 font-exo uppercase tracking-[0.18em] font-bold mb-1">Main Line</p>
                <p className="font-premium font-bold text-charcoal num-tabular tracking-tight">{CONTACT.mainPhone}</p>
              </div>
            </a>

            <a
              href={`tel:${CONTACT.salesPhone}`}
              className="group relative flex items-center gap-4 p-6 rounded-2xl bg-white border border-gray-100/80 shadow-editorial hover:shadow-editorial-lg hover:border-accent/20 hover:-translate-y-0.5 transition-all duration-500 overflow-hidden"
              aria-label={`Call sales ${CONTACT.salesPhone}`}
            >
              <span className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="w-12 h-12 rounded-xl bg-accent/8 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white group-hover:shadow-[0_8px_20px_-6px_rgba(255,106,19,0.45)] transition-all duration-500 flex-shrink-0">
                <Phone size={18} strokeWidth={2} aria-hidden />
              </div>
              <div className="min-w-0">
                <p className="text-[0.65rem] text-charcoal/45 font-exo uppercase tracking-[0.18em] font-bold mb-1">{CONTACT.salesName}</p>
                <p className="font-premium font-bold text-charcoal num-tabular tracking-tight">{CONTACT.salesPhone}</p>
              </div>
            </a>

            <a
              href={`mailto:${CONTACT.email}`}
              className="group relative flex items-center gap-4 p-6 rounded-2xl bg-white border border-gray-100/80 shadow-editorial hover:shadow-editorial-lg hover:border-primary/20 hover:-translate-y-0.5 transition-all duration-500 overflow-hidden"
              aria-label={`Email ${CONTACT.email}`}
            >
              <span className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="w-12 h-12 rounded-xl bg-primary/8 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white group-hover:shadow-[0_8px_20px_-6px_rgba(247,42,66,0.45)] transition-all duration-500 flex-shrink-0">
                <Mail size={18} strokeWidth={2} aria-hidden />
              </div>
              <div className="min-w-0">
                <p className="text-[0.65rem] text-charcoal/45 font-exo uppercase tracking-[0.18em] font-bold mb-1">Email</p>
                <p className="font-premium font-bold text-charcoal text-sm tracking-tight truncate">{CONTACT.email}</p>
              </div>
            </a>
          </div>
        </RevealOnScroll>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Branch Locations with Tabs */}
          <RevealOnScroll delay={0.1}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group relative rounded-[2.5rem] border border-white/60 bg-white/80 backdrop-blur-xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] h-full flex flex-col hover:shadow-[0_8px_30px_rgb(247,42,66,0.1)] transition-all duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-gray-50 rounded-[2.5rem] -z-10" />

              <div className="mb-8">
                <p className="text-charcoal/40 text-[0.65rem] font-bold uppercase tracking-[0.2em] font-exo mb-2">Visit us</p>
                <h3 className="text-2xl sm:text-3xl font-black text-charcoal flex items-center gap-3 tracking-tight">
                  <div className="p-2.5 rounded-xl bg-primary/10 text-primary ring-1 ring-primary/15">
                    <MapPin className="w-5 h-5" strokeWidth={2.25} />
                  </div>
                  Our <span className="serif-accent text-brand-grad">branches</span>
                </h3>
              </div>

              {/* Premium Tabs */}
              <div className="flex p-1.5 mb-8 bg-gray-100/80 backdrop-blur-sm rounded-2xl border border-white/50 relative">
                {(["tuwaiq", "laban"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`relative flex-1 py-3 px-6 rounded-xl text-sm font-bold tracking-wide transition-all duration-300 z-10 ${activeTab === tab
                      ? "text-[#f72a42]"
                      : "text-charcoal/60 hover:text-charcoal"
                      }`}
                  >
                    {activeTab === tab && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-white rounded-xl shadow-sm border border-black/5"
                        initial={false}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">
                      {tab.charAt(0).toUpperCase() + tab.slice(1)} Branch
                    </span>
                  </button>
                ))}
              </div>

              {/* Map Content */}
              <div className="relative w-full flex-1 min-h-[400px] rounded-[2rem] overflow-hidden border border-white shadow-inner bg-gray-50 group-hover:shadow-lg transition-all duration-500">
                <div className="absolute inset-0 z-0">
                  {activeTab === "tuwaiq" && (
                    <motion.div
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      className="w-full h-full"
                    >
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3628.3037382398993!2d46.5677502!3d24.5787117!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f196a5a9293bd%3A0x1e84197431aac9d!2zV2hpdGUgQm94IEV4cHJlc3Mg2YTZhNi02K3ZhiDYp9mE2LPYsdmK2Lk!5e0!3m2!1sen!2sin!4v1770466924851!5m2!1sen!2sin"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="WhiteBox Tuwaiq Branch"
                        className="grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
                      />
                    </motion.div>
                  )}

                  {activeTab === "laban" && (
                    <motion.div
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      className="w-full h-full"
                    >
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3626.749268202912!2d46.5645147!3d24.632325199999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f1f0079acc7bd%3A0xdd5e9e4d33b82c72!2zV2hpdGUgQm94IEV4cHJlc3Mg2YTZhNi02K3ZhiDYp9mE2LPYsdmK2Lk!5e0!3m2!1sen!2sin!4v1770466974514!5m2!1sen!2sin"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="WhiteBox Laban Branch"
                        className="grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
                      />
                    </motion.div>
                  )}
                </div>

                {/* Overlay Gradient for depth */}
                <div className="absolute inset-0 pointer-events-none rounded-[2rem] ring-1 ring-inset ring-black/5" />
              </div>
            </motion.div>
          </RevealOnScroll>

          {/* Quote Form */}
          <RevealOnScroll delay={0.2}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              id="quote"
              className="relative rounded-[2.5rem] border border-white/60 bg-white/80 backdrop-blur-xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] h-full overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#f72a42]/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />

              <div className="relative mb-8">
                <p className="text-charcoal/40 text-[0.65rem] font-bold uppercase tracking-[0.2em] font-exo mb-2">Instant quote</p>
                <h3 className="text-2xl sm:text-3xl font-black text-charcoal flex items-center gap-3 tracking-tight">
                  <div className="p-2.5 rounded-xl bg-primary/10 text-primary ring-1 ring-primary/15">
                    <Calculator className="w-5 h-5" strokeWidth={2.25} />
                  </div>
                  Quote via <span className="serif-accent text-brand-grad">WhatsApp</span>
                </h3>
              </div>

              <form onSubmit={handleGetQuote} className="relative space-y-5">
                <div className="grid grid-cols-2 gap-5">
                  <div className="col-span-2">
                    <label htmlFor="quote-name" className="block text-xs font-bold text-charcoal/60 uppercase tracking-wider mb-2 ml-1">Name</label>
                    <input
                      id="quote-name"
                      name="name"
                      type="text"
                      value={quoteData.name}
                      onChange={handleQuoteChange}
                      required
                      className="w-full rounded-2xl border-0 bg-gray-50/80 px-5 py-4 text-charcoal shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-[#f72a42] transition-all placeholder:text-gray-400"
                      placeholder="Your name"
                    />
                  </div>

                  <div className="col-span-1">
                    <label htmlFor="location" className="block text-xs font-bold text-charcoal/60 uppercase tracking-wider mb-2 ml-1">Location</label>
                    <input
                      id="location"
                      name="location"
                      type="text"
                      value={quoteData.location}
                      onChange={handleQuoteChange}
                      required
                      className="w-full rounded-2xl border-0 bg-gray-50/80 px-5 py-4 text-charcoal shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-[#f72a42] transition-all placeholder:text-gray-400"
                      placeholder="Riyadh"
                    />
                  </div>

                  <div className="col-span-1">
                    <label htmlFor="destination" className="block text-xs font-bold text-charcoal/60 uppercase tracking-wider mb-2 ml-1">Destination</label>
                    <input
                      id="destination"
                      name="destination"
                      type="text"
                      value={quoteData.destination}
                      onChange={handleQuoteChange}
                      required
                      className="w-full rounded-2xl border-0 bg-gray-50/80 px-5 py-4 text-charcoal shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-[#f72a42] transition-all placeholder:text-gray-400"
                      placeholder="Jeddah"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="items" className="block text-xs font-bold text-charcoal/60 uppercase tracking-wider mb-2 ml-1">Items</label>
                  <input
                    id="items"
                    name="items"
                    type="text"
                    value={quoteData.items}
                    onChange={handleQuoteChange}
                    required
                    className="w-full rounded-2xl border-0 bg-gray-50/80 px-5 py-4 text-charcoal shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-[#f72a42] transition-all placeholder:text-gray-400"
                    placeholder="e.g. Documents, Electronics"
                  />
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="weight" className="block text-xs font-bold text-charcoal/60 uppercase tracking-wider mb-2 ml-1">Weight (kg)</label>
                    <input
                      id="weight"
                      name="weight"
                      type="text"
                      value={quoteData.weight}
                      onChange={handleQuoteChange}
                      required
                      className="w-full rounded-2xl border-0 bg-gray-50/80 px-5 py-4 text-charcoal shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-[#f72a42] transition-all placeholder:text-gray-400"
                      placeholder="5"
                    />
                  </div>
                  <div>
                    <label htmlFor="dimensions" className="block text-xs font-bold text-charcoal/60 uppercase tracking-wider mb-2 ml-1">Dims (cm)</label>
                    <input
                      id="dimensions"
                      name="dimensions"
                      type="text"
                      value={quoteData.dimensions}
                      onChange={handleQuoteChange}
                      className="w-full rounded-2xl border-0 bg-gray-50/80 px-5 py-4 text-charcoal shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-[#f72a42] transition-all placeholder:text-gray-400"
                      placeholder="30×20×15"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-br from-[#25D366] to-[#128C7E] px-6 py-5 font-bold text-white shadow-lg shadow-green-500/25 hover:shadow-xl hover:shadow-green-500/40 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] transition-all duration-300 flex items-center justify-center gap-3 mt-6"
                >
                  {/* Sheen Effect */}
                  <div className="absolute inset-0 -translate-x-[100%] group-hover:translate-x-[100%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 ease-in-out" />

                  <Send className="w-5 h-5 relative z-10" strokeWidth={2.5} />
                  <span className="relative z-10 text-lg tracking-wide">Get Quote on WhatsApp</span>
                </button>
              </form>
            </motion.div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
