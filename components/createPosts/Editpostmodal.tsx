// components/createPosts/EditPostModal.tsx
"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { MdAddPhotoAlternate, MdClose, MdCheck } from "react-icons/md";
import { PostEditor } from "./PostEditor";
import { PostContent } from "@/types/content";
import { Block } from "@/types/editorTypes";
import { contentToBlocks } from "@/lib/contentToBlocks";
import { updatePost } from "@/lib/submitPost";

// ─── Types ────────────────────────────────────────────────────────────────────

interface PostData {
  _id: string;
  title: string;
  category: string;
  tags: string[];
  status: "draft" | "published";
  featured: boolean;
  heroImage: { src: string; publicId: string; alt: string };
  content: PostContent;
}

interface EditForm {
  title: string;
  category: string;
  tags: string;
  status: "draft" | "published";
  featured: boolean;
  heroImage: File | null;
  heroImagePreview: string;
  heroImagePublicId: string;
  heroAlt: string;
  content: PostContent | null;
}

interface EditPostModalProps {
  /** MongoDB _id of the post to edit */
  postId: string;
  /** Called after a successful save so the parent can refresh its data */
  onSaved?: (updatedPost: unknown) => void;
  /** Called when the user closes the modal without saving */
  onClose: () => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function EditPostModal({
  postId,
  onSaved,
  onClose,
}: EditPostModalProps) {
  const [form, setForm] = useState<EditForm>({
    title: "",
    category: "",
    tags: "",
    status: "draft",
    featured: false,
    heroImage: null,
    heroImagePreview: "",
    heroImagePublicId: "",
    heroAlt: "",
    content: null,
  });

  const [initialBlocks, setInitialBlocks] = useState<Block[] | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  // ── Fetch post data on mount ────────────────────────────────────────────
  useEffect(() => {
    if (!postId) return;

    setIsLoading(true);
    setError(null);

    fetch(`/api/posts/${postId}`)
      .then((r) => {
        if (!r.ok) throw new Error("Failed to load post.");
        return r.json() as Promise<{ post: PostData }>;
      })
      .then(({ post }) => {
        setForm({
          title: post.title,
          category: post.category,
          tags: post.tags.join(", "),
          status: post.status,
          featured: post.featured ?? false,
          heroImage: null,
          heroImagePreview: post.heroImage.src,
          heroImagePublicId: post.heroImage.publicId,
          heroAlt: post.heroImage.alt,
          content: post.content,
        });
        // Convert stored JSON → editor blocks so PostEditor starts pre-filled
        setInitialBlocks(contentToBlocks(post.content));
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, [postId]);

  // ── Close on Escape ─────────────────────────────────────────────────────
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  // ── Prevent body scroll while open ──────────────────────────────────────
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // ── Hero image change ───────────────────────────────────────────────────
  const handleHeroImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setForm((prev) => ({
      ...prev,
      heroImage: file,
      heroImagePreview: URL.createObjectURL(file),
    }));
  };

  // ── Submit ──────────────────────────────────────────────────────────────
  const handleSave = useCallback(
    async (status: "draft" | "published") => {
      if (!form.title.trim()) return setError("Title is required.");
      if (!form.category) return setError("Category is required.");
      if (!form.content) return setError("Content is required.");

      setIsSaving(true);
      setError(null);

      try {
        const { post } = await updatePost(postId, {
          title: form.title,
          category: form.category,
          tags: form.tags,
          status,
          isFeatured: form.featured,
          heroImage: form.heroImage ?? undefined,
          heroAlt: form.heroAlt,
          content: form.content,
        });

        setSuccess(true);
        onSaved?.(post);

        // Auto-close after short success flash
        setTimeout(onClose, 1200);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong.");
      } finally {
        setIsSaving(false);
      }
    },
    [form, postId, onClose, onSaved],
  );

  // ── Click outside to close ──────────────────────────────────────────────
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) onClose();
  };

  // ─── Render ──────────────────────────────────────────────────────────────

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 backdrop-blur-sm overflow-y-auto py-10 px-4"
    >
      <div className="relative w-full max-w-4xl bg-surface rounded-sm shadow-2xl">
        {/* ── Modal header ───────────────────────────────────────────────── */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-8 py-5 bg-surface border-b border-outline/10">
          <div>
            <div className="inline-block bg-primary text-gray-100 px-4 py-0.5 text-[10px] font-bold tracking-[0.2em] uppercase mb-1 rounded-sm">
              Editing
            </div>
            <h2 className="font-headline text-2xl text-primary leading-tight">
              {isLoading ? "Loading post…" : form.title || "Untitled post"}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 text-outline/60 hover:text-primary transition-colors"
            title="Close"
          >
            <MdClose size={22} />
          </button>
        </div>

        {/* ── Body ───────────────────────────────────────────────────────── */}
        <div className="px-8 py-8">
          {/* Error / success banners */}
          {error && (
            <div className="mb-6 px-4 py-3 bg-error-container text-on-error-container text-sm font-body rounded-sm">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-6 px-4 py-3 bg-surface-container text-primary text-sm font-body rounded-sm flex items-center gap-2">
              <MdCheck size={16} />
              Post saved successfully.
            </div>
          )}

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-32 gap-4">
              <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-outline/50">
                Loading post data…
              </span>
            </div>
          ) : (
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
                  className="w-full bg-transparent border-0 border-b border-outline/30 focus:border-primary focus:ring-0 py-3 font-headline text-3xl text-primary placeholder:text-outline/40 caret-primary outline-none"
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
                    {["news", "sports", "fashion", "tech", "science"].map(
                      (cat) => (
                        <option key={cat} value={cat} className="capitalize">
                          {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </option>
                      ),
                    )}
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
                    className="w-full bg-transparent border-0 border-b border-outline/30 focus:border-primary focus:ring-0 py-3 font-body text-sm text-primary placeholder:text-outline/40 caret-primary outline-none"
                  />
                </div>
              </div>

              {/* Featured toggle */}
              <div className="flex items-center justify-between py-3 border-b border-outline/10">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                    Featured Post
                  </label>
                  <p className="text-xs text-outline/60 font-body mt-0.5">
                    Featured posts are highlighted on the homepage.
                  </p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={form.featured}
                  onClick={() =>
                    setForm((prev) => ({ ...prev, featured: !prev.featured }))
                  }
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none ${
                    form.featured ? "bg-primary" : "bg-outline/30"
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform transition-transform duration-200 ${
                      form.featured ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* Hero Image */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-3">
                  Hero Image
                </label>

                {form.heroImagePreview ? (
                  <div className="relative aspect-[21/9] overflow-hidden bg-gray-50 mb-4">
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
                      Replace
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center aspect-[21/9] border border-dashed border-outline/30 cursor-pointer hover:bg-gray-50 rounded-md transition-colors">
                    <MdAddPhotoAlternate className="w-20 h-20 text-outline/40" />
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

                <input
                  type="text"
                  value={form.heroAlt}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, heroAlt: e.target.value }))
                  }
                  placeholder="Describe the hero image for accessibility..."
                  className="w-full mt-3 bg-transparent border-0 border-b border-outline/30 focus:border-primary focus:ring-0 py-2 font-body text-sm text-primary placeholder:text-outline/40 caret-primary outline-none"
                />
              </div>

              {/* Content editor — pre-filled via initialBlocks */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-3">
                  Content
                </label>
                {/*
                  Key on initialBlocks ensures the editor re-mounts only when
                  the blocks are first loaded, not on every form state change.
                */}
                <PostEditor
                  key={initialBlocks ? "loaded" : "empty"}
                  initialBlocks={initialBlocks}
                  onChange={(json) =>
                    setForm((prev) => ({ ...prev, content: json }))
                  }
                />
              </div>

              {/* Actions */}
              <div className="flex items-center gap-4 pt-6 border-t border-outline/10">
                <button
                  type="button"
                  onClick={() => handleSave("draft")}
                  disabled={isSaving}
                  className="px-10 py-3 border rounded-sm border-outline/30 text-xs font-bold uppercase tracking-widest text-primary hover:bg-gray-800 hover:text-gray-100 transition-colors disabled:opacity-40"
                >
                  {isSaving ? "Saving…" : "Save Draft"}
                </button>
                <button
                  type="button"
                  onClick={() => handleSave("published")}
                  disabled={isSaving}
                  className="px-10 py-3 bg-primary text-gray-100 rounded-sm text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-opacity disabled:opacity-40"
                >
                  {isSaving ? "Publishing…" : "Publish"}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isSaving}
                  className="ml-auto px-6 py-3 text-xs font-bold uppercase tracking-widest text-outline/60 hover:text-primary transition-colors disabled:opacity-40"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
