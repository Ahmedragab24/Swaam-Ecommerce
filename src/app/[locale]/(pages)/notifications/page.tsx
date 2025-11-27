"use client";

import {
  useDeleteAllNotificationsMutation,
  useGetAllNotificationsQuery,
  useNotificationsMarkAllReadMutation,
} from "@/store/services/Notifications";
import { useTranslations } from "next-intl";
import { BellRing, Trash2 } from "lucide-react";
import { NotificationType } from "@/types/Notifications";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ErrorType } from "@/types";
import { toast } from "sonner";
import NotificationCard from "@/components/NotificationCard";
import DataNotFount from "@/components/DataNotFound";
import NotificationNotFount from "@/components/NotificationNotFound";
import GroupCardsSkeletons from "@/components/GroupCardsSkeletons";
import { BreadcrumbDemo } from "@/components/breadcrumb";

const NotificationsPage = () => {
  const t = useTranslations("Notifications");
  const { data, isLoading, isError } = useGetAllNotificationsQuery();
  const [ReadAll] = useNotificationsMarkAllReadMutation();
  const [DeleteAll] = useDeleteAllNotificationsMutation();

  const notifications: NotificationType[] = data?.notifications || [];

  useEffect(() => {
    const ReadAllNotifications = async () => {
      try {
        await ReadAll().unwrap();
      } catch (error) {
        console.error(t("markReadError"), error);
      }
    };
    ReadAllNotifications();
  }, [ReadAll]);

  const DeleteAllNotifications = async () => {
    try {
      await DeleteAll().unwrap();
      toast.success(t("deleteAllSuccess"));
    } catch (error) {
      const err = error as ErrorType;
      toast.error(err?.data?.message || t("deleteAllError"));
    }
  };

  return (
    <main className="Container pt-28 mb-16 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <BreadcrumbDemo />
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-semibold">{t("title")}</h1>
          <p className="text-muted">{notifications.length}</p>
        </div>

        {notifications.length > 0 && (
          <Button
            variant={"link"}
            className="text-red-500"
            onClick={() => DeleteAllNotifications()}
          >
            <Trash2 className="w-5 h-5" />
            {t("deleteAll")}
          </Button>
        )}
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <GroupCardsSkeletons count={4} />
        </div>
      )}

      {/* Error State */}
      {isError && !isLoading && (
        <DataNotFount
          title="حدث خطأ ما"
          description="يرجى تحديث الصفحة"
          icon={<BellRing />}
        />
      )}

      {/* Notifications List */}
      {!isLoading && !isError && notifications.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {notifications.map((notification) => (
            <NotificationCard
              key={notification.id}
              notification={notification}
            />
          ))}
        </div>
      )}

      {/* No Notifications */}
      {!isLoading && !isError && notifications.length === 0 && (
        <NotificationNotFount />
      )}
    </main>
  );
};

export default NotificationsPage;
