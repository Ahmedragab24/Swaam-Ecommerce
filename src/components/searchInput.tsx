"use client";

import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { useLocale } from "next-intl";
import React, { useEffect, useRef, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import Link from "next/link";
import { useGetProductsQuery } from "@/store/services/Products";
import { ProductType } from "@/types/Products";
import { LangType } from "@/types";

const SearchInput = () => {
  const lang = useLocale() as LangType;
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [keyword, setKeyword] = useState("");
  const [debouncedKeyword, setDebouncedKeyword] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // --- Close when click outside ---
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // --- Debounce Search ---
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedKeyword(keyword.trim());
      setIsOpen(keyword.trim().length > 0);
    }, 350);

    return () => clearTimeout(timer);
  }, [keyword]);

  const { data, isLoading, isFetching, isError } = useGetProductsQuery(
    { search: debouncedKeyword },
    { skip: !debouncedKeyword }
  );

  const products = data?.data?.data || [];

  return (
    <div ref={wrapperRef} className="relative">
      {/* SEARCH INPUT */}
      <div className="relative">
        <SearchIcon
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-300"
        />
        <Input
          type="search"
          placeholder={
            lang === "ar" ? "ابحث عن منتج..." : "Search for a product..."
          }
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="w-full md:min-w-[25rem] h-11 ps-10 bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 rounded-full text-sm placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-primary transition-all"
        />
      </div>

      {/* RESULTS */}
      {isOpen && (
        <div className="absolute z-20 mt-2 w-full bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-700 shadow-xl max-h-80 overflow-y-auto backdrop-blur-sm">
          {/* LOADING */}
          {(isLoading || isFetching) && (
            <div className="p-4 space-y-2">
              <Skeleton className="h-5 w-5/6" />
              <Skeleton className="h-5 w-4/6" />
            </div>
          )}

          {/* ERROR */}
          {isError && (
            <div className="p-4 text-sm text-center text-red-600 dark:text-red-300">
              {lang === "ar"
                ? "حدث خطأ أثناء البحث. حاول مرة أخرى."
                : "An error occurred. Please try again."}
            </div>
          )}

          {/* RESULTS */}
          {!isLoading && !isFetching && products.length > 0 && (
            <>
              {products.map((item: ProductType) => (
                <Link
                  key={item.id}
                  href={`/categories/${item.category.id}/${item.sub_category.id}/${item.id}`}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-gray-200 dark:border-zinc-700">
                    <Image
                      src={item.main_image || "/placeholder.png"}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex flex-col w-full min-w-0">
                    <span className="font-medium text-sm truncate">
                      {item.name}
                    </span>
                    <span className="text-xs text-gray-600 dark:text-gray-400">
                      {item.price} {lang === "ar" ? "دينار" : "Dinar"}
                    </span>
                  </div>
                </Link>
              ))}
            </>
          )}

          {/* NO RESULTS */}
          {!isLoading &&
            !isFetching &&
            products.length === 0 &&
            !isError &&
            debouncedKeyword && (
              <div className="p-4 text-center text-sm text-gray-600 dark:text-gray-300">
                {lang === "ar" ? "لا توجد نتائج مطابقة" : "No matching results"}
              </div>
            )}
        </div>
      )}
    </div>
  );
};

export default SearchInput;
