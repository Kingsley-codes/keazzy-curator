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
        className="bg-surface-container border-0 text-[10px] font-bold uppercase tracking-widest text-primary px-2 py-1 focus:ring-0 shrink-0"
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
        className={`w-full bg-transparent border-0 border-b border-outline/20 focus:border-primary focus:ring-0 py-2 font-headline text-primary placeholder:text-outline/40
          ${block.level === 2 ? "text-3xl" : block.level === 3 ? "text-2xl" : "text-xl"}`}
      />
    </div>
  );
}
