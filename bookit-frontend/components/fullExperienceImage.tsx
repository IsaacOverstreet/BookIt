import Image from "next/image";
import sample from "../public/sample.png";
export default function FullExperienceImage() {
  return (
    <div className="w-full  h-[300px] sm:h-[300px] md:h-[350px] lg:h-[381px] rounded-xl overflow-hidden ">
      <Image
        src={sample}
        alt="sample"
        width={765}
        height={381}
        className="w-full h-full object-cover"
      />
    </div>
  );
}
