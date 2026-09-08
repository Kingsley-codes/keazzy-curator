import { PostCard } from "@/components/editorial/PostCard";
import type { Post } from "@/lib/editorial-data";

export function RelatedPosts({ posts }: { posts: Post[] }) {
  return <section><h2 className="mb-4 font-serif text-xl font-medium">Related Posts</h2><div className="space-y-4">{posts.map((post) => <PostCard key={post.slug} post={post} compact />)}</div></section>;
}
