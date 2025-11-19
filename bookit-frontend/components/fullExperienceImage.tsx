import { ExperienceByIdType } from "@/services/getExperiences";
import Image from "next/image";

interface ImageProp {
  details: ExperienceByIdType;
}
export default function FullExperienceImage({ details }: ImageProp) {
  return (
    <div className="w-full  h-[300px] sm:h-[300px] md:h-[350px] lg:h-[381px] rounded-xl overflow-hidden ">
      <Image
        src={details.image}
        alt="sample"
        width={765}
        height={381}
        className="w-full h-full object-cover"
      />
    </div>
  );
}
