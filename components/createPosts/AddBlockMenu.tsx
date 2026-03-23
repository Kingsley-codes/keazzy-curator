// components/editor/AddBlockMenu.tsx
"use client";
import { BlockType } from "@/types/editorTypes";
import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
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

// ── Portal dropdown — renders at document root, never clips ──────────────────
interface PortalDropdownProps {
  anchorRef: React.RefObject<HTMLButtonElement | null>;
  onAdd: (type: BlockType) => void;
  onClose: () => void;
}

function PortalDropdown({ anchorRef, onAdd, onClose }: PortalDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ top: 0, left: 0 });

  // Calculate position from anchor button's bounding rect
  useEffect(() => {
    if (!anchorRef.current) return;
    const rect = anchorRef.current.getBoundingClientRect();

    const left = rect.left; // no scrollX — fixed is relative to viewport

    let top = rect.bottom + 4; // no scrollY
    const dropdownHeight = 260;
    if (rect.bottom + dropdownHeight > window.innerHeight) {
      top = rect.top - dropdownHeight - 4; // flip upward
    }

    setCoords({ top, left });
  }, [anchorRef]);

  // Close on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        anchorRef.current &&
        !anchorRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [anchorRef, onClose]);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return createPortal(
    <div
      ref={dropdownRef}
      style={{ top: coords.top, left: coords.left }}
      className="fixed z-9999 bg-surface border border-outline/20 shadow-xl w-52 py-1 rounded-sm"
    >
      {BLOCK_OPTIONS.map((opt) => (
        <button
          key={opt.type}
          type="button"
          onClick={() => {
            onAdd(opt.type);
            onClose();
          }}
          className="flex items-center gap-2.5 px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest text-primary hover:bg-surface-container transition-colors w-full text-left"
        >
          {opt.icon}
          {opt.label}
        </button>
      ))}
    </div>,
    document.body,
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export function AddBlockMenu({ onAdd, compact = false }: Props) {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  const handleClose = useCallback(() => setOpen(false), []);

  // ── Compact mode: single "+ Add block" trigger with portal dropdown ──
  if (compact) {
    return (
      <>
        <button
          ref={anchorRef}
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-outline hover:text-primary transition-colors py-1"
        >
          <MdAdd size={14} />
          Add block
        </button>

        {open && (
          <PortalDropdown
            anchorRef={anchorRef}
            onAdd={onAdd}
            onClose={handleClose}
          />
        )}
      </>
    );
  }

  // ── Full toolbar: horizontal button row at top of editor ──
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
