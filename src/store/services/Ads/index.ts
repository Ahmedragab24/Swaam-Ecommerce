import { PackageType } from "@/types/Package";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface PackagesResponse {
  data: PackageType[];
  message: string;
  status_code: number;
}

export const PackagesApi = createApi({
  reducerPath: "PackagesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
  }),

  tagTypes: ["packages"],
  endpoints: (builder) => ({
    getPackages: builder.query<PackagesResponse, void>({
      query: () => `/packges`,
      providesTags: ["packages"],
    }),

    SubscribePackage: builder.mutation<PackagesResponse, number>({
      query: (packageId) => ({
        url: `/packges/subscribe?package_id=${packageId}`,
        method: "POST",
      }),
      invalidatesTags: ["packages"],
    }),
  }),
});

export const { useGetPackagesQuery, useSubscribePackageMutation } = PackagesApi;
