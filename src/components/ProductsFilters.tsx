"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import {
  useGetHomeQuery,
  useGetSubCategoriesQuery,
} from "@/store/services/Home";

export default function ProductsFilters({
  type,
}: {
  type: "all" | "category";
}) {
  const t = useTranslations("ProductsFilters");
  const router = useRouter();
  const params = useSearchParams();
  const lang = useLocale();

  const categoryId = params.get("category_id");
  const { data: Categories } = useGetHomeQuery();
  const CategoriesData = Categories?.data?.categories || [];

  const { data: Subcategories } = useGetSubCategoriesQuery(Number(categoryId), {
    skip: !categoryId || categoryId === "all" || isNaN(Number(categoryId)),
  });
  const SubcategoriesData = Subcategories?.data?.subcategories || [];

  const updateFilter = (key: string, value: string) => {
    const query = new URLSearchParams(params.toString());
    if (value && value.trim() !== "" && value !== "all") {
      query.set(key, value);
    } else {
      query.delete(key);
    }

    // If changing category, reset subcategory
    if (key === "category_id") {
      query.delete("sub_category_id");
    }

    router.push(`?${query.toString()}`);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-10">
      {/* البحث */}
      <Input
        placeholder={t("search")}
        value={params.get("search") ?? ""}
        onChange={(e) => updateFilter("search", e.target.value)}
      />

      {/* الفئة */}
      {type === "all" && (
        <>
          <Select
            onValueChange={(value) => {
              updateFilter("category_id", value);
            }}
            value={categoryId ?? ""}
          >
            <SelectTrigger className="w-full h-11!">
              <SelectValue placeholder={t("category")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("all")}</SelectItem>
              {CategoriesData.map((category) => (
                <SelectItem key={category.id} value={category.id.toString()}>
                  {lang === "ar" ? category.name : category.name_en}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* الفئة الفرعية */}
          {SubcategoriesData.length > 0 && (
            <Select
              onValueChange={(value) => updateFilter("sub_category_id", value)}
              value={params.get("sub_category_id") ?? ""}
            >
              <SelectTrigger className="w-full h-11!">
                <SelectValue placeholder={t("sub_category")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("all")}</SelectItem>
                {SubcategoriesData.map((subCategory) => (
                  <SelectItem
                    key={subCategory.id}
                    value={subCategory.id.toString()}
                  >
                    {lang === "ar" ? subCategory.name : subCategory.name_en}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </>
      )}

      {/* السورت */}
      <Select
        onValueChange={(value) => updateFilter("sort", value)}
        value={params.get("sort") ?? ""}
      >
        <SelectTrigger className="w-full h-11!">
          <SelectValue placeholder={t("sort")} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="latest">{t("latest")}</SelectItem>
          <SelectItem value="oldest">{t("oldest")}</SelectItem>
          <SelectItem value="price_asc">{t("price_asc")}</SelectItem>
          <SelectItem value="price_desc">{t("price_desc")}</SelectItem>
          <SelectItem value="views">{t("views")}</SelectItem>
        </SelectContent>
      </Select>

      {/* حالة المنتج */}
      <Select
        onValueChange={(value) => updateFilter("condition", value)}
        value={params.get("condition") ?? ""}
      >
        <SelectTrigger className="w-full h-11!">
          <SelectValue placeholder={t("condition")} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="new">{t("new")}</SelectItem>
          <SelectItem value="used">{t("used")}</SelectItem>
        </SelectContent>
      </Select>

      {/* أقل سعر */}
      <Input
        type="number"
        placeholder={t("min_price")}
        value={params.get("min_price") ?? ""}
        onChange={(e) => updateFilter("min_price", e.target.value)}
      />

      {/* أعلى سعر */}
      <Input
        type="number"
        placeholder={t("max_price")}
        value={params.get("max_price") ?? ""}
        onChange={(e) => updateFilter("max_price", e.target.value)}
      />
    </div>
  );
}
