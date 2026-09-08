import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaFacebookF, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { FiLink } from "react-icons/fi";
import { CategoryLabel } from "@/components/editorial/CategoryLabel";
import { NewsletterSignup } from "@/components/editorial/NewsletterSignup";
import { Comments } from "@/components/posts/Comments";
import { RelatedPosts } from "@/components/posts/RelatedPosts";
import { SiteContainer } from "@/components/site/SiteContainer";
import { getPost, posts } from "@/lib/editorial-data";

export function generateStaticParams() { return posts.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: PageProps<"/posts/[slug]">): Promise<Metadata> {
  const post = getPost((await params).slug);
  return post ? { title: `${post.title} | Keazzy's Curations`, description: post.excerpt } : {};
}

export default async function ArticlePage({ params }: PageProps<"/posts/[slug]">) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  const related = posts.filter((item) => item.slug !== post.slug).slice(3, 7);

  return (
    <main><SiteContainer className="py-7 md:py-10"><nav className="mb-6 flex flex-wrap gap-2 text-[9px] text-[#77736c]"><Link href="/">Home</Link><span>/</span><Link href={`/posts?category=${post.category.toLowerCase()}`}>{post.category}</Link><span>/</span><span>{post.title}</span></nav><div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_270px]">
      <article>
        <header><CategoryLabel category={post.category} /><h1 className="mt-3 max-w-[820px] text-balance font-serif text-[44px] leading-[.92] font-medium md:text-[58px]">{post.title}</h1><p className="mt-4 max-w-[770px] text-sm leading-relaxed text-[#555]">{post.excerpt}</p><div className="mt-5 flex flex-col gap-4 border-b border-[#ded9d0] pb-5 sm:flex-row sm:items-center sm:justify-between"><div className="flex items-center gap-3"><div className="flex size-9 items-center justify-center rounded-full bg-[#171717] font-serif text-xs text-white">KA</div><div className="text-[9px]"><strong className="block text-[#111]">By Kingsley Agbam</strong><span className="mt-1 block text-[#77736c]">{post.date}　•　{post.readingTime}</span></div></div><div className="flex items-center gap-4 text-sm"><span className="text-[9px] text-[#77736c]">Share:</span><a href="#" aria-label="Facebook"><FaFacebookF /></a><a href="#" aria-label="X"><FaXTwitter /></a><a href="#" aria-label="LinkedIn"><FaLinkedinIn /></a><button aria-label="Copy link"><FiLink /></button></div></div></header>
        <figure className="mt-6"><div className="relative aspect-[16/8] overflow-hidden bg-[#ded9d0]"><Image src={post.image} alt={post.imageAlt} fill priority sizes="(max-width: 1024px) 100vw, 75vw" className="object-cover" /></div><figcaption className="mt-2 text-[8px] text-[#77736c]">The latest stories and ideas, photographed for Keazzy’s Curations.</figcaption></figure>
        <div className="mt-7 max-w-[790px] space-y-4 text-[13px] leading-[1.65] text-[#333]"><p>Technology in 2026 is moving faster than ever, and this year has already given us some incredible gadgets. From AI-driven devices to smarter home tools, innovation is making everyday life more connected, convenient and exciting.</p><p>In this post, we’ll take a look at some of the best tech gadgets of 2026 so far — devices that are not just impressive, but also truly useful.</p><section><h2 className="font-serif text-2xl font-medium text-[#111]">1. AI-Powered Smart Assistants</h2><p className="mt-1">Smart assistants have evolved beyond simple voice commands. The latest models now understand context better, handle complex tasks and integrate seamlessly with your favorite apps.</p></section><blockquote className="border-l-[3px] border-[#c89b55] bg-[#f1eee8] px-5 py-4 font-serif text-base text-[#333]">“The new generation of AI assistants are less about gimmicks and more about real productivity.”</blockquote><section><h2 className="font-serif text-2xl font-medium text-[#111]">2. Next-Gen Laptops</h2><p className="mt-1">Laptops in 2026 are thinner, faster and more powerful. With improved battery life and AI chips, they’re built for both work and creativity.</p></section></div>
        <Comments />
      </article>
      <aside className="space-y-8"><RelatedPosts posts={related} /><NewsletterSignup compact /></aside>
    </div></SiteContainer></main>
  );
}
