import type { ApiPost } from "@/lib/backend";
import { contentExcerpt } from "@/lib/post-content";

export type Category = "News" | "Sports" | "Fashion" | "Tech" | "Science" | "Short Stories";

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: Category;
  date: string;
  readingTime: string;
  image: string;
  imageAlt: string;
  isFeatured?: boolean;
};

export function toEditorialPost(post: ApiPost): Post {
  return {
    slug: post.slug,
    title: post.title,
    excerpt: contentExcerpt(post.content?.content).slice(0, 180) || "Read the full story from Keazzy’s Curations.",
    category: (post.category.replace(/\b\w/g, (letter) => letter.toUpperCase()) as Category),
    date: post.createdAt ? new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(new Date(post.createdAt)) : "Recently",
    readingTime: `${post.readTime ?? 1} min read`,
    image: post.heroImage?.src ?? images.news,
    imageAlt: post.heroImage?.alt ?? post.title,
    isFeatured: post.isFeatured ?? false,
  };
}

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

