"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface searchProp {
  searchbar: string;
  setSearchbarterm: (search: string) => void;
}

export const Search = ({ searchbar, setSearchbarterm }: searchProp) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleSearch() {
    const delay = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (searchbar) params.set("searchTerm", searchbar);
      else params.delete("searchTerm"); // clean url

      router.push(`/?${params.toString()}`);
    }, 1000);
    return () => clearTimeout(delay);
  }

  return (
    <div className="w-full max-w-[443px] flex items-center gap-2 sm:gap-4 mx-auto px-2 sm:px-0">
      {/* Input container */}
      <div className="flex-1 min-h-9 sm:h-[42px] rounded-sm flex items-center gap-2 px-2 sm:px-4 bg-gray-100">
        <input
          type="text"
          placeholder="Search experiences"
          className="flex-1 bg-transparent outline-none text-xs sm:text-sm md:text-base"
          value={searchbar}
          onChange={(e) => setSearchbarterm(e.target.value)}
        />
      </div>

      {/* Button */}
      <button
        onClick={handleSearch}
        className="min-h-9 sm:h-[42px] bg-[#FFD643] rounded-lg px-3 sm:px-5 flex items-center justify-center font-inter font-medium text-xs sm:text-sm md:text-[14px] leading-[18px] tracking-[0%]"
      >
        Search
      </button>
    </div>
  );
};
