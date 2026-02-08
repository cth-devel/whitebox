"use client";

import Hero from "@/components/Hero";
import PartnerCarousel from "@/components/PartnerCarousel";
import ServicesBento from "@/components/ServicesBento";
import WhyWhiteBox from "@/components/WhyWhiteBox";
import LocationFocus from "@/components/LocationFocus";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";

export default function Home() {
  return (
    <>
      <CustomCursor />
      <main id="main" role="main">
        <Hero />
        <PartnerCarousel />
        <WhyWhiteBox />
        <ServicesBento />
        <LocationFocus />
        <ContactSection />
        <Footer />
      </main>
    </>
  );
}
