import type { Metadata } from "next";
import { Inter, Playfair_Display, PT_Sans_Narrow, Exo } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";

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
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${ptSansNarrow.variable} ${exo.variable}`}>
      <body className="antialiased font-sans text-charcoal bg-white min-h-screen">
        <Navigation />
        {children}
      </body>
    </html>
  );
}
