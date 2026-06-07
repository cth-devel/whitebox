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
import { CONTACT } from "@/lib/data/contact";
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
    { icon: MapPin,  text: "Tuwaiq & Laban Branches, Riyadh, KSA",  href: undefined },
    { icon: Phone,   text: CONTACT.mainPhone,                         href: `tel:${CONTACT.mainPhone}` },
    { icon: Phone,   text: `${CONTACT.salesName}: ${CONTACT.salesPhone}`, href: `tel:${CONTACT.salesPhone}` },
    { icon: Mail,    text: CONTACT.email,                             href: `mailto:${CONTACT.email}` },
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
    <footer className="relative bg-[#1a1a1a] text-white pb-12 overflow-hidden" role="contentinfo" aria-label="Footer">
      {/* ── Enterprise Gateway CTA Band ──────────────────────────────────── */}
      <div className="grain relative bg-brand-grad overflow-hidden">
        {/* Decorative diagonal lines */}
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.06)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.06)_50%,rgba(255,255,255,0.06)_75%,transparent_75%)] [background-size:40px_40px] pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-black/25 to-transparent pointer-events-none" />
        <div className="absolute -top-20 -left-10 w-96 h-96 bg-white/8 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 flex flex-col sm:flex-row items-center justify-between gap-10">
          <div className="text-center sm:text-left max-w-xl">
            <div className="inline-flex items-center gap-2.5 text-white/80 text-[0.65rem] font-bold font-exo uppercase tracking-[0.22em] mb-4">
              <span className="h-px w-7 bg-white/50" />
              Ready to ship?
            </div>
            <h2
              className="text-white font-black leading-[1.02]"
              style={{ fontSize: "clamp(1.75rem, 4vw, 3.25rem)", letterSpacing: "-0.035em" }}
            >
              Start shipping <span className="serif-accent">smarter</span> today.
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <Link
              href={`https://wa.me/${CONTACT.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-primary font-bold text-sm hover:bg-white/90 hover:scale-[1.03] active:scale-[0.97] shadow-[0_4px_24px_rgba(0,0,0,0.25)] transition-all duration-200 whitespace-nowrap"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              WhatsApp Us
            </Link>
            <Link
              href="/#rates"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white/15 border border-white/30 text-white font-bold text-sm hover:bg-white/25 hover:scale-[1.03] active:scale-[0.97] backdrop-blur-sm transition-all duration-200 whitespace-nowrap"
            >
              <ArrowRight size={16} />
              Get a Quote
            </Link>
          </div>
        </div>
      </div>

      {/* ── Footer content starts here ───────────────────────────── */}
      <div className="pt-24">

      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2 pointer-events-none" />
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
              <p className="text-white/55 text-base leading-relaxed font-exo max-w-xs">
                Your trusted logistics partner — delivering <span className="serif-accent text-white/85">excellence</span> across the Kingdom and beyond since 2014.
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
              <h3 className="text-xs font-bold text-white/50 uppercase tracking-[0.22em] mb-7 font-exo">Our Services</h3>
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
              <h3 className="text-xs font-bold text-white/50 uppercase tracking-[0.22em] mb-7 font-exo">Quick Links</h3>
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
              <h3 className="text-xs font-bold text-white/50 uppercase tracking-[0.22em] mb-7 font-exo">Contact Info</h3>
              <ul className="space-y-6">
                {FOOTER_LINKS.contact.map((item, idx) => {
                  const Icon = item.icon;
                  const Tag = item.href ? "a" : "div";
                  return (
                    <li key={idx}>
                      <Tag
                        {...(item.href ? { href: item.href } : {})}
                        className="flex gap-4 group hover:no-underline"
                      >
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                          <Icon size={18} aria-hidden />
                        </div>
                        <span className="text-white/70 font-exo group-hover:text-white transition-colors duration-300 py-2 break-all">
                          {item.text}
                        </span>
                      </Tag>
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
      </div>{/* end pt-24 footer content */}
    </footer>
  );
};

export default Footer;
