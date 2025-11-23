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
  dynamicName?: string;
};

export function BreadcrumbDemo({ dynamicName }: Props) {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("breadcrumb");

  const pathWithoutLocale = pathname.replace(`/${locale}`, "");
  const segments = pathWithoutLocale.split("/").filter(Boolean);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="text-lg">
          <BreadcrumbLink asChild>
            <Link href={`/${locale}`}>{t("home")}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {segments.map((segment, index) => {
          const href = `/${locale}/${segments.slice(0, index + 1).join("/")}`;
          const isLast = index === segments.length - 1;

          const translated = t.rich(segment, { default: "" });
          const label =
            isLast && dynamicName
              ? dynamicName
              : translated ?? decodeURIComponent(segment);

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
