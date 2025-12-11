import axios from "axios";
import { ZodError } from "zod";
import { toast } from "react-toastify";

export function handleApiError(error: unknown): string {
  // Handle Zod validation errors
  if (error instanceof ZodError) {
    const firstError = error.issues[0];
    const message = firstError?.message || "Validation failed";
    toast.error(message);
    return message;
  }

  // Handle Axios errors
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    const data = error.response?.data;

    let message = "Request failed";

    // Extract error message
    if (typeof data === "string") {
      message = data;
    } else if (data?.message) {
      message = data.message;
    } else if (data?.error) {
      message = data.error;
    } else if (error.message) {
      message = error.message;
    }

    // Handle specific status codes
    switch (status) {
      case 401:
        message = "Unauthorized. Please log in.";
        break;
      case 403:
        message = "You don't have permission to perform this action.";
        break;
      case 404:
        message = "Resource not found";
        break;
      case 422:
        message = data?.message || "Validation error";
        break;
      case 429:
        message = "Too many requests. Please try again later.";
        break;
      case 500:
        message = "Server error. Please try again later.";
        break;
      case 503:
        message = "Service unavailable. Please try again later.";
        break;
    }

    toast.error(message);
    return message;
  }

  // Handle network errors
  if (error instanceof TypeError && error.message === "Failed to fetch") {
    const message = "Network error. Check your internet connection.";
    toast.error(message);
    return message;
  }

  // Handle generic Error instances
  if (error instanceof Error) {
    const message = error.message || "Something went wrong";
    toast.error(message);
    return message;
  }

  // Handle unknown errors
  console.error("Unknown error:", error);
  const message = "An unexpected error occurred";
  toast.error(message);
  return message;
}
