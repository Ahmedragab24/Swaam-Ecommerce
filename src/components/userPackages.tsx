"use client";

import { useGetUserPackageQuery } from "@/store/services/Auth/Profile";
import {
  AlertTriangle,
  Box,
  CheckCircle2,
  FileText,
  Gavel,
  Tag,
  DollarSign,
  BarChart3,
  BookOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";
import LoaderSpin from "./loader";
import { useLocale, useTranslations } from "next-intl";

const UserPackages = () => {
  const { data, isLoading } = useGetUserPackageQuery();
  const packageData = data?.data;
  const lang = useLocale();
  const t = useTranslations("UserPackages");

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoaderSpin type="page" size="lg" />
      </div>
    );
  }

  const isSubscribed = packageData?.is_subscribed;
  const currentPackage = packageData?.package;

  return (
    <div
      className="max-w-3xl mx-auto space-y-6 pb-8"
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          {t("Title")}
        </h1>
      </div>

      {/* Status Card */}
      <div
        className={cn(
          "relative overflow-hidden rounded-2xl p-6 text-white shadow-lg transition-all duration-300 hover:shadow-xl",
          isSubscribed
            ? "bg-gradient-to-r from-emerald-500 to-teal-600"
            : "bg-gradient-to-r from-orange-400 to-amber-500"
        )}
      >
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-1">
              {isSubscribed ? t("Subscribed") : t("NotSubscribed")}
            </h2>
            <p className="text-white/90 font-medium">
              {isSubscribed ? t("Active") : t("NeedsActivation")}
            </p>
          </div>
          <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
            {isSubscribed ? (
              <CheckCircle2 className="w-8 h-8 text-white" />
            ) : (
              <AlertTriangle className="w-8 h-8 text-white" />
            )}
          </div>
        </div>
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 rounded-full bg-white/10 blur-xl" />
        <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-32 h-32 rounded-full bg-white/10 blur-xl" />
      </div>

      {/* Usage Statistics */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex items-center gap-3">
          <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <BarChart3 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-lg font-bold text-gray-800 dark:text-white">
            {t("UsageStats")}
          </h3>
        </div>

        <div className="p-4 grid gap-4">
          {/* Products Stats */}
          <div className="bg-gray-50 dark:bg-gray-700/50 border rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-sky-100 dark:bg-sky-900/30 rounded-xl">
                <Box className="w-6 h-6 text-sky-600 dark:text-sky-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                  {t("ProductsUsed")}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {packageData?.remainingProducts ?? 0} {t("Remaining")}
                </p>
              </div>
            </div>
            <div className="w-12 h-12 rounded-full bg-sky-500 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-sky-500/20">
              {packageData?.currentProducts ?? 0}
            </div>
          </div>

          {/* Auctions Stats */}
          <div className="bg-gray-50 dark:bg-gray-700/50 border rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl">
                <Gavel className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                  {t("AuctionsUsed")}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {packageData?.remainingAuctions ?? 0} {t("Remaining")}
                </p>
              </div>
            </div>
            <div className="w-12 h-12 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-indigo-500/20">
              {packageData?.currentAuctions ?? 0}
            </div>
          </div>
        </div>
      </div>

      {/* Package Details */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex items-center gap-3">
          <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-lg font-bold text-gray-800 dark:text-white">
            {t("PackageDetails")}
          </h3>
        </div>

        <div className="p-4 space-y-3">
          {/* Name */}
          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/30 border rounded-xl">
            <div className="text-right">
              <p className="text-xs text-gray-500 mb-1">{t("Name")}</p>
              <p className="font-semibold text-gray-800 dark:text-white">
                {currentPackage?.name || t("NoPackage")}
              </p>
            </div>
            <div className="p-2 bg-white dark:bg-gray-600 rounded-lg shadow-sm">
              <Tag className="w-5 h-5 text-blue-500" />
            </div>
          </div>

          {/* Description */}
          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/30 border rounded-xl">
            <div className="text-right">
              <p className="text-xs text-gray-500 mb-1">{t("Description")}</p>
              <p className="font-medium text-sm text-gray-800 dark:text-white">
                {currentPackage?.description ||
                  currentPackage?.dscription ||
                  t("NoDescription")}
              </p>
            </div>
            <div className="p-2 bg-white dark:bg-gray-600 rounded-lg shadow-sm">
              <FileText className="w-5 h-5 text-blue-500" />
            </div>
          </div>

          {/* Max Products */}
          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/30 border rounded-xl">
            <div className="text-right">
              <p className="text-xs text-gray-500 mb-1">{t("MaxProducts")}</p>
              <p className="font-semibold text-gray-800 dark:text-white">
                {currentPackage?.max_products ?? 0}
              </p>
            </div>
            <div className="p-2 bg-white dark:bg-gray-600 rounded-lg shadow-sm">
              <Box className="w-5 h-5 text-blue-500" />
            </div>
          </div>

          {/* Max Auctions */}
          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/30 border rounded-xl">
            <div className="text-right">
              <p className="text-xs text-gray-500 mb-1">{t("MaxAuctions")}</p>
              <p className="font-semibold text-gray-800 dark:text-white">
                {currentPackage?.max_auctions ?? 0}
              </p>
            </div>
            <div className="p-2 bg-white dark:bg-gray-600 rounded-lg shadow-sm">
              <Gavel className="w-5 h-5 text-blue-500" />
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/30 border rounded-xl">
            <div className="text-right">
              <p className="text-xs text-gray-500 mb-1">{t("Price")}</p>
              <p className="font-semibold text-gray-800 dark:text-white">
                {Number(currentPackage?.price ?? 0).toFixed(2)} {t("Currency")}
              </p>
            </div>
            <div className="p-2 bg-white dark:bg-gray-600 rounded-lg shadow-sm">
              <DollarSign className="w-5 h-5 text-blue-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPackages;
