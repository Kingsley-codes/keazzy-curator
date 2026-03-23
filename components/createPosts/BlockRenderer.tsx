// components/editor/BlockRenderer.tsx

import { Block } from "@/types/editorTypes";
import { ParagraphBlockEditor } from "./ParagraphBlockEditor";
import { HeadingBlockEditor } from "./HeadingBlockEditor";
import { BlockquoteBlockEditor } from "./BlockquoteBlockEditor";
import { ListBlockEditor } from "./ListBlockEditor";
import { ImageBlockEditor } from "./ImageBlockEditor";

interface Props {
  block: Block;
  onUpdate: (patch: Partial<Block>) => void;
}

// Maps block type labels so each block has a visible type indicator
const BLOCK_LABEL: Record<string, string> = {
  paragraph: "¶ Paragraph",
  heading: "Heading",
  image: "Image",
  blockquote: "Quote",
  bulletList: "Bullet List",
  orderedList: "Numbered List",
};

export function BlockRenderer({ block, onUpdate }: Props) {
  return (
    <div className="w-full">
      {/* Block type label */}
      <span className="inline-block text-[9px] font-bold uppercase tracking-[0.15em] text-outline/40 mb-1 select-none">
        {BLOCK_LABEL[block.type]}
      </span>

      {/* Actual editor */}
      {block.type === "paragraph" && (
        <ParagraphBlockEditor block={block} onUpdate={onUpdate} />
      )}
      {block.type === "heading" && (
        <HeadingBlockEditor block={block} onUpdate={onUpdate} />
      )}
      {block.type === "blockquote" && (
        <BlockquoteBlockEditor block={block} onUpdate={onUpdate} />
      )}
      {(block.type === "bulletList" || block.type === "orderedList") && (
        <ListBlockEditor block={block} onUpdate={onUpdate} />
      )}
      {block.type === "image" && (
        <ImageBlockEditor block={block} onUpdate={onUpdate} />
      )}
    </div>
  );
}
