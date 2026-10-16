"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useEffectEvent, useState } from "react";
import { requestJson, friendlyDate, ApiError } from "@/lib/backend";
import {
  button,
  primaryButton,
  input,
  ErrorNotice,
  Pagination,
} from "@/components/adminDashboard/AdminUI";
type Comment = {
  _id: string;
  authorName: string;
  authorRole: string;
  body: string;
  createdAt: string;
  replies?: Comment[];
};
type CommentData = {
  comments: Comment[];
  count: number;
  pagination: { page: number; pages: number; total: number };
};
export function Comments({
  postId,
  admin = false,
  onCountChange,
}: {
  postId: string;
  admin?: boolean;
  onCountChange?: (count: number) => void;
}) {
  const router = useRouter();
  const [data, setData] = useState<CommentData | null>(null),
    [page, setPage] = useState(1),
    [revision, setRevision] = useState(0),
    [error, setError] = useState(""),
    [signedIn, setSignedIn] = useState(admin),
    [body, setBody] = useState(""),
    [replyTo, setReplyTo] = useState<Comment | null>(null),
    [pending, setPending] = useState(false);
  const base = `${admin ? "/api/admin/posts" : "/api/posts"}/${postId}/comments`;
  const reportCount = useEffectEvent((count: number) => onCountChange?.(count));
  useEffect(() => {
    let active = true;
    requestJson<CommentData>(`${base}?page=${page}`)
      .then((result) => {
        if (active) {
          setData(result);
          reportCount(result.count);
        }
      })
      .catch((err) => {
        if (active) setError(err.message);
      });
    return () => {
      active = false;
    };
  }, [base, page, revision]);
  useEffect(() => {
    if (admin) return;
    let active = true;
    requestJson("/api/auth/users/me")
      .then(() => {
        if (active) setSignedIn(true);
      })
      .catch(() => {
        if (!active) return;
        setSignedIn(false);
        router.replace("/login");
      });
    return () => {
      active = false;
    };
  }, [admin, router]);
  async function send(event: React.FormEvent) {
    event.preventDefault();
    setPending(true);
    setError("");
    try {
      await requestJson(base, {
        method: "POST",
        body: JSON.stringify({ body, parentId: replyTo?._id }),
      });
      setBody("");
      setReplyTo(null);
      setRevision((n) => n + 1);
    } catch (err) {
      if (err instanceof ApiError && [401, 403].includes(err.status)) {
        setSignedIn(false);
        router.replace(admin ? "/admin/login" : "/login");
        return;
      }
      setError(err instanceof Error ? err.message : "Could not post comment.");
    } finally {
      setPending(false);
    }
  }
  async function remove(comment: Comment) {
    if (!window.confirm("Delete this comment and its replies?")) return;
    setPending(true);
    setError("");
    try {
      await requestJson(`${base}/${comment._id}`, { method: "DELETE" });
      setRevision((n) => n + 1);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Could not delete comment.",
      );
    } finally {
      setPending(false);
    }
  }
  const renderComment = (comment: Comment, reply = false) => (
    <article
      key={comment._id}
      className={`${reply ? "ml-5 border-l-2 border-[#e3d5bd] pl-5" : "border-b border-[#e9e2d7] py-7"}`}
    >
      <div className="flex flex-wrap items-center gap-3">
        <strong className="text-base">{comment.authorName}</strong>
        {comment.authorRole === "admin" && (
          <span className="rounded bg-[#f0e6d5] px-2 py-1 text-sm text-[#815d2b]">
            Editor
          </span>
        )}
        <time className="text-sm text-[#77736c]">
          {friendlyDate(comment.createdAt)}
        </time>
      </div>
      <p className="mt-3 whitespace-pre-wrap break-words text-base leading-relaxed">
        {comment.body}
      </p>
      <div className="mt-3 flex gap-5">
        {signedIn && !reply && (
          <button
            className="min-h-10 text-base font-medium text-[#8c622b]"
            onClick={() => {
              setReplyTo(comment);
              setBody("");
              document
                .getElementById(`comment-form-${postId}`)
                ?.scrollIntoView({ behavior: "smooth", block: "center" });
            }}
          >
            Respond
          </button>
        )}
        {admin && (
          <button
            disabled={pending}
            onClick={() => remove(comment)}
            className="min-h-10 text-base text-red-700"
          >
            Delete comment
          </button>
        )}
      </div>
      {comment.replies?.map((item) => (
        <div className="mt-5" key={item._id}>
          {renderComment(item, true)}
        </div>
      ))}
    </article>
  );
  return (
    <section className="mt-12 border-t border-[#ded6c9] pt-8">
      <h2 className="font-serif text-3xl font-semibold">
        Conversation {data ? `(${data.count})` : ""}
      </h2>
      <p className="mt-2 text-base text-[#77736c]">
        {admin
          ? "Respond to your readers and keep the conversation welcoming."
          : "Share your thoughts and join the conversation."}
      </p>
      <ErrorNotice message={error} />
      <div id={`comment-form-${postId}`} className="my-6">
        {signedIn ? (
          <form onSubmit={send} className="space-y-3">
            {replyTo && (
              <div className="flex items-center justify-between rounded bg-[#f6f0e6] p-3">
                <span>Replying to {replyTo.authorName}</span>
                <button
                  type="button"
                  onClick={() => setReplyTo(null)}
                  className="underline"
                >
                  Cancel reply
                </button>
              </div>
            )}
            <label className="block">
              <span className="sr-only">Your comment</span>
              <textarea
                required
                maxLength={4000}
                className={`${input} min-h-28`}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder={
                  replyTo ? "Write your response..." : "Write a comment..."
                }
              />
            </label>
            <button
              className={primaryButton}
              disabled={pending || !body.trim()}
            >
              {pending
                ? "Saving..."
                : replyTo
                  ? "Post response"
                  : "Post comment"}
            </button>
          </form>
        ) : (
          <Link href="/login" className={button}>
            Sign in to join the conversation
          </Link>
        )}
      </div>
      {data?.comments.map((c) => renderComment(c))}
      {data && !data.count && (
        <p className="py-6 text-base text-[#77736c]">
          No comments yet. Start the conversation.
        </p>
      )}
      {data && data.pagination.pages > 1 && (
        <Pagination {...data.pagination} onChange={setPage} />
      )}
    </section>
  );
}
