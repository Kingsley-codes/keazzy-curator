"use client";
import { MdAddPhotoAlternate } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { PostEditor } from "@/components/createPosts/PostEditor";
import { jsonToBlocks } from "@/components/createPosts/blockHelpers";
import { ApiPost } from "@/lib/backend";
import { submitPost, updatePost } from "@/lib/submitPost";
import type { PostContent } from "@/types/content";
import { ErrorNotice, button } from "./AdminUI";
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
  function handleHeroImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const next = e.target.files?.[0];
    if (!next) return;
    if (next.size > 10 * 1024 * 1024) {
      setError("The cover image must be 10 MB or smaller.");
      return;
    }
    setFile(next);
    if (preview.startsWith("blob:")) URL.revokeObjectURL(preview);
    setPreview(URL.createObjectURL(next));
  }
  return (
    <div className="max-w-5xl mx-auto px-2 py-10 text-sm">
      {/* Page Header */}
      <div className="mb-12">
        <div className="inline-block bg-primary text-gray-100 px-6 py-1 text-xs font-bold tracking-[0.2em] uppercase mb-6 rounded-sm">
          {post ? "Edit Post" : "New Post"}
        </div>
        <h1 className="font-headline text-3xl text-primary leading-tight">
          {post ? "Edit an Article" : "Create an Article"}
        </h1>
      </div>

      <ErrorNotice message={error} />

      <div className="space-y-10 border p-10 rounded-xl border-gray-300">
        {/* Title */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3">
            Title
          </label>
          <input
            type="text"
            aria-label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter article title..."
            className="w-full focus:outline-none bg-transparent border-0 border-b border-gray-300 focus:border-gray-500 py-3 font-headline text-2xl text-primary placeholder:text-gray-400"
          />
        </div>

        {/* Category + Tags */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3">
              Category
            </label>
            <select
              aria-label="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-transparent border border-gray-300 rounded-lg border-outline/30 focus:border-primary focus:ring-0 py-3 font-body text-sm text-primary"
            >
              <option value="" disabled>
                Select a category
              </option>
              {[
                "news",
                "sports",
                "fashion",
                "tech",
                "science",
                "short stories",
              ].map((cat) => (
                <option key={cat} value={cat} className="capitalize">
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3">
              Tags{" "}
              <span className="font-normal normal-case tracking-normal text-outline">
                (comma separated)
              </span>
            </label>
            <input
              type="text"
              aria-label="Tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="e.g. minimalism, UX, design"
              className="w-full focus:outline-none bg-transparent border-0 caret-primary border-b border-gray-300 focus:border-gray-500 focus:ring-0 py-3 font-body text-sm text-primary placeholder:text-outline/40"
            />
          </div>
        </div>

        {/* Featured Toggle */}
        <div className="py-3 border-b border-gray-500">
          <div>
            <label className="block text-xs mb-1.5 font-bold uppercase tracking-[0.2em] text-primary">
              Featured Post
            </label>

            <button
              type="button"
              aria-label="Featured post"
              role="switch"
              aria-checked={featured}
              onClick={() => setFeatured(!featured)}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border border-gray-300 transition-colors duration-200 focus:outline-none ${
                featured ? "bg-primary" : "bg-outline/30"
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform transition-transform duration-200 ${
                  featured ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>

            <p className="text-xs text-gray-400 font-body mt-0.5">
              Featured posts are highlighted on the homepage.
            </p>
          </div>
        </div>

        {/* Hero Image */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3">
            Hero Image
          </label>
          {preview ? (
            <div className="relative aspect-21/9 overflow-hidden bg-gray-50 mb-4">
              <Image
                src={preview}
                alt={alt || "Hero preview"}
                unoptimized
                fill
                className="object-cover"
              />
              <label className="absolute top-3 right-3 cursor-pointer bg-primary text-on-primary px-3 py-2 text-xs font-bold uppercase tracking-widest">
                Replace image
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  className="sr-only"
                  onChange={handleHeroImageChange}
                />
              </label>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center aspect-21/9 border border-dashed border-gray-400 cursor-pointer hover:bg-gray-50 rounded-md transition-colors">
              <MdAddPhotoAlternate className="w-20 text-gray-600 h-20" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
                Click to upload hero image
              </span>
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                className="sr-only"
                onChange={handleHeroImageChange}
              />
            </label>
          )}
          {/* Alt text */}
          <input
            type="text"
            aria-label="Hero image description"
            value={alt}
            onChange={(e) => setAlt(e.target.value)}
            placeholder="Describe the hero image for accessibility..."
            className="w-full focus:outline-none mt-3 bg-transparent border-0 border-b border-gray-500 focus:border-gray-500 focus:ring-0 py-2 font-body text-sm text-primary placeholder:text-gray-400"
          />
        </div>

        {/* Rich Text Editor */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3">
            Content
          </label>
          <PostEditor
            initialBlocks={blocks}
            onChange={(json) => setContent(json)}
          />
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-outline/10">
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
          <button
            type="button"
            onClick={() => save("draft")}
            disabled={pending}
            className="px-10 py-3 border rounded-sm border-outline/30 text-xs font-bold uppercase tracking-widest text-primary hover:bg-gray-800 hover:text-gray-100 transition-colors disabled:opacity-40"
          >
            {pending ? "Saving..." : "Save Draft"}
          </button>
          <button
            type="button"
            onClick={() => save("published")}
            disabled={pending}
            className="px-10 py-3 bg-primary text-gray-100 rounded-sm text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-opacity disabled:opacity-40"
          >
            {pending
              ? "Publishing..."
              : post?.status === "published"
                ? "Save changes"
                : "Publish"}
          </button>
        </div>
      </div>
    </div>
  );
}
