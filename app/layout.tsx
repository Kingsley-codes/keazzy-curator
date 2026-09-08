import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const newsreader = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const workSans = Inter({
  subsets: ["latin"],
  variable: "--font-work-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Keazzy's Curations — Thoughtful Stories. Fresh Perspectives.",
  description:
    "Independent coverage of news, sports, fashion, technology and science, thoughtfully curated.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${newsreader.variable} ${workSans.variable}`}>
      <body className="min-h-full overflow-x-hidden bg-[#fbfaf7] font-sans text-[#111] antialiased">
        {children}
      </body>
    </html>
  );
}
