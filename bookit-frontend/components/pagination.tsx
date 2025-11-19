import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

interface Pagination {
  currentPage: number;
  onPageChange: (page: number) => void;
  totalPage: number;
}
export default function Pagination({
  currentPage,
  onPageChange,
  totalPage,
}: Pagination) {
  const router = useRouter();
  function scrollToTop() {
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 100);
  }
  function nextPage() {
    const newPage = currentPage + 1;
    onPageChange(newPage);
    router.push(`/?page=${newPage}`);
    scrollToTop();
  }

  function prevPage() {
    const newPage = currentPage - 1;
    onPageChange(newPage);
    router.push(`/?page=${newPage}`);
    scrollToTop();
    console.log("here");
  }
  console.log("currentPage", currentPage);
  return (
    <div className="flex items-center justify-center gap-4 py-6 w-full">
      <Button
        onClick={prevPage}
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
        onClick={nextPage}
        disabled={currentPage === totalPage}
        variant="outline"
        className="flex items-center gap-2 rounded-full px-6 py-2 text-sm font-medium transition-all duration-200 hover:bg-gray-100 hover:shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span>Next</span>
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
