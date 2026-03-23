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

export function BlockRenderer({ block, onUpdate }: Props) {
  switch (block.type) {
    case "paragraph":
      return <ParagraphBlockEditor block={block} onUpdate={onUpdate} />;
    case "heading":
      return <HeadingBlockEditor block={block} onUpdate={onUpdate} />;
    case "blockquote":
      return <BlockquoteBlockEditor block={block} onUpdate={onUpdate} />;
    case "bulletList":
    case "orderedList":
      return <ListBlockEditor block={block} onUpdate={onUpdate} />;
    case "image":
      return <ImageBlockEditor block={block} onUpdate={onUpdate} />;
  }
}
