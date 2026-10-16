"use client";
import { useEffect, useState } from "react";
import { ApiPost, getAdminPost } from "@/lib/backend";
import { PostForm } from "./PostForm";
import { ErrorNotice } from "./AdminUI";
export function PostEditorScreen({ id }: { id: string }) {
  const [post, setPost] = useState<ApiPost | null>(null),
    [error, setError] = useState("");
  useEffect(() => {
    let active = true;
    getAdminPost(id)
      .then((data) => {
        if (active) setPost(data.post);
      })
      .catch((err) => {
        if (active) setError(err.message);
      });
    return () => {
      active = false;
    };
  }, [id]);
  return error ? (
    <div className="p-8">
      <ErrorNotice message={error} />
    </div>
  ) : post ? (
    <PostForm key={post._id} post={post} />
  ) : (
    <p className="p-9 text-sm text-[#77736c]">Loading article...</p>
  );
}
