"use client";

export const Search = () => {
  return (
    <div className="w-full max-w-[443px] flex items-center gap-2 sm:gap-4 mx-auto px-2 sm:px-0">
      {/* Input container */}
      <div className="flex-1 min-h-9 sm:h-[42px] rounded-sm flex items-center gap-2 px-2 sm:px-4 bg-gray-100">
        <input
          type="text"
          placeholder="Search experiences"
          className="flex-1 bg-transparent outline-none text-xs sm:text-sm md:text-base"
        />
      </div>

      {/* Button */}
      <button className="min-h-9 sm:h-[42px] bg-[#FFD643] rounded-lg px-3 sm:px-5 flex items-center justify-center font-inter font-medium text-xs sm:text-sm md:text-[14px] leading-[18px] tracking-[0%]">
        Search
      </button>
    </div>
  );
};
