"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FiBookmark, FiHeart, FiMessageCircle } from "react-icons/fi";
import { ApiError, requestJson } from "@/lib/backend";

type InteractionState = {
  authenticated: boolean;
  isLiked: boolean;
  isFavorited: boolean;
};

export function PostInteractions({
  postId,
  postSlug,
  likes,
  comments,
  compact = false,
}: {
  postId: string;
  postSlug: string;
  likes: number;
  comments: number;
  compact?: boolean;
}) {
  const router = useRouter();
  const [state, setState] = useState<InteractionState | null>(null);
  const [likeCount, setLikeCount] = useState(likes);
  const [commentCount, setCommentCount] = useState(comments);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLikeCount(likes);
    setCommentCount(comments);
  }, [likes, comments]);

  useEffect(() => {
    if (compact) return;
    let active = true;
    requestJson<InteractionState>(`/api/posts/${postId}/interactions`)
      .then((result) => { if (active) setState(result); })
      .catch(() => { if (active) setState({ authenticated: false, isLiked: false, isFavorited: false }); });
    return () => { active = false; };
  }, [compact, postId]);

  useEffect(() => {
    function updateCommentCount(event: Event) {
      const detail = (event as CustomEvent<{ postId: string; count: number }>).detail;
      if (detail.postId === postId) setCommentCount(detail.count);
    }
    function updateLikeCount(event: Event) {
      const detail = (event as CustomEvent<{ postId: string; count: number }>).detail;
      if (detail.postId === postId) setLikeCount(detail.count);
    }
    window.addEventListener("post-comment-count", updateCommentCount);
    window.addEventListener("post-like-count", updateLikeCount);
    return () => {
      window.removeEventListener("post-comment-count", updateCommentCount);
      window.removeEventListener("post-like-count", updateLikeCount);
    };
  }, [postId]);

  function requireSignIn() {
    const returnTo = `${window.location.pathname}${window.location.search}`;
    router.push(`/login?redirect=${encodeURIComponent(returnTo)}`);
  }

  async function toggle(kind: "like" | "favorite") {
    if (pending) return;
    if (state && !state.authenticated) { requireSignIn(); return; }
    const current = state ?? { authenticated: true, isLiked: false, isFavorited: false };
    setPending(true);
    setError("");
    try {
      const result = await requestJson<{ isLiked?: boolean; isFavorited?: boolean; likes?: number }>(
        `/api/posts/${postId}/${kind}`,
        { method: "POST" },
      );
      setState({
        ...current,
        isLiked: result.isLiked ?? current.isLiked,
        isFavorited: result.isFavorited ?? current.isFavorited,
      });
      if (typeof result.likes === "number") {
        setLikeCount(result.likes);
        window.dispatchEvent(new CustomEvent("post-like-count", { detail: { postId, count: result.likes } }));
      }
    } catch (err) {
      if (err instanceof ApiError && [401, 403].includes(err.status)) {
        setState({ ...current, authenticated: false });
        requireSignIn();
      } else {
        setError(err instanceof Error ? err.message : "Could not update this story.");
      }
    } finally {
      setPending(false);
    }
  }

  const iconClass = compact ? "text-[11px]" : "text-sm";
  const actionClass = "inline-flex min-h-8 items-center gap-1.5 rounded px-1.5 text-[#66645f] transition hover:text-[#9a6e32] disabled:opacity-50";

  return (
    <div className={`flex items-center gap-2 ${compact ? "text-[10px]" : "text-xs"}`}>
      <button type="button" className={`${actionClass} ${state?.isLiked ? "text-rose-700" : ""}`} onClick={() => void toggle("like")} disabled={pending} aria-label={state?.isLiked ? "Unlike this story" : "Like this story"} aria-pressed={state?.isLiked ?? false}>
        <FiHeart className={iconClass} fill={state?.isLiked ? "currentColor" : "none"} /> <span>{likeCount}</span>
      </button>
      <a href={`/posts/${postSlug}#comments`} className={`${actionClass}`} aria-label={`${commentCount} comments`}>
        <FiMessageCircle className={iconClass} /> <span>{commentCount}</span>
      </a>
      <button type="button" className={`${actionClass} ${state?.isFavorited ? "text-[#9a6e32]" : ""}`} onClick={() => void toggle("favorite")} disabled={pending} aria-label={state?.isFavorited ? "Remove from favorites" : "Add to favorites"} aria-pressed={state?.isFavorited ?? false}>
        <FiBookmark className={iconClass} fill={state?.isFavorited ? "currentColor" : "none"} />
        <span className="sr-only">{state?.isFavorited ? "Saved" : "Save"}</span>
      </button>
      {error && <span role="status" className="text-[10px] text-red-700">{error}</span>}
    </div>
  );
}
