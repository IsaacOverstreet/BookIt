"use client";
import { useState } from "react";

export default function DatePicker() {
  const availableDates = [
    "2025-10-28",
    "2025-10-29",
    "2025-10-30",
    "2025-10-31",
  ];

  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  return (
    <div className="flex flex-wrap gap-2 sm:gap-3">
      {availableDates.map((dateStr) => {
        const date = new Date(dateStr);
        const formatted = date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        });

        return (
          <div
            key={dateStr}
            onClick={() => setSelectedDate(dateStr)}
            className={`h-[34px] px-3 py-2 min-w-[60px] sm:min-w-[70px] flex items-center justify-center rounded-sm cursor-pointer transition text-sm
          ${
            selectedDate === dateStr
              ? "bg-[#FFD643] text-black"
              : "bg-[#F9F9F9] border border-[#BDBDBD] text-[#838383] hover:bg-gray-300"
          }`}
          >
            {formatted}
          </div>
        );
      })}
    </div>
  );
}
