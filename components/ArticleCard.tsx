interface ArticleCardProps {
  image: string;
  imageAlt: string;
  category: string;
  categoryColor?: string;
  title: string;
  excerpt?: string;
  variant: "large" | "standard" | "wide" | "mobile-featured" | "mobile-small" | "mobile-dark" | "mobile-list";
}

export function ArticleCard({
  image,
  imageAlt,
  category,
  categoryColor,
  title,
  excerpt,
  variant,
}: ArticleCardProps) {

  // ── Mobile featured (full-width with category badge overlay) ──
  if (variant === "mobile-featured") {
    return (
      <article className="group">
        <div className="aspect-[4/3] overflow-hidden mb-6 relative"
          style={{ backgroundColor: "var(--color-surface-container-low)" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image} alt={imageAlt}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          <span
            className="absolute top-4 left-4 px-4 py-1 text-white text-[10px] font-bold tracking-widest uppercase"
            style={{ backgroundColor: "var(--color-tertiary-container)", fontFamily: "var(--font-work-sans)" }}
          >
            {category}
          </span>
        </div>
        <div className="pr-8">
          <h3 className="text-2xl font-bold leading-snug mb-3"
            style={{ fontFamily: "var(--font-newsreader)" }}>{title}</h3>
          {excerpt && (
            <p className="text-sm mb-4"
              style={{ fontFamily: "var(--font-work-sans)", color: "var(--color-on-surface-variant)" }}>{excerpt}</p>
          )}
        </div>
      </article>
    );
  }

  // ── Mobile small (square aspect, used in 2-col grid) ──
  if (variant === "mobile-small") {
    return (
      <article>
        <div className="aspect-square overflow-hidden mb-4"
          style={{ backgroundColor: "var(--color-surface-container-low)" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image} alt={imageAlt} className="w-full h-full object-cover" />
        </div>
        <span
          className="text-[10px] font-bold uppercase tracking-widest"
          style={{ color: categoryColor ?? "var(--color-secondary)", fontFamily: "var(--font-work-sans)" }}
        >
          {category}
        </span>
        <h4 className="text-lg font-bold mt-2"
          style={{ fontFamily: "var(--font-newsreader)" }}>{title}</h4>
      </article>
    );
  }

  // ── Mobile dark card (science/feature) ──
  if (variant === "mobile-dark") {
    return (
      <article className="p-8 rounded-sm"
        style={{ backgroundColor: "var(--color-primary-container)", color: "var(--color-on-primary)" }}>
        <div className="flex items-center gap-2 mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            style={{ color: "var(--color-tertiary-fixed-dim)" }}>
            <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v11m0 0H5a2 2 0 0 1-2-2V9m6 5h10a2 2 0 0 0 2-2V9m0 0H3" />
          </svg>
          <span className="text-[10px] font-bold tracking-widest uppercase"
            style={{ fontFamily: "var(--font-work-sans)" }}>
            {category}
          </span>
        </div>
        <h3 className="text-3xl font-bold leading-tight mb-4"
          style={{ fontFamily: "var(--font-newsreader)" }}>{title}</h3>
        {excerpt && (
          <p className="text-sm leading-relaxed mb-6"
            style={{ fontFamily: "var(--font-work-sans)", color: "var(--color-on-primary-container)" }}>
            {excerpt}
          </p>
        )}
        <button
          className="w-full py-4 font-label text-xs font-bold uppercase tracking-widest transition-colors"
          style={{ backgroundColor: "var(--color-surface-container-lowest)", color: "var(--color-primary)", fontFamily: "var(--font-work-sans)" }}
        >
          Explore Research
        </button>
      </article>
    );
  }

  // ── Mobile list item ──
  if (variant === "mobile-list") {
    return (
      <article className="flex gap-4 items-start pb-8 border-b border-slate-200/40">
        <div className="w-24 h-24 shrink-0 overflow-hidden"
          style={{ backgroundColor: "var(--color-surface-container-low)" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image} alt={imageAlt} className="w-full h-full object-cover" />
        </div>
        <div>
          <span
            className="text-[9px] font-bold uppercase tracking-widest"
            style={{ color: "var(--color-outline)", fontFamily: "var(--font-work-sans)" }}
          >
            {category}
          </span>
          <h4 className="text-xl font-bold mt-1"
            style={{ fontFamily: "var(--font-newsreader)" }}>{title}</h4>
          {excerpt && (
            <p className="text-xs mt-2"
              style={{ color: "var(--color-on-surface-variant)", fontFamily: "var(--font-work-sans)" }}>
              {excerpt}
            </p>
          )}
        </div>
      </article>
    );
  }

  // ── Desktop large vertical card ──
  if (variant === "large") {
    return (
      <div className="md:row-span-2 group cursor-pointer">
        <div className="mb-8 overflow-hidden"
          style={{ backgroundColor: "var(--color-surface-container-low)" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image} alt={imageAlt}
            className="w-full h-[600px] object-cover group-hover:scale-105 transition-transform duration-500" />
        </div>
        <span
          className="text-xs uppercase tracking-[0.2em] px-4 py-1 inline-block mb-4"
          style={{ color: categoryColor ?? "var(--color-secondary-container)",
            fontFamily: "var(--font-work-sans)", backgroundColor: "var(--color-surface)" }}
        >
          {category}
        </span>
        <h3 className="text-3xl leading-snug group-hover:italic transition-all"
          style={{ fontFamily: "var(--font-newsreader)" }}>{title}</h3>
        {excerpt && (
          <p className="mt-4 leading-relaxed line-clamp-3"
            style={{ color: "var(--color-on-surface-variant)", fontFamily: "var(--font-work-sans)" }}>
            {excerpt}
          </p>
        )}
      </div>
    );
  }

  // ── Desktop wide horizontal card ──
  if (variant === "wide") {
    return (
      <div
        className="md:col-span-2 flex flex-col md:flex-row gap-8 p-8 items-center group cursor-pointer"
        style={{ backgroundColor: "var(--color-surface-container-low)" }}
      >
        <div className="w-full md:w-1/2 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image} alt={imageAlt}
            className="w-full h-[300px] object-cover group-hover:scale-110 transition-transform duration-700" />
        </div>
        <div className="w-full md:w-1/2">
          <span
            className="text-xs uppercase tracking-[0.2em] mb-4 inline-block"
            style={{ color: categoryColor ?? "var(--color-on-tertiary-fixed-variant)", fontFamily: "var(--font-work-sans)" }}
          >
            {category}
          </span>
          <h3 className="text-3xl mb-4 leading-tight"
            style={{ fontFamily: "var(--font-newsreader)" }}>{title}</h3>
          {excerpt && (
            <p className="mb-6"
              style={{ color: "var(--color-on-surface-variant)", fontFamily: "var(--font-work-sans)" }}>
              {excerpt}
            </p>
          )}
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            style={{ color: "var(--color-primary)" }}>
            <path d="M7 7h10v10" /><path d="M7 17 17 7" />
          </svg>
        </div>
      </div>
    );
  }

  // ── Desktop standard card ──
  return (
    <div className="group cursor-pointer">
      <div className="mb-6 overflow-hidden"
        style={{ backgroundColor: "var(--color-surface-container-low)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt={imageAlt}
          className="w-full h-[250px] object-cover group-hover:opacity-80 transition-opacity" />
      </div>
      <span
        className="text-xs uppercase tracking-[0.2em] mb-3 inline-block"
        style={{ color: categoryColor ?? "var(--color-on-tertiary-container)", fontFamily: "var(--font-work-sans)" }}
      >
        {category}
      </span>
      <h3 className="text-xl font-bold"
        style={{ fontFamily: "var(--font-newsreader)" }}>{title}</h3>
    </div>
  );
}
