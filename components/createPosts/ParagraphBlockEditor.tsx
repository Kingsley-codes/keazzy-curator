// components/editor/blocks/ParagraphBlockEditor.tsx
"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { FormatToolbar } from "./FormatToolbar";
import { ParagraphBlock } from "@/types/editorTypes";
import { useFormatContext } from "./FormatContext";

interface Props {
  block: ParagraphBlock;
  onUpdate: (patch: Partial<ParagraphBlock>) => void;
}

export function ParagraphBlockEditor({ block, onUpdate }: Props) {
  const divRef = useRef<HTMLDivElement>(null);
  const { registerFormatter, reportFormatState } = useFormatContext();

  const [toolbarCoords, setToolbarCoords] = useState<{
    top: number;
    left: number;
  } | null>(null);
  const [localFormats, setLocalFormats] = useState({
    isBold: false,
    isItalic: false,
  });

  // ── Sync initial content into the DOM once on mount only ────────────────
  // After that, the DOM is the source of truth (contenteditable).
  // We use a ref to avoid re-setting innerHTML on every parent re-render,
  // which would destroy the caret position.
  const initialised = useRef(false);
  useEffect(() => {
    const el = divRef.current;
    if (!el || initialised.current) return;
    initialised.current = true;
    el.innerHTML = block.content ?? "";
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Apply bold or italic via execCommand ─────────────────────────────────
  const applyFormat = useCallback(
    (type: "bold" | "italic") => {
      const el = divRef.current;
      if (!el) return;
      el.focus();
      document.execCommand(type, false);
      // Persist the updated HTML back to the block model
      onUpdate({ content: el.innerHTML });
      // Re-read format state from the selection so toolbars update
      const isBold = document.queryCommandState("bold");
      const isItalic = document.queryCommandState("italic");
      setLocalFormats({ isBold, isItalic });
      reportFormatState({ isBold, isItalic });
    },
    [onUpdate, reportFormatState],
  );

  // ── Register formatter so the main toolbar can trigger it ────────────────
  useEffect(() => {
    registerFormatter(applyFormat);
  }, [registerFormatter, applyFormat]);

  // ── Shared: read caret/selection format state and update both toolbars ────
  const refreshFormats = useCallback(() => {
    const el = divRef.current;
    if (!el) return;
    const active = document.activeElement;
    if (active !== el && !el.contains(active)) return;

    const isBold = document.queryCommandState("bold");
    const isItalic = document.queryCommandState("italic");
    setLocalFormats({ isBold, isItalic });
    reportFormatState({ isBold, isItalic });
  }, [reportFormatState]);

  // ── Update toolbar position and active state on selection changes ────────
  const handleSelectionChange = useCallback(() => {
    const el = divRef.current;
    if (!el) return;
    const active = document.activeElement;
    if (active !== el && !el.contains(active)) return;

    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0 || sel.isCollapsed) {
      setToolbarCoords(null);
      setLocalFormats({ isBold: false, isItalic: false });
      reportFormatState({ isBold: false, isItalic: false });
      return;
    }

    // Position the floating toolbar above the selection
    const range = sel.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    if (rect.width > 0) {
      setToolbarCoords({
        top: rect.top - 44,
        left: rect.left + rect.width / 2 - 52,
      });
    }

    refreshFormats();
  }, [reportFormatState, refreshFormats]);

  useEffect(() => {
    document.addEventListener("selectionchange", handleSelectionChange);
    return () =>
      document.removeEventListener("selectionchange", handleSelectionChange);
  }, [handleSelectionChange]);

  return (
    <div>
      <FormatToolbar
        coords={toolbarCoords}
        onBold={() => applyFormat("bold")}
        onItalic={() => applyFormat("italic")}
        isBold={localFormats.isBold}
        isItalic={localFormats.isItalic}
      />

      <div
        ref={divRef}
        contentEditable
        suppressContentEditableWarning
        onInput={(e) => {
          onUpdate({ content: (e.currentTarget as HTMLDivElement).innerHTML });
        }}
        onKeyUp={refreshFormats}
        onBlur={() => {
          if (divRef.current) {
            onUpdate({ content: divRef.current.innerHTML });
          }
          // Delay hide so toolbar button mousedown fires before blur hides it
          setTimeout(() => {
            setToolbarCoords(null);
            setLocalFormats({ isBold: false, isItalic: false });
            reportFormatState({ isBold: false, isItalic: false });
          }, 150);
        }}
        data-placeholder="Write a paragraph..."
        className="w-full bg-transparent border-0 focus:ring-0 py-2 font-body text-base text-primary placeholder:text-outline/35 leading-relaxed outline-none empty:before:content-[attr(data-placeholder)] empty:before:text-outline/35 empty:before:pointer-events-none"
      />
    </div>
  );
}
