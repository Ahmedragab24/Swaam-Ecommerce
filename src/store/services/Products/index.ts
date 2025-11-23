import { getAuthTokenClient } from "@/lib/auth/auth-client";
import {
  ProductConditionType,
  ProductType,
  SortByType,
  TypeProductType,
} from "@/types/Products";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface ProductsResponse {
  data: {
    current_page: number;
    data: ProductType[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    next_page_url: string;
    path: string;
    per_page: number;
    prev_page_url: string;
    to: number;
    total: number;
  };
  message: string;
  status_code: number;
}

export interface ProductDetailsType {
  data: {
    product: ProductType;
    similar_products: ProductType[];
  };
  message: string;
  status_code: number;
}

export const ProductsApi = createApi({
  reducerPath: "ProductsApi",
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

  tagTypes: ["products", "product"],
  endpoints: (builder) => ({
    getProducts: builder.query<
      ProductsResponse,
      Partial<{
        type?: TypeProductType;
        search?: string;
        category_id?: number;
        sub_category_id?: number;
        city_id?: number;
        condition?: ProductConditionType;
        min_price?: number;
        max_price?: number;
        sort?: SortByType;
        per_page?: number;
      }>
    >({
      query: (params) => {
        const queryParams = new URLSearchParams();

        // loop on params and only append params with valid value
        Object.entries(params).forEach(([key, value]) => {
          if (
            value !== undefined &&
            value !== null &&
            value !== "" &&
            value !== 0
          ) {
            queryParams.append(key, String(value));
          }
        });

        return `/products?${queryParams.toString()}`;
      },

      providesTags: ["products"],
    }),

    getProductById: builder.query<ProductDetailsType, number>({
      query: (productId) => `/products/${productId}`,
      providesTags: ["product"],
    }),

    getUserProducts: builder.query<ProductsResponse, TypeProductType>({
      query: (type) => `/my-products?type=${type}`,
      providesTags: ["products"],
    }),

    CreateProduct: builder.mutation<ProductDetailsType, FormData>({
      query: (body) => ({
        url: `/products`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["products", "product"],
    }),

    UpdateProduct: builder.mutation<
      ProductDetailsType,
      { body: FormData; productId: number }
    >({
      query: ({ body, productId }) => ({
        url: `/products/update/${productId}`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["products", "product"],
    }),

    ToggleProductStatus: builder.mutation<ProductDetailsType, number>({
      query: (productId) => ({
        url: `/products/${productId}/toggle-status`,
        method: "POST",
      }),
      invalidatesTags: ["products", "product"],
    }),

    PremiumProduct: builder.mutation<ProductDetailsType, number>({
      query: (productId) => ({
        url: `/products/${productId}/premium`,
        method: "POST",
      }),
      invalidatesTags: ["products", "product"],
    }),

    DeleteProduct: builder.mutation<ProductDetailsType, number>({
      query: (productId) => ({
        url: `/products/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["products", "product"],
    }),
  }),
});

export const {
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetProductByIdQuery,
  useGetProductsQuery,
  useGetUserProductsQuery,
  usePremiumProductMutation,
  useToggleProductStatusMutation,
  useUpdateProductMutation,
} = ProductsApi;
