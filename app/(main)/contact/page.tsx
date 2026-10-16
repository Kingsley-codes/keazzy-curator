import type { Metadata } from "next";
import Image from "next/image";
import { ContactForm } from "@/components/site/ContactForm";
import { SiteContainer } from "@/components/site/SiteContainer";

export const metadata: Metadata = {
  title: "Contact Us | Keazzy's Curations",
  description: "Get in touch with the Keazzy's Curations team.",
};

export default function ContactPage() {
  return (
    <main className="bg-[#f8f6f1]">
      <section className="relative isolate flex min-h-[275px] items-center overflow-hidden md:min-h-[320px]">
        <Image
          src="/images/contact%20page.png"
          alt="A warm editorial desk with books and a coffee mug"
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover object-center"
        />
        <div className="absolute inset-0 -z-10 bg-linear-to-r from-black/85 via-black/55 to-black/5" />
        <SiteContainer className="py-12 text-white md:py-16">
          <span className="mb-4 block h-px w-9 bg-[#c89b55]" />
          <p className="text-[11px] font-bold uppercase tracking-[.2em] text-[#e0b66f]">Get in touch</p>
          <h1 className="mt-1 font-serif text-5xl font-semibold md:text-6xl">Contact Us</h1>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/90 md:text-base">
            We’d love to hear from you. Whether you have a question, feedback, or a story idea, our team is here to help.
          </p>
          <span className="mt-5 block h-px w-9 bg-[#c89b55]" />
        </SiteContainer>
      </section>

      <SiteContainer className="grid gap-9 py-9 md:grid-cols-[.82fr_1.5fr] md:gap-14 md:py-10">
        <aside className="pt-1">
          <p className="text-[11px] font-bold uppercase tracking-[.2em] text-[#a66d25]">Let’s talk</p>
          <h2 className="mt-1 font-serif text-3xl font-semibold md:text-4xl">Get In Touch</h2>
          <p className="mt-2 max-w-sm text-[13px] leading-relaxed text-[#555b61]">
            Have a question, a suggestion, or just want to say hello? Reach out to us using the form, and we’ll get back to you as soon as possible.
          </p>
          <div className="mt-6 space-y-5">
            <ContactDetail icon="✉" title="Email Us">
              <p>Send us a message and we’ll get back to you as soon as possible.</p>
              <a className="mt-1 inline-block text-[#a66d25] underline" href="mailto:hello@keazzyscurations.com">hello@keazzyscurations.com</a>
            </ContactDetail>
            <ContactDetail icon="☏" title="Live Chat">
              <p>Have a quick question? Chat with us during our working hours.</p>
              <p className="mt-1"><span className="mr-2 inline-block size-2 rounded-full bg-emerald-500" />Online&nbsp; · &nbsp;Mon – Fri, 9am – 6pm (WAT)</p>
            </ContactDetail>
            <ContactDetail icon="⌖" title="Our Office">
              <p>Lagos, Nigeria</p>
              <p>We’re a <strong>remote-first</strong> team, but you can reach us by appointment.</p>
            </ContactDetail>
            <ContactDetail icon="↗" title="Follow Us">
              <p>Stay updated with our latest stories, news and announcements.</p>
              <div className="mt-2 flex gap-4 text-lg text-[#121819]" aria-label="Social media links">
                <a href="https://x.com" aria-label="X">𝕏</a><a href="https://instagram.com" aria-label="Instagram">◎</a><a href="https://youtube.com" aria-label="YouTube">▶</a><a href="https://linkedin.com" aria-label="LinkedIn">in</a>
              </div>
            </ContactDetail>
          </div>
        </aside>
        <section className="rounded-md border border-[#e9e5de] bg-white/60 p-5 shadow-[0_5px_24px_rgba(25,20,14,.05)] md:p-8">
          <p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#a66d25]">Send us a message</p>
          <h2 className="mt-1 font-serif text-3xl font-semibold md:text-4xl">We’d Love to Hear From You</h2>
          <p className="mt-2 text-[13px] text-[#555b61]">Fill out the form below and we’ll get back to you shortly.</p>
          <ContactForm />
        </section>
      </SiteContainer>
    </main>
  );
}

function ContactDetail({ icon, title, children }: { icon: string; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4">
      <span aria-hidden="true" className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#efe8dc] text-xl text-[#a66d25]">{icon}</span>
      <div className="pt-0.5 text-[12px] leading-relaxed text-[#62676c]"><h3 className="font-serif text-base font-semibold text-[#14191b]">{title}</h3>{children}</div>
    </div>
  );
}
