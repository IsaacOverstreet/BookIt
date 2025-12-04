import axios from "axios";
import { ZodError } from "zod";
import { toast } from "react-toastify";

export function handleApiError(error: unknown): never {
  if (error instanceof ZodError) {
    error.issues.forEach((err) => toast.error(err.message));
    throw error; // stop execution
  }

  if (axios.isAxiosError(error)) {
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      "Request failed";
    toast.error(message);
    throw error; // propagate
  }

  if (error instanceof TypeError && error.message === "Failed to fetch") {
    toast.error("Network error. Check your internet connection.");
    throw error;
  }

  console.error("Unknown error:", error);
  toast.error("Something went wrong");
  throw error;
}
