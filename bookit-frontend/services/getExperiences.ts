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

export interface DataType {
  experience: ExperienceType[];
  totalPage: number;
}

export async function fetchExperience(
  params: ExperienceParams = {}
): Promise<DataType> {
  const { page = 1, limit = 10 } = params;

  try {
    const res = await axios.get<DataType>(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/experiences?page=${page}&limit=${limit}`
    );
    const result = res.data;
    return result;
  } catch (error) {
    console.log(error);
    toast.error("Failed to fetch experiences");
    return {
      experience: [],
      totalPage: 0,
    };
  }
}
