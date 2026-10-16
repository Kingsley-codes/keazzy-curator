"use client";

import { useMemo, useState } from "react";
import { FiChevronDown, FiSearch } from "react-icons/fi";
import { PostCard } from "@/components/editorial/PostCard";
import type { Category, Post } from "@/lib/editorial-data";

const filters: (Category | "All")[] = ["All", "News", "Sports", "Fashion", "Tech", "Science", "Short Stories"];

export function PostExplorer({ posts, initialCategory = "All" }: { posts: Post[]; initialCategory?: Category | "All" }) {
  const [category, setCategory] = useState<Category | "All">(initialCategory);
  const [query, setQuery] = useState("");
  const [oldestFirst, setOldestFirst] = useState(false);
  const visiblePosts = useMemo(() => {
    const filtered = posts.filter((post) => (category === "All" || post.category === category) && `${post.title} ${post.excerpt}`.toLowerCase().includes(query.toLowerCase()));
    return oldestFirst ? [...filtered].reverse() : filtered;
  }, [category, oldestFirst, posts, query]);

  return (
    <>
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="no-scrollbar flex gap-3 overflow-x-auto pb-1">{filters.map((filter) => <button type="button" key={filter} onClick={() => setCategory(filter)} className={`shrink-0 rounded-[4px] px-5 py-2.5 text-[11px] transition-colors ${category === filter ? "bg-[#111] text-white" : "bg-[#f0eee9] text-[#111] hover:bg-[#ded9d0]"}`}>{filter}</button>)}</div>
        <div className="flex gap-3"><label className="flex h-10 min-w-0 flex-1 items-center gap-2 rounded-[4px] border border-[#ded9d0] bg-[#f7f6f3] px-3 lg:w-[250px]"><FiSearch className="shrink-0" /><span className="sr-only">Search articles</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search articles..." className="min-w-0 flex-1 bg-transparent text-[10px] outline-none" /></label><button type="button" onClick={() => setOldestFirst(!oldestFirst)} className="flex h-10 shrink-0 items-center gap-6 rounded-[4px] border border-[#ded9d0] bg-[#f7f6f3] px-3 text-[10px]">Sort by: {oldestFirst ? "Oldest" : "Latest"}<FiChevronDown /></button></div>
      </div>
      {visiblePosts.length ? <div className="grid gap-x-7 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">{visiblePosts.map((post) => <PostCard key={post.slug} post={post} />)}</div> : <div className="border-y border-[#ded9d0] py-20 text-center"><h2 className="font-serif text-2xl">No stories found</h2><p className="mt-2 text-sm text-[#77736c]">Try a different search or category.</p></div>}
      <nav aria-label="Pagination" className="mt-8 flex items-center justify-center gap-2 text-[10px]"><button className="px-2 py-2" aria-label="Previous page">‹</button>{[1,2,3,4,5].map((page) => <button key={page} className={`size-8 rounded-[3px] ${page === 1 ? "bg-[#111] text-white" : "hover:bg-[#eeeae2]"}`}>{page}</button>)}<button className="size-8 rounded-[3px] bg-[#eeeae2]" aria-label="Next page">›</button></nav>
    </>
  );
}
