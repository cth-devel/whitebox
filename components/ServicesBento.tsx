"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Truck,
  Users,
  Package,
  MapPin,
  Plane,
  CheckCircle2,
  ArrowRight,
  Ship,
  Globe,
  ShieldCheck,
  FileText,
  ScrollText,
} from "lucide-react";
import RevealOnScroll from "./RevealOnScroll";

const ServicesBento = () => {
  return (
    <section
      id="services"
      className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-white"
      aria-label="Our Services"
    >
      <div className="relative mx-auto max-w-7xl z-10">
        <RevealOnScroll>
          <div className="w-full flex flex-col items-center mb-16 text-center">

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-premium font-normal text-primary mb-6">
              Our Services
            </h2>
            <p className="text-charcoal/70 max-w-4xl mx-auto text-lg sm:text-xl leading-relaxed font-exo">
              Comprehensive shipping solutions tailored to your needs. From Road to Air, we handle it all with precision and care.
            </p>
          </div>
        </RevealOnScroll>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Road Freight",
              icon: Truck,
              desc: "Efficient ground transport across KSA & GCC.",
              gradient: "from-blue-50 to-white"
            },
            {
              title: "Air Freight",
              icon: Plane,
              desc: "Rapid global delivery for urgent shipments.",
              gradient: "from-sky-50 to-white"
            },
            {
              title: "Sea Freight",
              icon: Ship,
              desc: "Cost-effective solutions for large cargo.",
              gradient: "from-indigo-50 to-white"
            },
            {
              title: "Intl. & Domestic",
              icon: Globe,
              desc: "Seamless courier services worldwide.",
              gradient: "from-purple-50 to-white"
            },
            {
              title: "Packaging",
              icon: Package,
              desc: "Secure packing for fragile items.",
              gradient: "from-amber-50 to-white"
            },
            {
              title: "Insurance",
              icon: ShieldCheck,
              desc: "Full coverage for peace of mind.",
              gradient: "from-emerald-50 to-white"
            },
            {
              title: "Documentation",
              icon: FileText,
              desc: "Expert handling of all shipping paperwork.",
              gradient: "from-gray-50 to-white"
            },
            {
              title: "Customs Clearance",
              icon: ScrollText, // Or customized icon
              desc: "Hassle-free movement through borders.",
              gradient: "from-rose-50 to-white"
            },
          ].map((service, idx) => (
            <RevealOnScroll key={service.title} delay={idx * 0.05}>
              <motion.div
                whileHover={{ y: -5 }}
                className="group h-full bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.06)] hover:border-primary/10 transition-all duration-300 relative overflow-hidden flex flex-col"
              >
                {/* Hover Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center mb-6 group-hover:bg-white group-hover:shadow-sm transition-all duration-300">
                    <service.icon className="w-7 h-7 text-charcoal group-hover:text-primary transition-colors" strokeWidth={1.5} />
                  </div>

                  <h3 className="text-xl font-premium font-normal text-charcoal mb-3 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-charcoal/60 text-sm leading-relaxed font-exo">
                    {service.desc}
                  </p>
                </div>
              </motion.div>
            </RevealOnScroll>
          ))}
        </div>



        {/* CTA row */}
        <RevealOnScroll delay={0.2}>
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 rounded-xl bg-[#f72a42] px-8 py-4 text-base font-semibold text-white shadow-lg hover:bg-[#e0253a] transition-all hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[#f72a42] focus:ring-offset-2"
              aria-label="Book a Pickup"
            >
              <Package size={20} aria-hidden />
              Book a Pickup
              <ArrowRight size={18} aria-hidden />
            </Link>
            <Link
              href="/track"
              className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-8 py-4 text-base font-semibold text-charcoal hover:border-[#f72a42] hover:text-[#f72a42] hover:shadow-lg transition-all hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[#f72a42] focus:ring-offset-2"
              aria-label="Track Shipment"
            >
              <MapPin size={20} aria-hidden />
              Track Shipment
            </Link>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};

export default ServicesBento;
