"use client";

import { MdTune } from "react-icons/md";
import SearchBar from "./SearchBar";

interface HeaderProps {
  onSearch?: (query: string) => void;
}

export default function Header({ onSearch }: HeaderProps) {
  return (
    <header className="mb-12 flex justify-between items-end">
      <div>
        <h2 className="text-4xl font-headline font-extrabold text-on-surface tracking-tight mb-2">
          Management Console
        </h2>
        <p className="font-body italic text-lg text-on-surface-variant">
          Overview of your publication&apos;s current heartbeat.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <SearchBar onSearch={onSearch} />
        <button className="bg-surface-container-high p-2 rounded-lg text-on-surface-variant hover:text-on-surface transition-colors">
          <MdTune className="text-xl" />
        </button>
      </div>
    </header>
  );
}
