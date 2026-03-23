import Image from "next/image";

export function HeroSection() {
  return (
    <section className="mb-28">
      {/* ── Mobile hero ── */}
      <div className="md:hidden relative w-full pt-8 px-6">
        <div className="relative w-full h-132.5 overflow-hidden rounded-sm">
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3M8TaruRFN8ezk4BLGDHKiaZxF9Tsr5T_g6wagZD7rdOiUcXPkZQjcYe8VmXLsrva6rtsV2g7g-xgBuxkKLrUjdPx3kX4Rrx3vylVf1Dtfvn61CEcyOfnGpY7ankqyyzpp0flr74DLP50VaaE_6MwQQ9gDxoEBFDwTm4ytNXVBmXujGnBgjsin8_K4BRFa8zI5gtHRq107A8-S3RwAAa207o9Keo8cRNABlNYAj7xQuohmyyeelBpETv8U4xHp3pPjApGoZ-79Eg"
            alt="Featured Story"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />
        </div>
        {/* Overlapping card */}
        <div className="relative -mt-32 ml-4 mr-10 p-8 shadow-sm bg-white">
          <span className="inline-block px-4 py-1 font-workSans bg-secondary text-white text-[10px] font-bold tracking-widest uppercase mb-4">
            Science &amp; Tech
          </span>
          <h2 className="text-3xl font-bold font-newsreader leading-tight mb-4">
            The Silence of Automation
          </h2>
          <p className="text-sm leading-relaxed mb-6 italic">
            In the heart of the digital renaissance, we explore how quiet
            innovation is reshaping the urban landscape without uttering a
            single word.
          </p>
          <div className="flex items-center gap-3">
            <div className="h-px w-12 bg-black" />
            <span
              className="text-xs font-semibold uppercase tracking-tighter"
              style={{ fontFamily: "var(--font-work-sans)" }}
            >
              Read Full Story
            </span>
          </div>
        </div>
      </div>

      {/* ── Desktop hero (original asymmetric layout) ── */}
      <div className="hidden md:grid grid-cols-12 gap-0 items-end mt-20">
        <div className="col-span-12 md:col-span-8 overflow-hidden">
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3M8TaruRFN8ezk4BLGDHKiaZxF9Tsr5T_g6wagZD7rdOiUcXPkZQjcYe8VmXLsrva6rtsV2g7g-xgBuxkKLrUjdPx3kX4Rrx3vylVf1Dtfvn61CEcyOfnGpY7ankqyyzpp0flr74DLP50VaaE_6MwQQ9gDxoEBFDwTm4ytNXVBmXujGnBgjsin8_K4BRFa8zI5gtHRq107A8-S3RwAAa207o9Keo8cRNABlNYAj7xQuohmyyeelBpETv8U4xHp3pPjApGoZ-79Eg"
            alt="Vintage technology and minimalist design"
            fill
            className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
          />
        </div>
        <div
          className="col-span-11 md:col-span-5 md:col-start-7 md:-ml-20 relative z-10 p-10 md:p-16"
          style={{ backgroundColor: "var(--color-surface-container-lowest)" }}
        >
          <span
            className="inline-block text-sm font-semibold uppercase tracking-[0.2em] mb-6"
            style={{
              color: "var(--color-secondary)",
              fontFamily: "var(--font-work-sans)",
            }}
          >
            Science &amp; Tech
          </span>
          <h1
            className="text-5xl md:text-7xl leading-tight mb-8 tracking-tighter"
            style={{
              fontFamily: "var(--font-newsreader)",
              color: "var(--color-primary)",
            }}
          >
            The Silence of Automation
          </h1>
          <p
            className="text-lg leading-relaxed mb-10 max-w-md"
            style={{
              fontFamily: "var(--font-work-sans)",
              color: "var(--color-on-surface-variant)",
            }}
          >
            In the heart of the digital renaissance, we explore how quiet
            innovation is reshaping the urban landscape without uttering a
            single word.
          </p>
          <a
            href="#"
            className="inline-flex items-center group text-sm font-bold uppercase tracking-widest border-b-2 pb-1 transition-all hover:pr-4"
            style={{
              fontFamily: "var(--font-work-sans)",
              borderColor: "var(--color-primary)",
              color: "var(--color-primary)",
            }}
          >
            Read the Feature
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="ml-2 group-hover:translate-x-1 transition-transform"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
