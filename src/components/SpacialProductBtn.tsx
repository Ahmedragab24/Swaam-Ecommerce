"use client";

import { Sparkles } from "lucide-react";
import React from "react";
import { ProductType } from "@/types/Products";
import { useGetUserInfoQuery } from "@/store/services/Auth/Profile";

interface Props {
  product: ProductType;
}

import { useTranslations } from "next-intl";

const SpacialProductBtn: React.FC<Props> = ({ product }) => {
  const { data } = useGetUserInfoQuery();
  const user = data?.data.user;
  const t = useTranslations("ProductDetails");

  return (
    <>
      {user?.id === product.user.id ? (
        <div
          className="flex items-center gap-1 bg-orange-500! text-white px-4 py-1 rounded-full"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            window.open(
              `https://admin.sawaam.com/sadad/create-invoice?product_id=${product.id}&user_id=${user?.id}`,
              "_blank"
            );
          }}
        >
          <Sparkles className="w-4 h-4" />
          <span>{t("FeatureProduct")}</span>
        </div>
      ) : null}
    </>
  );
};

export default SpacialProductBtn;
