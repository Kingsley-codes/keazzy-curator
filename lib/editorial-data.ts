export type Category = "News" | "Sports" | "Fashion" | "Tech" | "Science";

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: Category;
  date: string;
  readingTime: string;
  image: string;
  imageAlt: string;
};

export const images = {
  hero: "/images/fashion-hero.png",
  login: "/images/login-hero.png",
  tech: "https://lh3.googleusercontent.com/aida-public/AB6AXuApY2tlRTakRQrg0XKNDoAXyIiiZgRUych7PHIp20YAULicTis0S_MwAWYYatrtJ73YTGyNCHIThJRdSzGUx58nRq3eIhsGcdcifXDwNO2P-0ymUHrvbxDZSLqJ9XgIQUTnIICq1Id0QiWX-tV2qmBHJPiPikBE2_g0FOLG_eW_2wPS_KplU8ZVHGk0ebcX8xmpB0r_Ya7pk_xmmJvBrNj7UxJ1qU7Gur-3zj1zVF8rBlHmR5AfaXvStc-LZcZikSbI39QNQeOMcsU",
  sports:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDbDL-CJ_mxihQIwos9LC6K1w1qHLrwNLCWSQ6CJ5kTFVKfMXIr50LiXAZ3Ayrwgbow7tibAIJQCF6IXBqcczMQ29QjDuB-A4h5ULsOIXiO_oUDv20Lb3HIRZr7o3v8IKJA-xpqUsSiXsxdyQlWTAxkllUrVDK4qrBbSN38z2l_-pAHkoVIv5pN9lYQJSu-js7HEvKJUJSHYLC1VW5DrTH-dACNQXkGomR__8A0ehhnJ22ZFnDCsHUUkA3RwEWnX4iZK3OEff2bLmQ",
  fashion:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDi1f2uDJsC0WRqKr2e5l5r6OP7KnxRfncHfDmybdjlKwCe4vHNbdYLHlnN1r2LuNwjsyzTekSn3afq5-XEQ853gF88TEHHBTsqsVzNbJddanaDgc9k-KMgHyHL04vmXBo_0Wno7DqIj-mamZYL20OCcUpW35DvjT60MgSys00fjocLbTndkHTmIIS8NFqYSy6gfLrLs4zXfQXLQByMbScfE-n5KiwJAhaWgD6VmkkijX_PuBd-REafktI6JvPIxNe1itCVL7l21Es",
  news: "https://lh3.googleusercontent.com/aida-public/AB6AXuCTUNfer04raIxOCWL6S6T1-GdMCUyOLJ_evMY-6imFyymua7xDE9-AYZbYOP4Qe2LxUyy3Ko8J4fBPH_9yHIrCngfkA_UMTE7MU6zoVOllkRwj3uSOtmS8b103LmuZoITGAQ5w09rwC9X0lS5VRXa5S8_u1s9RuX7Jel31ZgJjNf9_ybnYiDIv-DeMGrarMCuuZrbWE95FC-9kT0GFzFu73V0xzMGioB0HeKbprSRwLk0TEIjiwL7R3ixhAVF99gFSSNaiY4N0",
} as const;

export const posts: Post[] = [
  {
    slug: "nigerias-economy-shows-signs-of-steady-recovery",
    title: "Nigeria’s Economy Shows Signs of Steady Recovery in 2026",
    excerpt:
      "Analysts say key economic indicators suggest a stronger, more resilient growth trajectory.",
    category: "News",
    date: "Sep 7, 2026",
    readingTime: "5 min read",
    image: images.news,
    imageAlt: "Modern Nigerian city skyline",
  },
  {
    slug: "coco-gauff-impressive-us-open-run",
    title: "Coco Gauff Continues Impressive Run at the US Open",
    excerpt:
      "The young American star barrels into the semi-finals with a dominant performance.",
    category: "Sports",
    date: "Sep 7, 2026",
    readingTime: "4 min read",
    image: images.sports,
    imageAlt: "Athlete competing under stadium lights",
  },
  {
    slug: "five-timeless-fashion-pieces",
    title: "5 Timeless Fashion Pieces Every Woman Should Own",
    excerpt:
      "From tailored blazers to classic sneakers, these wardrobe essentials never go out of style.",
    category: "Fashion",
    date: "Sep 5, 2026",
    readingTime: "6 min read",
    image: images.hero,
    imageAlt: "Woman in elegant black tailoring",
  },
  {
    slug: "best-tech-gadgets-2026",
    title: "The Best Tech Gadgets of 2026 (So Far)",
    excerpt:
      "From AI-powered devices to smarter homes, here are the standout gadgets making life easier this year.",
    category: "Tech",
    date: "Sep 4, 2026",
    readingTime: "5 min read",
    image: images.tech,
    imageAlt: "Modern personal technology arranged on a desk",
  },
  {
    slug: "nasa-discovers-earth-like-exoplanet",
    title: "NASA Discovers New Exoplanet With Earth-Like Conditions",
    excerpt:
      "The potentially habitable exoplanet could offer new clues in the search for life beyond our solar system.",
    category: "Science",
    date: "Sep 3, 2026",
    readingTime: "7 min read",
    image: images.news,
    imageAlt: "Earth viewed from space",
  },
  {
    slug: "youth-led-initiatives-better-africa",
    title: "Youth-Led Initiatives Are Shaping a Better Africa",
    excerpt:
      "Across the continent, young people are driving change through innovation, advocacy and community action.",
    category: "News",
    date: "Sep 2, 2026",
    readingTime: "7 min read",
    image: images.fashion,
    imageAlt: "Young African changemakers gathered together",
  },
  {
    slug: "super-eagles-afcon-glory",
    title: "Super Eagles Set Sights on AFCON Glory",
    excerpt: "Nigeria’s national team prepares for a decisive campaign.",
    category: "Sports",
    date: "Sep 1, 2026",
    readingTime: "6 min read",
    image: images.sports,
    imageAlt: "Football players celebrating together",
  },
  {
    slug: "how-ai-is-changing-work",
    title: "How AI Is Changing the Way We Work",
    excerpt:
      "A closer look at the tools and ideas reshaping modern workplaces.",
    category: "Tech",
    date: "Aug 30, 2026",
    readingTime: "5 min read",
    image: images.tech,
    imageAlt: "Artificial intelligence technology in a modern workspace",
  },
  {
    slug: "mens-fashion-trends-2026",
    title: "Men’s Fashion Trends Dominating 2026",
    excerpt: "The silhouettes, materials and details defining the year ahead.",
    category: "Fashion",
    date: "Aug 28, 2026",
    readingTime: "6 min read",
    image: images.hero,
    imageAlt: "Editorial menswear portrait",
  },
];

export const categories: {
  name: Category;
  description: string;
  image: string;
}[] = [
  {
    name: "News",
    description: "Stay updated with the latest happenings.",
    image: images.news,
  },
  {
    name: "Sports",
    description: "Scores, stories and sporting culture.",
    image: images.sports,
  },
  {
    name: "Fashion",
    description: "Style, culture and trends.",
    image: images.hero,
  },
  {
    name: "Tech",
    description: "Innovation for a smarter tomorrow.",
    image: images.tech,
  },
  {
    name: "Science",
    description: "Discoveries that shape our world.",
    image: images.news,
  },
];

export const getPost = (slug: string) =>
  posts.find((post) => post.slug === slug);
