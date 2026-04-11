import { MdChevronRight } from "react-icons/md";

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="px-8 py-6 bg-surface-container-low/20 flex justify-between items-center text-sm text-on-surface-variant font-medium">
      <span>
        Showing {startItem}-{endItem} of {totalItems} articles
      </span>
      <div className="flex gap-1">
        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
          const pageNumber = i + 1;
          const isActive = pageNumber === currentPage;
          return (
            <button
              key={pageNumber}
              onClick={() => onPageChange(pageNumber)}
              className={`w-8 h-8 flex items-center justify-center rounded transition-colors ${
                isActive
                  ? "border border-surface-container-high bg-white shadow-sm hover:bg-slate-50"
                  : "hover:bg-surface-container-high"
              }`}
            >
              {pageNumber}
            </button>
          );
        })}
        {totalPages > 5 && (
          <>
            <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-surface-container-high transition-colors">
              ...
            </button>
            <button
              onClick={() => onPageChange(totalPages)}
              className="w-8 h-8 flex items-center justify-center rounded hover:bg-surface-container-high transition-colors"
            >
              {totalPages}
            </button>
          </>
        )}
        <button
          onClick={() =>
            currentPage < totalPages && onPageChange(currentPage + 1)
          }
          className="w-8 h-8 flex items-center justify-center rounded hover:bg-surface-container-high transition-colors"
        >
          <MdChevronRight className="text-sm" />
        </button>
      </div>
    </div>
  );
}
