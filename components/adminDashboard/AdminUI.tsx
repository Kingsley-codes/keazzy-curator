import Link from "next/link";
export const button =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-[#dcd6cd] bg-white px-4 py-2 text-base font-medium transition hover:bg-[#f4f0e9] disabled:cursor-wait disabled:opacity-50";
export const primaryButton = `${button} !border-[#20201e] !bg-[#20201e] !text-white hover:!bg-[#443623]`;
export const input =
  "min-h-12 w-full rounded-md border border-[#dcd6cd] bg-white px-4 py-3 text-base outline-none focus:border-[#a7742f] focus:ring-2 focus:ring-[#c89b55]/20";
export function PageHeading({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="mb-8 flex flex-wrap items-end justify-between gap-5">
      <div>
        <Link href="/admin/dashboard" className="text-sm text-[#8a6b40]">
          Publication workspace
        </Link>
        <h1 className="mt-2 font-serif text-4xl font-semibold md:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-[#6a655d]">
            {description}
          </p>
        )}
      </div>
      {children}
    </header>
  );
}
export function ErrorNotice({ message }: { message: string }) {
  return message ? (
    <p
      role="alert"
      className="my-4 rounded-md border border-red-200 bg-red-50 px-5 py-4 text-base text-red-800"
    >
      {message}
    </p>
  ) : null;
}
export function Pagination({
  page,
  pages,
  total,
  onChange,
}: {
  page: number;
  pages: number;
  total: number;
  onChange: (page: number) => void;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#e8e2d9] p-5 text-base">
      <span className="text-[#6a655d]">
        {total.toLocaleString()} results · Page {page} of {Math.max(1, pages)}
      </span>
      <div className="flex gap-2">
        <button
          className={button}
          disabled={page <= 1}
          onClick={() => onChange(page - 1)}
        >
          Previous
        </button>
        <button
          className={button}
          disabled={page >= pages}
          onClick={() => onChange(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
