import { BottomNav } from "@/components/BottomNav";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
      {/* Footer only on desktop */}
      <div className="hidden md:block">
        <Footer />
      </div>
      {/* Bottom nav only on mobile */}
      <BottomNav />
    </>
  );
}
