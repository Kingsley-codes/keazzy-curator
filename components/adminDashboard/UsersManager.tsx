"use client";
import { useEffect, useState } from "react";
import { requestJson, friendlyDate } from "@/lib/backend";
import {
  PageHeading,
  ErrorNotice,
  Pagination,
  input,
  button,
  primaryButton,
} from "./AdminUI";
type User = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  status: "active" | "suspended";
  createdAt: string;
};
type UsersData = {
  users: User[];
  pagination: { page: number; pages: number; total: number };
};
export default function UsersManager() {
  const [data, setData] = useState<UsersData | null>(null),
    [query, setQuery] = useState(""),
    [status, setStatus] = useState(""),
    [page, setPage] = useState(1),
    [revision, setRevision] = useState(0),
    [error, setError] = useState(""),
    [busy, setBusy] = useState(""),
    [editing, setEditing] = useState<User | null>(null);
  useEffect(() => {
    let active = true;
    const timer = setTimeout(() => {
      requestJson<UsersData>(
        `/api/admin/users?${new URLSearchParams({ q: query, status, page: String(page) })}`,
      )
        .then((result) => {
          if (active) {
            setData(result);
            setError("");
          }
        })
        .catch((err) => {
          if (active) setError(err.message);
        });
    }, 200);
    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [query, status, page, revision]);
  async function update(user: User, values: Partial<User>) {
    setBusy(user._id);
    setError("");
    try {
      await requestJson(`/api/admin/users/${user._id}`, {
        method: "PATCH",
        body: JSON.stringify(values),
      });
      setEditing(null);
      setRevision((n) => n + 1);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not update user.");
    } finally {
      setBusy("");
    }
  }
  async function remove(user: User) {
    if (
      !window.confirm(
        `Permanently delete ${user.firstName}’s reader account? Their sessions will be revoked and comments anonymized.`,
      )
    )
      return;
    setBusy(user._id);
    setError("");
    try {
      await requestJson(`/api/admin/users/${user._id}`, { method: "DELETE" });
      setPage(1);
      setRevision((n) => n + 1);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not delete user.");
    } finally {
      setBusy("");
    }
  }
  return (
    <div className="p-5 md:p-9">
      <PageHeading
        title="Readers & community"
        description="Manage reader profiles and account access. Suspended readers cannot sign in or comment."
      />
      <div className="mb-6 flex flex-wrap gap-3">
        <input
          className={`${input} flex-1`}
          aria-label="Search readers"
          placeholder="Search by name or email..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setPage(1);
          }}
        />
        <select
          className={`${input} md:!w-56`}
          aria-label="Account status"
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            setPage(1);
          }}
        >
          <option value="">All readers</option>
          <option value="active">Active</option>
          <option value="suspended">Suspended</option>
        </select>
      </div>
      <ErrorNotice message={error} />
      {editing && (
        <form
          className="mb-6 rounded-xl border border-[#decdb4] bg-[#fbf7ef] p-6"
          onSubmit={(e) => {
            e.preventDefault();
            void update(editing, {
              firstName: editing.firstName,
              lastName: editing.lastName,
            });
          }}
        >
          <h2 className="mb-4 font-serif text-xl">Edit reader profile</h2>
          <p className="mb-4 text-sm text-[#77736c]">{editing.email}</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2">
              <span>First name</span>
              <input
                required
                maxLength={80}
                className={input}
                value={editing.firstName}
                onChange={(e) =>
                  setEditing({ ...editing, firstName: e.target.value })
                }
              />
            </label>
            <label className="space-y-2">
              <span>Last name</span>
              <input
                required
                maxLength={80}
                className={input}
                value={editing.lastName}
                onChange={(e) =>
                  setEditing({ ...editing, lastName: e.target.value })
                }
              />
            </label>
          </div>
          <div className="mt-4 flex gap-3">
            <button className={primaryButton} disabled={!!busy}>
              Save changes
            </button>
            <button
              type="button"
              className={button}
              onClick={() => setEditing(null)}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
      <section className="overflow-hidden rounded-xl border border-[#e5ded4] bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-left text-sm">
            <thead className="bg-[#faf8f4] text-sm text-[#77736c]">
              <tr>
                {["Reader", "Status", "Joined", "Actions"].map((label) => (
                  <th key={label} className="p-5 font-medium">
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#ece5dc]">
              {data?.users.map((user) => (
                <tr key={user._id}>
                  <td className="p-5">
                    <strong className="block font-medium">
                      {user.firstName} {user.lastName}
                    </strong>
                    <span className="mt-1 block text-sm text-[#77736c]">
                      {user.email}
                    </span>
                  </td>
                  <td className="p-5">
                    <span
                      className={`rounded-full px-3 py-1.5 text-sm capitalize ${user.status === "active" ? "bg-emerald-50 text-emerald-800" : "bg-red-50 text-red-800"}`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="p-5 text-[#77736c]">
                    {friendlyDate(user.createdAt)}
                  </td>
                  <td className="p-5">
                    <div className="flex gap-2">
                      <button
                        className={button}
                        disabled={busy === user._id}
                        onClick={() => setEditing(user)}
                      >
                        Edit
                      </button>
                      <button
                        className={button}
                        disabled={busy === user._id}
                        onClick={() => {
                          if (
                            user.status === "active" &&
                            !window.confirm(
                              `Suspend ${user.firstName} and revoke their sessions?`,
                            )
                          )
                            return;
                          void update(user, {
                            status:
                              user.status === "active" ? "suspended" : "active",
                          });
                        }}
                      >
                        {user.status === "active" ? "Suspend" : "Reactivate"}
                      </button>
                      <button
                        className={`${button} text-red-700`}
                        disabled={busy === user._id}
                        onClick={() => remove(user)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {!data?.users.length && (
                <tr>
                  <td colSpan={4} className="p-12 text-center text-[#77736c]">
                    {data
                      ? "No readers match your search."
                      : "Loading readers..."}
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
