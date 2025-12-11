"use client";
import { calculateTotalPrice } from "@/services/bookingLogic";
import { ExperienceByIdType } from "@/services/getExperiences";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import type { UrlObject } from "url";

interface OrderSummaryProp {
  details: ExperienceByIdType;
  timeId: string;
}
export default function OrderSummary({ details, timeId }: OrderSummaryProp) {
  const savedQuantity = JSON.parse(localStorage.getItem("qty") || "null");
  const [quantity, setQuantity] = useState<number>(savedQuantity || 1);
  const [loading, setLoading] = useState(false);

  const savedSubtotal = JSON.parse(
    localStorage.getItem("subtotalPrice") || "null"
  );
  const [subtotalPrice, setSubTotalPrice] = useState<number>(
    savedSubtotal || details.price
  );

  const tax = subtotalPrice * (details.tax / 100);
  const initialTotal = subtotalPrice + tax;

  const savedTotalPrice = JSON.parse(
    localStorage.getItem("totalPrice") || "null"
  );
  const [totalPrice, setTotalPrice] = useState<number>(
    savedTotalPrice || initialTotal
  );

  const router = useRouter();

  console.log("local", localStorage);
  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => {
        const newQty = prev - 1;
        const newSubtotal = details.price * newQty;
        const newTax = newSubtotal * (details.tax / 100);
        const newTotal = newSubtotal + newTax;

        setSubTotalPrice(newSubtotal);
        setTotalPrice(newTotal);
        return newQty;
      });
    }
  };
  const handleIncrement = () => {
    if (quantity === details.quantity) return;
    setQuantity((prev) => {
      const newQty = prev + 1;
      const newSubtotal = details.price * newQty;
      const newTax = newSubtotal * (details.tax / 100);
      const newTotal = newTax + newSubtotal;

      setSubTotalPrice(newSubtotal);
      setTotalPrice(newTotal);
      return newQty;
    });
  };

  const handleConfirm = async () => {
    if (loading) return; // prevent double submission
    setLoading(true);
    localStorage.setItem("qty", JSON.stringify(quantity));
    localStorage.setItem("subtotalPrice", JSON.stringify(subtotalPrice));
    localStorage.setItem("totalPrice", JSON.stringify(totalPrice));

    const payload = {
      timeId,
      quantity,
    };

    const res = await calculateTotalPrice(payload);

    if (res.success === true) {
      router.push(
        `/checkout?total=${encodeURIComponent(JSON.stringify(res.data))}`
      );
    }
  };

  return (
    <div className="w-full md:w-full lg:w-[387px]  h-auto md:h-[350px] sm:h-[303px] rounded-xl flex flex-col gap-6 p-4 sm:p-6 bg-[#EFEFEF] shadow-md">
      {/* Pricing Section */}
      <div className="w-full flex flex-col gap-4">
        <div className="w-full grid grid-rows-4 grid-cols-1 gap-3 relative">
          {/* Starts at */}
          <div className="flex justify-between items-center w-full">
            <p className="font-inter font-medium text-[15px] sm:text-[16px] leading-5 text-[#656565]">
              Starts at
            </p>
            <p className="font-inter font-medium text-[15px] sm:text-[16px] leading-5 text-black">
              ${details.price}
            </p>
          </div>

          {/* Quantity */}
          <div className="flex justify-between items-center w-full">
            <p className="font-inter font-medium text-[15px] sm:text-[16px] leading-5 text-[#656565]">
              Quantity
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={handleDecrement}
                className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center font-bold hover:bg-gray-300 transition"
              >
                -
              </button>
              <span className="w-8 text-center font-inter font-medium text-[15px] sm:text-[16px] leading-5">
                {quantity}
              </span>
              <button
                onClick={handleIncrement}
                className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center font-bold hover:bg-gray-300 transition"
              >
                +
              </button>
            </div>
          </div>

          {/* Subtotal */}
          <div className="flex justify-between items-center w-full">
            <p className="font-inter font-medium text-[15px] sm:text-[16px] leading-5 text-[#656565]">
              Subtotal
            </p>
            <p className="font-inter font-medium text-[15px] sm:text-[16px] leading-5 text-black">
              ${subtotalPrice}
            </p>
          </div>

          {/* Taxes */}
          <div className="flex justify-between items-center w-full">
            <p className="font-inter font-medium text-[15px] sm:text-[16px] leading-5 text-[#656565]">
              Taxes
            </p>
            <p className="font-inter font-medium text-[15px] sm:text-[16px] leading-5 text-black">
              %{details.tax}
            </p>
          </div>

          {/* Divider */}
          <span className="block w-full h-px bg-gray-300 mt-2"></span>
        </div>
      </div>

      {/* Total */}
      <div className="w-full flex justify-between items-center">
        <p className="font-inter font-semibold text-[18px] sm:text-[20px] leading-6 text-black">
          Total
        </p>
        <p className="font-inter font-semibold text-[18px] sm:text-[20px] leading-6 text-black">
          ${totalPrice}
        </p>
      </div>

      {/* Confirm Button */}
      <button
        onClick={handleConfirm}
        className="w-full h-11 rounded-lg flex items-center justify-center gap-2.5 px-5 py-3 bg-[#FFD643] hover:bg-[#FFD643] transition"
      >
        <p className="font-inter font-medium text-[15px] sm:text-[16px] leading-5 text-gray-600">
          Confirm
        </p>
      </button>
    </div>
  );
}
