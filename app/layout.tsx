import type { Metadata } from "next";
import { Inter, Playfair_Display, PT_Sans_Narrow, Exo, Cairo } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import LanguageProvider from "@/components/LanguageProvider";
import LanguageToggle from "@/components/LanguageToggle";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const ptSansNarrow = PT_Sans_Narrow({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-pt-sans-narrow",
  display: "swap",
});

const exo = Exo({
  subsets: ["latin"],
  variable: "--font-exo",
  display: "swap",
});

/* Cairo: high-legibility Arabic display face. Loaded as a CSS variable so
   globals.css can transparently re-point the existing font tokens at it
   under `html[lang="ar"]` (no per-component class changes needed). */
const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "WhiteBox | Courier & Logistics Aggregator | Saudi Arabia",
  description:
    "Fast. Affordable. Reliable. Your gateway to global logistics from the heart of KSA.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${ptSansNarrow.variable} ${exo.variable} ${cairo.variable}`}>
      <body className="antialiased font-sans text-charcoal bg-white min-h-screen">
        <LanguageProvider>
          <Navigation />
          {children}
          <LanguageToggle />
        </LanguageProvider>
      </body>
    </html>
  );
}
