import ChooseSchedule from "@/components/chooseSchedule";
import FullExperienceImage from "@/components/fullExperienceImage";
import OrderSummary from "@/components/orderSummary";
import { ArrowLeft } from "lucide-react";

export default function Details() {
  return (
    <div className="flex flex-col w-full px-4 sm:px-[50px] lg:px-[50px] min-h-dvh mt-[100px]  xl:px-[115px]">
      <div className="w-full">
        {/* Header */}
        <div className="flex items-center gap-2 py-3">
          <ArrowLeft className="w-3 h-3" />
          <h3 className="font-inter font-medium text-[14px] leading-[18px] text-black">
            Details
          </h3>
        </div>

        <div className="flex flex-col lg:w-full lg:flex-row xl:w-full w-full gap-5 justify-between 2xl:justify-start">
          {/* Image + Order Summary */}
          <div className="flex flex-col ">
            <FullExperienceImage />
            <ChooseSchedule />
          </div>
          {/* Schedule Section */}
          <OrderSummary />
        </div>
      </div>
    </div>
  );
}
