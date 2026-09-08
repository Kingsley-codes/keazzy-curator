import Image from "next/image";
import Link from "next/link";
import { SiteContainer } from "@/components/site/SiteContainer";
import { categories } from "@/lib/editorial-data";

export function CategoryGrid() {
  return <SiteContainer className="border-t border-[#ebe7df] py-7"><span className="text-[10px] tracking-[.16em] text-[#77736c] uppercase">Browse by category</span><h2 className="mt-1 mb-4 font-serif text-4xl leading-none font-medium">Explore Categories</h2><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">{categories.map((category) => <Link href={`/posts?category=${category.name.toLowerCase()}`} key={category.name} className="group relative aspect-[2/1] overflow-hidden text-white xl:aspect-[1.72/1]"><Image src={category.image} alt={`${category.name} stories`} fill sizes="(max-width: 640px) 100vw, (max-width: 1280px) 33vw, 20vw" className="object-cover transition-transform duration-700 group-hover:scale-105" /><span className="absolute inset-0 bg-linear-to-r from-black/90 to-black/15" /><span className="absolute inset-0 flex flex-col items-start p-5"><strong className="font-serif text-2xl font-medium">{category.name}</strong><span className="mt-2 max-w-36 text-[11px] leading-snug">{category.description}</span><b className="mt-auto text-[11px] font-medium text-[#e6c98f]">Explore →</b></span></Link>)}</div></SiteContainer>;
}
