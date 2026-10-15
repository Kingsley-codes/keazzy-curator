"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  FiEdit2,
  FiEye,
  FiFileText,
  FiFolder,
  FiImage,
  FiMessageCircle,
  FiTrash2,
  FiUsers,
} from "react-icons/fi";
import { ApiPost, deletePost, friendlyDate, getPosts } from "@/lib/backend";

export default function DashboardOverview() {
  const [posts, setPosts] = useState<ApiPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    getPosts()
      .then((value) => setPosts(value.posts))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);
  const totals = useMemo(
    () => ({
      views: posts.reduce((sum, post) => sum + (post.viewCount ?? 0), 0),
      published: posts.filter((post) => post.status === "published").length,
    }),
    [posts],
  );
  async function remove(id: string) {
    if (
      !window.confirm(
        "Delete this post and its uploaded images? This cannot be undone.",
      )
    )
      return;
    try {
      await deletePost(id);
      setPosts((current) => current.filter((post) => post._id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed.");
    }
  }
  return (
    <div className="p-5 md:p-8">
      <div className="flex flex-wrap items-start justify-between gap-5">
        <div>
          <p className="font-serif text-lg">Welcome back,</p>
          <h1 className="font-serif text-5xl font-semibold">Administrator!</h1>
          <p className="mt-1 text-sm text-[#555]">
            Here’s what’s happening with Keazzy’s Curations today.
          </p>
        </div>
        <div className="rounded-md bg-[#eee5d6] px-7 py-4 font-serif text-lg italic text-[#382b1d]">
          “ Inform. Inspire. Empower. ”
        </div>
      </div>
      {error && (
        <p className="mt-5 rounded-md bg-[#fff0ed] p-3 text-xs text-[#9c331f]">
          {error} Make sure the backend is running.
        </p>
      )}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Metric
          icon={<FiFileText />}
          label="Total Posts"
          value={loading ? "…" : posts.length}
        />
        <Metric
          icon={<FiMessageCircle />}
          label="Published Posts"
          value={loading ? "…" : totals.published}
        />
        <Metric
          icon={<FiUsers />}
          label="Total Users"
          value="—"
          note="API not available"
        />
        <Metric
          icon={<FiEye />}
          label="Total Views"
          value={loading ? "…" : totals.views.toLocaleString()}
        />
      </div>
      <div className="mt-5 grid gap-5 xl:grid-cols-[1.65fr_.95fr]">
        <section className="rounded-lg border border-[#e6e2db] bg-white p-4">
          <div className="flex justify-between">
            <h2 className="font-serif text-xl font-semibold">Recent Posts</h2>
            <Link
              href="/admin/dashboard/posts"
              className="text-xs text-[#98651f] underline"
            >
              View All
            </Link>
          </div>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full min-w-[650px] text-left text-[11px]">
              <thead className="bg-[#f5f4f1] text-[9px] uppercase">
                <tr>
                  <th className="p-3">Title</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Views</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eeeae4]">
                {posts.slice(0, 5).map((post) => (
                  <tr key={post._id}>
                    <td className="max-w-[250px] p-3 font-medium">
                      {post.title}
                    </td>
                    <td className="capitalize">{post.category}</td>
                    <td>
                      <Status value={post.status} />
                    </td>
                    <td>{post.viewCount ?? 0}</td>
                    <td>{friendlyDate(post.createdAt)}</td>
                    <td>
                      <div className="flex gap-2">
                        <Link
                          aria-label="Preview"
                          href={`/posts/${post.slug}`}
                          className="rounded border border-[#ddd] p-2"
                        >
                          <FiEye />
                        </Link>
                        <button
                          aria-label="Delete"
                          onClick={() => remove(post._id)}
                          className="rounded border border-[#ddd] p-2 text-red-500"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {!loading && posts.length === 0 && (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-[#777]">
                      No posts yet. Create your first story.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
        <div className="space-y-5">
          <section className="rounded-lg border border-[#e6e2db] bg-white p-4">
            <h2 className="font-serif text-xl font-semibold">Quick Actions</h2>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <Action
                href="/admin/dashboard/posts/create"
                icon={<FiEdit2 />}
                title="Create New Post"
              />
              <Action
                href="/admin/dashboard/posts"
                icon={<FiFolder />}
                title="Manage Posts"
              />
              <Action
                href="/admin/dashboard/posts/create"
                icon={<FiImage />}
                title="Upload Media"
              />
              <Action icon={<FiUsers />} title="Manage Users" disabled />
            </div>
          </section>
          <section className="rounded-lg border border-[#e6e2db] bg-white p-5">
            <h2 className="font-serif text-xl font-semibold">Content pulse</h2>
            <div className="mt-5 flex h-28 items-end gap-2">
              {[32, 48, 43, 57, 65, 58, 86].map((height, index) => (
                <span
                  key={index}
                  className="flex-1 rounded-t bg-[#b98743]"
                  style={{ height: `${height}%`, opacity: 0.45 + index * 0.07 }}
                />
              ))}
            </div>
            <p className="mt-3 text-[10px] text-[#777]">
              A visual summary of recent publishing activity.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
function Metric({
  icon,
  label,
  value,
  note,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  note?: string;
}) {
  return (
    <div className="flex min-h-28 items-center gap-5 rounded-lg border border-[#e8e4de] bg-white p-5">
      <span className="text-3xl">{icon}</span>
      <div>
        <p className="text-xs">{label}</p>
        <strong className="font-serif text-3xl">{value}</strong>
        <p className="text-[9px] text-[#888]">
          {note ?? "Live from your publication"}
        </p>
      </div>
    </div>
  );
}
function Status({ value }: { value: ApiPost["status"] }) {
  return (
    <span
      className={`rounded px-3 py-1 text-[9px] capitalize ${value === "published" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}
    >
      {value}
    </span>
  );
}
function Action({
  href,
  icon,
  title,
  disabled,
}: {
  href?: string;
  icon: React.ReactNode;
  title: string;
  disabled?: boolean;
}) {
  const content = (
    <>
      <span className="text-2xl">{icon}</span>
      <strong className="mt-4 block text-xs">{title}</strong>
      <span className="text-[9px] text-[#777]">
        {disabled ? "Needs backend support" : "Open module →"}
      </span>
    </>
  );
  return href && !disabled ? (
    <Link
      href={href}
      className="rounded-md border border-[#eee] p-4 hover:border-[#c89b55]"
    >
      {content}
    </Link>
  ) : (
    <div className="cursor-not-allowed rounded-md border border-[#eee] bg-[#fafafa] p-4 opacity-55">
      {content}
    </div>
  );
}
