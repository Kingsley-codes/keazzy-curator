"use client";
import { useEffect, useState } from "react";
import { requestJson, friendlyDate } from "@/lib/backend";
import { PageHeading, ErrorNotice, Pagination, input, button } from "./AdminUI";
type Data = {
  subscribers: { _id: string; email: string; createdAt: string }[];
  pagination: { page: number; pages: number; total: number };
};
export default function NewsletterManager() {
  const [data, setData] = useState<Data | null>(null),
    [query, setQuery] = useState(""),
    [page, setPage] = useState(1),
    [revision, setRevision] = useState(0),
    [error, setError] = useState(""),
    [busy, setBusy] = useState("");
  useEffect(() => {
    let active = true;
    const timer = setTimeout(() => {
      requestJson<Data>(
        `/api/admin/newsletter?${new URLSearchParams({ q: query, page: String(page) })}`,
      )
        .then((result) => {
          if (active) setData(result);
        })
        .catch((err) => {
          if (active) setError(err.message);
        });
    }, 200);
    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [query, page, revision]);
  async function remove(id: string) {
    if (!window.confirm("Remove this subscriber from the newsletter list?"))
      return;
    setBusy(id);
    try {
      await requestJson(`/api/admin/newsletter/${id}`, { method: "DELETE" });
      setPage(1);
      setRevision((n) => n + 1);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Could not remove subscriber.",
      );
    } finally {
      setBusy("");
    }
  }
  return (
    <div className="p-5 md:p-9">
      <PageHeading
        title="Newsletter audience"
        description="The readers who have subscribed to hear more from your publication."
      />
      <input
        className={`${input} mb-6 max-w-xl`}
        aria-label="Search subscribers"
        placeholder="Search by email..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setPage(1);
        }}
      />
      <ErrorNotice message={error} />
      <section className="overflow-hidden rounded-xl border border-[#e5ded4] bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[550px] text-left text-base">
            <thead className="bg-[#faf8f4] text-sm text-[#77736c]">
              <tr>
                <th className="p-5">Email</th>
                <th className="p-5">Subscribed</th>
                <th className="p-5">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e9e2d8]">
              {data?.subscribers.map((item) => (
                <tr key={item._id}>
                  <td className="p-5">{item.email}</td>
                  <td className="p-5 text-[#77736c]">
                    {friendlyDate(item.createdAt)}
                  </td>
                  <td className="p-5">
                    <button
                      className={`${button} text-red-700`}
                      disabled={busy === item._id}
                      onClick={() => remove(item._id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
              {!data?.subscribers.length && (
                <tr>
                  <td colSpan={3} className="p-12 text-center text-[#77736c]">
                    {data
                      ? "No subscribers to show."
                      : "Loading subscribers..."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {data && <Pagination {...data.pagination} onChange={setPage} />}
      </section>
    </div>
  );
}
