// components/editor/blocks/BlockquoteBlockEditor.tsx

import { BlockquoteBlock } from "@/types/editorTypes";

interface Props {
  block: BlockquoteBlock;
  onUpdate: (patch: Partial<BlockquoteBlock>) => void;
}

export function BlockquoteBlockEditor({ block, onUpdate }: Props) {
  return (
    <div className="border-l-4 border-primary pl-6">
      <textarea
        value={block.content}
        onChange={(e) => onUpdate({ content: e.target.value })}
        placeholder="Enter a pull quote or blockquote..."
        rows={2}
        className="w-full bg-transparent border-0 focus:ring-0 resize-none font-headline italic text-xl text-primary/80 placeholder:text-outline/40 leading-relaxed"
      />
    </div>
  );
}
