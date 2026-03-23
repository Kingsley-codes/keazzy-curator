export function Footer() {
  const footerNav = [
    { label: "About", href: "#" },
    { label: "Newsletter", href: "#" },
    { label: "Privacy", href: "#" },
    { label: "Contact", href: "#" },
  ];

  return (
    <footer className="w-full py-20 mt-20 bg-slate-100 border-t border-slate-200">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-7xl mx-auto px-8">
        <div className="space-y-6">
          <div
            className="text-2xl font-bold italic"
            style={{ fontFamily: "var(--font-headline)" }}
          >
            The Modern Curator
          </div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500 leading-loose">
            Redefining the digital periodical through curated aesthetics and
            rigorous journalism.
          </p>
        </div>

        <div className="flex flex-col space-y-4">
          <span className="text-xs uppercase tracking-[0.2em] font-bold text-slate-900">
            Navigation
          </span>
          <nav className="flex flex-col space-y-2">
            {footerNav.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-slate-400 hover:text-black text-xs uppercase tracking-[0.2em] transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex flex-col space-y-6">
          <span className="text-xs uppercase tracking-[0.2em] font-bold text-slate-900">
            Follow Us
          </span>
          <div className="flex gap-4">
            <a href="#" className="hover:opacity-60 transition-opacity" aria-label="Website">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>
              </svg>
            </a>
            <a href="#" className="hover:opacity-60 transition-opacity" aria-label="Email">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
            </a>
            <a href="#" className="hover:opacity-60 transition-opacity" aria-label="Share">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/>
              </svg>
            </a>
          </div>
          <p className="text-slate-400 text-[10px] uppercase tracking-[0.2em]">
            © 2024 The Modern Curator. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
