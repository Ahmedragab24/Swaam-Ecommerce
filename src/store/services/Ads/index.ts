import { AdsResponse } from "@/types/Ads";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const AdsApi = createApi({
  reducerPath: "AdsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
  }),

  tagTypes: ["ads"],
  endpoints: (builder) => ({
    getAds: builder.query<AdsResponse, void>({
      query: () => `/ads`,
      providesTags: ["ads"],
    }),
  }),
});

export const { useGetAdsQuery } = AdsApi;
