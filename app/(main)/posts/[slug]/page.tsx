import { ArticleContent } from "@/components/posts/ArticleContent";
import { contentExcerpt } from "@/lib/post-content";
import { PostViewTracker } from "@/components/posts/PostViewTracker";
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
import { BACKEND_URL, getPublicPosts, type ApiPost } from "@/lib/backend";
import { images, toEditorialPost } from "@/lib/editorial-data";

async function getBackendPost(slug: string): Promise<ApiPost | null> {
  try {
    const response = await fetch(`${BACKEND_URL}/api/posts/${slug}`, {
      cache: "no-store",
    });
    if (!response.ok) return null;
    return ((await response.json()) as { post: ApiPost }).post;
  } catch {
    return null;
  }
}
function categoryName(value: string): string {
  return value.replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export async function generateMetadata({
  params,
}: PageProps<"/posts/[slug]">): Promise<Metadata> {
  const slug = (await params).slug,
    live = await getBackendPost(slug);
  if (live)
    return {
      title: `${live.title} | Keazzy's Curations`,
      description: contentExcerpt(live.content?.content).slice(0, 155),
    };
  return {};
}

export default async function ArticlePage({
  params,
}: PageProps<"/posts/[slug]">) {
  const slug = (await params).slug;
  const [live, listing] = await Promise.all([
    getBackendPost(slug),
    getPublicPosts(1, 100).catch(() => null),
  ]);
  if (!live) notFound();
  const post = {
        slug: live.slug,
        title: live.title,
        excerpt: contentExcerpt(live.content?.content).slice(0, 180),
        category: categoryName(live.category),
        date: live.createdAt
          ? new Intl.DateTimeFormat("en", {
              month: "short",
              day: "numeric",
              year: "numeric",
            }).format(new Date(live.createdAt))
          : "Recently",
        readingTime: `${live.readTime ?? 1} min read`,
        image: live.heroImage?.src ?? images.news,
        imageAlt: live.heroImage?.alt ?? live.title,
      };
  const related = (listing?.posts ?? [])
    .filter((item) => item.slug !== post.slug)
    .slice(0, 4)
    .map(toEditorialPost);
  return (
    <main>
      <SiteContainer className="py-7 md:py-10">
        <nav className="mb-6 flex flex-wrap gap-2 text-sm text-[#77736c]">
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href={`/posts?category=${post.category.toLowerCase()}`}>
            {post.category}
          </Link>
          <span>/</span>
          <span>{post.title}</span>
        </nav>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_270px]">
          <article>
            <header>
              <CategoryLabel category={post.category} />
              {live?.isFeatured && (
                <span className="ml-3 inline-flex rounded-full bg-[#f4ead8] px-3 py-1 align-middle text-[10px] font-semibold tracking-wide text-[#8c622b]">
                  Featured
                </span>
              )}
              <h1 className="mt-3 max-w-[820px] text-balance font-serif text-[44px] leading-[1.08] font-medium md:text-[58px]">
                {post.title}
              </h1>
              <p className="mt-4 max-w-[770px] text-base leading-relaxed text-[#555]">
                {post.excerpt}
              </p>
              <div className="mt-5 flex flex-col gap-4 border-b border-[#ded9d0] pb-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-full bg-[#171717] font-serif text-xs text-white">
                    KA
                  </div>
                  <div className="text-sm">
                    <strong className="block">By Kingsley Agbam</strong>
                    <span className="mt-1 block text-[#77736c]">
                      {post.date}　•　{post.readingTime}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-sm text-[#77736c]">Share:</span>
                  <FaFacebookF />
                  <FaXTwitter />
                  <FaLinkedinIn />
                  <FiLink />
                </div>
              </div>
            </header>
            <figure className="mt-6">
              <div className="relative aspect-[16/8] overflow-hidden bg-[#ded9d0]">
                <Image
                  src={post.image}
                  alt={post.imageAlt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 75vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-2 text-sm text-[#77736c]">
                A story curated for Keazzy’s Curations.
              </figcaption>
            </figure>
            <div className="mt-7 max-w-[790px] space-y-4 text-lg leading-[1.85] text-[#333]">
              {live?.content?.content ? (
                <ArticleContent content={live.content} />
              ) : (
                <>
                  <p>
                    Thoughtful stories help us understand a changing world. This
                    feature brings together the context, people and ideas behind
                    today’s conversation.
                  </p>
                  <p>
                    At Keazzy’s Curations, we look beyond the headline to find
                    the details that make a story useful, memorable and worth
                    sharing.
                  </p>
                </>
              )}
            </div>
            {live && (
              <>
                <PostViewTracker postId={live._id} />
                <Comments postId={live._id} />
              </>
            )}
          </article>
          <aside className="space-y-8">
            <RelatedPosts posts={related} />
            <NewsletterSignup compact />
          </aside>
        </div>
      </SiteContainer>
    </main>
  );
}
