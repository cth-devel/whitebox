"use client";

import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import WhyWhiteBox from "@/components/WhyWhiteBox";
import ServicesBento from "@/components/ServicesBento";
import AppFeatures from "@/components/AppFeatures";
import RateQuote from "@/components/RateQuote";
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
        <TrustBar />
        <WhyWhiteBox />
        <ServicesBento />
        <AppFeatures />
        <RateQuote />
        <LocationFocus />
        <ContactSection />
        <Footer />
      </main>
    </>
  );
}
