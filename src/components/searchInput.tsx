import React from "react";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { useTranslations } from "next-intl";

const SearchInput = () => {
  const t = useTranslations("SearchBar");

  return (
    <div className="relative w-[350px]">
      <Input
        placeholder={t("SearchPlaceholder")}
        className="w-fit lg:w-full rounded-lg border border-neutral-200 bg-white/50 pl-16 pr-4 py-2 text-sm shadow-sm focus:ring-2 focus:ring-neutral-400"
      />

      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 text-secondary" />
    </div>
  );
};

export default SearchInput;
