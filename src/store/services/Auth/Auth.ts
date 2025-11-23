// import { getCsrfToken, refreshCsrfToken } from "@/lib/csrf";
import {
  LoginType,
  RegisterType,
  ResetPasswordType,
  VerifyOtpType,
} from "@/types/Auth";
import { UserInfoType } from "@/types/Auth/Profile";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface LoginResponse {
  message: string;
  status_code: number;
  token: string | null;
  user: UserInfoType;
}

interface RegisterResponse {
  message: string;
  status_code: number;
  token: string | null;
  user: UserInfoType;
}

interface SocialRegisterResponse {
  message: string;
  status_code: number;
  token: string | null;
  user: UserInfoType;
  action: string;
}

interface ForgetPasswordResponse {
  status_code: number;
  message: string;
  data: string | null;
}

interface ResetPasswordResponse {
  data: [];
  message: string;
  status_code: number;
}

export const AuthApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    // prepareHeaders: async (headers) => {
    //   await refreshCsrfToken();
    //   const csrfToken = getCsrfToken();
    //   if (csrfToken) {
    //     headers.set("X-XSRF-TOKEN", csrfToken);
    //   }
    //   headers.set("X-Requested-With", "XMLHttpRequest");
    //   return headers;
    // },
  }),
  endpoints: (builder) => ({
    Register: builder.mutation<RegisterResponse, RegisterType>({
      query: (body) => ({
        url: `/register`,
        method: "POST",
        body,
      }),
    }),

    SocialRegister: builder.mutation<SocialRegisterResponse, FormData>({
      query: (body) => ({
        url: `/social-login`,
        method: "POST",
        body,
      }),
    }),

    Login: builder.mutation<LoginResponse, LoginType>({
      query: (body) => ({
        url: `/login`,
        method: "POST",
        body,
      }),
    }),

    VerifyOtp: builder.mutation<LoginResponse, VerifyOtpType>({
      query: (body) => ({
        url: `/verify-otp`,
        method: "POST",
        body,
      }),
    }),

    ResendOtp: builder.mutation<LoginResponse, string>({
      query: (phone) => ({
        url: `/resend-otp`,
        method: "POST",
        body: { phone },
      }),
    }),

    ForgotPassword: builder.mutation<ForgetPasswordResponse, string>({
      query: (phone) => ({
        url: `/forgot-password`,
        method: "POST",
        body: { phone },
      }),
    }),

    ResetPassword: builder.mutation<
      ResetPasswordResponse,
      { body: ResetPasswordType; token: string | null }
    >({
      query: (body) => ({
        url: `/reset-password`,
        method: "POST",
        body,
      }),
    }),

    Logout: builder.mutation<LoginResponse, string | null>({
      query: (token) => ({
        url: `/logout`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),

    DeleteAccount: builder.mutation<
      LoginResponse,
      { token: string | null; body: FormData }
    >({
      query: ({ token, body }) => ({
        url: `/delete-account`,
        method: "DELETE",
        body,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useVerifyOtpMutation,
  useLogoutMutation,
  useResetPasswordMutation,
  useResendOtpMutation,
  useForgotPasswordMutation,
  useSocialRegisterMutation,
  useDeleteAccountMutation,
} = AuthApi;
