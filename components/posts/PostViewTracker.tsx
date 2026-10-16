"use client";
import { useEffect, useRef } from "react";
import { requestJson } from "@/lib/backend";
export function PostViewTracker({ postId }: { postId: string }) {
  const recorded = useRef<string | null>(null);
  useEffect(() => {
    if (recorded.current === postId) return;
    recorded.current = postId;
    requestJson(`/api/posts/${postId}/view`, { method: "POST" }).catch(
      () => {},
    );
  }, [postId]);
  return null;
}
