"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FiMenu, FiSearch, FiX } from "react-icons/fi";
import { Brand } from "./Brand";
import { SiteContainer } from "./SiteContainer";

const links = [
  { label: "Home", href: "/" }, { label: "News", href: "/posts?category=news" },
  { label: "Sports", href: "/posts?category=sports" }, { label: "Fashion", href: "/posts?category=fashion" },
  { label: "Tech", href: "/posts?category=tech" }, { label: "Science", href: "/posts?category=science" },
  { label: "About", href: "/#about" }, { label: "All Posts", href: "/posts" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const active = (href: string) => href === "/" ? pathname === "/" : pathname.startsWith(href.split("?")[0]);

  return (
    <header className="relative z-50 border-t-[15px] border-[#111] bg-white/95">
      <SiteContainer className="flex h-[72px] items-center justify-between gap-6">
        <Brand />
        <nav aria-label="Primary navigation" className={`${open ? "flex" : "hidden"} absolute top-[72px] right-0 left-0 flex-col border-y border-[#ded9d0] bg-white px-[18px] py-3 font-serif text-[15px] shadow-lg md:static md:flex md:h-full md:flex-row md:items-center md:gap-6 md:border-0 md:bg-transparent md:px-0 md:py-0 md:text-[13px] md:shadow-none xl:gap-8`}>
          {links.map((link) => <Link key={link.label} href={link.href} onClick={() => setOpen(false)} className={`relative py-2.5 transition-colors hover:text-[#9a6e32] md:flex md:h-full md:items-center md:py-0 md:after:absolute md:after:right-0 md:after:bottom-3.5 md:after:left-0 md:after:h-px md:after:bg-[#c89b55] md:after:transition-transform ${active(link.href) && (link.href === "/posts" || link.href === "/") ? "md:after:scale-x-100" : "md:after:scale-x-0"}`}>{link.label}</Link>)}
        </nav>
        <div className="hidden items-center gap-6 md:flex"><Link href="/posts" aria-label="Search articles" className="text-lg"><FiSearch /></Link><Link href="#" className="rounded-[3px] bg-[#111] px-6 py-2.5 text-[11px] text-white transition-colors hover:bg-[#c89b55] hover:text-[#111]">Sign In</Link></div>
        <button type="button" aria-label="Toggle navigation" aria-expanded={open} onClick={() => setOpen(!open)} className="text-2xl md:hidden">{open ? <FiX /> : <FiMenu />}</button>
      </SiteContainer>
    </header>
  );
}
