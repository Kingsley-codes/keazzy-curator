import sanitizeHtml from "sanitize-html";
import type { ContentNode } from "@/types/content";
export const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
export function cleanHtml(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: [
      "p",
      "div",
      "br",
      "strong",
      "b",
      "em",
      "i",
      "u",
      "s",
      "a",
      "h2",
      "h3",
      "h4",
      "blockquote",
      "ul",
      "ol",
      "li",
      "hr",
      "figure",
      "figcaption",
      "img",
      "code",
      "pre",
      "span",
    ],
    allowedAttributes: {
      a: ["href", "title"],
      img: ["src", "alt", "loading"],
      div: [{ name: "class", values: ["image-pair"] }],
    },
    allowedSchemes: ["http", "https", "mailto"],
    allowedSchemesByTag: { img: ["http", "https"] },
    allowProtocolRelative: false,
  });
}
export function contentHtml(nodes: ContentNode[] = []): string {
  const render = (node: ContentNode): string => {
    if (node.type === "text") {
      // Older editor versions stored innerHTML as a text node. Keep those posts readable.
      let text = cleanHtml(node.text ?? "");
      for (const mark of node.marks ?? []) {
        if (mark.type === "bold") text = `<strong>${text}</strong>`;
        if (mark.type === "italic") text = `<em>${text}</em>`;
        if (mark.type === "underline") text = `<u>${text}</u>`;
        if (mark.type === "link")
          text = `<a href="${escapeHtml(String(mark.attrs?.href ?? ""))}">${text}</a>`;
      }
      return text;
    }
    const inner = (node.content ?? []).map(render).join("");
    if (node.type === "paragraph")
      return /<(p|div|h[2-4]|ul|ol|blockquote)[ >]/i.test(inner)
        ? `<div>${inner}</div>`
        : `<p>${inner || "<br>"}</p>`;
    if (node.type === "heading") {
      const level = [2, 3, 4].includes(Number(node.attrs?.level))
        ? Number(node.attrs?.level)
        : 2;
      return `<h${level}>${inner}</h${level}>`;
    }
    const tags: Record<string, string> = {
      blockquote: "blockquote",
      bulletList: "ul",
      orderedList: "ol",
      listItem: "li",
      codeBlock: "pre",
    };
    if (tags[node.type])
      return `<${tags[node.type]}>${inner}</${tags[node.type]}>`;
    if (node.type === "hardBreak") return "<br>";
    if (node.type === "horizontalRule") return "<hr>";
    if (node.type === "image")
      return `<figure><img src="${escapeHtml(String(node.attrs?.src ?? ""))}" alt="${escapeHtml(String(node.attrs?.alt ?? ""))}" loading="lazy">${node.attrs?.alt ? `<figcaption>${escapeHtml(String(node.attrs.alt))}</figcaption>` : ""}</figure>`;
    return inner;
  };
  const parts: string[] = [];
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    if (
      node.type === "image" &&
      node.attrs?.layout === "side-by-side" &&
      nodes[i + 1]?.type === "image" &&
      nodes[i + 1].attrs?.layout === "side-by-side"
    ) {
      parts.push(
        `<div class="image-pair">${render(node)}${render(nodes[++i])}</div>`,
      );
    } else parts.push(render(node));
  }
  return cleanHtml(parts.join(""));
}
export function contentExcerpt(nodes: ContentNode[] = []): string {
  return sanitizeHtml(
    contentHtml(nodes).replace(/<\/(p|div|h[2-4]|li)>/g, " "),
    { allowedTags: [], allowedAttributes: {} },
  )
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
