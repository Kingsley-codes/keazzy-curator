import Link from "next/link";
import { FaFacebookF, FaInstagram, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { Brand } from "./Brand";
import { SiteContainer } from "./SiteContainer";

export function SiteFooter() {
  return (
    <footer className="bg-[#111] py-8 text-white">
      <SiteContainer>
        <div className="grid grid-cols-2 gap-9 md:grid-cols-[2.2fr_1fr_1fr_1.25fr] md:gap-14">
          <div><Brand light /><p className="mt-4 max-w-[300px] text-[10px] leading-relaxed text-[#bbb]">Thoughtful stories. Fresh perspectives. A more informed you.</p></div>
          <FooterColumn title="Quick Links" links={["Home", "About Us", "All Posts", "Contact"]} />
          <FooterColumn title="Categories" links={["News", "Sports", "Fashion", "Tech", "Science"]} />
          <div><h2 className="mb-3 font-serif text-sm">Follow Us</h2><div className="flex gap-4 text-sm"><a href="#" aria-label="Facebook"><FaFacebookF /></a><a href="#" aria-label="X"><FaXTwitter /></a><a href="#" aria-label="Instagram"><FaInstagram /></a><a href="#" aria-label="YouTube"><FaYoutube /></a></div><p className="mt-4 text-[10px] text-[#bbb]">Let’s stay connected.</p></div>
        </div>
        <div className="mt-7 flex flex-col gap-4 border-t border-[#333] pt-4 text-[9px] text-[#aaa] md:flex-row md:justify-between"><span>© 2026 Keazzy’s Curations. All rights reserved.</span><div className="flex gap-5 md:gap-8"><a href="#">Privacy Policy</a><a href="#">Terms of Service</a><a href="#">Contact</a></div></div>
      </SiteContainer>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: string[] }) {
  return <div><h2 className="mb-2 font-serif text-sm">{title}</h2>{links.map((label) => <Link key={label} href={label === "Home" ? "/" : label === "All Posts" ? "/posts" : label === "About Us" ? "/about" : label === "Contact" ? "mailto:hello@keazzyscurations.com" : `/posts?category=${label.toLowerCase()}`} className="block text-[10px] leading-[1.7] text-[#ddd] hover:text-[#e6c98f]">{label}</Link>)}</div>;
}
