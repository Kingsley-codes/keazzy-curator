export function Header() {
  const navLinks = [
    { label: "News", href: "#" },
    { label: "Sports", href: "#" },
    { label: "Fashion", href: "#" },
    { label: "Tech", href: "#" },
    { label: "Science", href: "#" },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-[#faf8ff]/90 backdrop-blur-md">
      <div className="flex justify-between items-center w-full px-8 py-6 max-w-screen-2xl mx-auto">
        <div className="flex items-center gap-8">
          <a
            href="#"
            className="text-2xl font-black uppercase tracking-widest text-slate-900 font-serif"
            style={{ fontFamily: "var(--font-headline)" }}
          >
            The Modern Curator
          </a>
          <nav className="hidden md:flex items-center gap-8 text-lg leading-relaxed tracking-tight"
            style={{ fontFamily: "var(--font-headline)" }}>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-slate-500 font-medium hover:text-black transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-6">
          <button
            aria-label="Search"
            className="text-slate-900 hover:opacity-70 transition-opacity"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
            </svg>
          </button>
          <button
            aria-label="Account"
            className="text-slate-900 hover:opacity-70 transition-opacity"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 1 0-16 0"/>
            </svg>
          </button>
        </div>
      </div>
      <div className="bg-slate-100 h-px w-full" />
    </header>
  );
}
