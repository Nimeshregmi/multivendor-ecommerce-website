import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { setAuth, logout } from "../feature/authSlice";
import { Mutex } from "async-mutex";
import { getAuthToken, setAuthToken } from "@/utils/TokenManagement";
interface RefreshTokenResponse {
  access: string;
  refresh: string;
}

const mutex = new Mutex();
const baseQuery = fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_HOST}/api/users/`,
  credentials: "include",
});
const baseQueryWithReauth: BaseQueryFn<


  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const refreshResult = await baseQuery(
          {
            url: "/api/users/token/refresh/",
            method: "POST",
            body: {
              refresh: await getAuthToken("refreshToken"),
            },
          },
          api,
          extraOptions
        );
        if (refreshResult.data) {
          console.log("data: " + refreshResult.data);
          const { access, refresh } =
            refreshResult.data as RefreshTokenResponse;
          await setAuthToken("accessToken", access);
          await setAuthToken("refreshToken", refresh);
          api.dispatch(setAuth());

          result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch(logout());
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});
