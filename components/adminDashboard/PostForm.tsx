"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { PostEditor } from "@/components/createPosts/PostEditor";
import { jsonToBlocks } from "@/components/createPosts/blockHelpers";
import { ApiPost } from "@/lib/backend";
import { submitPost, updatePost } from "@/lib/submitPost";
import type { PostContent } from "@/types/content";
import {
  PageHeading,
  ErrorNotice,
  input,
  button,
  primaryButton,
} from "./AdminUI";
export function PostForm({ post }: { post?: ApiPost }) {
  const router = useRouter();
  const [title, setTitle] = useState(post?.title ?? ""),
    [category, setCategory] = useState(post?.category ?? "news"),
    [tags, setTags] = useState(post?.tags?.join(", ") ?? ""),
    [featured, setFeatured] = useState(post?.isFeatured ?? false),
    [alt, setAlt] = useState(post?.heroImage?.alt ?? ""),
    [file, setFile] = useState<File | null>(null),
    [preview, setPreview] = useState(post?.heroImage?.src ?? ""),
    [content, setContent] = useState<PostContent>(
      post?.content ?? { type: "doc", content: [] },
    ),
    [error, setError] = useState(""),
    [pending, setPending] = useState(false);
  const blocks = useMemo(
    () => (post?.content ? jsonToBlocks(post.content) : undefined),
    [post],
  );
  async function save(status: ApiPost["status"]) {
    if (
      !title.trim() ||
      !category ||
      (!post && !file) ||
      !content.content.length
    ) {
      setError(
        "Add a title, category, cover image and article content before saving.",
      );
      return;
    }
    setPending(true);
    setError("");
    try {
      const data = {
        title,
        category,
        tags,
        status,
        isFeatured: featured,
        heroAlt: alt,
        content,
        ...(file ? { heroImage: file } : {}),
      };
      const result = post
        ? await updatePost(post._id, data)
        : await submitPost({ ...data, heroImage: file! });
      router.push(`/admin/dashboard/posts/${result.post._id}`);
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to save this post.",
      );
    } finally {
      setPending(false);
    }
  }
  return (
    <div className="mx-auto max-w-6xl p-5 md:p-9">
      <PageHeading
        title={post ? "Edit article" : "Create an article"}
        description={
          post
            ? "Refine your story. Its public address stays the same when you change the title."
            : "Write, arrange and publish your next story."
        }
      />
      <ErrorNotice message={error} />
      <div className="grid items-start gap-7 xl:grid-cols-[minmax(0,1fr)_300px]">
        <section className="space-y-7 rounded-xl border border-[#e5ded4] bg-white p-5 md:p-7">
          <label className="block space-y-2">
            <span className="text-base font-medium">Article title</span>
            <input
              className={`${input} !font-serif !text-3xl`}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Give your story a headline"
              maxLength={300}
            />
          </label>
          <div>
            <h2 className="mb-3 text-base font-medium">Article content</h2>
            <PostEditor initialBlocks={blocks} onChange={setContent} />
          </div>
        </section>
        <aside className="space-y-6 rounded-xl border border-[#e5ded4] bg-white p-6">
          <h2 className="font-serif text-2xl font-semibold">
            Publication details
          </h2>
          <label className="block space-y-2">
            <span>Category</span>
            <select
              className={input}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {[
                "news",
                "sports",
                "fashion",
                "tech",
                "science",
                "short stories",
              ].map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
          <label className="block space-y-2">
            <span>Tags</span>
            <input
              className={input}
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Culture, ideas, people"
            />
            <span className="text-sm text-[#77736c]">
              Separate tags with commas.
            </span>
          </label>
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="size-5 accent-[#987038]"
            />
            Featured article
          </label>
          <div>
            <h3 className="mb-3 font-medium">Cover image</h3>
            {preview && (
              <Image
                src={preview}
                alt={alt || "Cover preview"}
                width={600}
                height={400}
                unoptimized
                className="mb-3 aspect-[3/2] w-full rounded-md object-cover"
              />
            )}
            <label className={`${button} w-full cursor-pointer`}>
              {preview ? "Replace image" : "Choose image"}
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                className="sr-only"
                onChange={(e) => {
                  const next = e.target.files?.[0];
                  if (next) {
                    if (next.size > 10 * 1024 * 1024) {
                      setError("The cover image must be 10 MB or smaller.");
                      return;
                    }
                    setFile(next);
                    if (preview.startsWith("blob:"))
                      URL.revokeObjectURL(preview);
                    setPreview(URL.createObjectURL(next));
                  }
                }}
              />
            </label>
            <label className="mt-3 block space-y-2">
              <span className="text-sm">Image description</span>
              <input
                className={input}
                value={alt}
                onChange={(e) => setAlt(e.target.value)}
                placeholder="Describe the cover image"
              />
            </label>
          </div>
        </aside>
      </div>
      <div className="sticky bottom-0 z-10 mt-7 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#e5ded4] bg-white/95 p-5 shadow-sm">
        <Link
          href={
            post
              ? `/admin/dashboard/posts/${post._id}`
              : "/admin/dashboard/posts"
          }
          className={button}
        >
          Cancel
        </Link>
        <div className="flex gap-3">
          <button
            className={button}
            disabled={pending}
            onClick={() => save("draft")}
          >
            Save draft
          </button>
          <button
            className={primaryButton}
            disabled={pending}
            onClick={() => save("published")}
          >
            {pending
              ? "Saving..."
              : post?.status === "published"
                ? "Save changes"
                : "Publish article"}
          </button>
        </div>
      </div>
    </div>
  );
}
