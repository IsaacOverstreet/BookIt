import { ExperienceType, fetchExperience } from "@/services/getExperiences";
import Card from "../components/card";
import axios from "axios";
import Pagination from "@/components/pagination";

import ExperienceList from "@/components/experienceList";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

interface Props {
  searchParams: { page?: string; limit?: string };
}
export default async function Home({ searchParams }: Props) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  console.log("🚀 ~ Home ~ page:", page);
  const limit = Number(params.limit) || 10;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["experiences", { page, limit }],
    queryFn: () => fetchExperience({ page, limit }),
  });

  // 3️⃣ Extract prefetched data
  const experiences = queryClient.getQueryData<ExperienceType[]>([
    "experiences",
    { page, limit },
  ]);
  console.log("🚀 ~ Home ~ experiences:", experiences);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="border flex w-full flex-wrap gap-5.5 px-4 sm:px-[50px] lg:px-[115px]  min-h-dvh mt-[100px] mb-[50px]">
        <ExperienceList
          initialExperience={experiences || []}
          initialPage={page}
          limit={limit}
        />
      </div>{" "}
    </HydrationBoundary>
  );
}
