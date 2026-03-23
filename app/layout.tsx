import type { Metadata } from "next";
import { Newsreader, Work_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BottomNav } from "@/components/BottomNav";

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
});

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "The Modern Curator | High-End Editorial",
  description:
    "Redefining the digital periodical through curated aesthetics and rigorous journalism.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${newsreader.variable} ${workSans.variable}`}>
      <body className="min-h-full flex flex-col antialiased overflow-x-hidden">
        <Navbar />
        {children}
        {/* Footer only on desktop */}
        <div className="hidden md:block">
          <Footer />
        </div>
        {/* Bottom nav only on mobile */}
        <BottomNav />
      </body>
    </html>
  );
}
