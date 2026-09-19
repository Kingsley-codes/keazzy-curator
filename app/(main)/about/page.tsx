import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FiBookOpen, FiGlobe, FiSun, FiUsers } from "react-icons/fi";
import { NewsletterSignup } from "@/components/editorial/NewsletterSignup";
import { SiteContainer } from "@/components/site/SiteContainer";
import { images } from "@/lib/editorial-data";

export const metadata: Metadata = { title: "About Us | Keazzy's Curations", description: "The story and values behind Keazzy's Curations." };

const values = [
  [FiBookOpen, "Quality Content", "Well-researched, accurate and engaging stories."],
  [FiUsers, "Diverse Perspectives", "Stories from different voices and cultures around the world."],
  [FiSun, "Curiosity & Learning", "Fueling a more informed and open-minded community."],
  [FiGlobe, "Positive Impact", "Using the power of stories to inspire change."],
] as const;

export default function AboutPage() {
  return <main>
    <section className="relative min-h-[370px] overflow-hidden">
      <Image src={images.news} alt="A calm editorial workspace" fill priority sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-linear-to-r from-[#f5f1ea] via-[#f5f1ea]/90 to-transparent" />
      <SiteContainer className="relative py-8 md:py-14">
        <nav className="mb-3 text-[11px]"><Link href="/">Home</Link>　›　About Us</nav>
        <h1 className="font-serif text-6xl leading-none md:text-7xl">About Us</h1>
        <p className="mt-2 max-w-sm font-serif text-2xl leading-tight italic text-[#423d36]">Thoughtful stories. Fresh perspectives.<br />A more informed you.</p>
        <span className="my-[18px] block h-px w-[38px] bg-[#c89b55]" />
        <p className="max-w-md text-[13px] leading-relaxed">Keazzy’s Curations is a modern publication dedicated to bringing you well-researched, engaging and relevant stories from around the world. We cover news, sports, fashion, tech and science — curating the stories that matter.</p>
        <Link href="/posts" className="mt-5 inline-flex min-h-[45px] w-auto items-center justify-center rounded bg-linear-to-r from-[#b77e30] via-[#cc9c55] to-[#b77e30] px-5 text-[13px] text-white transition hover:-translate-y-px hover:brightness-95">Explore Our Posts　→</Link>
      </SiteContainer>
    </section>

    <SiteContainer className="grid gap-8 py-9 md:grid-cols-[1.1fr_1.2fr_.45fr] md:items-center">
      <div className="relative aspect-[1.55] overflow-hidden rounded-sm"><Image src={images.tech} alt="Ideas being developed at an editorial desk" fill sizes="(max-width: 768px) 100vw, 40vw" className="object-cover" /></div>
      <div><p className="text-[11px] font-bold uppercase tracking-[.18em] text-[#a66d25]">Our story</p><h2 className="font-serif text-4xl font-semibold">Why Keazzy’s Curations?</h2><div className="mt-3 space-y-3 text-[13px] leading-relaxed text-[#555]"><p>Keazzy’s Curations started with a simple idea — to create a space where curiosity meets quality content. In a world full of noise, we believe in the power of well-told stories to inform, educate and inspire.</p><p>From breaking news and in-depth analysis to the latest in sports, fashion trends, tech innovations and scientific discoveries, we curate content that keeps you ahead and sparks meaningful conversations.</p><p>Whether you’re here to stay updated, learn something new or simply enjoy a good read, Keazzy’s Curations is your go-to destination.</p></div><p className="mt-5 font-serif text-lg italic">Curating a brighter, more informed tomorrow.</p></div>
      <div className="grid gap-5 bg-[#f3f0ea] p-6 md:self-stretch"><Stat value="5" label="Categories" detail="News, Sports, Fashion, Tech, Science" /><Stat value="100+" label="Articles" detail="And counting…" /><Stat value="Global" label="Audience" detail="Readers from around the world" /></div>
    </SiteContainer>

    <section className="border-y border-[#e6e0d7] bg-[#f9f7f3] py-7"><SiteContainer className="grid gap-7 md:grid-cols-[1.2fr_repeat(4,1fr)] md:items-center"><div><p className="text-[11px] font-bold uppercase tracking-[.18em] text-[#a66d25]">Our values</p><h2 className="font-serif text-4xl font-semibold">What We Stand For</h2></div>{values.map(([Icon, title, copy]) => <div key={title} className="border-[#ded7cc] md:border-l md:pl-7"><Icon className="mb-2 text-3xl text-[#b47c30]" /><h3 className="font-serif text-lg font-semibold">{title}</h3><p className="mt-1 text-[11px] leading-snug text-[#625d55]">{copy}</p></div>)}</SiteContainer></section>

    <section className="bg-[#111] py-6 text-white"><SiteContainer className="grid items-center gap-7 md:grid-cols-[1.5fr_.5fr_1.2fr]"><div><h2 className="font-serif text-3xl">Meet the Creator</h2><p className="mt-1 max-w-lg text-[12px] leading-relaxed text-[#ddd]">Hi, I’m Kingsley Agbam — a developer, writer and curiosity-driven creator. Keazzy’s Curations is my way of sharing the stories, ideas and insights that inspire me, and hopefully, inspire you too.</p></div><div className="mx-auto flex size-28 items-center justify-center rounded-full border border-[#c89b55] bg-[#292929] font-serif text-3xl">KA</div><div><h3 className="font-serif text-xl">Kingsley Agbam</h3><p className="mt-1 text-[11px] font-bold uppercase tracking-[.18em] text-[#a66d25]">Founder, Keazzy’s Curations</p><span className="my-[18px] block h-px w-[38px] bg-[#c89b55]" /><p className="font-serif italic">“Better stories. A brighter tomorrow.”</p></div></SiteContainer></section>
    <NewsletterSignup />
  </main>;
}

function Stat({ value, label, detail }: { value: string; label: string; detail: string }) { return <div><strong className="block font-serif text-3xl">{value}</strong><span className="block text-[9px] uppercase tracking-[.18em]">{label}</span><p className="mt-1 text-[10px] text-[#666]">{detail}</p></div>; }
