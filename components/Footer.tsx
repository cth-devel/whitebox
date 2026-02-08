"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  MapPin,
  Phone,
  Mail,
  ArrowRight
} from "lucide-react";
import RevealOnScroll from "./RevealOnScroll";

const FOOTER_LINKS = {
  services: [
    { label: "Domestic Delivery", href: "/services#domestic" },
    { label: "International Shipping", href: "/services#international" },
    { label: "Warehousing Solutions", href: "/services#warehousing" },
    { label: "Customs Clearance", href: "/services#customs" },
    { label: "E-commerce Logistics", href: "/services#ecommerce" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Track Shipment", href: "/track" },
    { label: "Partner With Us", href: "/partners" },
    { label: "Courier Guide 2026", href: "/courier-services-saudi-arabia-2026" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
  ],
  contact: [
    { icon: MapPin, text: "Olaya Street, Riyadh, Saudi Arabia" },
    { icon: Phone, text: "+966 50 000 0000" },
    { icon: Mail, text: "info@whitebox.sa" },
  ]
};

const SOCIAL = [
  { href: "#", icon: Facebook, label: "Facebook" },
  { href: "#", icon: Twitter, label: "Twitter" },
  { href: "#", icon: Linkedin, label: "LinkedIn" },
  { href: "#", icon: Instagram, label: "Instagram" },
];

const Footer = () => {
  return (
    <footer className="relative bg-[#1a1a1a] text-white pt-24 pb-12 overflow-hidden" role="contentinfo" aria-label="Footer">

      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px] opacity-[0.03] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <RevealOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">

            {/* Brand Column */}
            <div className="space-y-8">
              <Link href="/" className="block w-fit" aria-label="WhiteBox Home">
                <Image
                  src="/media/whiteboxlogo.svg"
                  alt="WhiteBox"
                  width={150}
                  height={150}
                  className="h-32 w-auto object-contain"
                  unoptimized
                />
              </Link>
              <p className="text-white/60 text-lg leading-relaxed font-exo max-w-xs">
                Your trusted logistics partner, delivering excellence across Saudi Arabia and the globe since 2014.
              </p>
              <div className="flex gap-4">
                {SOCIAL.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:bg-primary hover:text-white transition-all duration-300 group"
                      aria-label={item.label}
                    >
                      <Icon size={18} className="group-hover:scale-110 transition-transform duration-300" />
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Services Column */}
            <div>
              <h3 className="text-xl font-premium font-medium text-white mb-8">Our Services</h3>
              <ul className="space-y-4">
                {FOOTER_LINKS.services.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-white/60 hover:text-primary transition-colors duration-300 flex items-center gap-2 group font-exo"
                    >
                      <span className="w-0 overflow-hidden group-hover:w-4 transition-all duration-300 opacity-0 group-hover:opacity-100">
                        <ArrowRight size={14} />
                      </span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links Column */}
            <div>
              <h3 className="text-xl font-premium font-medium text-white mb-8">Quick Links</h3>
              <ul className="space-y-4">
                {FOOTER_LINKS.company.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-white/60 hover:text-primary transition-colors duration-300 flex items-center gap-2 group font-exo"
                    >
                      <span className="w-0 overflow-hidden group-hover:w-4 transition-all duration-300 opacity-0 group-hover:opacity-100">
                        <ArrowRight size={14} />
                      </span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Column */}
            <div>
              <h3 className="text-xl font-premium font-medium text-white mb-8">Contact Info</h3>
              <ul className="space-y-6">
                {FOOTER_LINKS.contact.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <li key={idx} className="flex gap-4 group">
                      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                        <Icon size={18} />
                      </div>
                      <span className="text-white/70 font-exo group-hover:text-white transition-colors duration-300 py-2">
                        {item.text}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-white/40 text-sm font-exo text-center md:text-left">
              © {new Date().getFullYear()} WhiteBox. All rights reserved. • CR: 1010123456
            </p>

            <div className="flex items-center gap-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold tracking-wider uppercase"
              >
                Made in KSA
              </motion.div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </footer>
  );
};

export default Footer;
