"use client";

import { useState } from "react";

export function Navbar() {
  const navLinks = [
    { label: "All Curation", href: "#" },
    { label: "News", href: "#" },
    { label: "Sports", href: "#" },
    { label: "Fashion", href: "#" },
    { label: "Tech", href: "#" },
    { label: "Science", href: "#" },
    { label: "stories", href: "#" },
  ];

  const [activeLink, setActiveLink] = useState("All Curation");

  return (
    <>
      {/* ── Desktop / tablet top navbar ── */}
      <header className="fixed top-0 w-full z-50 bg-[#faf8ff]/90 backdrop-blur-md hidden md:block">
        <div className="flex justify-between items-center w-full px-8 py-6 max-w-screen-2xl mx-auto">
          <div className="flex items-center gap-8">
            <a
              href="#"
              className="text-2xl font-black uppercase tracking-widest text-slate-900"
              style={{ fontFamily: "var(--font-newsreader)" }}
            >
              The Modern Curator
            </a>
            <nav
              className="hidden md:flex items-center gap-8 text-lg leading-relaxed tracking-tight"
              style={{ fontFamily: "var(--font-newsreader)" }}
            >
              {navLinks.slice(1).map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-slate-500 font-medium hover:text-black transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-6">
            <button
              aria-label="Search"
              className="text-slate-900 hover:opacity-70 transition-opacity"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </button>
            <button
              aria-label="Account"
              className="text-slate-900 hover:opacity-70 transition-opacity"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="8" r="4" />
                <path d="M20 21a8 8 0 1 0-16 0" />
              </svg>
            </button>
          </div>
        </div>
        <div className="bg-slate-100 h-px w-full" />
      </header>

      {/* ── Mobile top app bar ── */}
      <header className="fixed top-0 w-full z-50 bg-slate-100/50 backdrop-blur-md md:hidden">
        <div className="flex items-center justify-between px-6 h-16 w-full max-w-screen-xl mx-auto">
          <button
            className="p-2 -ml-2 hover:bg-slate-200/50 transition-all rounded-full"
            aria-label="Menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </button>
          <h1
            className="text-xl font-black uppercase tracking-widest text-slate-900"
            style={{ fontFamily: "var(--font-newsreader)" }}
          >
            The Modern Curator
          </h1>
          <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden border border-slate-300/20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-slate-400"
            >
              <circle cx="12" cy="8" r="4" />
              <path d="M20 21a8 8 0 1 0-16 0" />
            </svg>
          </div>
        </div>
      </header>

      {/* ── Mobile horizontal category nav ── */}
      <div className="fixed top-16 w-full z-40 md:hidden bg-[#faf8ff]/95 backdrop-blur-sm">
        <nav
          className="flex overflow-x-auto px-6 gap-8 mb-0 py-3 border-y border-slate-200/40"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setActiveLink(link.label);
              }}
              className={`text-xs font-bold uppercase tracking-widest whitespace-nowrap pb-1 transition-colors ${
                activeLink === link.label
                  ? "text-black border-b-2 border-black"
                  : "text-slate-400"
              }`}
              style={{ fontFamily: "var(--font-work-sans)" }}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
