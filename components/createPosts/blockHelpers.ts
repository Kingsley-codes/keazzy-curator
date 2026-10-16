import { contentHtml } from "@/lib/post-content";
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
            .filter((img) => img.src || img._file || img.file)
            .map((img) => ({
              type: "image",
              attrs: {
                src: img.src ?? img.preview,
                _file: img._file ?? img.file,
                _key: img._key,
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

export function jsonToBlocks(content: PostContent): Block[] {
  return safeBlocks(
    content.content.reduce<Block[]>((blocks, node) => {
      const id = generateId();
      const html = contentHtml(node.content ?? []);
      if (node.type === "paragraph")
        blocks.push({ id, type: "paragraph", content: html });
      else if (node.type === "heading")
        blocks.push({
          id,
          type: "heading",
          level: node.attrs?.level === 3 ? 3 : node.attrs?.level === 4 ? 4 : 2,
          content: html,
        });
      else if (node.type === "blockquote")
        blocks.push({ id, type: "blockquote", content: html });
      else if (node.type === "bulletList" || node.type === "orderedList")
        blocks.push({
          id,
          type: node.type,
          items: (node.content ?? []).map((item) =>
            contentHtml(item.content ?? []),
          ),
        });
      else if (node.type === "image") {
        const image = {
          file: null,
          src: String(node.attrs?.src ?? ""),
          preview: String(node.attrs?.src ?? ""),
          alt: String(node.attrs?.alt ?? ""),
          publicId: String(node.attrs?.publicId ?? ""),
        };
        const previous = blocks.at(-1);
        if (
          node.attrs?.layout === "side-by-side" &&
          previous?.type === "image" &&
          previous.layout === "side-by-side" &&
          previous.images.length === 1
        )
          previous.images.push(image);
        else
          blocks.push({
            id,
            type: "image",
            layout:
              node.attrs?.layout === "side-by-side" ? "side-by-side" : "single",
            images: [image],
          });
      } else if (html) blocks.push({ id, type: "paragraph", content: html });
      return blocks;
    }, []),
  );
}
