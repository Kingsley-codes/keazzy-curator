// components/editor/types.ts
export type HeadingLevel = 2 | 3 | 4;

export type BlockType =
  | "paragraph"
  | "heading"
  | "image"
  | "blockquote"
  | "bulletList"
  | "orderedList";

interface BaseBlock {
  id: string;
  type: BlockType;
}

export interface ParagraphBlock extends BaseBlock {
  type: "paragraph";
  content: string;
}

export interface HeadingBlock extends BaseBlock {
  type: "heading";
  level: HeadingLevel;
  content: string;
}

export interface ImageSlot {
  file: File | null;
  preview: string;
  alt: string;
  publicId?: string;
  src?: string;
  _file?: File; // add this
  _key?: string;
}

export interface ImageBlock extends BaseBlock {
  type: "image";
  images: ImageSlot[];
  layout: "single" | "side-by-side";
}

export interface BlockquoteBlock extends BaseBlock {
  type: "blockquote";
  content: string;
}

export interface BulletListBlock extends BaseBlock {
  type: "bulletList";
  items: string[];
}

export interface OrderedListBlock extends BaseBlock {
  type: "orderedList";
  items: string[];
}

export type Block =
  | ParagraphBlock
  | HeadingBlock
  | ImageBlock
  | BlockquoteBlock
  | BulletListBlock
  | OrderedListBlock;
