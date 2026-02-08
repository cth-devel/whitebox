"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    Truck,
    Globe,
    ShieldCheck,
    Clock,
    MapPin,
    Package,
    AlertCircle,
    CheckCircle2,
    ArrowRight
} from "lucide-react";
import Footer from "@/components/Footer";
import RevealOnScroll from "@/components/RevealOnScroll";
import CustomCursor from "@/components/CustomCursor";

const CourierGuidePage = () => {
    return (
        <>
            <CustomCursor />
            <main className="min-h-screen bg-white">

                {/* Hero Section */}
                <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-gray-50 to-white">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                    <div className="max-w-4xl mx-auto text-center relative z-10">
                        <RevealOnScroll>
                            <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-bold tracking-wider uppercase mb-6">
                                Updated for 2026
                            </span>
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-premium font-normal text-charcoal mb-8 leading-tight">
                                The Ultimate Guide to <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500">Courier Services</span> in Saudi Arabia
                            </h1>
                            <p className="text-xl text-charcoal/60 leading-relaxed font-exo max-w-2xl mx-auto">
                                Speeds, Costs & Providers: A Simple Guide to Fast, Cheap Courier Services in KSA.
                            </p>
                        </RevealOnScroll>
                    </div>
                </section>

                {/* Introduction */}
                <section className="py-16 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto prose prose-lg prose-headings:font-premium prose-p:font-exo prose-a:text-primary">
                        <RevealOnScroll>
                            <p>
                                Saudi Arabia's courier market is growing fast—from <strong>$8.23 billion in 2024 to $20.55 billion by 2032</strong> (12.1% yearly growth). Jeddah Port handled 8.32 million containers in 2025, and Riyadh Airport sees 3.9 million passengers monthly. If you need <em>courier services Saudi Arabia</em>, <em>fast delivery Riyadh</em>, or <em>international shipping KSA</em>, this easy guide shows speeds, costs, providers, and tips.
                            </p>
                            <p className="mt-6 text-sm text-charcoal/40 font-exo bg-gray-50 p-4 rounded-xl border border-gray-100 inline-block">
                                <strong>Common Search Terms:</strong> "courier services KSA", "2 day delivery Saudi Arabia", "cheap courier Riyadh"
                            </p>
                        </RevealOnScroll>
                    </div>
                </section>

                {/* Why Use Courier Services */}
                <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
                    <div className="max-w-7xl mx-auto">
                        <RevealOnScroll>
                            <h2 className="text-3xl sm:text-4xl font-premium font-normal text-charcoal mb-12 text-center">
                                Why Use Courier Services in Saudi Arabia?
                            </h2>
                        </RevealOnScroll>

                        <div className="grid md:grid-cols-3 gap-8 mb-12">
                            {[
                                { title: "Logistics Hub", desc: "KSA is a central logistics hub connecting East and West.", icon: MapPin },
                                { title: "E-commerce Boom", desc: "E-commerce grows 25% yearly, needing quick parcel delivery.", icon: Package },
                                { title: "Vision 2030", desc: "Better roads and airports cutting delivery times by 25%.", icon: Clock },
                            ].map((item, idx) => (
                                <RevealOnScroll key={idx} delay={idx * 0.1}>
                                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6">
                                            <item.icon size={24} />
                                        </div>
                                        <h3 className="text-xl font-premium font-bold mb-3">{item.title}</h3>
                                        <p className="text-charcoal/70 font-exo">{item.desc}</p>
                                    </div>
                                </RevealOnScroll>
                            ))}
                        </div>

                        <RevealOnScroll>
                            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                                <h3 className="text-xl font-premium font-bold mb-6">Key Facts</h3>
                                <div className="grid sm:grid-cols-3 gap-6">
                                    <div className="flex items-start gap-4">
                                        <CheckCircle2 className="text-primary shrink-0 mt-1" />
                                        <p className="font-exo text-charcoal/80"><strong>70%</strong> of shipments stay domestic</p>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <CheckCircle2 className="text-primary shrink-0 mt-1" />
                                        <p className="font-exo text-charcoal/80"><strong>UAE gets 40%</strong> of exports, India 15%</p>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <AlertCircle className="text-orange-500 shrink-0 mt-1" />
                                        <p className="font-exo text-charcoal/80">Summer heat (50°C) damages <strong>20%</strong> of packages without good packing</p>
                                    </div>
                                </div>
                            </div>
                        </RevealOnScroll>
                    </div>
                </section>

                {/* Domestic Services */}
                <section className="py-16 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-5xl mx-auto">
                        <RevealOnScroll>
                            <h2 className="text-3xl sm:text-4xl font-premium font-normal text-charcoal mb-6 text-center">
                                Domestic Courier Services: Times & Prices
                            </h2>
                            <p className="text-center text-charcoal/60 font-exo mb-12">
                                Domestic delivery takes 2-5 days. Express options give 2-day delivery KSA everywhere.
                            </p>

                            <div className="overflow-x-auto bg-white rounded-3xl shadow-sm border border-gray-100 mb-8">
                                <table className="w-full text-left font-exo">
                                    <thead className="bg-gray-50 border-b border-gray-100">
                                        <tr>
                                            <th className="p-6 font-bold text-charcoal">Route</th>
                                            <th className="p-6 font-bold text-charcoal">Normal (Economy)</th>
                                            <th className="p-6 font-bold text-charcoal">Fast (Express)</th>
                                            <th className="p-6 font-bold text-charcoal">Best For</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        <tr>
                                            <td className="p-6 font-medium">Riyadh-Jeddah</td>
                                            <td className="p-6 text-charcoal/70">3 days / SAR 40</td>
                                            <td className="p-6 text-primary font-bold">1 day / SAR 80</td>
                                            <td className="p-6 text-charcoal/70">Documents, shopping</td>
                                        </tr>
                                        <tr>
                                            <td className="p-6 font-medium">Riyadh-Dammam</td>
                                            <td className="p-6 text-charcoal/70">2 days / SAR 35</td>
                                            <td className="p-6 text-primary font-bold">Next day / SAR 70</td>
                                            <td className="p-6 text-charcoal/70">Factory parts</td>
                                        </tr>
                                        <tr>
                                            <td className="p-6 font-medium">Jeddah-Abha</td>
                                            <td className="p-6 text-charcoal/70">4 days / SAR 50</td>
                                            <td className="p-6 text-primary font-bold">2 days / SAR 100</td>
                                            <td className="p-6 text-charcoal/70">Food items</td>
                                        </tr>
                                        <tr>
                                            <td className="p-6 font-medium">Riyadh-Tabuk</td>
                                            <td className="p-6 text-charcoal/70">5 days / SAR 60</td>
                                            <td className="p-6 text-primary font-bold">3 days / SAR 120</td>
                                            <td className="p-6 text-charcoal/70">Remote areas</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="bg-blue-50 p-6 rounded-2xl flex gap-4 items-start">
                                <div className="bg-blue-100 p-2 rounded-lg text-blue-600 shrink-0">
                                    <Truck size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-blue-900 mb-1 font-premium">Pro Tip</h4>
                                    <p className="text-blue-800/80 text-sm font-exo">
                                        Pick services with branches in <strong>Tuwaiq or Laban</strong> for faster pickup.
                                        Expect +25% costs in Ramadan, but look for 10% off for big orders (50kg+).
                                    </p>
                                </div>
                            </div>
                        </RevealOnScroll>
                    </div>
                </section>

                {/* International Shipping */}
                <section className="py-16 px-4 sm:px-6 lg:px-8 bg-charcoal text-white">
                    <div className="max-w-5xl mx-auto">
                        <RevealOnScroll>
                            <h2 className="text-3xl sm:text-4xl font-premium font-normal text-white mb-6 text-center">
                                International Shipping from Saudi Arabia
                            </h2>
                            <p className="text-center text-white/60 font-exo mb-12">
                                KSA exports grew 18% in 2025. New rules make customs faster (4 hours).
                            </p>

                            <div className="grid md:grid-cols-2 gap-12 mb-16">
                                <div>
                                    <h3 className="text-xl font-premium font-bold mb-6 text-primary">Shipping Steps</h3>
                                    <ul className="space-y-4 font-exo">
                                        <li className="flex items-center gap-4 bg-white/5 p-4 rounded-xl">
                                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white font-bold">1</div>
                                            <span>Prepare papers (invoice, packing list)</span>
                                        </li>
                                        <li className="flex items-center gap-4 bg-white/5 p-4 rounded-xl">
                                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white font-bold">2</div>
                                            <span>No alcohol, pork, or drones</span>
                                        </li>
                                        <li className="flex items-center gap-4 bg-white/5 p-4 rounded-xl">
                                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white font-bold">3</div>
                                            <span>Track online</span>
                                        </li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-xl font-premium font-bold mb-6 text-primary">1kg Economy Prices (Door-to-Door)</h3>
                                    <div className="space-y-3 font-exo text-sm">
                                        <div className="flex justify-between border-b border-white/10 pb-2">
                                            <span>UAE/Dubai (1-2 days)</span>
                                            <span className="font-bold">SAR 40-60</span>
                                        </div>
                                        <div className="flex justify-between border-b border-white/10 pb-2">
                                            <span>India (3-5 days)</span>
                                            <span className="font-bold">SAR 70-100</span>
                                        </div>
                                        <div className="flex justify-between border-b border-white/10 pb-2">
                                            <span>UK/London (4-7 days)</span>
                                            <span className="font-bold">SAR 100-150</span>
                                        </div>
                                        <div className="flex justify-between border-b border-white/10 pb-2">
                                            <span>USA (5-10 days)</span>
                                            <span className="font-bold">SAR 130-200</span>
                                        </div>
                                        <div className="flex justify-between border-b border-white/10 pb-2">
                                            <span>China (4-6 days)</span>
                                            <span className="font-bold">SAR 80-120</span>
                                        </div>
                                        <p className="text-white/40 text-xs mt-4">*Insurance: SAR 20 protects SAR 1,000 value</p>
                                    </div>
                                </div>
                            </div>
                        </RevealOnScroll>
                    </div>
                </section>

                {/* Comparison */}
                <section className="py-16 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-6xl mx-auto">
                        <RevealOnScroll>
                            <h2 className="text-3xl sm:text-4xl font-premium font-normal text-charcoal mb-12 text-center">
                                Best Courier Companies in Saudi Arabia
                            </h2>

                            <div className="overflow-x-auto">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {[
                                        { name: "FedEx", best: "Very Fast", world: "Best Global", price: "High", rating: 5 },
                                        { name: "DHL", best: "Customs Easy", world: "USA/Europe", price: "High", rating: 5 },
                                        { name: "Aramex", best: "Cheap GCC", world: "Middle East", price: "Low", rating: 4 },
                                        { name: "Naqel", best: "Cheapest KSA", world: "Local Only", price: "Very Low", rating: 3 },
                                        { name: "SMSA", best: "Western KSA", world: "Regional", price: "Medium", rating: 4 },
                                        { name: "J&T Express", best: "Shopping parcels", world: "Asia", price: "Low", rating: 4 },
                                    ].map((company) => (
                                        <div key={company.name} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:border-primary/20 transition-colors group">
                                            <div className="flex justify-between items-center mb-4">
                                                <h3 className="text-xl font-bold font-premium text-charcoal group-hover:text-primary transition-colors">{company.name}</h3>
                                                <div className="flex text-yellow-400 text-xs">
                                                    {[...Array(5)].map((_, i) => (
                                                        <span key={i} className={i < company.rating ? "opacity-100" : "opacity-30"}>★</span>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="space-y-2 text-sm font-exo">
                                                <div className="flex justify-between"><span className="text-charcoal/60">Domestic:</span> <span className="font-medium">{company.best}</span></div>
                                                <div className="flex justify-between"><span className="text-charcoal/60">Global:</span> <span className="font-medium">{company.world}</span></div>
                                                <div className="flex justify-between"><span className="text-charcoal/60">Price:</span> <span className={`font-bold ${company.price.includes('Low') ? 'text-green-600' : 'text-charcoal'}`}>{company.price}</span></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-12 p-8 bg-gray-50 rounded-3xl text-center font-exo">
                                <h4 className="font-bold text-lg mb-4">Quick Recommendation</h4>
                                <div className="flex flex-wrap justify-center gap-4">
                                    <span className="px-4 py-2 bg-white rounded-full shadow-sm text-sm border border-gray-100">💰 <strong>Cheap:</strong> Naqel / Aramex</span>
                                    <span className="px-4 py-2 bg-white rounded-full shadow-sm text-sm border border-gray-100">🚀 <strong>Urgent:</strong> FedEx / DHL</span>
                                    <span className="px-4 py-2 bg-gradient-to-r from-primary to-orange-500 text-white rounded-full shadow-sm text-sm font-bold">⭐ <strong>Best All-Round:</strong> WhiteBox Aggregator</span>
                                </div>
                            </div>
                        </RevealOnScroll>
                    </div>
                </section>

                {/* Rules & Packing Tips */}
                <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
                    <div className="max-w-5xl mx-auto">
                        <RevealOnScroll>
                            <h2 className="text-3xl sm:text-4xl font-premium font-normal text-charcoal mb-12 text-center">
                                Rules & Packing Tips for KSA
                            </h2>

                            <div className="grid md:grid-cols-2 gap-8 mb-8">
                                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                                            <ShieldCheck size={24} />
                                        </div>
                                        <h3 className="text-xl font-bold font-premium">Customs & Regulations</h3>
                                    </div>
                                    <ul className="space-y-4 font-exo text-charcoal/80">
                                        <li className="flex gap-3">
                                            <CheckCircle2 className="text-primary shrink-0 w-5 h-5 mt-0.5" />
                                            <span><strong>Use Fasah app:</strong> Get 4-hour clearance.</span>
                                        </li>
                                        <li className="flex gap-3">
                                            <AlertCircle className="text-orange-500 shrink-0 w-5 h-5 mt-0.5" />
                                            <span><strong>Avoid Fines:</strong> Wrong papers = SAR 5,000 fine.</span>
                                        </li>
                                    </ul>
                                </div>

                                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-600">
                                            <Package size={24} />
                                        </div>
                                        <h3 className="text-xl font-bold font-premium">Packing for Hot Weather</h3>
                                    </div>
                                    <ul className="space-y-4 font-exo text-charcoal/80">
                                        <li className="flex gap-3"><CheckCircle2 className="text-blue-500 shrink-0 w-5 h-5 mt-0.5" /> Strong cardboard boxes</li>
                                        <li className="flex gap-3"><CheckCircle2 className="text-blue-500 shrink-0 w-5 h-5 mt-0.5" /> Bubble wrap inside</li>
                                        <li className="flex gap-3"><CheckCircle2 className="text-blue-500 shrink-0 w-5 h-5 mt-0.5" /> "Fragile" stickers</li>
                                        <li className="flex gap-3"><CheckCircle2 className="text-blue-500 shrink-0 w-5 h-5 mt-0.5" /> Extra bags for liquids</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-2xl border border-gray-100 text-center font-exo">
                                <h4 className="font-bold text-lg mb-2 text-primary">Avoid Delays:</h4>
                                <p className="text-charcoal/70">
                                    Book 2 days early for holidays • Use tracking apps (99% find lost items)
                                </p>
                            </div>
                        </RevealOnScroll>
                    </div>
                </section>

                {/* Why WhiteBox */}
                <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-charcoal to-black text-white relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />

                    <div className="max-w-4xl mx-auto relative z-10 text-center">
                        <RevealOnScroll>
                            <h2 className="text-3xl sm:text-5xl font-premium font-medium mb-8">
                                Why Choose WhiteBox Courier?
                            </h2>
                            <p className="text-xl text-white/70 font-exo mb-12">
                                Here's the Real Difference. In busy courier services Saudi Arabia, WhiteBox Courier saves you time and money with 10 years experience.
                            </p>

                            <div className="grid md:grid-cols-2 gap-6 text-left mb-12">
                                {[
                                    "2-Day Delivery Guaranteed anywhere in KSA (faster than most)",
                                    "20-30% Cheaper using FedEx, DHL, Aramex, Naqel, SMSA, J&T together",
                                    "Free Door Pickup + strong packing (zero damage)",
                                    "24/7 Arabic/English Support + live tracking app",
                                    "Fast Customs for world shipments",
                                    "5,000+ happy customers trust WhiteBox for shopping parcels, papers, and cargo."
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-3 bg-white/10 p-4 rounded-xl border border-white/5">
                                        <CheckCircle2 className="text-primary shrink-0" />
                                        <span className="font-exo">{item}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="bg-white/10 rounded-2xl p-6 mb-12 border border-white/10 max-w-2xl mx-auto">
                                <p className="text-lg font-bold font-premium text-primary mb-2">Real Savings:</p>
                                <p className="font-exo text-lg">
                                    Regular Riyadh business saves <strong>SAR 500/month</strong> vs single-company prices.
                                </p>
                            </div>

                            <div className="space-y-6">
                                <h3 className="text-2xl font-premium font-bold">Start Today: Free quote, same-day pickup from Tuwaiq/Laban.</h3>

                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Link
                                        href="/#contact"
                                        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white rounded-full font-bold text-lg hover:bg-white hover:text-primary transition-all duration-300 shadow-glow hover:shadow-glow-lg"
                                    >
                                        Get Quote
                                    </Link>
                                    <Link
                                        href="/#contact"
                                        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-charcoal rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300"
                                    >
                                        Book Pickup
                                    </Link>
                                </div>

                                <p className="text-white/60 font-exo text-sm mt-8">
                                    WhiteBox: Simple, fast, cheap courier in Saudi Arabia.
                                </p>
                            </div>


                        </RevealOnScroll>
                    </div>
                </section>

                {/* FAQs */}
                <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
                    <div className="max-w-3xl mx-auto">
                        <RevealOnScroll>
                            <h2 className="text-3xl font-premium font-normal text-charcoal mb-12 text-center">Frequently Asked Questions</h2>
                            <div className="space-y-6">
                                {[
                                    { q: "Cheapest Riyadh to Jeddah?", a: "Naqel SAR 40 (3 days)" },
                                    { q: "2 day delivery everywhere?", a: "Yes, available with express services." },
                                    { q: "How long customs?", a: "1-4 days with online papers." },
                                    { q: "Good tracking?", a: "Most apps show exact location." },
                                ].map((faq, idx) => (
                                    <div key={idx} className="border-b border-gray-100 pb-6">
                                        <h4 className="font-bold text-lg text-charcoal mb-2 font-premium">{faq.q}</h4>
                                        <p className="text-charcoal/70 font-exo">{faq.a}</p>
                                    </div>
                                ))}
                            </div>
                        </RevealOnScroll>
                    </div>
                </section>

                <Footer />
            </main>
        </>
    );
};

export default CourierGuidePage;
