import type { PostContent } from "@/types/content";

export const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL?.replace(/\/$/, "") ??
  "http://localhost:4000";

export type ApiPost = {
  _id: string;
  title: string;
  slug: string;
  category: string;
  heroImage?: { src?: string; alt?: string; publicId?: string };
  content?: PostContent;
  tags?: string[];
  status: "draft" | "published";
  readTime?: number;
  isFeatured?: boolean;
  viewCount?: number;
  likes?: number;
  dislikes?: number;
  createdAt?: string;
  updatedAt?: string;
};

export type PostsResponse = {
  posts: ApiPost[];
  pagination: { total: number; page: number; limit: number; pages: number };
};

export class ApiError extends Error {
  constructor(message: string, public status: number) { super(message); }
}

export async function requestJson<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const response = await fetch(`${BACKEND_URL}${path}`, {
    ...init,
    credentials: "include",
    headers: {
      ...(init?.body instanceof FormData ? {} : { "Content-Type": "application/json" }),
      ...init?.headers,
    },
  });

  const body = (await response.json().catch(() => ({}))) as T & {
    message?: string;
    error?: string;
  };
  if (!response.ok) {
    throw new ApiError(body.message ?? body.error ?? "The request could not be completed.", response.status);
  }
  return body;
}

export function getPosts(page = 1, limit = 100) {
  return requestJson<PostsResponse>(
    `/api/admin/posts?page=${page}&limit=${limit}`,
  );
}

export function deletePost(id: string) {
  return requestJson<{ success: true; message: string }>(
    `/api/admin/posts/${id}`,
    { method: "DELETE" },
  );
}

export function setPostStatus(id: string, status: ApiPost["status"]) {
  return requestJson<{ success: true; post: ApiPost }>(
    `/api/admin/posts/${id}/status`,
    { method: "PATCH", body: JSON.stringify({ status }) },
  );
}

export function friendlyDate(value?: string) {
  if (!value) return "—";
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

