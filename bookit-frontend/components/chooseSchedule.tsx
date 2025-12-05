import { ExperienceByIdType } from "@/services/getExperiences";
import DatePicker from "./datePicker";
import { useState } from "react";
import TimeSelector from "./timeSelector";

interface ScheduleProp {
  details: ExperienceByIdType;
  onSetTimeId: React.Dispatch<React.SetStateAction<string>>;
  onShowSummary: React.Dispatch<React.SetStateAction<boolean>>;
}
export interface SelectDateType {
  id?: string;
  time?: string;
  dateId?: string;
  slots?: Slot[];
}

export interface Slot {
  id: string;
  capacity: number;
  timeId: string;
}

export default function ChooseSchedule({
  details,
  onShowSummary,
  onSetTimeId,
}: ScheduleProp) {
  const savedSelection = JSON.parse(
    localStorage.getItem("currentDatesSelection") || "null"
  );
  console.log("🚀 ~ savedSelection:", savedSelection);
  const [currentSelection, SetCurrentSelection] = useState<SelectDateType[]>(
    savedSelection || []
  );

  console.log("🚀 ~ currentSelection:", currentSelection);

  return (
    <div className="mb-2.5 w-full max-w-[765px] flex flex-col gap-6 py-4 sm:py-6 md:py-8 ">
      {/* Header Section */}
      <div className="w-full flex flex-col gap-2">
        <h3 className="font-inter font-medium text-[20px] sm:text-[22px] md:text-[24px] leading-8 text-black">
          {details.title}
        </h3>
        <p className="font-inter font-normal text-[14px] sm:text-[15px] md:text-[16px] leading-6 text-[#6C6C6C]">
          {details.description}
        </p>
      </div>

      {/* Date & Time Picker Section */}
      <div className="w-full flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          {/* Date Picker */}
          <div className="w-full flex flex-col gap-1.5">
            <h3 className="font-inter font-medium text-[16px] sm:text-[17px] md:text-[18px] leading-[22px] text-black">
              Choose date
            </h3>
            <DatePicker
              details={details}
              currentSelection={currentSelection}
              onCurrentSelection={SetCurrentSelection}
            />
          </div>

          {/* Time Picker with Slots */}
          <div className="w-full flex flex-col gap-1.5 mt-[15px]">
            <h3 className="font-inter font-medium text-[16px] sm:text-[17px] md:text-[18px] leading-[22px] text-black">
              Choose time
            </h3>
            <TimeSelector
              details={details}
              currentSelection={currentSelection}
              onShowSummary={onShowSummary}
              onSetTimeId={onSetTimeId}
            />
          </div>

          <p className="font-inter font-normal text-[12px] leading-4 text-[#838383]">
            All times are in IST (GMT +5:30)
          </p>
        </div>

        {/* About Section */}
        <div className="w-full flex flex-col gap-1">
          <h3 className="font-inter font-medium text-[16px] sm:text-[17px] md:text-[18px] leading-[22px] text-black">
            About
          </h3>
          <div className="w-full flex flex-col gap-2.5 rounded-sm p-2.5 sm:p-3 md:p-4 bg-[#EEEEEE]">
            <p className="font-inter font-normal text-[12px] sm:text-[13px] md:text-[14px] leading-4 text-[#838383]">
              Scenic routes, trained guides, and safety briefing. Minimum age
              10.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
