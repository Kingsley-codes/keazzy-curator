import Link from "next/link";
import { PostCard } from "@/components/editorial/PostCard";
import { SiteContainer } from "@/components/site/SiteContainer";
import { posts } from "@/lib/editorial-data";

export function LatestStories() {
  return <SiteContainer className="py-9"><span className="text-[10px] tracking-[.16em] text-[#77736c] uppercase">Explore our coverage</span><div className="mt-1 mb-4 flex items-end justify-between"><h2 className="font-serif text-4xl leading-none font-medium">Latest Stories</h2><Link href="/posts" className="border-b border-[#111] pb-1 text-[11px]">View All Posts <span className="ml-4">⟶</span></Link></div><div className="grid gap-x-5 gap-y-9 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">{posts.slice(0,5).map((post) => <PostCard post={post} key={post.slug} />)}</div></SiteContainer>;
}
