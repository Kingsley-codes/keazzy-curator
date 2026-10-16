"use client";
import { useEffect, useRef } from "react";
import { cleanHtml } from "@/lib/post-content";
export function RichTextField({
  value,
  onChange,
  placeholder,
  className,
  onKeyDown,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  className?: string;
  onKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current && document.activeElement !== ref.current)
      ref.current.innerHTML = cleanHtml(value);
  }, [value]);
  return (
    <div
      ref={ref}
      role="textbox"
      aria-label={placeholder}
      contentEditable
      suppressContentEditableWarning
      data-placeholder={placeholder}
      onInput={(event) => onChange(event.currentTarget.innerHTML)}
      onKeyDown={onKeyDown}
      className={`${className ?? ""} min-h-10 empty:before:text-[#aaa] empty:before:content-[attr(data-placeholder)]`}
    />
  );
}
