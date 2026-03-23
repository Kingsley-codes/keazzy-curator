// components/editor/FormatToolbar.tsx
"use client";
import { createPortal } from "react-dom";
import { MdFormatBold, MdFormatItalic } from "react-icons/md";

interface Props {
  coords: { top: number; left: number } | null;
  onBold: () => void;
  onItalic: () => void;
  isBold?: boolean;
  isItalic?: boolean;
}

export function FormatToolbar({
  coords,
  onBold,
  onItalic,
  isBold = false,
  isItalic = false,
}: Props) {
  if (!coords) return null;

  return createPortal(
    <div
      style={{ top: coords.top, left: coords.left }}
      className="fixed z-9999 flex items-center gap-0.5 bg-gray-100 border border-gray-200 shadow-lg px-1.5 py-1 rounded-sm"
    >
      <button
        type="button"
        onMouseDown={(e) => {
          e.preventDefault();
          onBold();
        }}
        title="Bold"
        className={`p-1.5 rounded-sm transition-colors ${
          isBold
            ? "bg-gray-900 text-white"
            : "text-primary active:bg-gray-950 active:text-white hover:bg-gray-300"
        }`}
      >
        <MdFormatBold size={16} />
      </button>
      <div className="w-px h-4 bg-white/20" />
      <button
        type="button"
        onMouseDown={(e) => {
          e.preventDefault();
          onItalic();
        }}
        title="Italic"
        className={`p-1.5 rounded-sm transition-colors ${
          isItalic
            ? "bg-gray-900 text-white"
            : "text-primary active:bg-gray-950 active:text-white hover:bg-gray-300"
        }`}
      >
        <MdFormatItalic size={16} />
      </button>
    </div>,
    document.body,
  );
}
