"use client";

import { useLocale } from "next-intl";
import Image from "next/image";

export default function NoProducts() {
  const lang = useLocale();
  const isRtl = lang === "ar";

  return (
    <div className="w-full py-20 flex flex-col items-center gap-4 text-center">
      <Image
        src="/Icons/empty.png"
        alt="No Products"
        width={200}
        height={200}
        className="opacity-80"
      />
      <h2 className="text-xl font-bold text-primary">
        {isRtl ? " لا توجد منتجات" : "No Products Found"}
      </h2>
      <p className="text-muted-foreground text-sm max-w-xs">
        {isRtl
          ? "حاول تعديل الفلاتر أو البحث مرة أخرى"
          : "Try adjusting the filters or searching again."}
      </p>
    </div>
  );
}
