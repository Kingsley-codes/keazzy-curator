// lib/submitPost.ts
//
// Replaces the two-step hero-upload + post-submit flow in the original page.tsx
// with a single multipart request. Drop this into your lib/ folder and call it
// from the page's handleSubmit.

import { PostContent, ContentNode } from "@/types/content";

export interface PostFormData {
  title: string;
  category: string;
  tags: string;
  status: "draft" | "published";
  isFeatured: boolean;
  heroImage: File;
  heroAlt: string;
  content: PostContent;
}

// ─── Image slot descriptor ────────────────────────────────────────────────────
// For every image block slot that has a File (not yet uploaded), we need to:
//   1. Append the File to FormData under "contentImages"
//   2. Record a slot descriptor so the server knows the key, alt, layout,
//      and (for updates) the old publicId to delete.

interface ImageSlot {
  key: string;
  alt: string;
  layout: "single" | "side-by-side";
  oldPublicId?: string; // present when replacing an existing image on update
}

// ─── Walk the content tree ────────────────────────────────────────────────────

interface ImageNodeAttrs {
  src?: string;
  alt?: string;
  publicId?: string;
  layout?: "single" | "side-by-side";
  // The file object lives outside the serialisable tree;
  // we attach it as a non-standard property before calling submitPost.
  _file?: File;
  _key?: string;
}

/**
 * Recursively walk the content tree.
 * - Image nodes with a _file get a generated key inserted and the File is
 *   collected into `files` / `slots`.
 * - Image nodes with an existing src/publicId (already uploaded) pass through.
 * Returns the sanitised content tree (no File objects).
 */
function extractImageFiles(
  nodes: ContentNode[],
  files: File[],
  slots: ImageSlot[],
): ContentNode[] {
  return nodes.map((node) => {
    if (node.type === "image") {
      const attrs = node.attrs as ImageNodeAttrs;

      if (attrs._file) {
        const key =
          attrs._key ?? `img-${Math.random().toString(36).slice(2, 7)}`;
        files.push(attrs._file);
        slots.push({
          key,
          alt: attrs.alt ?? "",
          layout: attrs.layout ?? "single",
          oldPublicId: attrs.publicId, // undefined for new images
        });

        // Return a clean node — the server will inject src + publicId
        return {
          ...node,
          attrs: {
            src: "",
            alt: attrs.alt ?? "",
            publicId: "",
            layout: attrs.layout ?? "single",
            key, // the server uses this to match file → node
          },
        } as ContentNode;
      }

      // Already-uploaded image: pass through as-is (no _file)
      return node;
    }

    // Recurse into container nodes
    if ("content" in node && Array.isArray(node.content)) {
      return {
        ...node,
        content: extractImageFiles(node.content, files, slots),
      } as ContentNode;
    }

    return node;
  });
}

// ─── Public API ───────────────────────────────────────────────────────────────

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

/**
 * Build a multipart/form-data request and POST to /api/posts.
 * Returns the created post JSON on success, or throws with the server error.
 */
export async function submitPost(
  data: PostFormData,
): Promise<{ post: unknown }> {
  const fd = new FormData();

  // ── Hero image ──────────────────────────────────────────────────────────
  fd.append("heroImage", data.heroImage);
  fd.append("heroImageAlt", data.heroAlt);

  // ── Scalar fields ───────────────────────────────────────────────────────
  fd.append("title", data.title.trim());
  fd.append("category", data.category);
  fd.append("status", data.status);
  fd.append("isFeatured", String(data.isFeatured));

  const tags = data.tags
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
  tags.forEach((tag) => fd.append("tags[]", tag));

  // ── Content images ──────────────────────────────────────────────────────
  const contentFiles: File[] = [];
  const imageSlots: ImageSlot[] = [];

  const sanitisedContent: PostContent = {
    ...data.content,
    content: extractImageFiles(data.content.content, contentFiles, imageSlots),
  };

  fd.append("content", JSON.stringify(sanitisedContent));

  if (imageSlots.length > 0) {
    fd.append("imageSlots", JSON.stringify(imageSlots));
  }

  contentFiles.forEach((file) => fd.append("contentImages", file));

  // ── Request ─────────────────────────────────────────────────────────────
  const res = await fetch(`${API_URL}/api/admin/posts`, {
    method: "POST",
    body: fd,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(
      (body as { error?: string }).error ?? "Failed to save post.",
    );
  }

  return res.json();
}

/**
 * PATCH /api/posts/:id — same multipart shape, partial update.
 */
export async function updatePost(
  id: string,
  data: Partial<PostFormData>,
): Promise<{ post: unknown }> {
  const fd = new FormData();

  if (data.heroImage) {
    fd.append("heroImage", data.heroImage);
  }
  if (data.heroAlt !== undefined) fd.append("heroImageAlt", data.heroAlt);
  if (data.title) fd.append("title", data.title.trim());
  if (data.category) fd.append("category", data.category);
  if (data.status) fd.append("status", data.status);
  if (data.isFeatured !== undefined)
    fd.append("isFeatured", String(data.isFeatured));
  if (data.tags !== undefined) {
    data.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean)
      .forEach((tag) => fd.append("tags[]", tag));
  }

  if (data.content) {
    const contentFiles: File[] = [];
    const imageSlots: ImageSlot[] = [];

    const sanitisedContent: PostContent = {
      ...data.content,
      content: extractImageFiles(
        data.content.content,
        contentFiles,
        imageSlots,
      ),
    };

    fd.append("content", JSON.stringify(sanitisedContent));
    if (imageSlots.length > 0)
      fd.append("imageSlots", JSON.stringify(imageSlots));
    contentFiles.forEach((file) => fd.append("contentImages", file));
  }

  const res = await fetch(`${API_URL}/api/admin/posts/${id}`, {
    method: "PATCH",
    body: fd,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(
      (body as { error?: string }).error ?? "Failed to update post.",
    );
  }

  return res.json();
}
