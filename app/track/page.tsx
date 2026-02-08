"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import RevealOnScroll from "@/components/RevealOnScroll";

const CARRIERS = [
    { name: "FedEx", src: "/media/partners/fedex.svg", url: "https://www.fedex.com/en-sa/home.html" },
    { name: "Aramex", src: "/media/partners/aramex.svg", url: "https://www.aramex.com/ae/en/track/shipments" },
    { name: "DHL", src: "/media/partners/dhl.svg", url: "https://www.dhl.com/sa-en/home/tracking.html" },
    { name: "Naqel Express", src: "/media/partners/naqel.svg", url: "https://www.naqelexpress.com/en/sa/tracking/" },
    { name: "SMSA Express", src: "/media/partners/smsa.svg", url: "https://www.smsaexpress.com/sa" },
    { name: "J&T Express", src: "/media/partners/JT.svg", url: "https://www.jtexpress.me/KSA/trackOrder" },
];

export default function TrackPage() {
    return (
        <main className="min-h-screen bg-gray-50 pt-24 pb-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                {/* Header Section */}
                <RevealOnScroll>
                    <div className="text-center max-w-3xl mx-auto mb-16">

                        <h1 className="text-4xl sm:text-5xl font-premium font-normal text-primary mb-6">
                            Select Your Carrier
                        </h1>
                        <p className="text-lg sm:text-xl text-charcoal/60 leading-relaxed font-exo">
                            Choose your shipping provider below to access real-time tracking updates for your package.
                        </p>
                    </div>
                </RevealOnScroll>

                {/* Carriers Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
                    {CARRIERS.map((carrier, index) => (
                        <RevealOnScroll key={carrier.name} delay={index * 0.05}>
                            <Link
                                href={carrier.url}
                                className="group relative flex flex-col items-center justify-center bg-white rounded-3xl p-8 h-64 border-2 border-transparent hover:border-primary/5 shadow-[0_2px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-2 overflow-hidden"
                            >
                                {/* Background Decoration */}
                                <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="absolute -right-12 -top-12 w-48 h-48 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors duration-500" />

                                <div className="relative z-10 w-full h-full flex items-center justify-center p-6 transition-transform duration-500 group-hover:scale-105">
                                    <div className="relative w-full h-full flex items-center justify-center">
                                        <Image
                                            src={carrier.src}
                                            alt={carrier.name}
                                            fill
                                            className="object-contain drop-shadow-sm group-hover:drop-shadow-xl transition-all duration-500"
                                            unoptimized
                                        />
                                    </div>
                                </div>
                            </Link>
                        </RevealOnScroll>
                    ))}
                </div>

                {/* Help Section */}
                <RevealOnScroll delay={0.4}>
                    <div className="mt-20 text-center">
                        <p className="text-charcoal/50 text-sm">
                            Not sure which carrier to choose? Check your shipping confirmation email or <Link href="/#contact" className="text-primary hover:underline">contact support</Link>.
                        </p>
                    </div>
                </RevealOnScroll>

            </div>
        </main>
    );
}
