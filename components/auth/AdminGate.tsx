"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { requestJson } from "@/lib/backend";
import AdminShell from "@/components/adminDashboard/AdminShell";
export type AdminUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "admin";
};
export default function AdminGate({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const [session, setSession] = useState<{ user: AdminUser } | null>(null);
  useEffect(() => {
    let active = true;
    const expire = () => {
      setSession(null);
      router.replace("/admin/login");
    };
    window.addEventListener("admin-session-expired", expire);
    requestJson<{ data: { user: AdminUser } }>("/api/admin/auth/me", {
      cache: "no-store",
    })
      .then(({ data }) => {
        if (!active) return;
        if (data.user.role !== "admin") {
          router.replace("/admin/login");
          return;
        }
        setSession({ user: data.user });
      })
      .catch(() => {
        if (!active) return;
        expire();
      });
    return () => {
      active = false;
      window.removeEventListener("admin-session-expired", expire);
    };
  }, [router]);
  if (!session)
    return <div className="min-h-dvh bg-[#f6f5f2]" aria-busy="true" />;
  return <AdminShell user={session.user}>{children}</AdminShell>;
}
