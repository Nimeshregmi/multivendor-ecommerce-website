import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

interface ApiError {
  message?: string;
  error?: string;
  errors?: { message: string }[];
}

export const handleApiError = (error: AxiosError<ApiError> | any): void => {
  // Check if the error is an Axios cancellation
  if (axios.isCancel(error)) return;

  // Extract error response
  const response = error.response?.data;

  // Handle different error response structures
  if (response?.message) {
    toast.error(response.message);
  } else if (response?.error) {
    toast.error(response.error);
  } else if (response?.errors) {
    const errorMessages = response.errors
      .map((err: { message: string }) => err.message)
      .join("\n");
    toast.error(errorMessages);
  } else {
    console.log(error);
    toast.error("Network Error"+error);
  }
};