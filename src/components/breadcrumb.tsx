"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";

type Props = {
  /** لو صفحة منتج ابعت اسم المنتج هنا */
  dynamicName?: string;

  /** ابعت هنا subcategories map: {id: nameAr, nameEn} */
  subCategoriesMap?: Record<string, { ar: string; en: string }>;

  /** ابعت هنا products map: {id: nameAr, nameEn} */
  productsMap?: Record<string, { ar: string; en: string }>;

  /** ابعت هنا custom labels map: {segment: label} */
  customLabels?: Record<string, string>;
};

export function BreadcrumbDemo({
  dynamicName,
  subCategoriesMap = {},
  productsMap = {},
  customLabels = {},
}: Props) {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("breadcrumb");

  // حذف اللغة من أول المسار
  const pathWithoutLocale = pathname.replace(`/${locale}`, "");
  const segments = pathWithoutLocale.split("/").filter(Boolean);

  const isNumeric = (str: string) => /^[0-9]+$/.test(str);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {/* HOME */}
        <BreadcrumbItem className="text-lg">
          <BreadcrumbLink asChild>
            <Link href={`/${locale}`}>{t("home")}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {segments.map((segment, index) => {
          const isLast = index === segments.length - 1;
          const href = `/${locale}/${segments.slice(0, index + 1).join("/")}`;

          let label: string | React.ReactNode = "";

          if (customLabels[segment]) {
            /** 0️⃣ لو في custom label */
            label = customLabels[segment];
          } else if (isLast && isNumeric(segment)) {
            /** 1️⃣ لو آخر Segment رقم → صفحة منتج */
            label = dynamicName || t("product");
          } else if (isNumeric(segment) && subCategoriesMap[segment]) {
            label =
              locale === "ar"
                ? subCategoriesMap[segment].ar
                : subCategoriesMap[segment].en;
          } else if (isNumeric(segment) && productsMap[segment]) {
            label =
              locale === "ar"
                ? productsMap[segment].ar
                : productsMap[segment].en;
          } else {
            const translated = t.rich(segment, { default: "" });
            label = translated || decodeURIComponent(segment);
          }

          return (
            <React.Fragment key={index}>
              <BreadcrumbSeparator />

              <BreadcrumbItem className="text-lg">
                {isLast ? (
                  <BreadcrumbPage>{label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={href}>{label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
