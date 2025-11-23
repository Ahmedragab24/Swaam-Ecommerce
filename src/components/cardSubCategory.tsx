import { SubCategoryType } from "@/types/Categories";
import { useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  subCategories: SubCategoryType;
}

const CardSubCategory = ({ subCategories }: Props) => {
  const locale = useLocale();
  return (
    <Link
      href={`/${locale}/categories/${subCategories?.category_id}/${subCategories?.id}`}
      className="group"
    >
      <div className="min-h-[180px] flex justify-center bg-white rounded-2xl p-2 md:p-4 shadow-lg group-hover:scale-105 group-hover:shadow-card transition-all duration-300">
        <Image
          src={subCategories?.image || ""}
          alt={subCategories?.name || ""}
          width={150}
          height={150}
          loading="lazy"
          className="group-hover:scale-110 transition-all duration-300"
        />
      </div>
      <h1 className="text-center text-sm md:text-lg font-bold mt-3 group-hover:scale-110 group-hover:text-muted transition-all duration-300">
        {subCategories?.name || ""}
      </h1>
    </Link>
  );
};

export default CardSubCategory;
