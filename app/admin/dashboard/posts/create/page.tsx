// app/create-post/page.tsx
"use client";
import { useState } from "react";
import { PostContent } from "@/types/content";
import { PostEditor } from "@/components/createPosts/PostEditor";
import Image from "next/image";
import { MdAddPhotoAlternate } from "react-icons/md";
import { submitPost } from "@/lib/submitPost";

interface PostForm {
  title: string;
  category: string;
  tags: string;
  status: "draft" | "published";
  isFeatured: boolean;
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
    isFeatured: false,
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
      await submitPost({
        title: form.title,
        category: form.category,
        tags: form.tags,
        status,
        isFeatured: form.isFeatured,
        heroImage: form.heroImage,
        heroAlt: form.heroAlt,
        content: form.content,
      });
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
        <div className="inline-block bg-primary text-gray-100 px-6 py-1 text-[10px] font-bold tracking-[0.2em] uppercase mb-6 rounded-sm">
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
            className="w-full focus:outline-none bg-transparent border-0 border-b py-3 font-headline text-3xl text-primary placeholder:text-gray-400"
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
              className="w-full focus:outline-none bg-transparent border-0 caret-primary border-b border-outline/30 focus:border-primary focus:ring-0 py-3 font-body text-sm text-primary placeholder:text-outline/40"
            />
          </div>
        </div>

        {/* Featured Toggle */}
        <div className="py-3 border-b border-outline/10">
          <div>
            <label className="block text-[10px] mb-1.5 font-bold uppercase tracking-[0.2em] text-primary">
              Featured Post
            </label>

            <button
              type="button"
              role="switch"
              aria-checked={form.isFeatured}
              onClick={() =>
                setForm((prev) => ({ ...prev, isFeatured: !prev.isFeatured }))
              }
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border border-gray-300 transition-colors duration-200 focus:outline-none ${
                form.isFeatured ? "bg-primary" : "bg-outline/30"
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform transition-transform duration-200 ${
                  form.isFeatured ? "translate-x-5" : "translate-x-0"
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
          <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-3">
            Hero Image
          </label>
          {form.heroImagePreview ? (
            <div className="relative aspect-21/9 overflow-hidden bg-gray-50 mb-4">
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
            <label className="flex flex-col items-center justify-center aspect-21/9 border border-dashed border-outline/30 cursor-pointer hover:bg-gray-50 rounded-md transition-colors">
              <MdAddPhotoAlternate className="w-20 text-gray-600 h-20" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
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
            className="w-full focus:outline-none mt-3 bg-transparent border-0 border-b border-outline/30 focus:border-primary focus:ring-0 py-2 font-body text-sm text-primary placeholder:text-gray-400"
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
            className="px-10 py-3 border rounded-sm border-outline/30 text-xs font-bold uppercase tracking-widest text-primary hover:bg-gray-800 hover:text-gray-100 transition-colors disabled:opacity-40"
          >
            {isSubmitting ? "Saving..." : "Save Draft"}
          </button>
          <button
            type="button"
            onClick={() => handleSubmit("published")}
            disabled={isSubmitting}
            className="px-10 py-3 bg-primary text-gray-100 rounded-sm text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-opacity disabled:opacity-40"
          >
            {isSubmitting ? "Publishing..." : "Publish"}
          </button>
        </div>
      </div>
    </main>
  );
}
