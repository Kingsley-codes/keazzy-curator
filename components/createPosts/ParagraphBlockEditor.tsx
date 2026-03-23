// components/editor/blocks/ParagraphBlockEditor.tsx

import { ParagraphBlock } from "@/types/editorTypes";

interface Props {
  block: ParagraphBlock;
  onUpdate: (patch: Partial<ParagraphBlock>) => void;
}

export function ParagraphBlockEditor({ block, onUpdate }: Props) {
  return (
    <textarea
      value={block.content}
      onChange={(e) => onUpdate({ content: e.target.value })}
      placeholder="Write a paragraph..."
      rows={3}
      className="w-full bg-transparent border-0 focus:ring-0 resize-none py-2 font-body text-base text-primary placeholder:text-outline/35 leading-relaxed outline-none"
    />
  );
}
