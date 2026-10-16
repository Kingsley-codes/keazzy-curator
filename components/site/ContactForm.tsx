"use client";

import { useState } from "react";

const fieldClass = "mt-1.5 h-11 w-full rounded border border-[#d9d9d9] bg-transparent px-3 text-[13px] outline-none transition focus:border-[#b47c30] focus:ring-2 focus:ring-[#b47c30]/15";

export function ContactForm() {
  const [notice, setNotice] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const subject = String(data.get("subject") ?? "General enquiry");
    const message = String(data.get("message") ?? "");
    const body = `From: ${name} (${email})\n\n${message}`;
    window.location.href = `mailto:hello@keazzyscurations.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setNotice("Your email app should open with your message ready to send.");
    event.currentTarget.reset();
  }

  return (
    <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-[11px] font-medium text-[#30363a]">Full Name <span aria-hidden="true">*</span>
          <input className={fieldClass} name="name" placeholder="Your full name" autoComplete="name" required />
        </label>
        <label className="block text-[11px] font-medium text-[#30363a]">Email Address <span aria-hidden="true">*</span>
          <input className={fieldClass} type="email" name="email" placeholder="you@example.com" autoComplete="email" required />
        </label>
      </div>
      <label className="block text-[11px] font-medium text-[#30363a]">Subject <span aria-hidden="true">*</span>
        <select className={fieldClass} name="subject" defaultValue="" required>
          <option value="" disabled>Select a subject</option>
          <option>General enquiry</option>
          <option>Story idea</option>
          <option>Feedback</option>
          <option>Partnership</option>
          <option>Press enquiry</option>
        </select>
      </label>
      <label className="block text-[11px] font-medium text-[#30363a]">Message <span aria-hidden="true">*</span>
        <textarea className="mt-1.5 min-h-28 w-full rounded border border-[#d9d9d9] bg-transparent px-3 py-3 text-[13px] outline-none transition placeholder:text-[#878b8e] focus:border-[#b47c30] focus:ring-2 focus:ring-[#b47c30]/15" name="message" placeholder="Tell us what’s on your mind..." required />
      </label>
      <button className="flex h-11 w-full items-center justify-center gap-2 rounded bg-[#a66d32] px-5 text-[13px] font-medium text-white transition hover:bg-[#8e5925] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a66d32]" type="submit">
        Send Message <span aria-hidden="true">→</span>
      </button>
      <p aria-live="polite" className="min-h-4 text-center text-xs text-[#52604f]">{notice}</p>
    </form>
  );
}
