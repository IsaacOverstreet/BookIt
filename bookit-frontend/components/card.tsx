"use client";

import { getExperienceById } from "@/services/getExperiences";
import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/navigation";

interface CardProps {
  id: string;
  title: string;
  location: string;
  description: string;
  price: number;
  image: string;
}

export default function Card({
  id,
  title,
  location,
  description,
  price,
  image,
}: CardProps) {
  const router = useRouter();

  return (
    <div className="w-full sm:w-[48%] md:w-[48.3%] lg:w-[31.4%] xl:w-[23.6%] rounded-xl bg-[#F0F0F0] overflow-hidden shadow-md">
      <div className="relative w-full aspect-280/170">
        <Image
          src={image} // replace with your image path
          alt="experience image"
          layout="fill"
          objectFit="cover"
          className="rounded-t-xl w-full h-full"
        />
      </div>

      <div className="p-4 flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <div className=" flex justify-between items-center">
            <h2 className="font-inter font-medium text-[16px] leading-5 tracking-[0%]">
              {title}
            </h2>
            <div className="bg-gray-300  rounded-sm px-2 py-1 flex items-center justify-center">
              <h3 className="font-inter  font-medium text-[10px]  leading-4">
                {location}
              </h3>
            </div>
          </div>
          <p className="font-inter text-[#6C6C6C] font-normal text-[12px] leading-4 tracking-[0%] py-2 rounded">
            {description}
          </p>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex gap-1 items-center">
            <p className="font-inter font-normal text-[12px] text-[#6C6C6C] leading-4 tracking-[0%] px-1 py-0.5 rounded">
              From
            </p>
            <p className="font-inter font-medium text-[20px] leading-6 tracking-[0%] px-1 py-0.5 rounded">
              ${price}
            </p>
          </div>
          <button
            onClick={() => router.push(`/details/${id}`)}
            className="bg-[#FFD643] rounded-sm px-2 py-1 font-inter font-medium text-[14px] leading-[18px] tracking-[0%]"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
