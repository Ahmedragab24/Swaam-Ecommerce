"use client";

import CardPackage from "@/components/cardPackage";
import { PackageType } from "@/types/Package";
import { useTranslations } from "next-intl";
import { useGetPackagesQuery } from "@/store/services/Packages";
import CardPackageSkeleton from "@/components/cardPackageSkeleton";
import DataNotFound from "@/components/DataNotFound";
import { BreadcrumbDemo } from "@/components/breadcrumb";

const PackagesPage = () => {
  const { data, isLoading, error } = useGetPackagesQuery();
  const t = useTranslations("Packages");

  return (
    <div className="Container mt-20 py-10 min-h-[60vh] space-y-4">
      <h1 className="text-3xl font-bold text-center mb-10">{t("title")}</h1>

      <BreadcrumbDemo />

      {isLoading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {Array.from({ length: 8 }).map((_, index) => (
            <CardPackageSkeleton key={index} />
          ))}
        </div>
      ) : error ? (
        <div className="text-center text-red-500 py-10">
          {t("error_loading_packages")}
        </div>
      ) : data?.data && data.data.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {data.data.map((item: PackageType) => (
            <CardPackage key={item.id} Package={item} />
          ))}
        </div>
      ) : (
        <DataNotFound />
      )}
    </div>
  );
};

export default PackagesPage;
