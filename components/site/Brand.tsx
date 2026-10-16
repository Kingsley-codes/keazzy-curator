import Link from "next/link";
import Image from "next/image";
export function Brand({ light = false }: { light?: boolean }) {
  return (
    <Link
      href="/"
      aria-label="Keazzy's Curations home"
      className={`inline-flex shrink-0 items-center gap-3 ${light ? "text-white" : "text-[#111]"}`}
    >
      <Image
        src="/images/logo.png"
        alt=""
        width={52}
        height={52}
        className="size-12 object-contain"
        priority
      />
      <span className="flex flex-col">
        <strong className="font-serif text-2xl font-semibold leading-none">
          KEAZZY’S
        </strong>
        <span className="mt-1 text-[11px] tracking-[.25em]">CURATIONS</span>
      </span>
    </Link>
  );
}
