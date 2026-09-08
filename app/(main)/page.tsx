import { CategoryGrid } from "@/components/home/CategoryGrid";
import { HomeHero } from "@/components/home/HomeHero";
import { LatestStories } from "@/components/home/LatestStories";
import { NewsletterSignup } from "@/components/editorial/NewsletterSignup";

export default function HomePage() {
  return <main><HomeHero /><LatestStories /><CategoryGrid /><NewsletterSignup /></main>;
}
