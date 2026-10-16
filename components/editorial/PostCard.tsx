import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/lib/editorial-data";
import { CategoryLabel } from "./CategoryLabel";
import { PostInteractions } from "@/components/posts/PostInteractions";

export function PostCard({ post, compact = false }: { post: Post; compact?: boolean }) {
  if (compact) {
    return (
      <div className="border-b border-[#e2ddd4] pb-4 last:border-0">
        <Link href={`/posts/${post.slug}`} className="group grid grid-cols-[88px_1fr] gap-4">
          <span className="relative aspect-[4/3] overflow-hidden bg-[#ded9d0]"><Image src={post.image} alt={post.imageAlt} fill sizes="88px" className="object-cover transition-transform duration-500 group-hover:scale-105" /></span>
          <span><CategoryLabel category={post.category} /><strong className="mt-1 block font-serif text-[15px] leading-[1.05] font-medium group-hover:text-[#9a6e32]">{post.title}</strong><time className="mt-2 block text-[9px] text-[#77736c]">{post.date}</time></span>
        </Link>
        <PostInteractions postId={post.id} postSlug={post.slug} likes={post.likes} comments={post.commentCount} compact />
      </div>
    );
  }

  return (
    <article className="group">
      <Link href={`/posts/${post.slug}`} className="relative block aspect-[16/9] overflow-hidden bg-[#ded9d0]"><Image src={post.image} alt={post.imageAlt} fill sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.035]" /></Link>
      <div className="relative -mt-2.5 w-max bg-[#fbfaf7] pt-1 pr-3"><CategoryLabel category={post.category} /></div>
      <h2 className="mt-1.5 font-serif text-[22px] leading-[1.02] font-medium"><Link href={`/posts/${post.slug}`} className="transition-colors group-hover:text-[#9a6e32]">{post.title}</Link></h2>
      <p className="mt-2 line-clamp-2 text-[12px] leading-[1.45] text-[#77736c]">{post.excerpt}</p>
      <div className="mt-3 flex gap-2 text-[10px] text-[#77736c]"><time>{post.date}</time><span>•</span><span>{post.readingTime}</span></div>
      <PostInteractions postId={post.id} postSlug={post.slug} likes={post.likes} comments={post.commentCount} compact />
    </article>
  );
}
