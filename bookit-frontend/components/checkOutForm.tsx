"use client";

import { CheckoutTotalType } from "@/app/checkout/page";
import { applyPromo } from "@/services/bookingLogic";
import { useState } from "react";
import { debounce } from "lodash";

interface CheckoutTotalProp {
  checkoutTotal: CheckoutTotalType;
}

interface FormType {
  name: string;
  email: string;
}

interface DiscountSummary {
  // discount: number;
  // discountRate: number;
  discountedTotal?: number;
  discountedSubtotal?: number;
  percentageDiscount?: number;
  // taxAmount: number;
  // taxRate: number;
  // title?: string; // if you need title
}

export default function CheckOutForm({ checkoutTotal }: CheckoutTotalProp) {
  const [form, setform] = useState<FormType>({
    name: "",
    email: "",
  });
  const [promo, setPromo] = useState<string>("");
  const [agreed, setAgreed] = useState(false);
  const [discount, setDiscount] = useState<DiscountSummary | null>(null);
  const [loading, setLoading] = useState(false);

  console.log(checkoutTotal);

  async function applyPromoHandler() {
    if (loading) return;
    setLoading(true);
    const payload = {
      promo,
      timeId: checkoutTotal.timeId,
      quantity: checkoutTotal.quantity,
    };
    const res = await applyPromo(payload);
    if (!res) {
      setLoading(false);
      return;
    }
    console.log(res.data);

    setDiscount({
      discountedSubtotal: res.data?.discountedSubtotal,
      discountedTotal: res.data?.discountTotal,
      percentageDiscount: res.data?.discountRate,
    });
    setLoading(false);
  }

  const handleApplyButton = debounce(() => {
    applyPromoHandler();
  }, 2000);

  return (
    <div className=" mb-[50px] w-full flex  flex-col lg:flex-row lg:items-start lg:justify-between gap-8 lg:gap-10 px-4 sm:px-6 xl:px-0">
      {/* Left Section: Form */}
      <div className=" bg-[#EFEFEF] flex flex-col w-full lg:w-[65%] xl:w-[739px]  2xl:w-[70%] mx-auto gap-4 p-4 sm:p-6 rounded-xl">
        <div className="flex flex-col w-full lg:flex-row lg:gap-4">
          {/* Full name */}
          <div className="flex flex-col w-full mb-4 lg:mb-0">
            <label
              htmlFor="name"
              className="text-sm sm:text-base font-inter font-medium text-[#5B5B5B] mb-2"
            >
              Full name
            </label>
            <input
              type="text"
              onChange={(e) => setform({ ...form, name: e.target.value })}
              value={form.name}
              id="name"
              name="name"
              placeholder="Your name"
              className="w-full bg-[#DDDDDD] px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent text-sm sm:text-base"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col w-full">
            <label
              htmlFor="email"
              className="text-sm sm:text-base font-inter font-medium text-[#5B5B5B] mb-2"
            >
              Email
            </label>
            <input
              type="email"
              onChange={(e) => setform({ ...form, email: e.target.value })}
              value={form.email}
              id="email"
              name="email"
              placeholder="Your email"
              className="w-full bg-[#DDDDDD] px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent text-sm sm:text-base"
            />
          </div>
        </div>

        {/* Promo Code */}
        <div className="flex flex-col sm:flex-row w-full gap-3 justify-center">
          <input
            type="text"
            onChange={(e) => setPromo(e.target.value)}
            value={promo}
            name="promocode"
            placeholder="Promo code"
            className="flex-1 w-full sm:w-[70%] px-4 py-2 border bg-[#DDDDDD] border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent text-sm sm:text-base"
          />
          <button
            onClick={handleApplyButton}
            className="px-3 py-2 sm:w-[30%] lg:w-[90px] bg-[#131313] text-white font-medium text-xs sm:text-sm md:text-base rounded-lg hover:bg-[#2a2929] transition-colors "
          >
            Apply
          </button>
        </div>

        {/* Terms Checkbox */}
        <div className="flex items-start gap-2 text-sm sm:text-base text-gray-700">
          <input
            type="checkbox"
            id="terms"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-0.5 accent-[#161616] w-4 h-4 cursor-pointer"
          />
          <label
            htmlFor="terms"
            className="cursor-pointer leading-snug text-[#5B5B5B]"
          >
            I agree to the terms and safety policy
          </label>
        </div>
      </div>

      {/* Right Section: Details Summary */}
      <div className="w-full lg:w-[35%] xl:w-[30%] rounded-xl bg-[#F7F7F7] shadow-sm p-6 flex flex-col gap-6">
        {/* Details Section */}
        <div className="flex flex-col gap-4 text-sm text-gray-700">
          <div className="flex justify-between">
            <p className="text-[#656565]">Experience</p>
            <p className="font-medium text-black text-right">
              {checkoutTotal.title}
            </p>
          </div>

          <div className="flex justify-between">
            <p className=" text-[#656565]">Date</p>
            <p className="text-black">
              {new Date(checkoutTotal.date).toISOString().split("T")[0]}
            </p>
          </div>

          <div className="flex justify-between">
            <p className="text-[#656565]">Time</p>
            <p className="text-black">{checkoutTotal.time}</p>
          </div>

          <div className="flex justify-between">
            <p className="text-[#656565]">Qty</p>
            <p className="text-black">{checkoutTotal.quantity}</p>
          </div>

          {/* Subtotal Row */}
          <div className="flex justify-between items-center">
            <p className="text-[#656565]">Subtotal</p>

            {discount ? (
              <div className="flex items-center gap-2 text-right">
                {/* Discounted price */}
                <p className="text-black font-medium text-sm sm:text-base">
                  ${discount.discountedSubtotal}
                </p>

                {/* Percentage */}
                <p className="text-black text-xs">
                  <span className="border  bg-amber-300 font-bold">
                    %{discount.percentageDiscount} Off
                  </span>
                </p>

                {/* Original price */}
                <p className="text-gray-500 line-through text-xs sm:text-sm">
                  ${checkoutTotal.subTotal}
                </p>
              </div>
            ) : (
              <p className="text-black font-medium text-sm sm:text-base">
                ${checkoutTotal.subTotal}
              </p>
            )}
          </div>

          {/* Taxes Row */}
          <div className="flex justify-between">
            <p className="text-[#656565]">Taxes</p>
            <p className="text-black">%{checkoutTotal.taxRatePercent}</p>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-t border-gray-300" />

        {/* TOTAL */}
        <div className="flex justify-between items-center text-base font-semibold">
          <p>Total</p>

          {discount ? (
            <div className="flex items-center gap-2">
              {/* Discounted total */}
              <p className="text-black">${discount.discountedTotal}</p>

              {/* Original total */}
              <p className="text-gray-600 line-through text-sm">
                ${checkoutTotal.total}
              </p>
            </div>
          ) : (
            <p className="text-black">${checkoutTotal.total}</p>
          )}
        </div>

        {/* Pay Button */}
        <button
          disabled={!agreed}
          className="w-full bg-[#ffd643] text-black font-medium py-3 rounded-lg hover:bg-[#f5cc3a] transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Pay and Confirm
        </button>
      </div>
    </div>
  );
}
