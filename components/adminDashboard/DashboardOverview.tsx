"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiEdit3, FiUsers, FiMail, FiArrowUpRight } from "react-icons/fi";
import { ApiPost, getPosts, requestJson, Overview } from "@/lib/backend";
import { PageHeading, ErrorNotice } from "./AdminUI";
import { PostTable } from "./PostTable";
const actions = [
  {
    title: "Create post",
    text: "Turn your next idea into a story worth reading.",
    href: "/admin/dashboard/posts/create",
    Icon: FiEdit3,
  },
  {
    title: "Manage users",
    text: "Get to know your readers and manage their access.",
    href: "/admin/dashboard/users",
    Icon: FiUsers,
  },
  {
    title: "Newsletter",
    text: "View and manage your newsletter subscribers.",
    href: "/admin/dashboard/newsletter",
    Icon: FiMail,
  },
];
export default function DashboardOverview() {
  const [posts, setPosts] = useState<ApiPost[]>([]),
    [stats, setStats] = useState<Overview | null>(null),
    [loading, setLoading] = useState(true),
    [error, setError] = useState(""),
    [revision, setRevision] = useState(0);
  useEffect(() => {
    let active = true;
    Promise.all([getPosts(1, 5), requestJson<Overview>("/api/admin/overview")])
      .then(([data, overview]) => {
        if (active) {
          setPosts(data.posts);
          setStats(overview);
          setError("");
        }
      })
      .catch((err) => {
        if (active) setError(err.message);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [revision]);
  return (
    <div className="p-5 md:p-9">
      <PageHeading
        title="Your publication, at a glance"
        description="A home for your stories and the community growing around them."
      />
      <ErrorNotice message={error} />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          ["Total posts", stats?.posts],
          ["Published", stats?.published],
          ["Readers", stats?.users],
          ["Article views", stats?.views],
        ].map(([label, value]) => (
          <div
            key={label}
            className="rounded-xl border border-[#e5ded4] bg-white p-6"
          >
            <p className="text-sm text-[#6b645b]">{label}</p>
            <strong className="mt-3 block font-serif text-3xl">
              {typeof value === "number" ? value.toLocaleString() : "--"}
            </strong>
          </div>
        ))}
      </div>
      <section className="my-9">
        <h2 className="mb-4 font-serif text-xl font-semibold">
          Quick actions
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {actions.map(({ title, text, href, Icon }) => (
            <Link
              key={title}
              href={href}
              className="group rounded-xl border border-[#e0d6c7] bg-[#fbf8f2] p-6 transition hover:-translate-y-0.5 hover:border-[#b58b51] hover:bg-white"
            >
              <div className="flex items-center justify-between">
                <span className="grid size-12 place-items-center rounded-lg bg-[#eee4d3] text-xl text-[#896129]">
                  <Icon />
                </span>
                <FiArrowUpRight className="text-xl text-[#91816b]" />
              </div>
              <h3 className="mt-5 text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#6b645b]">
                {text}
              </p>
            </Link>
          ))}
        </div>
      </section>
      <section className="rounded-xl border border-[#e5ded4] bg-white">
        <div className="flex items-center justify-between gap-4 p-6">
          <h2 className="font-serif text-xl font-semibold">Recent posts</h2>
          <Link
            className="text-sm text-[#8c622b] underline underline-offset-4"
            href="/admin/dashboard/posts"
          >
            View all posts
          </Link>
        </div>
        <PostTable
          posts={posts}
          loading={loading}
          onChange={() => setRevision((n) => n + 1)}
          onDelete={() => setRevision((n) => n + 1)}
          onError={setError}
        />
      </section>
    </div>
  );
}
