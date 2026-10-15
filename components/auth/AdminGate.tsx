"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { requestJson, ApiError } from "@/lib/backend";
import AdminShell from "@/components/adminDashboard/AdminShell";
export type AdminUser = { id: string; firstName: string; lastName: string; email: string; role: "admin" };
export default function AdminGate({ children }: { children: React.ReactNode }) {
 const router = useRouter();
 const pathname = usePathname();
 const [session, setSession] = useState<{ user: AdminUser; pathname: string } | null>(null);
 const [error, setError] = useState("");
 useEffect(() => {
  let active = true;
  requestJson<{ data: { user: AdminUser } }>("/api/admin/auth/me", { cache: "no-store" })
   .then(({ data }) => {
    if (!active) return;
    if (data.user.role !== "admin") { router.replace("/admin/login"); return; }
    setError(""); setSession({ user: data.user, pathname });
   })
   .catch((err: unknown) => {
    if (!active) return;
    if (err instanceof ApiError && [401, 403].includes(err.status)) router.replace("/admin/login");
    else setError("Could not verify your session. Check that the backend is running and reload.");
   });
  return () => { active = false; };
 }, [pathname, router]);
 if (error) return <main className="grid min-h-dvh place-content-center gap-4 p-8"><p role="alert">{error}</p><button onClick={() => window.location.reload()}>Try again</button></main>;
 if (!session || session.pathname !== pathname) return <main className="grid min-h-dvh place-items-center" role="status">Checking administrator access?</main>;
 return <AdminShell user={session.user}>{children}</AdminShell>;
}
