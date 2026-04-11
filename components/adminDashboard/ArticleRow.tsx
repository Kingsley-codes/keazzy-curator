import { Article } from "@/types";
import Image from "next/image";
import { MdEdit, MdDelete } from "react-icons/md";

interface ArticleRowProps {
  article: Article;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function ArticleRow({
  article,
  onEdit,
  onDelete,
}: ArticleRowProps) {
  const statusColor =
    article.status === "Published" ? "bg-emerald-500" : "bg-amber-500";

  return (
    <tr className="hover:bg-surface-container-low/30 transition-colors">
      <td className="px-8 py-5">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded bg-surface-container-high overflow-hidden flex-shrink-0 relative">
            <Image
              src={article.coverImage}
              alt={article.title}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <p className="font-body font-semibold text-on-surface leading-tight">
              {article.title}
            </p>
            <p className="text-xs text-on-surface-variant mt-1">
              Author: {article.author}
            </p>
          </div>
        </div>
      </td>
      <td className="px-8 py-5">
        <span className="px-2 py-1 bg-surface-container-high text-on-surface-variant text-[10px] font-bold uppercase rounded tracking-wider">
          {article.category}
        </span>
      </td>
      <td className="px-8 py-5">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${statusColor}`}></span>
          <span className="text-sm font-medium text-on-surface">
            {article.status}
          </span>
        </div>
      </td>
      <td className="px-8 py-5 text-sm text-on-surface-variant font-medium">
        {article.publishDate || "—"}
      </td>
      <td className="px-8 py-5 text-right">
        <div className="flex justify-end gap-3">
          <button
            onClick={() => onEdit(article.id)}
            className="text-outline hover:text-primary transition-colors"
          >
            <MdEdit className="text-xl" />
          </button>
          <button
            onClick={() => onDelete(article.id)}
            className="text-outline hover:text-error transition-colors"
          >
            <MdDelete className="text-xl" />
          </button>
        </div>
      </td>
    </tr>
  );
}
