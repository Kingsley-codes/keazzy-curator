// types/content.ts  — replaces JSONContent from Tiptap
export interface ContentNode {
  type: string;
  attrs?: Record<string, unknown>;
  content?: ContentNode[];
  text?: string;
  marks?: { type: string; attrs?: Record<string, unknown> }[];
}

export interface PostContent {
  type: "doc";
  content: ContentNode[];
}
