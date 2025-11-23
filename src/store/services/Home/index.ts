import { UserInfoType } from "@/types/Auth/Profile";
import { CategoryType, SubCategoryType } from "@/types/Categories";
import { BannerType } from "@/types/Home";
import { ProductType } from "@/types/Products";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface HomeResponse {
  data: {
    banners: BannerType[];
    categories: CategoryType[];
    latest_products: ProductType[];
    latest_auctions: [];
    user: UserInfoType | null;
  };
  message: string;
  status_code: number;
}
export interface SubCategoriesResponse {
  data: {
    subcategories: SubCategoryType[];
  };
  message: string;
  status_code: number;
}

export const HomeApi = createApi({
  reducerPath: "HomeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
  }),

  tagTypes: ["Home", "subCategories"],
  endpoints: (builder) => ({
    getHome: builder.query<HomeResponse, void>({
      query: () => `/home`,
      providesTags: ["Home"],
    }),

    getSubCategories: builder.query<SubCategoriesResponse, number>({
      query: (categoryId) => `/catogery/${categoryId}/subcatogery`,
      providesTags: ["subCategories"],
    }),
  }),
});

export const { useGetHomeQuery, useGetSubCategoriesQuery } = HomeApi;
