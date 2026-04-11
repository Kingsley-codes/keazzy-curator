// utils/contentToBlocks.ts
// Converts a saved PostContent JSON tree back into the Block[] format
// the editor works with internally.

import { PostContent, ContentNode } from "@/types/content";
import { Block } from "@/types/editorTypes";
import { generateId } from "@/components/createPosts/blockHelpers";

export function contentToBlocks(content: PostContent): Block[] {
  const blocks: Block[] = [];

  for (const node of content.content) {
    const block = nodeToBlock(node);
    if (block) blocks.push(block);
  }

  return blocks.length > 0
    ? blocks
    : [{ id: generateId(), type: "paragraph", content: "" }];
}

function nodeToBlock(node: ContentNode): Block | null {
  switch (node.type) {
    case "paragraph": {
      const html = nodesToHtml(node.content ?? []);
      return { id: generateId(), type: "paragraph", content: html };
    }

    case "heading": {
      const level =
        (
          node as {
            type: "heading";
            attrs: { level: number };
            content?: ContentNode[];
          }
        ).attrs?.level ?? 2;
      const text = extractText(node.content ?? []);
      return {
        id: generateId(),
        type: "heading",
        level: level as 2 | 3 | 4,
        content: text,
      };
    }

    case "blockquote": {
      // blockquote wraps a paragraph
      const inner = (node.content ?? [])[0];
      const text = inner ? extractText(inner.content ?? []) : "";
      return { id: generateId(), type: "blockquote", content: text };
    }

    case "bulletList": {
      const items = listItems(node.content ?? []);
      return { id: generateId(), type: "bulletList", items };
    }

    case "orderedList": {
      const items = listItems(node.content ?? []);
      return { id: generateId(), type: "orderedList", items };
    }

    case "image": {
      const attrs = (
        node as {
          type: "image";
          attrs: {
            src?: string;
            alt?: string;
            publicId?: string;
            layout?: "single" | "side-by-side";
          };
        }
      ).attrs;
      return {
        id: generateId(),
        type: "image",
        layout: attrs.layout ?? "single",
        images: [
          {
            file: null,
            preview: attrs.src ?? "",
            src: attrs.src ?? "",
            alt: attrs.alt ?? "",
            publicId: attrs.publicId ?? "",
          },
        ],
      };
    }

    default:
      return null;
  }
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function extractText(nodes: ContentNode[]): string {
  return nodes
    .map((n) => {
      if (n.type === "text") return n.text ?? "";
      if ("content" in n && n.content) return extractText(n.content);
      return "";
    })
    .join("");
}

/**
 * Reconstruct innerHTML for paragraph nodes so bold/italic marks are preserved.
 */
function nodesToHtml(nodes: ContentNode[]): string {
  return nodes
    .map((n) => {
      if (n.type !== "text") return "";
      const text = escapeHtml(n.text ?? "");
      const marks: string[] = (n.marks ?? []).map((m) => m.type);
      let out = text;
      if (marks.includes("bold")) out = `<strong>${out}</strong>`;
      if (marks.includes("italic")) out = `<em>${out}</em>`;
      return out;
    })
    .join("");
}

function escapeHtml(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function listItems(listItemNodes: ContentNode[]): string[] {
  return listItemNodes.map((li) => {
    const para = (li.content ?? [])[0];
    return para ? extractText(para.content ?? []) : "";
  });
}
