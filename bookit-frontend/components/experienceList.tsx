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
import Loading from "./loadingPage";

interface ExperienceData {
  initialData?: DataType;
  initialPage: number;
  limit: number;
  searchTerm?: string;
}
export default function ExperienceList({
  initialData,
  initialPage,
  limit,
  searchTerm,
}: ExperienceData) {
  const [page, setPage] = useState(initialPage);

  const { data, isLoading } = useQuery<DataType>({
    queryKey: ["experiences", { page, limit, searchTerm }],
    queryFn: () => fetchExperience({ page, limit, searchTerm }),
    initialData: page === initialPage ? initialData : undefined,
  });

  if (isLoading) return <Loading />;
  const { experience = [], totalPage = 1 } = data || {};

  return (
    <div className="flex w-full flex-wrap  gap-5.5   min-h-dvh mt-[50px] ">
      {experience?.map((exp) => (
        <Card
          key={exp.id}
          id={exp.id}
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
