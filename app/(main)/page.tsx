import { CategoryGrid } from "@/components/home/CategoryGrid";
import { HomeHero } from "@/components/home/HomeHero";
import { LatestStories } from "@/components/home/LatestStories";
import { NewsletterSignup } from "@/components/editorial/NewsletterSignup";
import { getPublicPosts } from "@/lib/backend";
import { toEditorialPost } from "@/lib/editorial-data";
import type { Post } from "@/lib/editorial-data";

export default async function HomePage() {
  let livePosts: Post[] = [];
  try {
    livePosts = (await getPublicPosts(1, 100)).posts.map(toEditorialPost);
  } catch {
    // Keep the rest of the homepage available if the content API is offline.
  }
  const featuredPosts = livePosts.filter((post) => post.isFeatured);
  return (
    <main>
      <HomeHero posts={featuredPosts} />
      <LatestStories posts={livePosts} />
      <CategoryGrid />
      <NewsletterSignup />
    </main>
  );
}
