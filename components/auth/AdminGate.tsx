"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { requestJson, ApiError } from "@/lib/backend";
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
  const [error, setError] = useState("");
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
        setError("");
        setSession({ user: data.user });
      })
      .catch((err: unknown) => {
        if (!active) return;
        if (err instanceof ApiError && [401, 403].includes(err.status))
          router.replace("/admin/login");
        else
          setError(
            "Could not verify your session. Check that the backend is running and reload.",
          );
      });
    return () => {
      active = false;
      window.removeEventListener("admin-session-expired", expire);
    };
  }, [router]);
  if (error)
    return (
      <main className="grid min-h-dvh place-content-center gap-4 p-8">
        <p role="alert">{error}</p>
        <button onClick={() => window.location.reload()}>Try again</button>
      </main>
    );
  if (!session)
    return <div className="min-h-dvh bg-[#f6f5f2]" aria-busy="true" />;
  return <AdminShell user={session.user}>{children}</AdminShell>;
}
