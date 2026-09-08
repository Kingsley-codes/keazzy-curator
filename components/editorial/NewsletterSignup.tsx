"use client";

import { useState } from "react";
import { FiMail } from "react-icons/fi";
import { SiteContainer } from "@/components/site/SiteContainer";

export function NewsletterSignup({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState("");
  const form = <form onSubmit={(event) => { event.preventDefault(); setEmail(""); }} className={compact ? "mt-5 space-y-2" : "flex h-11 w-full md:max-w-[430px]"}><label className="sr-only" htmlFor={compact ? "sidebar-email" : "footer-email"}>Email address</label><input id={compact ? "sidebar-email" : "footer-email"} type="email" value={email} required onChange={(event) => setEmail(event.target.value)} placeholder="Enter your email" className={`${compact ? "h-10 w-full rounded-[3px]" : "min-w-0 flex-1 rounded-l-[3px]"} border border-[#888] bg-transparent px-4 text-[11px] text-white outline-none placeholder:text-[#aaa] focus:border-[#c89b55]`} /><button type="submit" className={`${compact ? "h-10 w-full rounded-[3px]" : "w-[118px] rounded-r-[3px]"} bg-[#c89b55] text-[11px] font-medium text-white transition-colors hover:bg-[#e6c98f] hover:text-[#111]`}>Subscribe</button></form>;

  if (compact) return <div className="bg-[#181818] p-6 text-center text-white"><FiMail className="mx-auto text-xl text-[#e6c98f]" /><h2 className="mt-4 font-serif text-xl">Stay in the Loop</h2><p className="mx-auto mt-2 max-w-[190px] text-[11px] leading-relaxed text-[#ddd]">Get the latest stories, straight to your inbox.</p>{form}<p className="mt-3 text-[8px] text-[#999]">No spam. Unsubscribe anytime.</p></div>;

  return <section className="border-b border-[#353535] bg-[#181818] text-white"><SiteContainer className="grid min-h-[124px] items-center gap-6 py-8 md:grid-cols-[1.1fr_1.15fr_1.55fr] md:gap-11"><div><span className="text-[10px] font-semibold tracking-[0.16em] text-[#e6c98f] uppercase">Join our community</span><h2 className="mt-2 font-serif text-[27px] leading-none">Get the Best Stories<br />Straight to Your Inbox</h2></div><p className="text-[12px] leading-relaxed text-[#d0d0d0] md:border-l md:border-[#444] md:pl-11">Subscribe to our newsletter and never miss an update from Keazzy’s Curations.</p>{form}</SiteContainer></section>;
}
