// components/editor/blocks/ParagraphBlockEditor.tsx
"use client";

import { useRef, useState, useCallback } from "react";
import { FormatToolbar } from "./FormatToolbar";
import { ParagraphBlock } from "@/types/editorTypes";

interface Props {
  block: ParagraphBlock;
  onUpdate: (patch: Partial<ParagraphBlock>) => void;
}

export function ParagraphBlockEditor({ block, onUpdate }: Props) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [toolbarCoords, setToolbarCoords] = useState<{
    top: number;
    left: number;
  } | null>(null);
  const [hasSelection, setHasSelection] = useState(false);

  const checkSelection = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;
    const { selectionStart, selectionEnd } = el;
    if (selectionStart === selectionEnd) {
      setToolbarCoords(null);
      setHasSelection(false);
      return;
    }
    setHasSelection(true);
    const rect = el.getBoundingClientRect();
    setToolbarCoords({
      top: rect.top - 44,
      left: rect.left + rect.width / 2 - 52,
    });
  }, []);

  const wrap = useCallback(
    (marker: string) => {
      const el = textareaRef.current;
      if (!el) return;
      const { selectionStart: start, selectionEnd: end } = el;
      const selected = block.content.slice(start, end);
      const before = block.content.slice(0, start);
      const after = block.content.slice(end);
      const isWrapped =
        selected.startsWith(marker) && selected.endsWith(marker);
      const newValue = isWrapped
        ? before + selected.slice(marker.length, -marker.length) + after
        : before + marker + selected + marker + after;
      onUpdate({ content: newValue });
      setToolbarCoords(null);
      setHasSelection(false);
    },
    [block.content, onUpdate],
  );

  return (
    <div>
      {/* Floating portal toolbar still works as bonus on selection */}
      <FormatToolbar
        coords={toolbarCoords}
        onBold={() => wrap("**")}
        onItalic={() => wrap("_")}
      />

      <textarea
        ref={textareaRef}
        value={block.content}
        onChange={(e) => onUpdate({ content: e.target.value })}
        onMouseUp={checkSelection}
        onKeyUp={checkSelection}
        onBlur={() => {
          // Small delay so button clicks register before hiding
          setTimeout(() => {
            setToolbarCoords(null);
            setHasSelection(false);
          }, 150);
        }}
        placeholder="Write a paragraph..."
        rows={3}
        className="w-full bg-transparent border-0 focus:ring-0 resize-none py-2 font-body text-base text-primary placeholder:text-outline/35 leading-relaxed outline-none"
      />
    </div>
  );
}
