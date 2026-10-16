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
  FiSettings,
  FiUsers,
  FiX,
} from "react-icons/fi";
import { GoSidebarCollapse, GoSidebarExpand } from "react-icons/go";
import { Brand } from "@/components/site/Brand";
import Logo from "@/components/Logo";
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
    [collapsed, setCollapsed] = useState(false),
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

  const initials = `${user.firstName[0] ?? ""}${user.lastName[0] ?? ""}`;

  return (
    <div className="min-h-dvh bg-[#f6f5f2] text-sm text-[#24231f]">
      {open && (
        <button
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
          aria-label="Close navigation"
          onClick={() => setOpen(false)}
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-[260px] flex-col bg-[#181b1a] px-5 py-6 text-white transition-[width,transform,padding] duration-300 md:translate-x-0 ${collapsed ? "md:w-[76px] md:px-3" : "md:w-[260px] md:px-5"} ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-center">
          <span className={collapsed ? "md:hidden" : ""}>
            <Brand light />
          </span>
          {collapsed && (
            <Link
              href="/admin/dashboard"
              aria-label="Dashboard"
              className="hidden md:block"
            >
              <Logo size={42} />
            </Link>
          )}
        </div>
        <button
          className="absolute right-0 top-7 z-10 hidden size-8 translate-x-1/2 place-items-center rounded-full border border-[#d8d0c4] bg-white text-[#514936] shadow-md transition-colors hover:bg-[#f3eee6] md:grid"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          aria-expanded={!collapsed}
          onClick={() => setCollapsed((value) => !value)}
        >
          {collapsed ? (
            <GoSidebarExpand size={17} />
          ) : (
            <GoSidebarCollapse size={17} />
          )}
        </button>
        <div>
          <button
            className="absolute right-5 top-7 md:hidden"
            aria-label="Close navigation"
            onClick={() => setOpen(false)}
          >
            <FiX />
          </button>
        </div>

        <p
          className={`mt-8 px-3 text-xs tracking-[.16em] text-[#bdab8c] uppercase ${collapsed ? "md:hidden" : ""}`}
        >
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
                title={collapsed ? label : undefined}
                aria-label={collapsed ? label : undefined}
                className={`flex items-center gap-4 rounded-lg px-4 py-3.5 text-sm ${collapsed ? "md:justify-center md:px-0" : ""} ${active ? "bg-[#4b3e2c] text-[#f3d5a1]" : "text-[#d1d3cf] hover:bg-white/5"}`}
              >
                <Icon className="shrink-0 text-xl" />
                <span className={collapsed ? "md:hidden" : ""}>{label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto border-t border-white/10 pt-5">
          <Link
            href="/admin/dashboard/settings"
            onClick={() => setOpen(false)}
            title={collapsed ? "Profile & settings" : undefined}
            aria-label={collapsed ? "Profile & settings" : undefined}
            className={`mb-4 flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-[#d1d3cf] hover:bg-white/5 ${collapsed ? "md:justify-center md:px-0" : ""}`}
          >
            <FiSettings className="shrink-0 text-lg" />
            <span className={collapsed ? "md:hidden" : ""}>
              Profile &amp; settings
            </span>
          </Link>
          <div
            className={`flex items-center gap-3 rounded-lg bg-white/5 p-3 ${collapsed ? "md:flex-col md:gap-2 md:p-1" : ""}`}
          >
            <span className={`grid size-10 shrink-0 place-items-center rounded-full bg-[#eee5d7] text-sm font-semibold text-[#70552f] ${collapsed ? "md:size-8" : ""}`}>
              {initials}
            </span>
            <div className={`min-w-0 flex-1 ${collapsed ? "md:hidden" : ""}`}>
              <strong className="block truncate text-sm font-medium">
                {user.firstName} {user.lastName}
              </strong>
              <span className="text-xs text-[#aeb2ad]">Administrator</span>
            </div>
            <button
              disabled={pending}
              onClick={logout}
              aria-label="Sign out"
              title="Sign out"
              className={`grid size-9 shrink-0 place-items-center rounded-lg text-[#d1d3cf] hover:bg-white/10 disabled:opacity-50 ${collapsed ? "md:hidden" : ""}`}
            >
              <FiLogOut />
            </button>
            {collapsed && (
              <button
                disabled={pending}
                onClick={logout}
                aria-label="Sign out"
                title="Sign out"
                className="hidden size-8 shrink-0 place-items-center rounded-lg text-[#d1d3cf] hover:bg-white/10 disabled:opacity-50 md:grid"
              >
                <FiLogOut />
              </button>
            )}
          </div>
        </div>
      </aside>

      <div
        className={`transition-[padding] duration-300 ${collapsed ? "md:pl-[76px]" : "md:pl-[260px]"}`}
      >
        <div className="flex min-h-16 items-center border-b border-[#e4ded4] bg-white px-5 md:hidden">
          <button
            aria-label="Open navigation"
            className="text-xl"
            onClick={() => setOpen(true)}
          >
            <FiMenu />
          </button>
        </div>
        {error && (
          <p role="alert" className="bg-red-50 p-4 text-sm text-red-800">
            {error}
          </p>
        )}
        <main className="min-h-dvh">{children}</main>
      </div>
    </div>
  );
}
