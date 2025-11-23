// import { getCsrfToken, refreshCsrfToken } from "@/lib/csrf";
import { getAuthTokenClient } from "@/lib/auth/auth-client";
import { ChangePasswordType } from "@/types/Auth";
import {
  ProfileResponseType,
  UserPackageResponseType,
} from "@/types/Auth/Profile";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ProfileApi = createApi({
  reducerPath: "ProfileApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: async (headers) => {
      const token = getAuthTokenClient();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    getUserInfo: builder.query<ProfileResponseType, void>({
      query: () => ({
        url: `/profile`,
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }),
    }),

    getUserPackage: builder.query<UserPackageResponseType, void>({
      query: () => ({
        url: `/my-packges`,
        method: "GET",
      }),
    }),

    UpdateProfile: builder.mutation<ProfileResponseType, FormData>({
      query: (body) => ({
        url: `/profile/update`,
        method: "POST",
        body,
      }),
    }),

    ChangePassword: builder.mutation<ProfileResponseType, ChangePasswordType>({
      query: (body) => ({
        url: `/profile/change-password`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGetUserInfoQuery,
  useGetUserPackageQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
} = ProfileApi;
