import Image from "next/image";
import Link from "next/link";
import { CategoryLabel } from "@/components/editorial/CategoryLabel";
import { SiteContainer } from "@/components/site/SiteContainer";
import { images, posts } from "@/lib/editorial-data";

export function HomeHero() {
  const featured = posts[2];
  const secondary = [posts[7], posts[6], posts[4]];
  return (
    <SiteContainer className="grid bg-[#111] p-0 lg:h-[520px] lg:grid-cols-[minmax(0,2.15fr)_minmax(320px,1fr)]">
      <article className="group relative h-[570px] overflow-hidden lg:h-auto">
        <Image
          src={images.hero}
          alt={featured.imageAlt}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 70vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.025]"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/15 to-transparent lg:bg-linear-to-r lg:from-black/90 lg:via-black/50 lg:to-transparent" />
        <div className="absolute right-5 bottom-[74px] left-5 text-white lg:right-auto lg:bottom-[76px] lg:left-[34px] lg:w-[70%] lg:max-w-[570px]">
          <CategoryLabel category="Fashion" light />
          <h1 className="mt-3 text-balance font-serif text-[42px] leading-[.96] font-medium sm:text-[52px] xl:text-[66px]">
            The New Era of African Fashion on the Global Stage
          </h1>
          <p className="mt-4 max-w-[560px] text-[13px] leading-relaxed lg:text-sm">
            African fashion is no longer just a trend — it’s a global movement
            redefining style, identity and innovation.
          </p>
          <Link
            href={`/posts/${featured.slug}`}
            className="mt-5 inline-flex items-center gap-4 rounded-[3px] bg-[#c89b55] px-5 py-3 text-xs font-semibold text-[#111] transition-colors hover:bg-[#e6c98f]"
          >
            Read Full Story <span>→</span>
          </Link>
        </div>
        <div
          aria-hidden="true"
          className="absolute bottom-6 left-5 flex gap-3 lg:left-[34px]"
        >
          {[0, 1, 2, 3].map((dot) => (
            <i
              key={dot}
              className={`size-2.5 rounded-full border border-white ${dot === 0 ? "bg-white" : ""}`}
            />
          ))}
        </div>
      </article>
      <div className="grid lg:grid-rows-3">
        {secondary.map((post) => (
          <Link
            href={`/posts/${post.slug}`}
            key={post.slug}
            className="group relative h-[190px] overflow-hidden border-b border-white/20 lg:h-auto"
          >
            <Image
              src={post.image}
              alt={post.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 30vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <span className="absolute inset-0 bg-linear-to-r from-black/95 via-black/75 to-transparent" />
            <span className="absolute inset-0 flex w-4/5 flex-col justify-center p-6 text-white lg:w-2/3">
              <CategoryLabel category={post.category} light />
              <strong className="mt-2 font-serif text-[21px] leading-[1.05] font-medium">
                {post.title}
              </strong>
              <time className="mt-3 text-[10px]">{post.date}</time>
            </span>
          </Link>
        ))}
      </div>
    </SiteContainer>
  );
}
