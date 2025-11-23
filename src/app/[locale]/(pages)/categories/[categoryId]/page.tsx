"use client";

import { BreadcrumbDemo } from "@/components/breadcrumb";
import CardSubCategory from "@/components/cardSubCategory";
import SkeletonCategories from "@/components/skeletonCategories";
import { useGetSubCategoriesQuery } from "@/store/services/Home";
import { useParams } from "next/navigation";
import React from "react";

const SubCategoriesPage = () => {
  const { categoryId } = useParams();
  const CategoryID = categoryId ? +categoryId : 0;
  const { data } = useGetSubCategoriesQuery(CategoryID);
  const SubCategories = data?.data?.subcategories || [];

  return (
    <div className="Container my-20">
      <h1 className="Title_Section py-10 text-right">
        <BreadcrumbDemo />
      </h1>

      {SubCategories ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {SubCategories.map((category) => (
            <div className="h-full" key={category?.id}>
              <CardSubCategory subCategories={category} />
            </div>
          ))}
        </div>
      ) : (
        <SkeletonCategories />
      )}
    </div>
  );
};

export default SubCategoriesPage;
