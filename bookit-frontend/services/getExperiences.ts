import axios from "axios";
import { z } from "zod";

import { handleApiError } from "@/lib/handleError";

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
  searchTerm?: string;
}

export interface DataType {
  experience?: ExperienceType[];
  totalPage?: number;
}

export const OnlyLettersSchema = z
  .string()
  .trim()
  .regex(/^\p{L}+$/u, {
    message: "Only letters are allowed (no spaces, numbers or punctuation).",
  });

//FETCH ALL EXPERIENCES AND FETCH EXPERIENCE BY SEARCH
export async function fetchExperience(
  params: ExperienceParams = {}
): Promise<DataType> {
  const { page = 1, limit = 10, searchTerm } = params;

  try {
    if (!searchTerm) {
      const res = await axios.get<DataType>(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/experiences?page=${page}&limit=${limit}`
      );
      const result = res.data;

      return result;
    } else {
      const validated = OnlyLettersSchema.parse(searchTerm);

      const res = await axios.get<DataType>(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/experiences/search?searchParam=${validated}&page=${page}&limit=${limit}`
      );

      const result = res.data;

      return result;
    }
  } catch (error) {
    const message = handleApiError(error);
    throw new Error(message);
  }
}

//EXPEREINCE ID DATA
export interface ExperienceByIdType {
  id: string;
  title: string;
  location: string;
  description: string;
  image: string;
  price: number;
  tax: number;

  createdAt: string; // or Date if you convert
  dates: ExperienceDate[];
}

export interface ExperienceDate {
  id: string;
  date: string; // ISO string
  experienceId: string;
  times: ExperienceTime[];
}

export interface ExperienceTime {
  id: string;
  time: string; // "09:00"
  dateId: string;
  slots: Slot[];
}

export interface Slot {
  id: string;
  capacity: number;
  timeId: string;
}

export async function getExperienceById(
  id: string
): Promise<ExperienceByIdType> {
  try {
    const res = await axios.get<ExperienceByIdType>(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/experiences/${id}`
    );
    if (!res.data) throw new Error("Experience not found");
    const result = res.data;

    return result;
  } catch (error) {
    const message = handleApiError(error);
    throw new Error(message);
  }
}
