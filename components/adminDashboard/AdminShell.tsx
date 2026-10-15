"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { FiBell, FiChevronDown, FiFileText, FiFolder, FiHome, FiImage, FiLogOut, FiMail, FiMenu, FiMessageCircle, FiSearch, FiSettings, FiUsers, FiX } from "react-icons/fi";
import { Brand } from "@/components/site/Brand";

import type { AdminUser } from "@/components/auth/AdminGate";
import { requestJson } from "@/lib/backend";
const links = [["Dashboard", "/admin/dashboard", FiHome], ["Posts", "/admin/dashboard/posts", FiFileText], ["Categories", "", FiFolder], ["Comments", "", FiMessageCircle], ["Users", "", FiUsers], ["Media", "", FiImage], ["Newsletter", "", FiMail], ["Settings", "", FiSettings]] as const;

export default function AdminShell({ children, user }: { children: React.ReactNode; user: AdminUser }) {
  const pathname = usePathname(); const router = useRouter();
  const [open, setOpen] = useState(false);
  const [logoutError, setLogoutError] = useState("");
  const name = [user.firstName, user.lastName].join(" ");
  async function logout() {
    try {
      await requestJson("/api/admin/auth/logout", { method: "POST" });
      localStorage.removeItem("admin"); router.replace("/admin/login"); router.refresh();
    } catch { setLogoutError("Sign-out failed. Please try again."); }
  }

  return <div className="min-h-dvh bg-[#f6f5f2] text-[#171717]">
    {open && <button aria-label="Close navigation" className="fixed inset-0 z-30 bg-black/40 md:hidden" onClick={() => setOpen(false)} />}
    <aside className={`fixed inset-y-0 left-0 z-40 flex w-[235px] flex-col bg-[#141718] px-3 py-5 text-white transition-transform md:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}>
      <div className="flex items-center justify-between px-4"><Brand light /><button className="md:hidden" onClick={() => setOpen(false)}><FiX /></button></div>
      <nav className="mt-9 flex-1 space-y-1">{links.map(([label, href, Icon]) => href ? <Link key={label} href={href} onClick={() => setOpen(false)} className={`flex items-center gap-4 rounded-md px-5 py-3 text-[13px] transition ${pathname === href || (href.endsWith("posts") && pathname.startsWith(href)) ? "bg-linear-to-r from-[#79592f] to-[#5d472b]" : "text-[#e8e8e8] hover:bg-white/7"}`}><Icon className="text-xl" />{label}</Link> : <span key={label} title="This module needs a backend endpoint" className="flex cursor-not-allowed items-center gap-4 rounded-md px-5 py-3 text-[13px] text-white/45"><Icon className="text-xl" />{label}</span>)}</nav>
      <blockquote className="m-2 rounded-lg border border-white/10 p-5 font-serif text-xl italic leading-relaxed text-white/90">“Great stories build a brighter tomorrow.”<span className="mt-4 block h-px w-8 bg-[#c89b55]" /><small className="mt-4 block font-sans text-[10px] not-italic">Keazzy’s Curations</small></blockquote>
      <Link href="/" className="mt-3 flex items-center gap-3 px-5 py-2 text-xs text-white/80"><FiLogOut /> Back to Website</Link>
    </aside>
    <div className="md:pl-[235px]">
      <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b border-[#e4e1db] bg-white/95 px-5 md:px-8"><button onClick={() => setOpen(true)} className="text-xl md:hidden" aria-label="Open navigation"><FiMenu /></button><label className="hidden h-10 w-[295px] items-center gap-3 rounded-md border border-[#dedbd6] bg-[#fafafa] px-4 sm:flex"><FiSearch /><input className="min-w-0 flex-1 bg-transparent text-xs" placeholder="Search posts, categories, authors…" /></label><div className="ml-auto flex items-center gap-5"><button aria-label="Notifications" className="relative text-xl"><FiBell /><span className="absolute -right-2 -top-2 grid size-4 place-items-center rounded-full bg-[#cf4b31] text-[8px] text-white">3</span></button><span className="grid size-9 place-items-center rounded-full bg-[#202020] font-serif text-sm text-white">{user.firstName[0]}{user.lastName[0]}</span><div className="hidden text-xs sm:block"><strong className="block">{name}</strong><span className="text-[#777]">Administrator</span></div><button onClick={logout} title="Log out"><FiChevronDown /></button></div></header>
      <main className="min-h-[calc(100dvh-64px)]">{logoutError && <p role="alert" className="p-4 text-red-700">{logoutError}</p>}{children}</main>
      <footer className="flex flex-col gap-3 border-t border-[#e2dfd9] bg-white px-7 py-5 text-[10px] text-[#666] sm:flex-row sm:justify-between"><span>© 2026 Keazzy’s Curations. All rights reserved.</span><span>Privacy Policy　　Terms of Service　　Support</span></footer>
    </div>
  </div>;
}
