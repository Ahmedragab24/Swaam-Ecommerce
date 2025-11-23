import { getAuthTokenClient } from "@/lib/auth/auth-client";
import { ProductType } from "@/types/Products";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface AuctionsResponse {
  data: {
    product: ProductType;
    bids: [];
    highest_bid: string;
    auction_ended: boolean;
  };
  message: string;
  status_code: number;
}

export const AuctionsApi = createApi({
  reducerPath: "AuctionsApi",
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

  tagTypes: ["BidsForProduct"],
  endpoints: (builder) => ({
    getAllBidsForProduct: builder.query<AuctionsResponse, number>({
      query: (productId) => `/products/${productId}/bids`,
      providesTags: ["BidsForProduct"],
    }),

    CreateAuction: builder.mutation<AuctionsResponse, FormData>({
      query: (body) => ({
        url: `/products`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["BidsForProduct"],
    }),

    PlaceNewBid: builder.mutation<
      AuctionsResponse,
      { amount: number; productId: number }
    >({
      query: ({ productId, amount }) => ({
        url: `/products/${productId}/bids`,
        method: "POST",
        body: {
          amount,
        },
      }),
      invalidatesTags: ["BidsForProduct"],
    }),
  }),
});

export const {
  useGetAllBidsForProductQuery,
  useCreateAuctionMutation,
  usePlaceNewBidMutation,
} = AuctionsApi;
