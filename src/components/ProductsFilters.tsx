"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

export default function ProductsFilters() {
  const t = useTranslations("ProductsFilters");
  const router = useRouter();
  const params = useSearchParams();

  const updateFilter = (key: string, value: string) => {
    const query = new URLSearchParams(params.toString());
    if (value && value.trim() !== "") query.set(key, value);
    else query.delete(key);
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
