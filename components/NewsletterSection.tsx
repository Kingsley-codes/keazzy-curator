"use client";

import { useState } from "react";

export function NewsletterSection() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle subscription logic here
    setEmail("");
  };

  return (
    <section className="mb-32 p-12 md:p-24 text-gray-200 bg-primary grid md:grid-cols-2 gap-12 items-center">
      <div>
        <h2 className="text-4xl md:text-5xl mb-6 font-newsreader">
          Join the Registry.
        </h2>
        <p className="text-lg max-w-md font-workSans text-gray-400">
          Weekly dispatches of the most critical stories in tech, culture, and
          science. No filler.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="YOUR EMAIL ADDRESS"
          className="bg-transparent font-workSans text-gray-200 border-gray-100 border-0 border-b-2 focus:outline-none text-xl py-4 placeholder:opacity-60 transition-colors"
        />
        <button
          type="submit"
          className="font-bold text-primary bg-gray-100 uppercase tracking-widest py-5 px-10 self-start transition-colors cursor-pointer"
        >
          Subscribe
        </button>
      </form>
    </section>
  );
}
