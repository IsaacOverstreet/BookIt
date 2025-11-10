"use client";
import image from "../public/attachment.png";
import Link from "next/link";
import Image from "next/image";
import { Search } from "./search";

export const Navbar = () => {
  return (
    <nav className="w-full flex justify-between items-center bg-[#F9F9F9] shadow-lg fixed top-0 z-50 h-[87px] px-4 sm:px-6 md:px-12 lg:px-24">
      {/* Logo / Brand */}
      <Link href="/" className="shrink-0">
        <div className="w-20 h-11 sm:w-[100px] sm:h-[55px] md:w-[120px] md:h-[65px]">
          <Image
            src={image} // path relative to public/
            alt="My Profile"
            width={120} // base width, responsive via container
            height={65} // base height
            className="rounded-full w-full h-full object-contain"
          />
        </div>
      </Link>

      {/* Search component */}
      <div className="flex-1 max-w-[500px] ml-4">
        <Search />
      </div>
    </nav>
  );
};
