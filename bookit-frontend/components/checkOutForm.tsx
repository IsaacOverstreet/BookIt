export default function CheckOutForm() {
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
            name="promocode"
            placeholder="Promo code"
            className="flex-1 w-full sm:w-[70%] px-4 py-2 border bg-[#DDDDDD] border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent text-sm sm:text-base"
          />
          <button className="px-3 py-2 sm:w-[30%] lg:w-[90px] bg-[#131313] text-white font-medium text-xs sm:text-sm md:text-base rounded-lg hover:bg-[#2a2929] transition-colors ">
            Apply
          </button>
        </div>

        {/* Terms Checkbox */}
        <div className="flex items-start gap-2 text-sm sm:text-base text-gray-700">
          <input
            type="checkbox"
            id="terms"
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
      <div className=" w-full lg:w-[35%] xl:w-[30%] rounded-xl bg-[#F7F7F7] shadow-sm p-6 flex flex-col gap-5">
        {/* Details Section */}
        <div className="flex flex-col gap-3 text-sm text-gray-700">
          <div className="flex justify-between">
            <p className="text-[#656565]">Experience</p>
            <p className="font-medium text-black">Kayaking</p>
          </div>
          <div className="flex justify-between">
            <p className="text-[#656565]">Date</p>
            <p className="text-black">2025-10-22</p>
          </div>
          <div className="flex justify-between">
            <p className="text-[#656565]">Time</p>
            <p className="text-black">09:00 am</p>
          </div>
          <div className="flex justify-between">
            <p className="text-[#656565]">Qty</p>
            <p className="text-black">1</p>
          </div>
          <div className="flex justify-between">
            <p className="text-[#656565]">Subtotal</p>
            <p className="text-black">₹999</p>
          </div>
          <div className="flex justify-between">
            <p className="text-[#656565]">Taxes</p>
            <p className="text-black">₹59</p>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-t border-gray-300" />

        {/* Total */}
        <div className="flex justify-between items-center text-base font-semibold text-black">
          <p>Total</p>
          <p>₹958</p>
        </div>

        {/* Pay Button */}
        <button className="w-full bg-[#FFD643] text-black font-medium py-3 rounded-lg hover:bg-[#f5cc3a] transition">
          Pay and Confirm
        </button>
      </div>
    </div>
  );
}
