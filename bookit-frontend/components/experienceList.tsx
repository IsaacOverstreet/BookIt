"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  fetchExperience,
  ExperienceType,
  DataType,
} from "@/services/getExperiences";
import Pagination from "./pagination";
import Card from "./card";

interface ExperienceData {
  initialData?: DataType;
  initialPage: number;
  limit: number;
}
export default function ExperienceList({
  initialData,
  initialPage,
  limit,
}: ExperienceData) {
  const [page, setPage] = useState(initialPage);
  console.log("exp", page);
  console.log("exp", limit);

  const { data } = useQuery<DataType>({
    queryKey: ["experiences", { page, limit }],
    queryFn: () => fetchExperience({ page, limit }),
    initialData: page === initialPage ? initialData : undefined,

    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  const { experience = [], totalPage = 1 } = data || {};

  return (
    <div className="border flex w-full flex-wrap  gap-5.5   min-h-dvh mt-[50px] ">
      {experience?.map((exp) => (
        <Card
          key={exp.id}
          title={exp.title}
          location={exp.location}
          description={exp.description}
          price={exp.price}
          image={exp.image}
        />
      ))}
      <Pagination
        currentPage={page}
        onPageChange={setPage}
        totalPage={totalPage}
      />
    </div>
  );
}
