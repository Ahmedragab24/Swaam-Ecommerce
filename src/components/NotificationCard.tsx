"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  useDeleteNotificationMutation,
  useNotificationSpecificMarkReadMutation,
} from "@/store/services/Notifications";
import { ErrorType } from "@/types";
import { NotificationType } from "@/types/Notifications";
import { formatDistanceToNow } from "date-fns";
import { ar } from "date-fns/locale";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

interface Props {
  notification: NotificationType;
  changeOpen?: (value: boolean) => void;
}

const NotificationCard = ({ notification, changeOpen }: Props) => {
  const t = useTranslations("Notifications");
  const [DeleteNotification] = useDeleteNotificationMutation();
  const [MarkNotificationRead] = useNotificationSpecificMarkReadMutation();
  const Router = useRouter();

  const isUnread = !notification.read_at;
  const title = notification.data.title_ar;
  const message = notification.data.message_ar;
  const userName = notification.data.user_name;
  const createdTime = formatDistanceToNow(new Date(notification.created_at), {
    addSuffix: true,
    locale: ar,
  });

  const handleDeleteNotification = async () => {
    try {
      await DeleteNotification(notification.id).unwrap();
      toast.success(t("deleteSuccess"));
    } catch (error) {
      const err = error as ErrorType;
      toast.error(err?.data?.message || t("deleteError"));
    }
  };

  const handleMarkRead = async (notification: NotificationType) => {
    try {
      await MarkNotificationRead(notification?.id).unwrap();

      if (
        notification?.data?.key === "auction_created" ||
        notification?.data?.key === "asset_created" ||
        notification?.data?.key === "auction_follow" ||
        notification?.data?.key === "auction_new_public"
      ) {
        Router.push(`/auctions/${notification?.data?.keyId}`);
        changeOpen?.(false);
      }

      if (notification?.data?.key === "chat") {
        Router.push(`/conversations`);
        changeOpen?.(false);
      }
      if (
        notification?.data?.key === "project_created" ||
        notification?.data?.key === "project_new_public"
      ) {
        Router.push(`/projects/${notification?.data?.keyId}`);
        changeOpen?.(false);
      }
      if (notification?.data?.key === "ad_created") {
        Router.push(`/my-ads`);
        changeOpen?.(false);
      }
      if (
        notification?.data?.key === "realEstate_new_public" ||
        notification?.data?.key === "realEstate_created"
      ) {
        Router.push(`/real-estate/${notification?.data?.keyId}`);
        changeOpen?.(false);
      }
    } catch (err) {
      console.error("Mark read failed", err);
    }
  };

  return (
    <div
      onClick={() => handleMarkRead(notification)}
      className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition hover:bg-primary/10 hover:shadow-md 
        ${isUnread ? "bg-gray-100" : "bg-white"} border border-gray-200`}
    >
      {/* Avatar Section - Made smaller */}
      <div className="relative flex-shrink-0">
        <Avatar className="h-10 w-10">
          <AvatarImage src={"/placeholder.svg"} alt={userName} />
          <AvatarFallback className="bg-primary text-white font-semibold text-sm">
            {userName?.charAt(0) || "?"}
          </AvatarFallback>
        </Avatar>
        {isUnread && (
          <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></div>
        )}
      </div>

      {/* Content Section - Adjusted for mobile */}
      <div className="flex-1 text-right overflow-hidden">
        <div className="flex justify-between items-center mb-1">
          <div className="font-semibold text-gray-900 text-sm truncate">
            {title}
          </div>
          <div className=" hidden md:block text-xs text-gray-500 flex-shrink-0 mr-2">
            {createdTime}
          </div>
        </div>

        <p className="text-gray-700 text-xs leading-relaxed mb-2 line-clamp-2">
          {message}
        </p>

        <div className="flex justify-between items-center gap-2">
          <div className="md:hidden text-xs text-gray-500 flex-shrink-0 mr-2">
            {createdTime}
          </div>
          <div className="hidden md:block text-xs text-gray-500 flex-shrink-0 mr-2">
            {new Date(notification.created_at).toLocaleDateString("ar-En")}
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-red-500 hover:bg-red-100 h-8 px-2 text-xs"
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteNotification();
            }}
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span className="ml-1 hidden sm:inline">{t("delete")}</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;
