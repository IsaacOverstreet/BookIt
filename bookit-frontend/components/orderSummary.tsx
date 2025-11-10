"use client";
import { useState } from "react";

export default function OrderSummary() {
  const [quantity, setQuantity] = useState(1);
  const handleDecrement = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };
  const handleIncrement = () => setQuantity(quantity + 1);

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
              $120
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
              $120
            </p>
          </div>

          {/* Taxes */}
          <div className="flex justify-between items-center w-full">
            <p className="font-inter font-medium text-[15px] sm:text-[16px] leading-5 text-[#656565]">
              Taxes
            </p>
            <p className="font-inter font-medium text-[15px] sm:text-[16px] leading-5 text-black">
              $120
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
          $120
        </p>
      </div>

      {/* Confirm Button */}
      <button className="w-full h-11 rounded-lg flex items-center justify-center gap-2.5 px-5 py-3 bg-[#FFD643] hover:bg-[#FFD643] transition">
        <p className="font-inter font-medium text-[15px] sm:text-[16px] leading-5 text-gray-600">
          Confirm
        </p>
      </button>
    </div>
  );
}
