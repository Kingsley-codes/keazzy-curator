"use client";

import { useState } from "react";

const navItems = [
  {
    label: "Home",
    icon: (filled: boolean) => (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
        fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    label: "Explore",
    icon: (filled: boolean) => (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
        fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round">
        <rect width="7" height="7" x="3" y="3" rx="1" /><rect width="7" height="7" x="14" y="3" rx="1" />
        <rect width="7" height="7" x="14" y="14" rx="1" /><rect width="7" height="7" x="3" y="14" rx="1" />
      </svg>
    ),
  },
  {
    label: "New Post",
    icon: (_filled: boolean) => (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 5v14M5 12h14" />
      </svg>
    ),
    isCTA: true,
  },
  {
    label: "Settings",
    icon: (filled: boolean) => (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
        fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round">
        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
];

export function BottomNav() {
  const [active, setActive] = useState("Home");

  return (
    <nav className="fixed bottom-0 left-0 w-full md:hidden z-50 bg-[#faf8ff]/80 backdrop-blur-xl border-t border-slate-200/20 shadow-[0_-4px_20px_0_rgba(0,0,0,0.05)]">
      <div className="flex justify-around items-center h-20 px-4 pb-safe">
        {navItems.map((item) => {
          const isActive = active === item.label;

          if (item.isCTA) {
            return (
              <button
                key={item.label}
                onClick={() => setActive(item.label)}
                className="flex flex-col items-center justify-center gap-1"
                aria-label={item.label}
              >
                <div className="bg-black text-white p-2 rounded-full">
                  {item.icon(false)}
                </div>
                <span
                  className="text-[10px] uppercase tracking-tighter text-slate-400"
                  style={{ fontFamily: "var(--font-work-sans)" }}
                >
                  {item.label}
                </span>
              </button>
            );
          }

          return (
            <button
              key={item.label}
              onClick={() => setActive(item.label)}
              className={`flex flex-col items-center justify-center gap-1 transition-transform active:scale-90 ${
                isActive ? "text-black scale-110" : "text-slate-400"
              }`}
              aria-label={item.label}
            >
              {item.icon(isActive)}
              <span
                className="text-[10px] uppercase tracking-tighter mt-0.5"
                style={{ fontFamily: "var(--font-work-sans)" }}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
