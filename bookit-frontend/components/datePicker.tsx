"use client";
import { ExperienceByIdType } from "@/services/getExperiences";
import { useState } from "react";
import { SelectDateType } from "./chooseSchedule";

interface dateProp {
  details: ExperienceByIdType;
  currentSelection: SelectDateType[];
  onCurrentSelection: (selectedDate: SelectDateType[]) => void;
}

export default function DatePicker({
  details,
  onCurrentSelection,
  currentSelection,
}: dateProp) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  function handleOnClick(id: string) {
    console.log("currentSelection", currentSelection);
    setSelectedDate(id);

    const found = details?.dates?.find((t) => t.id === id);

    const times = found?.times ?? [];
    console.log("🚀 ~ handleOnClick ~ newSelect:", times);
    onCurrentSelection(times);
    console.log("🚀 ~ DatePicker ~ currentSelection:", currentSelection);
  }

  return (
    <div className="flex flex-wrap gap-2 sm:gap-3">
      {details.dates.map((d) => {
        const date = new Date(d.date);
        const formatted = date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        });

        return (
          <div
            key={d.id}
            onClick={() => handleOnClick(d.id)}
            className={`h-[34px] px-3 py-2 min-w-[60px] sm:min-w-[70px] flex items-center justify-center rounded-sm cursor-pointer transition text-sm
          ${
            selectedDate === d.id
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
