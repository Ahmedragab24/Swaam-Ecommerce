"use client";

import { useLocale } from "next-intl";
import { BellOff } from "lucide-react";

export default function NotificationNotFount() {
  const lang = useLocale();
  const isRtl = lang === "ar";

  return (
    <div className="w-full py-20 flex flex-col items-center gap-4 text-center">
      <BellOff className="w-24 h-24 text-primary opacity-80" />
      <h2 className="text-xl font-bold text-primary">
        {isRtl ? "لا توجد إشعارات" : "No Notifications"}
      </h2>
      <p className="text-muted-foreground text-sm max-w-xs">
        {isRtl
          ? "ليس لديك أي إشعارات جديدة في الوقت الحالي"
          : "You don't have any new notifications at the moment."}
      </p>
    </div>
  );
}
