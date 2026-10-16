"use client";
import Link from "next/link";
import Image from "next/image";
import { ApiPost, friendlyDate } from "@/lib/backend";
import { PostActions } from "./PostActions";
export function PostTable({
  posts,
  loading,
  onChange,
  onDelete,
  onError,
}: {
  posts: ApiPost[];
  loading: boolean;
  onChange: (post: ApiPost) => void;
  onDelete: (id: string) => void;
  onError: (message: string) => void;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[760px] text-left text-base">
        <thead className="border-y border-[#e9e3db] bg-[#faf8f4] text-sm text-[#6b645b]">
          <tr>
            {["Article", "Category", "Status", "Views", "Created", ""].map(
              (label, i) => (
                <th key={i} className="px-5 py-4 font-medium">
                  {label || <span className="sr-only">Actions</span>}
                </th>
              ),
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#ede8e0]">
          {posts.map((post) => (
            <tr key={post._id} className="hover:bg-[#fcfaf6]">
              <td className="p-5">
                <Link
                  href={`/admin/dashboard/posts/${post._id}`}
                  className="group flex items-center gap-4"
                >
                  {post.heroImage?.src && (
                    <Image
                      src={post.heroImage.src}
                      alt=""
                      width={72}
                      height={56}
                      unoptimized
                      className="h-14 w-[72px] rounded object-cover"
                    />
                  )}
                  <span className="max-w-sm font-medium leading-snug group-hover:text-[#986a2f]">
                    {post.title}
                  </span>
                </Link>
              </td>
              <td className="px-5 capitalize text-[#6b645b]">
                {post.category}
              </td>
              <td className="px-5">
                <span
                  className={`rounded-full px-3 py-1.5 text-sm capitalize ${post.status === "published" ? "bg-emerald-50 text-emerald-800" : "bg-amber-50 text-amber-900"}`}
                >
                  {post.status}
                </span>
              </td>
              <td className="px-5 tabular-nums">
                {(post.viewCount ?? 0).toLocaleString()}
              </td>
              <td className="whitespace-nowrap px-5 text-sm text-[#6b645b]">
                {friendlyDate(post.createdAt)}
              </td>
              <td className="px-5">
                <PostActions
                  post={post}
                  onChange={onChange}
                  onDelete={onDelete}
                  onError={onError}
                />
              </td>
            </tr>
          ))}
          {!posts.length && (
            <tr>
              <td colSpan={6} className="p-12 text-center text-[#77736c]">
                {loading ? "Loading articles..." : "No articles to show."}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
