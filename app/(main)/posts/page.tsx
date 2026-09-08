import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PostExplorer } from "@/components/posts/PostExplorer";
import { SiteContainer } from "@/components/site/SiteContainer";
import { images, posts, type Category } from "@/lib/editorial-data";

export const metadata: Metadata = { title: "All Posts | Keazzy's Curations", description: "Explore the latest stories, insights and ideas from Keazzy's Curations." };

const validCategories: Category[] = ["News", "Sports", "Fashion", "Tech", "Science"];

export default async function AllPostsPage({ searchParams }: PageProps<"/posts">) {
  const requested = (await searchParams).category;
  const formatted = typeof requested === "string" ? `${requested.charAt(0).toUpperCase()}${requested.slice(1).toLowerCase()}` as Category : "All";
  const initialCategory = validCategories.includes(formatted as Category) ? formatted : "All";
  return (
    <main>
      <section className="relative overflow-hidden border-b border-[#ded9d0] bg-[#eeeae2]">
        <Image src={images.news} alt="Editorial desk with stories being prepared" fill priority sizes="100vw" className="object-cover object-center opacity-20" />
        <span className="absolute inset-0 bg-linear-to-r from-[#f3f0e9] via-[#f3f0e9]/85 to-transparent" />
        <SiteContainer className="relative py-12 md:py-16"><nav className="mb-4 flex gap-2 text-[10px] text-[#77736c]"><Link href="/">Home</Link><span>/</span><span>All Posts</span></nav><h1 className="font-serif text-6xl leading-none font-medium md:text-7xl">All Posts</h1><p className="mt-2 text-sm">Explore the latest stories, insights and ideas from Keazzy’s Curations.</p><span className="mt-5 block h-px w-9 bg-[#c89b55]" /></SiteContainer>
      </section>
      <SiteContainer className="py-8 md:py-10"><PostExplorer posts={posts} initialCategory={initialCategory} /></SiteContainer>
    </main>
  );
}
