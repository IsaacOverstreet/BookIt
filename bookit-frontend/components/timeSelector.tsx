"use client";
import { useEffect, useState } from "react";
import { SelectDateType } from "./chooseSchedule";
import { ExperienceByIdType } from "@/services/getExperiences";

interface TimeProp {
  details: ExperienceByIdType;
  currentSelection: SelectDateType[];
  onShowSummary: React.Dispatch<React.SetStateAction<boolean>>;
  onSetTimeId: React.Dispatch<React.SetStateAction<string>>;
}
export default function TimeSelector({
  currentSelection,
  details,
  onShowSummary,
  onSetTimeId,
}: TimeProp) {
  const savedTime = localStorage.getItem("selectedTime");

  const [selectedTime, setSelectedTime] = useState<string | null>(
    savedTime || null
  );

  const handleSelect = (id: string) => {
    if (!id) return;
    onShowSummary(true);
    onSetTimeId(id);
    setSelectedTime(id);
    localStorage.setItem("selectedTime", id);
    localStorage.setItem("showSummary", JSON.stringify(true));
  };

  return (
    <div className="flex flex-wrap gap-2 sm:gap-3">
      {currentSelection.map((t) => {
        const isSoldOut = t.slots?.length === 0;
        const availableSlot = t.slots?.length;
        const isSelected = selectedTime === t.id && !isSoldOut;

        return (
          <div
            key={t.time}
            onClick={() => {
              if (!isSoldOut && t.id) {
                handleSelect(t.id);
              }
            }}
            className={`
              flex items-center justify-center text-[#838383] gap-1 px-3 py-2
              min-w-[100px] sm:min-w-[120px] md:min-w-[140px] h-10 rounded-sm cursor-pointer transition
              ${
                isSoldOut
                  ? "bg-[#CCCCCC] cursor-not-allowed"
                  : "bg-[#F9F9F9] hover:bg-[#FFD643] border border-[#BDBDBD]"
              }
              ${isSelected ? "bg-[#FFD643] text-black border-none" : ""}
            `}
          >
            <span className="font-medium text-sm">{t.time}</span>
            <span
              className={`text-xs ${
                isSoldOut ? "text-[#6A6A6A]" : "text-[#FF4C0A]"
              }`}
            >
              {isSoldOut ? "Sold out" : `${availableSlot} left`}
            </span>
          </div>
        );
      })}
    </div>
  );
}
