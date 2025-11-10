import { ExperienceType } from "@/services/getExperiences";
import Card from "../components/card";
import axios from "axios";
import Pagination from "@/components/pagination";
import ExperienceList from "@/components/experienceList";

export default async function Home() {
  const page = 1; // initial page
  const limit = 10; // items per page

  const res = await axios.get<ExperienceType[]>(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/experiences`
  );
  const experiences = res.data;

  return (
    <div className="border flex w-full flex-wrap gap-5.5 px-4 sm:px-[50px] lg:px-[115px]  min-h-dvh mt-[100px] mb-[50px]">
      <ExperienceList
        initialExperience={experiences}
        initialPage={page}
        limit={limit}
      />
      {/* 
      <Pagination page={page} limit={limit} /> */}
    </div>
  );
}
