"use client";

import LoaderSpin from "@/components/loader";
import { useTranslations } from "next-intl";

const Loading = () => {
  const t = useTranslations("loading");

  return (
    <div className="Container mx-auto h-screen flex justify-center items-center">
      <LoaderSpin type="page" size="lg" title={t("title")} />
    </div>
  );
};

export default Loading;
