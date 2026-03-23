// app/create-post/page.tsx
"use client";
import { useState } from "react";
import { PostContent } from "@/types/content";
import { PostEditor } from "@/components/createPosts/PostEditor";
import Image from "next/image";

interface PostForm {
  title: string;
  category: string;
  tags: string;
  status: "draft" | "published";
  heroImage: File | null;
  heroImagePreview: string;
  heroAlt: string;
  content: PostContent | null;
}

export default function CreatePostPage() {
  const [form, setForm] = useState<PostForm>({
    title: "",
    category: "",
    tags: "",
    status: "draft",
    heroImage: null,
    heroImagePreview: "",
    heroAlt: "",
    content: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleHeroImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setForm((prev) => ({
      ...prev,
      heroImage: file,
      heroImagePreview: URL.createObjectURL(file),
    }));
  };

  const handleSubmit = async (status: "draft" | "published") => {
    if (!form.title.trim()) return setError("Title is required.");
    if (!form.category) return setError("Category is required.");
    if (!form.heroImage) return setError("Hero image is required.");
    if (!form.content) return setError("Post content is required.");

    setIsSubmitting(true);
    setError(null);

    try {
      // 1. Upload hero image first
      const heroFormData = new FormData();
      heroFormData.append("image", form.heroImage);
      const heroRes = await fetch("/api/upload/image?type=hero", {
        method: "POST",
        body: heroFormData,
      });
      if (!heroRes.ok) throw new Error("Hero image upload failed.");
      const {
        url: heroSrc,
        publicId: heroPublicId,
      }: { url: string; publicId: string } = await heroRes.json();

      // 2. Submit the post
      const postRes = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title,
          category: form.category,
          tags: form.tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean),
          status,
          heroImage: {
            src: heroSrc,
            publicId: heroPublicId,
            alt: form.heroAlt,
          },
          content: form.content,
        }),
      });

      if (!postRes.ok) throw new Error("Failed to save post.");
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="max-w-4xl mx-auto px-6 pt-32 pb-24">
      {/* Page Header */}
      <div className="mb-12">
        <div className="inline-block bg-primary text-on-primary px-6 py-1 text-[10px] font-bold tracking-[0.2em] uppercase mb-6">
          New Post
        </div>
        <h1 className="font-headline text-5xl text-primary leading-tight">
          Create an Article
        </h1>
      </div>

      {error && (
        <div className="mb-6 px-4 py-3 bg-error-container text-on-error-container text-sm font-body">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-6 px-4 py-3 bg-surface-container text-primary text-sm font-body">
          Post saved successfully.
        </div>
      )}

      <div className="space-y-10">
        {/* Title */}
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-3">
            Title
          </label>
          <input
            type="text"
            value={form.title}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, title: e.target.value }))
            }
            placeholder="Enter article title..."
            className="w-full bg-transparent border-0 border-b border-outline/30 focus:border-primary focus:ring-0 py-3 font-headline text-3xl text-primary placeholder:text-outline/40"
          />
        </div>

        {/* Category + Tags */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-3">
              Category
            </label>
            <select
              value={form.category}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, category: e.target.value }))
              }
              className="w-full bg-transparent border-0 border-b border-outline/30 focus:border-primary focus:ring-0 py-3 font-body text-sm text-primary"
            >
              <option value="" disabled>
                Select a category
              </option>
              {["news", "sports", "fashion", "tech", "science"].map((cat) => (
                <option key={cat} value={cat} className="capitalize">
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-3">
              Tags{" "}
              <span className="font-normal normal-case tracking-normal text-outline">
                (comma separated)
              </span>
            </label>
            <input
              type="text"
              value={form.tags}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, tags: e.target.value }))
              }
              placeholder="e.g. minimalism, UX, design"
              className="w-full bg-transparent border-0 border-b border-outline/30 focus:border-primary focus:ring-0 py-3 font-body text-sm text-primary placeholder:text-outline/40"
            />
          </div>
        </div>

        {/* Hero Image */}
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-3">
            Hero Image
          </label>
          {form.heroImagePreview ? (
            <div className="relative aspect-21/9 overflow-hidden bg-surface-container-low mb-4">
              <Image
                src={form.heroImagePreview}
                alt="Hero preview"
                fill
                className="object-cover"
              />
              <button
                type="button"
                onClick={() =>
                  setForm((prev) => ({
                    ...prev,
                    heroImage: null,
                    heroImagePreview: "",
                  }))
                }
                className="absolute top-3 right-3 bg-primary text-on-primary px-3 py-1 text-[10px] font-bold uppercase tracking-widest"
              >
                Remove
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center aspect-21/9 border border-dashed border-outline/30 cursor-pointer hover:bg-surface-container-low transition-colors">
              <span className="material-symbols-outlined text-outline text-4xl mb-2">
                add_photo_alternate
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-outline">
                Click to upload hero image
              </span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleHeroImageChange}
              />
            </label>
          )}
          {/* Alt text */}
          <input
            type="text"
            value={form.heroAlt}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, heroAlt: e.target.value }))
            }
            placeholder="Describe the hero image for accessibility..."
            className="w-full mt-3 bg-transparent border-0 border-b border-outline/30 focus:border-primary focus:ring-0 py-2 font-body text-sm text-primary placeholder:text-outline/40"
          />
        </div>

        {/* Rich Text Editor */}
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-3">
            Content
          </label>
          <PostEditor
            onChange={(json) => setForm((prev) => ({ ...prev, content: json }))}
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 pt-6 border-t border-outline/10">
          <button
            type="button"
            onClick={() => handleSubmit("draft")}
            disabled={isSubmitting}
            className="px-10 py-3 border border-outline/30 text-xs font-bold uppercase tracking-widest text-primary hover:bg-surface-container-low transition-colors disabled:opacity-40"
          >
            {isSubmitting ? "Saving..." : "Save Draft"}
          </button>
          <button
            type="button"
            onClick={() => handleSubmit("published")}
            disabled={isSubmitting}
            className="px-10 py-3 bg-primary text-on-primary text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-opacity disabled:opacity-40"
          >
            {isSubmitting ? "Publishing..." : "Publish"}
          </button>
        </div>
      </div>
    </main>
  );
}
