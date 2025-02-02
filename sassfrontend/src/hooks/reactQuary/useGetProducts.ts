import { doGet } from "@/hooks/Axios/interface";
import { useQuery } from "@tanstack/react-query";
// import { API_BASE_URL } from "@/utils/config";
import { getCookie } from "cookies-next";
// import { constants } from "crypto";

type UserDashboardResponse = {
  data: any;
  message: string;
  status: number;
};
interface Props {
  page?: number;
}
export default function useGetProduct({ page = 0 }: Props) {
  const queryParam = page === 0 ? "" : `?page=${page}`;

  return useQuery<UserDashboardResponse, Error>({
    queryKey: ["products", "list-of-all-products-available", page, queryParam],
    queryFn: async (): Promise<UserDashboardResponse> => {
      // const authToken = getCookie(constants.USER_AUTH_TOKEN_NAME);
      const authToken = "";
      const response = await doGet(`products/${queryParam}`, {
        headers: {
          Authorization: authToken ? `Bearer ${authToken}` : "",
          "Content-Type": "application/json",
        },
      });
      return response as UserDashboardResponse;
    },
    staleTime: 10000 * 60 * 60 * 10, // Adjust as needed
    retry: 2, // Retry failed requests up to 2 times
  });
}
