import type { Category } from "@/lib/editorial-data";

const colors: Record<Category, string> = {
  News: "text-[#8e594d]",
  Sports: "text-[#397b50]",
  Fashion: "text-[#a86d70]",
  Tech: "text-[#b45f2d]",
  Science: "text-[#665194]",
};

export function CategoryLabel({ category, light = false }: { category: Category; light?: boolean }) {
  return <span className={`text-[10px] font-semibold tracking-[0.16em] uppercase ${light ? "text-[#e6c98f]" : colors[category]}`}>{category}</span>;
}
