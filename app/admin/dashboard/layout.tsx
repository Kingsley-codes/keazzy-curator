import AdminGate from "@/components/auth/AdminGate";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <AdminGate>{children}</AdminGate>;
}
