"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaFacebookF, FaInstagram, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { FiMenu, FiSearch, FiX } from "react-icons/fi";
import { Brand } from "./Brand";
import { SiteContainer } from "./SiteContainer";

const links = [
  { label: "Home", href: "/" }, { label: "News", href: "/posts?category=news" },
  { label: "Sports", href: "/posts?category=sports" }, { label: "Fashion", href: "/posts?category=fashion" },
  { label: "Tech", href: "/posts?category=tech" }, { label: "Science", href: "/posts?category=science" },
  { label: "About", href: "/about" }, { label: "All Posts", href: "/posts" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const active = (href: string) => href === "/" ? pathname === "/" : pathname.startsWith(href.split("?")[0]);

  return (
    <header className="relative z-50 bg-white/95">
      <div className="hidden bg-[#111] text-white md:block">
        <SiteContainer className="flex h-9 items-center justify-between text-[10px]">
          <p>Stay informed. Stay inspired. Stay curated.</p>
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-4 text-xs">
              <a href="#" aria-label="Facebook" className="transition-colors hover:text-[#e6c98f]"><FaFacebookF /></a>
              <a href="#" aria-label="X" className="transition-colors hover:text-[#e6c98f]"><FaXTwitter /></a>
              <a href="#" aria-label="Instagram" className="transition-colors hover:text-[#e6c98f]"><FaInstagram /></a>
              <a href="#" aria-label="YouTube" className="transition-colors hover:text-[#e6c98f]"><FaYoutube /></a>
            </div>
            <span aria-hidden="true" className="h-4 w-px bg-white/25" />
            <Link href="/login" className="transition-colors hover:text-[#e6c98f]">Sign In</Link>
            <Link href="/signup" className="rounded-[3px] border border-[#c89b55] px-5 py-1.5 text-[#e6c98f] transition-colors hover:bg-[#c89b55] hover:text-[#111]">Create Account</Link>
          </div>
        </SiteContainer>
      </div>
      <SiteContainer className="flex h-[72px] items-center justify-between gap-6">
        <Brand />
        <nav aria-label="Primary navigation" className={`${open ? "flex" : "hidden"} absolute top-[72px] right-0 left-0 flex-col border-y border-[#ded9d0] bg-white px-[18px] py-3 font-serif text-[15px] shadow-lg md:static md:flex md:h-full md:flex-row md:items-center md:gap-6 md:border-0 md:bg-transparent md:px-0 md:py-0 md:text-[13px] md:shadow-none xl:gap-8`}>
          {links.map((link) => <Link key={link.label} href={link.href} onClick={() => setOpen(false)} className={`relative py-2.5 transition-colors hover:text-[#9a6e32] md:flex md:h-full md:items-center md:py-0 md:after:absolute md:after:right-0 md:after:bottom-3.5 md:after:left-0 md:after:h-px md:after:bg-[#c89b55] md:after:transition-transform ${active(link.href) && !link.href.includes("?") ? "md:after:scale-x-100" : "md:after:scale-x-0"}`}>{link.label}</Link>)}
          <div className="mt-2 flex gap-3 border-t border-[#ded9d0] pt-3 md:hidden"><Link href="/login" onClick={() => setOpen(false)}>Sign In</Link><Link href="/signup" onClick={() => setOpen(false)} className="text-[#9a6e32]">Create Account</Link></div>
        </nav>
        <Link href="/posts" aria-label="Search articles" className="hidden h-10 w-[220px] items-center justify-between rounded-full bg-[#f1f1f1] px-4 text-[10px] text-[#77736c] xl:flex"><span>Search articles...</span><FiSearch className="text-lg text-[#111]" /></Link>
        <button type="button" aria-label="Toggle navigation" aria-expanded={open} onClick={() => setOpen(!open)} className="text-2xl md:hidden">{open ? <FiX /> : <FiMenu />}</button>
      </SiteContainer>
    </header>
  );
}
