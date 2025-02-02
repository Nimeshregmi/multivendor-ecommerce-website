import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

import { handleApiError } from "@/utils/helper";
// import { removeAccessTokenFromLocalStorage } from "@/utils/local";
import { toast } from "react-toastify";

let is401ToastDisplayed = false;
const instance = axios.create({
  // baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  baseURL: "http://127.0.0.1:8000/api/",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000,
});

instance.interceptors.request.use(
  function (request) {
    console.log("Starting Request", request);
    return request;
  },
  function (error) {
    console.error("Request Error", error);
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => response, // Handle successful responses
  async (error) => {
    const status = error.response?.status; // Safely access status
    if ([404, 409, 400, 500].includes(status)) {
      // Handle specific status codes
      throw error;
    } else if (status === 401 && !is401ToastDisplayed) {
      is401ToastDisplayed = true;
      toast.error("Token Expired. Please Login to Continue");
      setTimeout(() => {
        // Example of handling token expiration
        // localStorage.removeItem("loginData");
        // removeAccessTokenFromLocalStorage();
        window.location.href = "/login";
      }, 2000);
    }
    throw error;
  }
);
export const doGet = async <T>(
  url: any,
  config?: any
): Promise<{ data: T }> => {
  try {
    const response: AxiosResponse<{ data: T }> = await instance.get(
      url,
      config
    );

    // console.log("Full API Response:", response.data); 
    // if (response.data && response.data.data !== undefined) {
    if (response.data  !== undefined) {
      return response.data;
    } else {
      console.error("Unexpected response structure:", response);
      throw new Error("Unexpected response structure");
    }
  } catch (error) {
    handleApiError(error); // Make sure this function logs errors properly
    throw error; // Re-throw for further handling
  }
};

export const doPost = async <T>(
  url: string,
  data: any,
  config?: AxiosRequestConfig
): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await instance.post(url, data, config);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};
export const doPut = async <T>(
  url: string,
  data: any,
  config?: AxiosRequestConfig
): Promise<T> => {
  try {
    const response: AxiosResponse<{ data: T }> = await instance.put(
      url,
      data,
      config
    );
    return response.data.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

export const doPatch = async <T>(
  url: string,
  data: any,
  config?: AxiosRequestConfig
): Promise<T> => {
  try {
    const response: AxiosResponse<{ data: T }> = await instance.patch(
      url,
      data,
      config
    );
    return response.data.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

export const doDelete = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await instance.delete(url, config);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};
