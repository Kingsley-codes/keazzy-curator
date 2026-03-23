import { ArticleCard } from "./ArticleCard";

const articles = {
  large: {
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDi1f2uDJsC0WRqKr2e5l5r6OP7KnxRfncHfDmybdjlKwCe4vHNbdYLHlnN1r2LuNwjsyzTekSn3afq5-XEQ853gF88TEHHBTsqsVzNbJddanaDgc9k-KMgHyHL04vmXBo_0Wno7DqIj-mamZYL20OCcUpW35DvjT60MgSys00fjocLbTndkHTmIIS8NFqYSy6gfLrLs4zXfQXLQByMbScfE-n5KiwJAhaWgD6VmkkijX_PuBd-REafktI6JvPIxNe1itCVL7l21Es",
    imageAlt: "Minimalist fashion model wearing architectural white clothing",
    category: "Fashion",
    title: "Architectural Forms in Modern Silhouettes",
    excerpt: "A study on how structural engineering is influencing the next decade of haute couture, from Paris to Tokyo.",
  },
  tech: {
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuApY2tlRTakRQrg0XKNDoAXyIiiZgRUych7PHIp20YAULicTis0S_MwAWYYatrtJ73YTGyNCHIThJRdSzGUx58nRq3eIhsGcdcifXDwNO2P-0ymUHrvbxDZSLqJ9XgIQUTnIICq1Id0QiWX-tV2qmBHJPiPikBE2_g0FOLG_eW_2wPS_KplU8ZVHGk0ebcX8xmpB0r_Ya7pk_xmmJvBrNj7UxJ1qU7Gur-3zj1zVF8rBlHmR5AfaXvStc-LZcZikSbI39QNQeOMcsU",
    imageAlt: "Glowing blue microchip circuit board background",
    category: "Tech",
    title: "Architecting the Quantum Web",
    excerpt: "The bridge between theoretical physics and your daily browsing experience is closer than predicted.",
  },
  sports: {
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDbDL-CJ_mxihQIwos9LC6K1w1qHLrwNLCWSQ6CJ5kTFVKfMXIr50LiXAZ3Ayrwgbow7tibAIJQCF6IXBqcczMQ29QjDuB-A4h5ULsOIXiO_oUDv20Lb3HIRZr7o3v8IKJA-xpqUsSiXsxdyQlWTAxkllUrVDK4qrBbSN38z2l_-pAHkoVIv5pN9lYQJSu-js7HEvKJUJSHYLC1VW5DrTH-dACNQXkGomR__8A0ehhnJ22ZFnDCsHUUkA3RwEWnX4iZK3OEff2bLmQ",
    imageAlt: "Cinematic shot of a basketball entering a net against sunset",
    category: "Sports",
    categoryColor: "var(--color-secondary)",
    title: "The Aesthetics of Velocity",
  },
  fashion2: {
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDi1f2uDJsC0WRqKr2e5l5r6OP7KnxRfncHfDmybdjlKwCe4vHNbdYLHlnN1r2LuNwjsyzTekSn3afq5-XEQ853gF88TEHHBTsqsVzNbJddanaDgc9k-KMgHyHL04vmXBo_0Wno7DqIj-mamZYL20OCcUpW35DvjT60MgSys00fjocLbTndkHTmIIS8NFqYSy6gfLrLs4zXfQXLQByMbScfE-n5KiwJAhaWgD6VmkkijX_PuBd-REafktI6JvPIxNe1itCVL7l21Es",
    imageAlt: "High end luxury fabric texture",
    category: "Fashion",
    categoryColor: "var(--color-on-surface-variant)",
    title: "Monochrome Revival",
  },
  science: {
    image: "",
    imageAlt: "",
    category: "Science Insight",
    title: "Bioluminescence and the Future of Urban Lighting",
    excerpt: "How synthetic biology is engineering trees that glow, potentially replacing streetlights in the next decade.",
  },
  archive: {
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCTUNfer04raIxOCWL6S6T1-GdMCUyOLJ_evMY-6imFyymua7xDE9-AYZbYOP4Qe2LxUyy3Ko8J4fBPH_9yHIrCngfkA_UMTE7MU6zoVOllkRwj3uSOtmS8b103LmuZoITGAQ5w09rwC9X0lS5VRXa5S8_u1s9RuX7Jel31ZgJjNf9_ybnYiDIv-DeMGrarMCuuZrbWE95FC-9kT0GFzFu73V0xzMGioB0HeKbprSRwLk0TEIjiwL7R3ixhAVF99gFSSNaiY4N0",
    imageAlt: "Old library books in soft light",
    category: "Archive",
    title: "Reflections on Curatorial Integrity",
    excerpt: "Looking back at the pillars of 20th century journalism.",
  },
  standard1: {
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDbDL-CJ_mxihQIwos9LC6K1w1qHLrwNLCWSQ6CJ5kTFVKfMXIr50LiXAZ3Ayrwgbow7tibAIJQCF6IXBqcczMQ29QjDuB-A4h5ULsOIXiO_oUDv20Lb3HIRZr7o3v8IKJA-xpqUsSiXsxdyQlWTAxkllUrVDK4qrBbSN38z2l_-pAHkoVIv5pN9lYQJSu-js7HEvKJUJSHYLC1VW5DrTH-dACNQXkGomR__8A0ehhnJ22ZFnDCsHUUkA3RwEWnX4iZK3OEff2bLmQ",
    imageAlt: "Cinematic shot of a basketball entering a net against sunset",
    category: "Sports",
    categoryColor: "var(--color-on-tertiary-container)",
    title: "The Velocity of Change in Pro Leagues",
  },
  standard2: {
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCTUNfer04raIxOCWL6S6T1-GdMCUyOLJ_evMY-6imFyymua7xDE9-AYZbYOP4Qe2LxUyy3Ko8J4fBPH_9yHIrCngfkA_UMTE7MU6zoVOllkRwj3uSOtmS8b103LmuZoITGAQ5w09rwC9X0lS5VRXa5S8_u1s9RuX7Jel31ZgJjNf9_ybnYiDIv-DeMGrarMCuuZrbWE95FC-9kT0GFzFu73V0xzMGioB0HeKbprSRwLk0TEIjiwL7R3ixhAVF99gFSSNaiY4N0",
    imageAlt: "Morning news layout on a marble table with black coffee",
    category: "News",
    categoryColor: "var(--color-on-primary-fixed-variant)",
    title: "Global Media and the Trust Deficit",
  },
};

export function RecentCurationSection() {
  return (
    <section>
      {/* ── Mobile layout ── */}
      <div className="md:hidden px-6 space-y-12 mb-12">
        <ArticleCard variant="mobile-featured" {...articles.tech} />

        {/* Asymmetric 2-col grid (second card offset down) */}
        <div className="grid grid-cols-2 gap-6">
          <ArticleCard variant="mobile-small" {...articles.sports} />
          <div className="mt-8">
            <ArticleCard variant="mobile-small" {...articles.fashion2} />
          </div>
        </div>

        <ArticleCard variant="mobile-dark" {...articles.science} />
        <ArticleCard variant="mobile-list" {...articles.archive} />
      </div>

      {/* ── Desktop layout ── */}
      <div className="hidden md:block space-y-16">
        <div
          className="flex justify-between items-baseline border-b pb-4"
          style={{ borderColor: "var(--color-outline-variant)" }}
        >
          <h2 className="text-3xl italic" style={{ fontFamily: "var(--font-newsreader)" }}>
            Recent Curation
          </h2>
          <a
            href="#"
            className="text-xs uppercase tracking-widest transition-colors hover:text-primary"
            style={{ fontFamily: "var(--font-work-sans)", color: "var(--color-on-surface-variant)" }}
          >
            View All Archive
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-16 gap-x-12">
          <ArticleCard variant="large" {...articles.large} />
          <ArticleCard variant="standard" {...articles.standard1} />
          <ArticleCard variant="standard" {...articles.standard2} />
          <ArticleCard variant="wide"
            image={articles.tech.image}
            imageAlt={articles.tech.imageAlt}
            category="Tech"
            categoryColor="var(--color-on-tertiary-fixed-variant)"
            title="Quantum Computing: Beyond the Binary"
            excerpt="Deciphering the implications of sub-atomic processing for everyday security."
          />
        </div>
      </div>
    </section>
  );
}
