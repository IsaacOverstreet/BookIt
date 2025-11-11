import axios from "axios";

import { toast } from "react-toastify";

export interface ExperienceType {
  id: string;
  title: string;
  location: string;
  description: string;
  image: string;
  price: number;
  createdAt: string;
}

interface ExperienceParams {
  page?: number;
  limit?: number;
}

export async function fetchExperience(
  params: ExperienceParams = {}
): Promise<ExperienceType[]> {
  const { page = 1, limit = 10 } = params;
  console.log("redasa");
  console.log("🚀 ~ experienceFunction:", limit);
  console.log("experienceFunction", page);
  console.log("i go here");

  try {
    const res = await axios.get<ExperienceType[]>(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/experiences?page=${page}&limit=${limit}`
    );

    return res.data;
  } catch (error) {
    console.log(error);
    toast.error("Failed to fetch experiences");
    return [];
  }
}
