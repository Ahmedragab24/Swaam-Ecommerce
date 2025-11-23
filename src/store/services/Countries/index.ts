import { CityType, CountryType } from "@/types/Country";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface CountriesResponse {
  data: CountryType[];
  message: string;
  status_code: number;
}
interface CitiesResponse {
  data: CityType[];
  message: string;
  status_code: number;
}

export const CountriesApi = createApi({
  reducerPath: "CountriesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
  }),

  tagTypes: ["Countries", "Cities"],
  endpoints: (builder) => ({
    getCountries: builder.query<CountriesResponse, void>({
      query: () => `/countries`,
      providesTags: ["Countries"],
    }),

    getCities: builder.query<CitiesResponse, void>({
      query: () => `/cities`,
      providesTags: ["Cities"],
    }),
  }),
});

export const { useGetCountriesQuery, useGetCitiesQuery } = CountriesApi;
