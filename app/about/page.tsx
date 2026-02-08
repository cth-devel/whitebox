"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    Users,
    Target,
    TrendingUp,
    Award,
    Truck,
    Globe,
    Clock,
    ShieldCheck,
    CheckCircle2,
    ArrowRight,
    MapPin,
    Leaf,
    Lightbulb,
    Heart
} from "lucide-react";
import Footer from "@/components/Footer";
import RevealOnScroll from "@/components/RevealOnScroll";

const AboutPage = () => {
    return (
        <>
            <main className="min-h-screen bg-white">
                {/* Hero Section */}
                <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-gray-50 to-white">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gray-200/50 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

                    <div className="relative z-10 max-w-7xl mx-auto text-center">
                        <RevealOnScroll>
                            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-premium font-normal text-primary mb-6 tracking-tight">
                                About WhiteBox Courier
                            </h1>
                            <p className="text-xl sm:text-2xl text-charcoal/60 max-w-4xl mx-auto leading-relaxed font-exo">
                                Your Trusted Partner for Fast, Reliable Courier Services in Saudi Arabia and Beyond.
                            </p>
                        </RevealOnScroll>
                    </div>
                </section>

                {/* Our Story Section */}
                <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
                    <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                        <RevealOnScroll>
                            <div className="relative group">
                                <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl aspect-[4/3] bg-gray-100 transform transition-transform duration-700 group-hover:scale-[1.02]">
                                    <Image
                                        src="/media/whitebox-about.webp"
                                        alt="WhiteBox Courier Team"
                                        fill
                                        className="object-cover"
                                        unoptimized
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
                                </div>
                                {/* Decorative Elements */}
                                <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-primary/10 rounded-full blur-2xl -z-10" />
                                <div className="absolute -top-8 -left-8 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl -z-10" />

                                {/* Experience Badge */}
                                <div className="absolute bottom-8 right-8 z-20 bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-xl border border-white/50">
                                    <p className="text-4xl font-premium font-bold text-primary">10+</p>
                                    <p className="text-sm font-exo font-medium text-charcoal/80">Years of<br />Excelence</p>
                                </div>
                            </div>
                        </RevealOnScroll>

                        <RevealOnScroll delay={0.2}>
                            <div className="relative">
                                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-premium font-normal text-charcoal mb-8 leading-tight">
                                    Delivering <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500">Peace of Mind</span> Since 2014
                                </h2>
                                <div className="space-y-6 text-charcoal/70 text-lg sm:text-xl leading-relaxed font-exo font-light">
                                    <p>
                                        At WhiteBox Courier, we deliver more than packages—we deliver trust. Established a decade ago, our journey began with a simple but powerful mission: <strong className="text-charcoal font-medium">to connect people and businesses through seamless logistics, no matter the distance.</strong>
                                    </p>
                                    <p>
                                        Founded in the heart of Saudi Arabia, WhiteBox Courier emerged from a passion for efficient, customer-centric delivery solutions. Over the past decade, we've grown from a local startup into a logistics leader with two thriving branches in Tuwaiq and Laban.
                                    </p>
                                    <p>
                                        What started as door-to-door services for neighbors has evolved into a robust network partnering with global giants like <span className="text-primary font-medium">FedEx, Aramex, DHL, and SMSA</span>. Every milestone reflects our unwavering commitment to innovation and reliability.
                                    </p>
                                </div>
                            </div>
                        </RevealOnScroll>
                    </div>
                </section>

                {/* Mission & Vision */}
                <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50/50 relative overflow-hidden">
                    {/* Background decorative blobs */}
                    <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
                    <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] translate-y-1/2 translate-x-1/2 pointer-events-none" />

                    <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 lg:gap-12">
                        {/* Mission Card */}
                        <RevealOnScroll>
                            <div className="group relative h-full bg-white rounded-[2.5rem] p-8 sm:p-12 shadow-sm hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 border border-gray-100 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-red-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 transition-transform duration-700 group-hover:scale-110" />

                                <div className="relative z-10 flex flex-col h-full">


                                    <h3 className="text-3xl sm:text-4xl font-premium font-normal text-charcoal mb-6 group-hover:text-primary transition-colors duration-300">
                                        Our Mission
                                    </h3>

                                    <p className="text-lg text-charcoal/70 leading-relaxed max-w-lg mb-8 flex-1 font-exo font-light">
                                        To revolutionize logistics by providing <span className="font-semibold text-primary/80">low-cost, high-speed courier services</span> that make global connectivity accessible for everyone in KSA and beyond.
                                    </p>

                                    <div className="flex items-center gap-4 pt-8 border-t border-gray-100 group-hover:border-primary/10 transition-colors">
                                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm">
                                            <Truck size={20} />
                                        </div>
                                        <span className="text-sm font-bold text-charcoal/80 uppercase tracking-wider group-hover:translate-x-1 transition-transform duration-300 font-exo">
                                            Delivery Without Delays
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </RevealOnScroll>

                        {/* Vision Card */}
                        <RevealOnScroll delay={0.2}>
                            <div className="group relative h-full bg-white rounded-[2.5rem] p-8 sm:p-12 shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 border border-gray-100 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-blue-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -mr-16 -mt-16 transition-transform duration-700 group-hover:scale-110" />

                                <div className="relative z-10 flex flex-col h-full">


                                    <h3 className="text-3xl sm:text-4xl font-premium font-normal text-charcoal mb-6 group-hover:text-blue-600 transition-colors duration-300">
                                        Our Vision
                                    </h3>

                                    <p className="text-lg text-charcoal/70 leading-relaxed max-w-lg mb-8 flex-1 font-exo font-light">
                                        To become the <span className="font-semibold text-blue-600/80">go-to logistics hub</span> in the Middle East, powered by cutting-edge technology, strategic partnerships, and unwavering trust.
                                    </p>

                                    <div className="flex items-center gap-4 pt-8 border-t border-gray-100 group-hover:border-blue-500/10 transition-colors">
                                        <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm">
                                            <TrendingUp size={20} />
                                        </div>
                                        <span className="text-sm font-bold text-charcoal/80 uppercase tracking-wider group-hover:translate-x-1 transition-transform duration-300 font-exo">
                                            Global Connection
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </RevealOnScroll>
                    </div>
                </section>

                {/* Why WhiteBox Stands Out */}
                <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <RevealOnScroll>
                                <h2 className="text-3xl sm:text-5xl font-premium font-normal text-primary mb-6">
                                    Why WhiteBox Stands Out
                                </h2>
                                <p className="text-lg sm:text-xl text-charcoal/60 max-w-4xl mx-auto font-exo">
                                    With 10+ years of expertise, here's what sets us apart in the competitive Saudi logistics landscape.
                                </p>
                            </RevealOnScroll>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                {
                                    title: "Lightning-Fast Domestic",
                                    desc: "Guaranteed 2-day service across KSA, beating industry averages.",
                                    icon: Clock
                                },
                                {
                                    title: "Global Reach",
                                    desc: "Imports from every country and exports via trusted partners—no borders too far.",
                                    icon: Globe
                                },
                                {
                                    title: "Customer Obsession",
                                    desc: "24/7 tracking, quality packing, and personalized support from our teams.",
                                    icon: Heart
                                },
                                {
                                    title: "Affordable Excellence",
                                    desc: "Low rates through strategic partnerships, without cutting corners on speed or safety.",
                                    icon: TrendingUp
                                },
                                {
                                    title: "Local Roots, Global Wings",
                                    desc: "Proudly Saudi-based, serving Riyadh, Jeddah, Dammam, and beyond.",
                                    icon: MapPin
                                },
                                {
                                    title: "Expert Solutions",
                                    desc: "Solving real problems like same-day pickups and customs clearance.",
                                    icon: ShieldCheck
                                }
                            ].map((feature, idx) => (
                                <RevealOnScroll key={feature.title} delay={idx * 0.1}>
                                    <div className="group p-8 rounded-3xl bg-gray-50 hover:bg-white border border-transparent hover:border-gray-100 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
                                        <div className="w-12 h-12 rounded-xl bg-white group-hover:bg-primary/5 flex items-center justify-center mb-6 shadow-sm group-hover:shadow-none transition-colors">
                                            <feature.icon className="w-6 h-6 text-charcoal group-hover:text-primary transition-colors" />
                                        </div>
                                        <h3 className="text-xl sm:text-2xl font-premium font-normal text-charcoal mb-3">{feature.title}</h3>
                                        <p className="text-charcoal/70 leading-relaxed font-exo">{feature.desc}</p>
                                    </div>
                                </RevealOnScroll>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Meet Our Team */}
                <section className="py-24 px-4 sm:px-6 lg:px-8 bg-charcoal text-white relative overflow-hidden">
                    {/* Background pattern */}
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />

                    <div className="max-w-7xl mx-auto relative z-10">
                        <RevealOnScroll>
                            <div className="text-center mb-16">
                                <h2 className="text-3xl sm:text-5xl font-premium font-normal text-primary mb-6">
                                    Meet Our Team
                                </h2>
                                <p className="text-lg sm:text-xl text-white/70 max-w-4xl mx-auto font-exo">
                                    Behind every WhiteBox delivery is a dedicated team of logistics pros.
                                </p>
                            </div>
                        </RevealOnScroll>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                            {[
                                {
                                    name: "Mr. Abdulrahman bin Ali bin Mohammed Al-Humaidhi Al-Asmari",
                                    role: "Founder & CEO",
                                    desc: "15+ years in supply chain; visionary behind our partner network."
                                },
                                {
                                    name: "Mr. Asif Asharaf",
                                    role: "Managing Director",
                                    desc: "Driving operational excellence and strategic growth across all branches.",
                                    image: "/media/team1.webp"
                                },
                                {
                                    name: "Mr. Shiyas Yahya",
                                    role: "Operation Specialist",
                                    desc: "Expert in optimizing logistics workflows and ensuring timely deliveries.",
                                    image: "/media/team3.webp"
                                },
                                {
                                    name: "Muhammed Ansar Shajahan",
                                    role: "Operation Specialist",
                                    desc: "Dedicated to smooth day-to-day operations and team coordination.",
                                    image: "/media/team2.webp"
                                },

                            ].map((member, idx) => (
                                <RevealOnScroll key={member.name} delay={idx * 0.2}>
                                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-3xl text-center hover:bg-white/10 transition-colors duration-300 h-full">
                                        <div className="w-32 h-32 mx-auto mb-6 relative">
                                            {member.image ? (
                                                <div className="relative w-full h-full rounded-full overflow-hidden shadow-lg border-2 border-white/20">
                                                    <Image
                                                        src={member.image}
                                                        alt={member.name}
                                                        fill
                                                        className="object-cover object-[center_25%] scale-125 group-hover:scale-135 transition-transform duration-500"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="w-full h-full bg-gradient-to-br from-primary to-orange-500 rounded-full flex items-center justify-center text-3xl font-bold text-white shadow-lg border-2 border-white/20">
                                                    {member.name.charAt(0)}
                                                </div>
                                            )}
                                        </div>
                                        <h3 className="text-xl sm:text-2xl font-premium font-normal text-white mb-2 min-h-[3rem] flex items-center justify-center">{member.name}</h3>
                                        <p className="text-primary font-medium mb-4 text-sm uppercase tracking-wider">{member.role}</p>
                                        <p className="text-white/60 text-sm leading-relaxed font-exo">{member.desc}</p>
                                    </div>
                                </RevealOnScroll>
                            ))}

                        </div>

                        <RevealOnScroll delay={0.4}>
                            <div className="mt-16 text-center">
                                <p className="text-white/60 mb-8 max-w-2xl mx-auto">
                                    Our 50+ staff are trained in the latest tech, from AI-driven route optimization to eco-friendly packing.
                                </p>
                            </div>
                        </RevealOnScroll>
                    </div>
                </section>

                {/* Commitment to Excellence */}
                <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <RevealOnScroll>
                                <h2 className="text-3xl sm:text-5xl font-premium font-normal text-primary mb-8">
                                    Our Commitment to Excellence
                                </h2>
                                <p className="text-lg sm:text-xl text-charcoal/70 mb-10 leading-relaxed font-exo">
                                    We're not just couriers; we're stewards of your trust. We prioritize sustainability, innovation, and community in every shipment we handle.
                                </p>

                                <div className="space-y-6">
                                    {[
                                        {
                                            title: "Sustainability",
                                            desc: "Electric vans for local routes and recyclable packaging.",
                                            icon: Leaf
                                        },
                                        {
                                            title: "Innovation",
                                            desc: "Real-time app tracking and automated quotes.",
                                            icon: Lightbulb
                                        },
                                        {
                                            title: "Community",
                                            desc: "Sponsoring local events in Tuwaiq and Laban to give back.",
                                            icon: Users
                                        }
                                    ].map((item) => (
                                        <div key={item.title} className="flex gap-4">
                                            <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center shrink-0">
                                                <item.icon className="w-5 h-5 text-primary" />
                                            </div>
                                            <div>
                                                <h4 className="text-xl font-premium font-normal text-charcoal mb-1">{item.title}</h4>
                                                <p className="text-charcoal/60 font-exo">{item.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </RevealOnScroll>

                            <RevealOnScroll delay={0.2}>
                                <div className="bg-primary/[0.03] p-8 sm:p-12 rounded-[2.5rem] border border-primary/10 text-center relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                                    <h3 className="text-3xl font-premium font-normal text-charcoal mb-6 relative z-10">
                                        Join the WhiteBox Family
                                    </h3>
                                    <p className="text-charcoal/70 mb-8 relative z-10 font-exo">
                                        Over 5,000 businesses and families choose us monthly. Ready to experience hassle-free delivery?
                                    </p>

                                    <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                                        <Link
                                            href="/#contact"
                                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 font-semibold text-white shadow-lg shadow-primary/20 hover:bg-[#d92237] hover:-translate-y-1 transition-all"
                                        >
                                            Get Your Free Quote
                                            <ArrowRight size={18} />
                                        </Link>
                                        <Link
                                            href="/track"
                                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white border border-gray-200 px-6 py-3.5 font-semibold text-charcoal hover:border-primary hover:text-primary transition-all hover:shadow-lg"
                                        >
                                            Track a Shipment
                                            <MapPin size={18} />
                                        </Link>
                                    </div>

                                    <p className="mt-8 text-sm text-charcoal/50 font-exo">
                                        Contact our Tuwaiq or Laban branch today. <br />
                                        <strong>WhiteBox: Where every package finds its way home.</strong>
                                    </p>
                                </div>
                            </RevealOnScroll>
                        </div>
                    </div>
                </section>

            </main >
            <Footer />
        </>
    );
};

export default AboutPage;
