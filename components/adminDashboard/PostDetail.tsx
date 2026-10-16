"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ApiPost, friendlyDate, getAdminPost } from "@/lib/backend";
import { ArticleContent } from "@/components/posts/ArticleContent";
import { Comments } from "@/components/posts/Comments";
import { PostActions } from "./PostActions";
import { ErrorNotice } from "./AdminUI";
export function PostDetail({ id }: { id: string }) {
  const router = useRouter();
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
  if (!post)
    return (
      <div className="p-9">
        <ErrorNotice message={error} />
        {!error && "Loading article..."}
      </div>
    );
  return (
    <div className="mx-auto max-w-6xl p-5 md:p-9">
      <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
        <Link
          href="/admin/dashboard/posts"
          className="text-sm text-[#8c622b]"
        >
          ← All posts
        </Link>
        <PostActions
          toolbar
          post={post}
          onChange={setPost}
          onDelete={() => router.replace("/admin/dashboard/posts")}
          onError={setError}
        />
      </div>
      <ErrorNotice message={error} />
      <div className="mb-7 grid gap-4 sm:grid-cols-3">
        {[
          ["Article views", (post.viewCount ?? 0).toLocaleString()],
          ["Comments", post.commentCount ?? 0],
          ["Publication status", post.status],
        ].map(([label, value]) => (
          <div
            key={label}
            className="rounded-lg border border-[#e5ded4] bg-white p-5"
          >
            <p className="text-sm text-[#77736c]">{label}</p>
            <strong className="mt-2 block text-2xl font-semibold capitalize">
              {value}
            </strong>
          </div>
        ))}
      </div>
      <article className="rounded-xl border border-[#e5ded4] bg-white p-5 md:p-10">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#93692f]">
            {post.category}
          </p>
          <h1 className="mt-3 font-serif text-3xl leading-tight md:text-3xl">
            {post.title}
          </h1>
          <p className="mt-4 text-sm text-[#77736c]">
            {friendlyDate(post.createdAt)} · {post.readTime ?? 1} min read
          </p>
          {post.heroImage?.src && (
            <Image
              src={post.heroImage.src}
              alt={post.heroImage.alt ?? post.title}
              width={1000}
              height={650}
              unoptimized
              className="my-8 h-auto w-full rounded-lg"
            />
          )}
          <ArticleContent content={post.content} />
          {!!post.tags?.length && (
            <div className="mt-8 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-[#f4efe6] px-4 py-2 text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          <Comments
            postId={post._id}
            admin
            onCountChange={(count) =>
              setPost((current) =>
                current ? { ...current, commentCount: count } : current,
              )
            }
          />
        </div>
      </article>
    </div>
  );
}
