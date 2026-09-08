import type { ReactNode } from "react";

export function SiteContainer({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1280px] px-[18px] md:px-7 xl:px-10 ${className}`}>{children}</div>;
}
