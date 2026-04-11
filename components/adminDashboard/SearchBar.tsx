"use client";

import { useState } from "react";
import { MdSearch } from "react-icons/md";

interface SearchBarProps {
  onSearch?: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(query);
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-outline text-xl" />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search articles..."
        className="pl-10 pr-4 py-2 bg-surface-container-lowest border-none rounded-lg focus:ring-2 focus:ring-primary/40 text-sm w-64 shadow-sm"
      />
    </form>
  );
}
