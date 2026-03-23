// components/editor/blocks/BlockquoteBlockEditor.tsx

import { BlockquoteBlock } from "@/types/editorTypes";
import { MdFormatQuote } from "react-icons/md";

interface Props {
  block: BlockquoteBlock;
  onUpdate: (patch: Partial<BlockquoteBlock>) => void;
}

export function BlockquoteBlockEditor({ block, onUpdate }: Props) {
  return (
    <div className="flex gap-3 border-l-[3px] border-primary pl-4 py-1">
      <MdFormatQuote size={22} className="text-primary/30 shrink-0 mt-1" />
      <textarea
        value={block.content}
        onChange={(e) => onUpdate({ content: e.target.value })}
        placeholder="Enter a pull quote or blockquote..."
        rows={2}
        className="w-full bg-transparent border-0 focus:ring-0 resize-none font-headline italic text-xl text-primary/75 placeholder:text-outline/35 leading-relaxed outline-none"
      />
    </div>
  );
}
