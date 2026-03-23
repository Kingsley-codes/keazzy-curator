export function EditorialQuote() {
  return (
    <section className="py-28 text-center max-w-3xl mx-auto">
      {/* Quote icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="mx-auto mb-8"
        style={{ color: "var(--color-outline-variant)" }}
        aria-hidden="true"
      >
        <path d="M11.192 15.757c0-.88-.23-1.618-.69-2.217-.326-.412-.768-.683-1.327-.812-.55-.128-1.07-.137-1.54-.028-.16-.95.1-1.95.78-3 .53-.81 1.24-1.48 2.13-2.01L9.24 6c-.9.63-1.68 1.35-2.35 2.16-.98 1.18-1.63 2.43-1.95 3.76-.32 1.33-.28 2.53.1 3.6.39 1.07 1.02 1.87 1.89 2.41.87.54 1.83.81 2.88.81.95 0 1.77-.32 2.46-.96.69-.64 1.04-1.44 1.04-2.4l-.08-.61zM20.692 15.757c0-.88-.23-1.618-.69-2.217-.326-.42-.77-.695-1.327-.824-.56-.128-1.07-.136-1.54-.028-.16-.95.1-1.95.78-3 .53-.81 1.24-1.48 2.13-2.01L18.74 6c-.9.63-1.68 1.35-2.35 2.16-.98 1.18-1.63 2.43-1.95 3.76-.32 1.33-.28 2.53.1 3.6.39 1.07 1.02 1.87 1.89 2.41.87.54 1.83.81 2.88.81.95 0 1.77-.32 2.46-.96.69-.64 1.04-1.44 1.04-2.4l-.08-.61z" />
      </svg>

      <blockquote
        className="text-4xl md:text-5xl italic leading-tight"
        style={{
          fontFamily: "var(--font-headline)",
          color: "var(--color-primary)",
        }}
      >
        &ldquo;Curated content is the antidote to the infinite scroll. We
        don&apos;t just report; we edit the noise.&rdquo;
      </blockquote>

      <cite
        className="block mt-8 text-xs uppercase tracking-[0.3em] not-italic"
        style={{
          fontFamily: "var(--font-label)",
          color: "var(--color-on-surface-variant)",
        }}
      >
        — Editorial Board, 2024
      </cite>
    </section>
  );
}
