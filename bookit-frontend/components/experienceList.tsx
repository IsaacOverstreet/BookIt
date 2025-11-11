"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchExperience, ExperienceType } from "@/services/getExperiences";
import Pagination from "./pagination";
import Card from "./card";

interface ExperienceData {
  initialExperience: ExperienceType[];
  initialPage: number;
  limit: number;
}
export default function ExperienceList({
  initialExperience,
  initialPage,
  limit,
}: ExperienceData) {
  const [page, setPage] = useState(initialPage);
  console.log("exp", page);
  console.log("exp", limit);

  const { data: experiences } = useQuery({
    queryKey: ["experiences", { page, limit }],
    queryFn: () => fetchExperience({ page, limit }),
    initialData: page === initialPage ? initialExperience : undefined,

    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return (
    <div className="border flex w-full flex-wrap  gap-5.5   min-h-dvh mt-[50px] ">
      {experiences?.map((exp) => (
        <Card
          key={exp.id}
          title={exp.title}
          location={exp.location}
          description={exp.description}
          price={exp.price}
          image={exp.image}
        />
      ))}
      <Pagination currentPage={page} onPageChange={setPage} />
    </div>
  );
}
