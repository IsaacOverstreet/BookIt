"use client";
import { useState } from "react";

interface TimeSlot {
  time: string;
  slots: number;
}

export default function TimePickerWithSlots() {
  // Mock time slots with availability
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([
    { time: "08:00 am", slots: 5 },
    { time: "10:00 am", slots: 5 },
    { time: "12:00 am", slots: 5 },
  ]);

  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const handleSelect = (index: number) => {
    const slot = timeSlots[index];
    if (slot.slots === 0) return; // can't select sold out

    // mark as selected
    setSelectedTime(slot.time);

    // reduce slot by 1
    const updatedSlots = [...timeSlots];
    updatedSlots[index].slots -= 1;
    setTimeSlots(updatedSlots);
  };

  return (
    <div className="flex flex-wrap gap-2 sm:gap-3">
      {timeSlots.map((slot, index) => {
        const isSoldOut = slot.slots === 0;
        const isSelected = selectedTime === slot.time && !isSoldOut;

        return (
          <div
            key={slot.time}
            onClick={() => !isSoldOut && handleSelect(index)}
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
            <span className="font-medium text-sm">{slot.time}</span>
            <span
              className={`text-xs ${
                isSoldOut ? "text-[#6A6A6A]" : "text-[#FF4C0A]"
              }`}
            >
              {isSoldOut ? "Sold out" : `${slot.slots} left`}
            </span>
          </div>
        );
      })}
    </div>
  );
}
