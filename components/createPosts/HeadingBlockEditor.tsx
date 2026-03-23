// components/editor/blocks/HeadingBlockEditor.tsx

import { HeadingBlock, HeadingLevel } from "@/types/editorTypes";

interface Props {
  block: HeadingBlock;
  onUpdate: (patch: Partial<HeadingBlock>) => void;
}

export function HeadingBlockEditor({ block, onUpdate }: Props) {
  return (
    <div className="flex items-center gap-3">
      <select
        value={block.level}
        onChange={(e) =>
          onUpdate({ level: Number(e.target.value) as HeadingLevel })
        }
        className="bg-surface-container text-[10px] font-bold uppercase tracking-widest text-primary px-2 py-1 border-0 focus:ring-0 shrink-0 rounded-sm cursor-pointer"
      >
        <option value={2}>H2</option>
        <option value={3}>H3</option>
        <option value={4}>H4</option>
      </select>
      <input
        type="text"
        value={block.content}
        onChange={(e) => onUpdate({ content: e.target.value })}
        placeholder={
          block.level === 2
            ? "Section heading..."
            : block.level === 3
              ? "Sub-heading..."
              : "Minor heading..."
        }
        className={`w-full bg-transparent border-0 focus:ring-0 py-1 font-headline text-primary placeholder:text-outline/35 outline-none
          ${block.level === 2 ? "text-2xl font-bold" : block.level === 3 ? "text-xl font-semibold" : "text-lg font-medium"}`}
      />
    </div>
  );
}
