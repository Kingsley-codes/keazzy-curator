"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ApiPost, requestJson, PostsResponse } from "@/lib/backend";
import {
  PageHeading,
  ErrorNotice,
  Pagination,
  primaryButton,
  input,
} from "./AdminUI";
import { PostTable } from "./PostTable";
export default function PostsManager() {
  const [data, setData] = useState<PostsResponse>({
    posts: [],
    pagination: { page: 1, pages: 1, total: 0, limit: 15 },
  });
  const [query, setQuery] = useState(""),
    [status, setStatus] = useState(""),
    [category, setCategory] = useState(""),
    [page, setPage] = useState(1),
    [error, setError] = useState(""),
    [loading, setLoading] = useState(true),
    [revision, setRevision] = useState(0);
  useEffect(() => {
    let active = true;
    const timer = setTimeout(() => {
      setLoading(true);
      const params = new URLSearchParams({
        page: String(page),
        limit: "15",
        q: query,
        status,
        category,
      });
      requestJson<PostsResponse>(`/api/admin/posts?${params}`)
        .then((result) => {
          if (active) {
            setData(result);
            setError("");
          }
        })
        .catch((err) => {
          if (active) setError(err.message);
        })
        .finally(() => {
          if (active) setLoading(false);
        });
    }, 200);
    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [page, query, status, category, revision]);
  function change(post: ApiPost) {
    setData((current) => ({
      ...current,
      posts: current.posts.map((item) => (item._id === post._id ? post : item)),
    }));
    setRevision((n) => n + 1);
  }
  return (
    <div className="p-5 md:p-9">
      <PageHeading
        title="Posts"
        description="Shape your stories, manage drafts and keep your publication up to date."
      >
        <Link href="/admin/dashboard/posts/create" className={primaryButton}>
          Create post
        </Link>
      </PageHeading>
      <div className="mb-6 grid gap-3 md:grid-cols-[1fr_200px_200px]">
        <input
          aria-label="Search posts"
          className={input}
          placeholder="Search articles by title..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setPage(1);
          }}
        />
        <select
          aria-label="Publication status"
          className={input}
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            setPage(1);
          }}
        >
          <option value="">All statuses</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
        <select
          aria-label="Category"
          className={input}
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setPage(1);
          }}
        >
          <option value="">All categories</option>
          {[
            "news",
            "sports",
            "fashion",
            "tech",
            "science",
            "short stories",
          ].map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>
      <ErrorNotice message={error} />
      <section className="rounded-xl border border-[#e5ded4] bg-white">
        <PostTable
          posts={data.posts}
          loading={loading}
          onChange={change}
          onDelete={() => {
            setPage(1);
            setRevision((n) => n + 1);
          }}
          onError={setError}
        />
        <Pagination {...data.pagination} onChange={setPage} />
      </section>
    </div>
  );
}
