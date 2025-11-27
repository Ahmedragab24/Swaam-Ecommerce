"use client";

import { useLocale } from "next-intl";
import { ReactNode } from "react";

interface Props {
  title?: string;
  description?: string;
  icon?: ReactNode;
}

export default function DataNotFount({ title, description, icon }: Props) {
  const lang = useLocale();
  const isRtl = lang === "ar";

  return (
    <div className="w-full py-20 flex flex-col items-center gap-4 text-center">
      <div className="text-primary opacity-80 [&>svg]:w-24 [&>svg]:h-24">
        {icon}
      </div>
      <h2 className="text-xl font-bold text-primary">
        {title || (isRtl ? "لا توجد بيانات" : "No Data Found")}
      </h2>
      <p className="text-muted-foreground text-sm max-w-xs">
        {description ||
          (isRtl
            ? "حاول تعديل الفلاتر أو البحث مرة أخرى"
            : "Try adjusting the filters or searching again.")}
      </p>
    </div>
  );
}
