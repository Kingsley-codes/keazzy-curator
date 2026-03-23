// components/editor/AddBlockMenu.tsx
"use client";
import { BlockType } from "@/types/editorTypes";
import { useState } from "react";
import {
  MdNotes,
  MdTitle,
  MdAddPhotoAlternate,
  MdFormatQuote,
  MdFormatListBulleted,
  MdFormatListNumbered,
  MdAdd,
} from "react-icons/md";

const BLOCK_OPTIONS: {
  type: BlockType;
  label: string;
  icon: React.ReactNode;
}[] = [
  { type: "paragraph", label: "Paragraph", icon: <MdNotes size={15} /> },
  { type: "heading", label: "Heading", icon: <MdTitle size={15} /> },
  { type: "image", label: "Image", icon: <MdAddPhotoAlternate size={15} /> },
  { type: "blockquote", label: "Quote", icon: <MdFormatQuote size={15} /> },
  {
    type: "bulletList",
    label: "Bullet List",
    icon: <MdFormatListBulleted size={15} />,
  },
  {
    type: "orderedList",
    label: "Numbered List",
    icon: <MdFormatListNumbered size={15} />,
  },
];

interface Props {
  onAdd: (type: BlockType) => void;
  compact?: boolean;
}

export function AddBlockMenu({ onAdd, compact = false }: Props) {
  const [open, setOpen] = useState(false);

  if (compact) {
    return (
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-outline hover:text-primary transition-colors py-1"
        >
          <MdAdd size={14} />
          Add block
        </button>
        {open && (
          <div className="absolute left-0 top-7 z-50 bg-surface border border-outline/20 shadow-xl p-1 w-52">
            {BLOCK_OPTIONS.map((opt) => (
              <button
                key={opt.type}
                type="button"
                onClick={() => {
                  onAdd(opt.type);
                  setOpen(false);
                }}
                className="flex items-center gap-2.5 px-3 py-2.5 text-[10px] font-bold uppercase tracking-widest text-primary hover:bg-surface-container transition-colors w-full text-left"
              >
                {opt.icon}
                {opt.label}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Full toolbar row — used at the top of the editor
  return (
    <div className="flex flex-wrap items-center gap-1 px-3 py-2 bg-surface-container-low border-b border-outline/15">
      {BLOCK_OPTIONS.map((opt) => (
        <button
          key={opt.type}
          type="button"
          onClick={() => onAdd(opt.type)}
          title={opt.label}
          className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-on-surface-variant hover:bg-primary hover:text-on-primary transition-colors rounded-sm"
        >
          {opt.icon}
          <span>{opt.label}</span>
        </button>
      ))}
    </div>
  );
}
