"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  FiFileText,
  FiHome,
  FiLogOut,
  FiMail,
  FiMenu,
  FiUsers,
  FiX,
  FiArrowUpRight,
} from "react-icons/fi";
import { Brand } from "@/components/site/Brand";
import type { AdminUser } from "@/components/auth/AdminGate";
import { requestJson } from "@/lib/backend";
const links = [
  ["Overview", "/admin/dashboard", FiHome],
  ["Posts", "/admin/dashboard/posts", FiFileText],
  ["Users", "/admin/dashboard/users", FiUsers],
  ["Newsletter", "/admin/dashboard/newsletter", FiMail],
] as const;
export default function AdminShell({
  children,
  user,
}: {
  children: React.ReactNode;
  user: AdminUser;
}) {
  const pathname = usePathname(),
    router = useRouter();
  const [open, setOpen] = useState(false),
    [error, setError] = useState(""),
    [pending, setPending] = useState(false);
  async function logout() {
    setPending(true);
    try {
      await requestJson("/api/admin/auth/logout", { method: "POST" });
      localStorage.removeItem("admin");
      router.replace("/admin/login");
      router.refresh();
    } catch {
      setError("Could not sign out. Please try again.");
    } finally {
      setPending(false);
    }
  }
  return (
    <div className="min-h-dvh bg-[#f6f5f2] text-[#24231f]">
      {open && (
        <button
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
          aria-label="Close navigation"
          onClick={() => setOpen(false)}
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-[260px] flex-col bg-[#181b1a] px-5 py-7 text-white transition-transform md:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between">
          <Brand light />
          <button
            className="md:hidden"
            aria-label="Close navigation"
            onClick={() => setOpen(false)}
          >
            <FiX />
          </button>
        </div>
        <p className="mt-11 px-3 text-sm tracking-widest text-[#bdab8c] uppercase">
          Your workspace
        </p>
        <nav className="mt-4 space-y-2">
          {links.map(([label, href, Icon]) => {
            const active =
              pathname === href ||
              (href !== "/admin/dashboard" && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-4 rounded-lg px-4 py-3.5 text-base ${active ? "bg-[#4b3e2c] text-[#f3d5a1]" : "text-[#d1d3cf] hover:bg-white/5"}`}
              >
                <Icon className="text-xl" />
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto pt-10">
          <div className="rounded-lg border border-white/10 p-5">
            <p className="font-serif text-2xl italic leading-relaxed">
              Stories worth sharing.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[#aeb2ad]">
              A thoughtful publication starts with you.
            </p>
          </div>
          <Link
            href="/"
            className="mt-5 flex items-center gap-3 px-3 py-3 text-base text-[#d1d3cf]"
          >
            Visit website <FiArrowUpRight />
          </Link>
        </div>
      </aside>
      <div className="md:pl-[260px]">
        <header className="sticky top-0 z-20 flex min-h-20 items-center justify-between gap-4 border-b border-[#e4ded4] bg-white/95 px-5 md:px-9">
          <div className="flex items-center gap-4">
            <button
              aria-label="Open navigation"
              className="text-2xl md:hidden"
              onClick={() => setOpen(true)}
            >
              <FiMenu />
            </button>
            <p className="hidden font-serif text-xl sm:block">
              Keazzy’s editorial desk
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden text-right sm:block">
              <strong className="block text-base font-medium">
                {user.firstName} {user.lastName}
              </strong>
              <span className="text-sm text-[#77736c]">Administrator</span>
            </div>
            <span className="grid size-11 place-items-center rounded-full bg-[#eee5d7] text-base font-medium text-[#70552f]">
              {user.firstName[0]}
              {user.lastName[0]}
            </span>
            <button
              disabled={pending}
              onClick={logout}
              aria-label="Sign out"
              title="Sign out"
              className="grid size-11 place-items-center rounded-lg border border-[#e3ddd3] text-xl hover:bg-[#f8f4ec]"
            >
              <FiLogOut />
            </button>
          </div>
        </header>
        {error && (
          <p role="alert" className="bg-red-50 p-4 text-base text-red-800">
            {error}
          </p>
        )}
        <main className="min-h-[calc(100dvh-150px)]">{children}</main>
        <footer className="border-t border-[#e4ded4] px-9 py-6 text-sm text-[#77736c]">
          © {new Date().getFullYear()} Keazzy’s Curations. Thoughtful stories.
          Fresh perspectives.
        </footer>
      </div>
    </div>
  );
}
