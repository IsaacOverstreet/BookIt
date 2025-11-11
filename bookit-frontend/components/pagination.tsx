import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Pagination {
  currentPage: number;
  onPageChange: (page: number) => void;
}
export default function Pagination({ currentPage, onPageChange }: Pagination) {
  console.log("currentPage", currentPage);
  return (
    <div className="flex items-center justify-center gap-4 py-6 w-full border ">
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        variant="outline"
        className="flex items-center gap-2  rounded-full px-6 py-2 text-sm font-medium transition-all duration-200 hover:bg-gray-100 hover:shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="h-4 w-4" />
        <span>Prev</span>
      </Button>

      <span className="text-sm text-gray-600 font-medium px-4">
        Page <span className="font-semibold text-gray-800">{currentPage}</span>
      </span>

      <Button
        onClick={() => onPageChange(currentPage + 1)}
        variant="outline"
        className="flex items-center gap-2 rounded-full px-6 py-2 text-sm font-medium transition-all duration-200 hover:bg-gray-100 hover:shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span>Next</span>
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
