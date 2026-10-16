import { contentHtml } from "@/lib/post-content";
import type { PostContent } from "@/types/content";
export function ArticleContent({ content }: { content?: PostContent }) {
  return (
    <div
      className="text-lg leading-[1.85] text-[#34312d] break-words [&_p]:my-5 [&_h2]:mt-10 [&_h2]:mb-5 [&_h2]:font-serif [&_h2]:text-4xl [&_h3]:mt-8 [&_h3]:font-serif [&_h3]:text-3xl [&_h4]:mt-6 [&_h4]:text-2xl [&_ul]:my-5 [&_ul]:list-disc [&_ul]:pl-7 [&_ol]:my-5 [&_ol]:list-decimal [&_ol]:pl-7 [&_li]:my-2 [&_a]:text-[#8b5d23] [&_a]:underline [&_blockquote]:my-8 [&_blockquote]:border-l-4 [&_blockquote]:border-[#c89b55] [&_blockquote]:bg-[#f7f4ee] [&_blockquote]:px-6 [&_blockquote]:py-3 [&_blockquote]:font-serif [&_blockquote]:text-2xl [&_figure]:my-7 [&_img]:h-auto [&_img]:w-full [&_img]:rounded-md [&_figcaption]:mt-2 [&_figcaption]:text-center [&_figcaption]:text-sm [&_figcaption]:text-[#77736c] [&_.image-pair]:grid [&_.image-pair]:gap-5 sm:[&_.image-pair]:grid-cols-2 [&_pre]:overflow-x-auto [&_pre]:rounded [&_pre]:bg-[#f1eee8] [&_pre]:p-5"
      dangerouslySetInnerHTML={{ __html: contentHtml(content?.content) }}
    />
  );
}
