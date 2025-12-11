import CheckOutForm from "@/components/checkOutForm";
import { ArrowLeft } from "lucide-react";

interface CheckoutProps {
  searchParams: { total?: string };
}
export interface CheckoutTotalType {
  title: string;
  date: string; // ISO date string
  time: string; // "HH:MM"
  quantity: number;
  pricePerTicket: number;
  subTotal: number;
  taxRatePercent: number;
  taxAmount: number;
  total: number;
  timeId: string;
}
export default async function Details({ searchParams }: CheckoutProps) {
  const { total } = await searchParams;
  console.log("🚀 ~ Details ~ total:", total);

  if (!total) {
    return <div>No data provided</div>;
  }

  const decoded = decodeURIComponent(total);
  console.log("🚀 ~ Details ~ decoded:", decoded);
  const data: CheckoutTotalType = JSON.parse(decoded);
  console.log("🚀 ~ Details ~ data:", data);

  // const data = JSON.parse(total);
  // console.log("params", total);

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
          <CheckOutForm checkoutTotal={data} />
        </div>
      </div>
    </div>
  );
}
