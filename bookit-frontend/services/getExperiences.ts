import axios, { AxiosError } from "axios";
import { z, ZodError } from "zod";
import { toast } from "react-toastify";
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
  experience: ExperienceType[];
  totalPage: number;
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
  console.log("🚀 ~ params:", params);
  console.log("🚀 ~ searchTerm:", searchTerm);

  try {
    if (!searchTerm) {
      const res = await axios.get<DataType>(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/experiences?page=${page}&limit=${limit}`
      );
      const result = res.data;

      return result;
    } else {
      const validated = OnlyLettersSchema.parse(searchTerm);
      console.log("🚀 ~ validated:", validated);
      const res = await axios.get<DataType>(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/experiences/search?searchParam=${validated}&page=${page}&limit=${limit}`
      );
      console.log("🚀 ~ res:", res);
      const result = res.data;
      console.log("🚀 ~ result:", result);

      return result;
    }
  } catch (error: unknown) {
    // if (error instanceof ZodError) {
    //   error.issues.forEach((err) => {
    //     toast.error(err.message);
    //   });
    //   console.log(error);
    // } else if (axios.isAxiosError(error)) {
    //   toast.error(error.response?.data?.message || "Request failed");
    // } else {
    //   console.log("Unknown error:", error);
    //   toast.error("Something went wrong");
    // }
    handleApiError(error);
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
  quantity: number;
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
    console.log("i was ghere");
    const res = await axios.get<ExperienceByIdType>(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/experiences/${id}`
    );
    if (!res.data) throw new Error("Experience not found");
    const result = res.data;
    console.log("🚀 ~ getExperienceById ~ result:", result);

    return result;
  } catch (err) {
    handleApiError(err);
  }
}

// export async function getExperienceBySearch(
//   params: string
// ): Promise<ExperienceType> {
//   try {
//     const parsed = onlyLettersSchema.parse(params);

//     const res = await axios.get<ExperienceType>(
//       `${process.env.NEXT_PUBLIC_BACKEND_URL}/experiences/search?searchParam=${parsed}`
//     );
//     if (!res.data) throw new Error("Experience not found!");
//     return res.data;
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       throw new Error(error.response?.data?.error || error.message);
//     } else if (error instanceof ZodError) {
//       toast.error("invalid search input");
//       throw new Error("invalid search input");
//     } else throw new Error("An unknown error occurred");
//   }
// }
