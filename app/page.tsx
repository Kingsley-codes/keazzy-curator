import { EditorialQuote } from "@/components/EditorialQuote";
import { HeroSection } from "@/components/HeroSection";
import { NewsletterSection } from "@/components/NewsletterSection";
import { RecentCurationSection } from "@/components/RecentCurationSection";

export default function Home() {
  return (
    // pt accounts for: mobile = top bar (64px) + category nav (~45px); desktop = navbar (~89px)
    <main className="pt-28 px-0 md:px-8 max-w-screen-2xl mx-auto pb-24 md:pb-0">
      <HeroSection />
      <div className="px-0 md:px-0">
        <RecentCurationSection />
      </div>
      {/* Quote and newsletter hidden on mobile to keep it clean */}
      <EditorialQuote />
      <NewsletterSection />
    </main>
  );
}
