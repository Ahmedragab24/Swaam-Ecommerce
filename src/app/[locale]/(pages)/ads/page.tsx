"use client";

import { useGetAdsQuery } from "@/store/services/Ads";
import React from "react";
import AdsCard from "@/components/cardAds";
import AdsCardSkeleton from "@/components/cardAdsSkeleton";
import { useTranslations } from "next-intl";
import { BreadcrumbDemo } from "@/components/breadcrumb";

interface Props {}

const AdsPage: React.FC<Props> = ({}) => {
  const { data, isLoading, error } = useGetAdsQuery();
  const t = useTranslations("Ads");

  return (
    <div className="Container mt-28 mb-8 space-y-4">
      <h1 className="text-3xl font-bold text-center mb-4">{t("title")}</h1>

      <BreadcrumbDemo />

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <AdsCardSkeleton key={index} />
          ))}
        </div>
      ) : error ? (
        <div className="text-center text-red-500 py-10">
          {t("error_loading_ads")}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {data?.data?.map((ad) => (
            <AdsCard key={ad.id} ad={ad} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AdsPage;
