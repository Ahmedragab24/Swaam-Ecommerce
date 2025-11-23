"use client";

import { BreadcrumbDemo } from "@/components/breadcrumb";
import CardProduct from "@/components/cardProduct";
import CardProductSkeleton from "@/components/cardProductSkeleton";
import NoProducts from "@/components/NoProducts";
import ProductsFilters from "@/components/ProductsFilters";
import { useGetProductsQuery } from "@/store/services/Products";
import { LangType } from "@/types";
import {
  ProductConditionType,
  SortByType,
  TypeProductType,
} from "@/types/Products";
import { useLocale } from "next-intl";
import { useParams, useSearchParams } from "next/navigation";

export default function ProductsPage() {
  const { categoryId, products: subCategoryId } = useParams();

  const qs = useSearchParams();
  const lang = useLocale() as LangType;

  const routeCategoryId = categoryId ? Number(categoryId) : undefined;
  const routeSubCategoryId = subCategoryId ? Number(subCategoryId) : undefined;

  const clean = (value: string | null) =>
    value && value.trim() !== "" ? value : undefined;

  const typedApiParams = {
    search: clean(qs.get("search")),
    condition: clean(qs.get("condition")) as ProductConditionType | undefined,
    sort: clean(qs.get("sort")) as SortByType | undefined,
    type: clean(qs.get("type")) as TypeProductType | undefined,

    min_price: qs.get("min_price") ? Number(qs.get("min_price")) : undefined,
    max_price: qs.get("max_price") ? Number(qs.get("max_price")) : undefined,

    category_id: qs.get("category_id")
      ? Number(qs.get("category_id"))
      : routeCategoryId,

    sub_category_id: qs.get("sub_category_id")
      ? Number(qs.get("sub_category_id"))
      : routeSubCategoryId,

    per_page: 20,
  };

  const { data, isLoading, isError } = useGetProductsQuery(typedApiParams);

  const Products = data?.data?.data || [];

  return (
    <div className="Container my-20">
      <h1 className="Title_Section py-10">
        <BreadcrumbDemo />
      </h1>

      <ProductsFilters />

      {isLoading && (
        <div className="grid md:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <CardProductSkeleton key={i} />
          ))}
        </div>
      )}

      {isError && <NoProducts />}

      {!isLoading && Products.length === 0 && <NoProducts />}

      {!isLoading && Products.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {Products.map((product) => (
            <CardProduct key={product.id} product={product} lang={lang} />
          ))}
        </div>
      )}
    </div>
  );
}
