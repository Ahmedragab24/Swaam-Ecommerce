import { getAuthTokenClient } from "@/lib/auth/auth-client";
import { NotificationType } from "@/types/Notifications";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface NotificationsResponse {
  status_code: number;
  message: string;
  notifications: NotificationType[];
  countUnreadNotifications: number;
}

export interface NotificationsUnreadResponse {
  data: {
    notifications: NotificationType[];
    countUnreadNotifications: number;
  };
  status_code: number;
  message: string;
}

export const NotificationsApi = createApi({
  reducerPath: "NotificationsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders(headers) {
      const token = getAuthTokenClient();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  tagTypes: ["Notifications", "NotificationsUnread"],
  endpoints: (builder) => ({
    getAllNotifications: builder.query<NotificationsResponse, void>({
      query: () => `/notifications`,
      providesTags: ["Notifications"],
    }),

    getNotificationsUnread: builder.query<NotificationsUnreadResponse, void>({
      query: () => `/notifications/unread`,
      providesTags: ["NotificationsUnread"],
    }),

    notificationsMarkAllRead: builder.mutation<
      NotificationsUnreadResponse,
      void
    >({
      query: () => ({
        url: `/notifications/mark-all-read`,
        method: "POST",
      }),
      invalidatesTags: ["Notifications", "NotificationsUnread"],
    }),

    notificationSpecificMarkRead: builder.mutation<
      NotificationsUnreadResponse,
      string
    >({
      query: (id) => ({
        url: `/notifications/${id}/read`,
        method: "POST",
      }),
      invalidatesTags: ["Notifications", "NotificationsUnread"],
    }),

    deleteAllNotifications: builder.mutation<NotificationsUnreadResponse, void>(
      {
        query: () => ({
          url: `/notifications/delete-all`,
          method: "DELETE",
        }),
        invalidatesTags: ["Notifications", "NotificationsUnread"],
      }
    ),

    deleteNotification: builder.mutation<NotificationsUnreadResponse, string>({
      query: (id) => ({
        url: `/notifications/${id}/delete`,
        method: "DELETE",
      }),
      invalidatesTags: ["Notifications", "NotificationsUnread"],
    }),
  }),
});

export const {
  useGetAllNotificationsQuery,
  useGetNotificationsUnreadQuery,
  useNotificationsMarkAllReadMutation,
  useNotificationSpecificMarkReadMutation,
  useDeleteAllNotificationsMutation,
  useDeleteNotificationMutation,
} = NotificationsApi;
