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

export interface ExperienceByIdType {
  id: string;
  title: string;
  location: string;
  description: string;
  image: string;
  price: number;
  createdAt: string; // or Date if serialized
  slots: Slot[];
  tax: number;
}

export interface Slot {
  id: string;
  experienceId: string;
  date: string; // ISO string
  time: string; // "09:00", "11:30", etc
  capacity: number;
}

export async function getExperienceById(
  id: string
): Promise<ExperienceByIdType> {
  try {
    console.log("i was ghere");
    const res = await axios.get<ExperienceByIdType>(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/experiences/${id}`
    );
    if (!res.data) throw new Error("Experience not found");
    const result = res.data;
    console.log("🚀 ~ getExperienceById ~ result:", result);

    return result;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      // Backend or network error
      throw new Error(err.response?.data?.error || err.message);
    } else if (err instanceof Error) {
      throw err;
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}
