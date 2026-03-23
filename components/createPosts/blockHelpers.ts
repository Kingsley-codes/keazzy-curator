// components/editor/blockHelpers.ts
import { ContentNode, PostContent } from "@/types/content";
import { Block, BlockType, ParagraphBlock } from "@/types/editorTypes";

export function generateId(): string {
  return Math.random().toString(36).slice(2, 9);
}

export function createBlock(type: BlockType): Block {
  switch (type) {
    case "paragraph":
      return { id: generateId(), type: "paragraph", content: "" };
    case "heading":
      return { id: generateId(), type: "heading", level: 2, content: "" };
    case "image":
      return {
        id: generateId(),
        type: "image",
        layout: "single",
        images: [{ file: null, preview: "", alt: "" }],
      };
    case "blockquote":
      return { id: generateId(), type: "blockquote", content: "" };
    case "bulletList":
      return { id: generateId(), type: "bulletList", items: [""] };
    case "orderedList":
      return { id: generateId(), type: "orderedList", items: [""] };
  }
}

export function blocksToJSON(blocks: Block[]): PostContent {
  return {
    type: "doc",
    content: blocks.flatMap((block): ContentNode[] => {
      switch (block.type) {
        case "paragraph":
          return [
            {
              type: "paragraph",
              content: block.content
                ? [{ type: "text", text: block.content }]
                : [],
            },
          ];
        case "heading":
          return [
            {
              type: "heading",
              attrs: { level: block.level },
              content: block.content
                ? [{ type: "text", text: block.content }]
                : [],
            },
          ];
        case "blockquote":
          return [
            {
              type: "blockquote",
              content: [
                {
                  type: "paragraph",
                  content: block.content
                    ? [{ type: "text", text: block.content }]
                    : [],
                },
              ],
            },
          ];
        case "bulletList":
          return [
            {
              type: "bulletList",
              content: block.items.map((item) => ({
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: item ? [{ type: "text", text: item }] : [],
                  },
                ],
              })),
            },
          ];
        case "orderedList":
          return [
            {
              type: "orderedList",
              content: block.items.map((item) => ({
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: item ? [{ type: "text", text: item }] : [],
                  },
                ],
              })),
            },
          ];
        case "image":
          return block.images
            .filter((img) => img.src)
            .map((img) => ({
              type: "image",
              attrs: {
                src: img.src,
                alt: img.alt,
                publicId: img.publicId,
                layout: block.layout,
              },
            }));
      }
    }),
  };
}

// Fallback default block when all blocks are removed
export function safeBlocks(blocks: Block[]): Block[] {
  return blocks.length === 0
    ? [createBlock("paragraph") as ParagraphBlock]
    : blocks;
}
