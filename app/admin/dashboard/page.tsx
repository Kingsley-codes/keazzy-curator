"use client";

import ArticlesTable from "@/components/adminDashboard/ArticlesTable";
import Header from "@/components/adminDashboard/Header";
import ProgressBar from "@/components/adminDashboard/ProgressBar";
import StatsGrid from "@/components/adminDashboard/StatsGrid";
import { useState } from "react";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Implement search functionality
    console.log("Searching for:", query);
  };

  return (
    <>
      <ProgressBar progress={35} />
      <main className="ml-64 p-12 min-h-screen">
        <Header onSearch={handleSearch} />
        <StatsGrid />
        <ArticlesTable />

        <footer className="mt-16 pt-12 border-t border-surface-container-high flex flex-col md:flex-row justify-between items-center gap-8 text-on-surface-variant opacity-60">
          <div className="font-headline font-bold text-on-surface">
            THE CURATOR
          </div>
          <p className="font-body italic text-sm">
            © 2024 The Curator Editorial Group. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs font-label uppercase tracking-widest">
            <a href="#" className="hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Archives
            </a>
          </div>
        </footer>
      </main>
    </>
  );
}
