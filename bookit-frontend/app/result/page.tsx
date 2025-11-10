import { Check } from "lucide-react";
import Link from "next/link";

export default function Result() {
  return (
    <div className="flex   flex-col items-center justify-start w-full  h-dvh py-10 px-4 sm:px-[50px] lg:px-[115px] mt-[100px]  gap-6 bg-[#FAFAFA] text-center">
      {/* Success Icon */}
      <div className="bg-green-500 rounded-full p-4">
        <Check className="text-white w-10 h-10" />
      </div>

      {/* Confirmation Text */}
      <h1 className="text-2xl sm:text-3xl font-semibold">Booking Confirmed</h1>

      {/* Reference ID */}
      <p className="text-gray-500 text-sm sm:text-base">Ref ID: HUF56&SO</p>

      {/* Back to Home Button */}
      <Link
        href="/"
        className="bg-gray-200 text-[#656565] font-medium px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors mt-6"
      >
        Back to Home
      </Link>
    </div>
  );
}
