import CheckOutForm from "@/components/checkOutForm";
import { ArrowLeft } from "lucide-react";

export default function Details() {
  return (
    <div className=" flex flex-col w-full px-4 sm:px-[50px] lg:px-[50px] min-h-dvh mt-[100px]  xl:px-[150px]">
      <div className="w-full ">
        {/* navigate back */}
        <div className="flex items-center gap-2 py-3">
          <ArrowLeft className="w-3 h-3" />
          <h3 className="font-inter font-medium text-[14px] leading-[18px] text-black">
            Details
          </h3>
        </div>
        <div>
          <CheckOutForm />
        </div>
      </div>
    </div>
  );
}
