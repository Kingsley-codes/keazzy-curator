import Link from "next/link";

export function Brand({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" aria-label="Keazzy's Curations home" className={`inline-flex w-max flex-col leading-none ${light ? "text-white" : "text-[#111]"}`}>
      <strong className="font-serif text-[25px] font-semibold tracking-[0.035em] md:text-[29px]">KEAZZY’S</strong>
      <span className="mt-1 ml-1 text-[7px] tracking-[0.58em] md:text-[8px]">CURATIONS</span>
    </Link>
  );
}
