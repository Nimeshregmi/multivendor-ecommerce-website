import { doGet } from "@/hooks/Axios/interface";
import { useQuery } from "@tanstack/react-query";
// import { API_BASE_URL } from "@/utils/config";
import { getCookie } from "cookies-next";
// import { toast } from "react-toastify";
// import { constants } from "crypto";

interface Props {
  id: number;
}

type Product = {
  id: number;
  name?: string;
  details?: string;
  price?: string; 
  category?: number;
  vendor?: number;
  product_rating?: string[];
};

export default function useGetSingleProducts({ id }: Props) {
  return useQuery<Product, Error>({
    queryKey: ["products", "list-of-all-products-available", id],
    queryFn: async (): Promise<Product> => {
      try {
        const authToken = ""; // Replace with actual token retrieval logic
        const response = await doGet<Product>(`product/${id}`, {
          headers: {
            Authorization: authToken ? `Bearer ${authToken}` : "",
            "Content-Type": "application/json",
          },
        });

        return response.data;
      } catch (error) {
        throw new Error('Failed to fetch data');
      }
    },
    staleTime: 10000 * 60 * 60 * 10, // Adjust as needed
    retry: 2, // Retry failed requests up to 2 times
  });
}