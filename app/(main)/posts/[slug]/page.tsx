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
import { BACKEND_URL, type ApiPost } from "@/lib/backend";
import { getPost, posts, type Category } from "@/lib/editorial-data";
import type { ContentNode } from "@/types/content";

export function generateStaticParams() { return posts.map(({ slug }) => ({ slug })); }

async function getBackendPost(slug: string): Promise<ApiPost | null> {
  try { const response = await fetch(`${BACKEND_URL}/api/posts/${slug}`, { cache: "no-store" }); if (!response.ok) return null; return ((await response.json()) as { post: ApiPost }).post; } catch { return null; }
}
const validCategories: Category[] = ["News", "Sports", "Fashion", "Tech", "Science"];
function categoryName(value: string): Category { const name = `${value.charAt(0).toUpperCase()}${value.slice(1).toLowerCase()}` as Category; return validCategories.includes(name) ? name : "News"; }
function firstText(nodes: ContentNode[] = []): string { for (const node of nodes) { if (node.text) return node.text; const nested = firstText(node.content); if (nested) return nested; } return "A thoughtful story from Keazzy’s Curations."; }

export async function generateMetadata({ params }: PageProps<"/posts/[slug]">): Promise<Metadata> {
  const slug = (await params).slug, live = await getBackendPost(slug), fallback = getPost(slug);
  if (live) return { title: `${live.title} | Keazzy's Curations`, description: firstText(live.content?.content).slice(0, 155) };
  return fallback ? { title: `${fallback.title} | Keazzy's Curations`, description: fallback.excerpt } : {};
}

export default async function ArticlePage({ params }: PageProps<"/posts/[slug]">) {
  const slug = (await params).slug, live = await getBackendPost(slug), fallback = getPost(slug);
  if (!live && !fallback) notFound();
  const post = live ? { slug: live.slug, title: live.title, excerpt: firstText(live.content?.content).slice(0, 180), category: categoryName(live.category), date: live.createdAt ? new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(new Date(live.createdAt)) : "Recently", readingTime: `${live.readTime ?? 1} min read`, image: live.heroImage?.src ?? posts[0].image, imageAlt: live.heroImage?.alt ?? live.title } : fallback!;
  const related = posts.filter((item) => item.slug !== post.slug).slice(3, 7);
  return <main><SiteContainer className="py-7 md:py-10"><nav className="mb-6 flex flex-wrap gap-2 text-[9px] text-[#77736c]"><Link href="/">Home</Link><span>/</span><Link href={`/posts?category=${post.category.toLowerCase()}`}>{post.category}</Link><span>/</span><span>{post.title}</span></nav><div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_270px]"><article><header><CategoryLabel category={post.category} /><h1 className="mt-3 max-w-[820px] text-balance font-serif text-[44px] leading-[.92] font-medium md:text-[58px]">{post.title}</h1><p className="mt-4 max-w-[770px] text-sm leading-relaxed text-[#555]">{post.excerpt}</p><div className="mt-5 flex flex-col gap-4 border-b border-[#ded9d0] pb-5 sm:flex-row sm:items-center sm:justify-between"><div className="flex items-center gap-3"><div className="flex size-9 items-center justify-center rounded-full bg-[#171717] font-serif text-xs text-white">KA</div><div className="text-[9px]"><strong className="block">By Kingsley Agbam</strong><span className="mt-1 block text-[#77736c]">{post.date}　•　{post.readingTime}</span></div></div><div className="flex items-center gap-4 text-sm"><span className="text-[9px] text-[#77736c]">Share:</span><FaFacebookF /><FaXTwitter /><FaLinkedinIn /><FiLink /></div></div></header>
    <figure className="mt-6"><div className="relative aspect-[16/8] overflow-hidden bg-[#ded9d0]"><Image src={post.image} alt={post.imageAlt} fill priority sizes="(max-width: 1024px) 100vw, 75vw" className="object-cover" /></div><figcaption className="mt-2 text-[8px] text-[#77736c]">A story curated for Keazzy’s Curations.</figcaption></figure>
    <div className="mt-7 max-w-[790px] space-y-4 text-[13px] leading-[1.65] text-[#333]">{live?.content?.content ? <Content nodes={live.content.content} /> : <><p>Thoughtful stories help us understand a changing world. This feature brings together the context, people and ideas behind today’s conversation.</p><p>At Keazzy’s Curations, we look beyond the headline to find the details that make a story useful, memorable and worth sharing.</p></>}</div><Comments /></article><aside className="space-y-8"><RelatedPosts posts={related} /><NewsletterSignup compact /></aside></div></SiteContainer></main>;
}

function Content({ nodes }: { nodes: ContentNode[] }) { return <>{nodes.map((node, index) => { const children = node.content ? <Content nodes={node.content} /> : node.text; if (node.type === "heading") return <h2 key={index} className="font-serif text-2xl font-semibold">{children}</h2>; if (node.type === "blockquote") return <blockquote key={index} className="border-l-[3px] border-[#c89b55] bg-[#f1eee8] px-5 py-4 font-serif text-base">{children}</blockquote>; if (node.type === "bulletList") return <ul key={index} className="list-disc space-y-1 pl-6">{children}</ul>; if (node.type === "orderedList") return <ol key={index} className="list-decimal space-y-1 pl-6">{children}</ol>; if (node.type === "listItem") return <li key={index}>{children}</li>; if (node.type === "image" && typeof node.attrs?.src === "string") return <figure key={index} className="relative my-5 aspect-video overflow-hidden"><Image src={node.attrs.src} alt={String(node.attrs.alt ?? "Article image")} fill sizes="(max-width: 1024px) 100vw, 790px" className="object-cover" /></figure>; if (node.type === "paragraph") return <p key={index}>{children}</p>; return <span key={index}>{children}</span>; })}</>; }
