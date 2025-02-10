import { apiSlice } from "../services/apiSlice";

interface User {
  first_name: string;
  last_name: string;
  email: string;
}
interface Users {
  email: string;
  password: string;
}
interface changepassword{
  current_password: string;
  new_password: string;
  confirm_password: string;
}
interface Contact {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}
interface SocialAuth {
  provider: string;
  state: string;
  code: string;
}
interface createUserResponse {
  success: boolean;
  user: User;
}

const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    retriveUser: builder.query<User, void>({
      query: () => "/users/me/",
    }),
    socialAuthentication: builder.mutation<createUserResponse, SocialAuth>({
      query: ({ provider, state, code }) => ({
        url: `/o/${provider}/?state=${encodeURIComponent(
          state
        )}&code=${encodeURIComponent(code)}`,
        method: "post",
        headers: {
          Accept: "application/json",
          "content-type": "application/x-www-form-urlencoded",
        },
      }),
    }),
    login: builder.mutation({
      query: ({ email, password }: Users) => ({
        url: "token/",
        method: "POST",
        body: { email, password },
        credentials:"include"
      }),
    }),
    changepassword: builder.mutation({
      query: ({ current_password, confirm_password,new_password }: changepassword) => ({
        url: "change_password/",
        method: "POST",
        body: { current_password, confirm_password,new_password },
      }),
    }),
    contact: builder.mutation({
      query: ({ name, email, message, subject, phone }: Contact) => ({
        url: "/request/contact",
        method: "POST",
        body: { name, email, message, subject, phone },
      }),
    }),
    register: builder.mutation({
      query: ({
        full_name,
        username,
        email,
        phone,
        role,
        password,
        confirm_password,
      }) => ({
        url: "signup/",
        method: "POST",
        body: {
          full_name,
          username,
          email,
          phone,
          role,
          password,
          confirm_password,
        },
      }),
    }),
    verify: builder.mutation({
      query: () => ({
        url: "/jwt/verify/",
        method: "POST",
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/logout/",
        method: "POST",
      }),
    }),
    activation: builder.mutation({
      query: ({  token }) => ({
        url: "/verify-email/",
        method: "POST",
        body: {token},
      }),
    }),
    resetpassword: builder.mutation({
      query: (email: any) => ({
        url: "/users/reset_password/",
        method: "POST",
        body: { email },
      }),
    }),
    resetpasswordconform: builder.mutation({
      query: ({ uid, token, re_new_password, new_password }) => ({
        url: "/users/reset_password_confirm/",
        method: "POST",
        body: { uid, token, re_new_password, new_password },
      }),
    }),
  }),
});

export const {
  useRetriveUserQuery,
  useSocialAuthenticationMutation,
  useLoginMutation,
  useChangepasswordMutation,
  useContactMutation,
  useRegisterMutation,
  useVerifyMutation,
  useLogoutMutation,
  useActivationMutation,
  useResetpasswordMutation,
  useResetpasswordconformMutation,
} = authApiSlice;
