"use client";

import { useState } from "react";
import { Article } from "@/types";
import { mockArticles } from "./mockData";
import ArticleRow from "./ArticleRow";
import Pagination from "./Pagination";

export default function ArticlesTable() {
  const [articles, setArticles] = useState<Article[]>(mockArticles);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleEdit = (id: number) => {
    console.log("Edit article:", id);
    // Implement edit functionality
  };

  const handleDelete = (id: number) => {
    setArticles(articles.filter((article) => article.id !== id));
  };

  const totalArticles = articles.length;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedArticles = articles.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  return (
    <section className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden">
      <div className="px-8 py-6 border-b border-surface-container-high flex justify-between items-center">
        <h3 className="font-headline font-bold text-xl text-on-surface">
          Recent Articles
        </h3>
        <div className="flex gap-2">
          <button className="px-4 py-2 text-sm font-semibold text-primary hover:bg-primary-container/30 rounded-lg transition-colors">
            View All
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-low/50">
              <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                Article Title
              </th>
              <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                Category
              </th>
              <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                Status
              </th>
              <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                Publish Date
              </th>
              <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-on-surface-variant text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-container-low">
            {displayedArticles.map((article) => (
              <ArticleRow
                key={article.id}
                article={article}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalItems={totalArticles}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />
    </section>
  );
}
