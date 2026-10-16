"use client";
import { createPortal } from "react-dom";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  FiMoreHorizontal,
  FiEdit2,
  FiTrash2,
  FiEyeOff,
  FiSend,
} from "react-icons/fi";
import { ApiPost, deletePost, setPostStatus } from "@/lib/backend";
import { button } from "./AdminUI";
export function PostActions({
  post,
  onChange,
  onDelete,
  onError,
  toolbar = false,
}: {
  post: ApiPost;
  onChange: (post: ApiPost) => void;
  onDelete: (id: string) => void;
  onError: (message: string) => void;
  toolbar?: boolean;
}) {
  const [open, setOpen] = useState(false),
    [pending, setPending] = useState(false);
  const root = useRef<HTMLDivElement>(null),
    menu = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  useEffect(() => {
    if (!open) return;
    menu.current?.querySelector<HTMLElement>("a, button")?.focus();
    const close = (e: PointerEvent) => {
      if (
        !root.current?.contains(e.target as Node) &&
        !menu.current?.contains(e.target as Node)
      )
        setOpen(false);
    };
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        root.current?.querySelector("button")?.focus();
      }
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        const items = Array.from(menu.current?.querySelectorAll<HTMLElement>("a, button") ?? []);
        if (!items.length) return;
        e.preventDefault();
        const current = items.indexOf(document.activeElement as HTMLElement);
        items[(current + (e.key === "ArrowDown" ? 1 : -1) + items.length) % items.length]?.focus();
      }
    };
    const scroll = () => setOpen(false);
    window.addEventListener("scroll", scroll, true);
    window.addEventListener("resize", scroll);
    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", key);
    return () => {
      window.removeEventListener("scroll", scroll, true);
      window.removeEventListener("resize", scroll);
      document.removeEventListener("pointerdown", close);
      document.removeEventListener("keydown", key);
    };
  }, [open]);
  async function action(remove = false) {
    if (
      remove &&
      !window.confirm(
        `Delete "${post.title}" and its comments? This cannot be undone.`,
      )
    )
      return;
    setPending(true);
    onError("");
    try {
      if (remove) {
        await deletePost(post._id);
        onDelete(post._id);
      } else {
        const status = post.status === "published" ? "draft" : "published";
        await setPostStatus(post._id, status);
        onChange({ ...post, status });
      }
      setOpen(false);
    } catch (error) {
      onError(
        error instanceof Error ? error.message : "Could not update this post.",
      );
    } finally {
      setPending(false);
    }
  }
  const item = toolbar
    ? button
    : "flex w-full items-center gap-3 rounded px-4 py-3 text-left text-sm hover:bg-[#f6f2eb] disabled:opacity-50";
  const controls = (
    <>
      <Link className={item} href={`/admin/dashboard/posts/${post._id}/edit`}>
        <FiEdit2 /> Edit
      </Link>
      <button className={item} disabled={pending} onClick={() => action()}>
        {post.status === "published" ? <FiEyeOff /> : <FiSend />}
        {post.status === "published" ? "Unpublish" : "Publish"}
      </button>
      <button
        className={`${item} text-red-700`}
        disabled={pending}
        onClick={() => action(true)}
      >
        <FiTrash2 /> Delete
      </button>
    </>
  );
  return toolbar ? (
    <div className="flex flex-wrap gap-3">{controls}</div>
  ) : (
    <div className="relative" ref={root}>
      <button
        className="grid size-11 place-items-center rounded-md border border-[#ded8cf] hover:bg-[#f6f2eb]"
        aria-label={`Actions for ${post.title}`}
        aria-expanded={open}
        onClick={(event) => {
          const rect = event.currentTarget.getBoundingClientRect();
          setPosition({
            top:
              rect.bottom + 170 > window.innerHeight
                ? rect.top - 160
                : rect.bottom + 6,
            left: Math.max(8, rect.right - 208),
          });
          setOpen(!open);
        }}
      >
        <FiMoreHorizontal className="text-xl" />
      </button>
      {open &&
        createPortal(
          <div
            ref={menu}
            style={position}
            className="fixed z-50 w-52 rounded-lg border border-[#e1dacf] bg-white p-1 shadow-xl"
          >
            {controls}
          </div>,
          document.body,
        )}
    </div>
  );
}
