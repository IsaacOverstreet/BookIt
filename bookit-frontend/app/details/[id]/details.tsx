"use client";
// needed because we use useQuery
import ChooseSchedule from "@/components/chooseSchedule";
import FullExperienceImage from "@/components/fullExperienceImage";

import OrderSummary from "@/components/orderSummary";
import {
  ExperienceByIdType,
  getExperienceById,
} from "@/services/getExperiences";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import NotFound from "@/components/notFound";
import Loading from "@/components/loadingPage";
import { useState } from "react";

interface Params {
  id: string;
}

export default function Details({ id }: Params) {
  const [showSummary, setShowSummary] = useState(false);
  const [timeId, setTimeId] = useState("");

  const { data, error, isLoading } = useQuery<ExperienceByIdType>({
    queryKey: ["details", id],
    queryFn: () => getExperienceById(id),
    enabled: !!id,
  });

  const details = data;
  console.log(details);

  if (isLoading) return <Loading />;
  if (!details) return <NotFound />;

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
            <FullExperienceImage details={details} />
            <ChooseSchedule
              onSetTimeId={setTimeId}
              onShowSummary={setShowSummary}
              details={details}
            />
          </div>
          {/* Schedule Section */}
          {showSummary && <OrderSummary timeId={timeId} details={details} />}
        </div>
      </div>
    </div>
  );
}
