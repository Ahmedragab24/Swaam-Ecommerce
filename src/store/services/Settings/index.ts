import { getAuthTokenClient } from "@/lib/auth/auth-client";
import { LangType } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface PagesResponse {
  data: string;
  message: string;
  status_code: number;
}

interface SettingsResponse {
  data: {
    id: number;
    name: string;
    version: string;
    is_production: number;
    email: string;
    phone: string;
    phone_two: string;
    whatsapp: string;
    snapchat: string;
    address: string;
    twitter: string;
    facebook: string;
    instagram: string;
    linkedin: string | null;
    tiktok: string;
    google_play: string | null;
    app_store: string;
    youtube: string;
    website: string | null;
    info: string;
    logo: string;
    background_image: string;
    first_image: string;
    second_image: string;
    third_image: string;
    featured_price: number;
    user_id: number;
    created_at: string;
    updated_at: string;
  };
  message: string;
  status_code: number;
}

export const CompanyInfoApi = createApi({
  reducerPath: "CompanyInfoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: (headers) => {
      const token = getAuthTokenClient();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  tagTypes: ["pages", "settings"],
  endpoints: (builder) => ({
    getPages: builder.query<PagesResponse, LangType>({
      query: (lang) => `/pages?lang=${lang}`,
      providesTags: ["pages"],
    }),

    settings: builder.query<SettingsResponse, void>({
      query: () => `/settings`,
      providesTags: ["settings"],
    }),

    ContactUs: builder.mutation<PagesResponse, string>({
      query: (message) => ({
        url: `/contact-us?message=${message}`,
        method: "POST",
      }),
    }),
  }),
});

export const { useGetPagesQuery, useSettingsQuery, useContactUsMutation } =
  CompanyInfoApi;
