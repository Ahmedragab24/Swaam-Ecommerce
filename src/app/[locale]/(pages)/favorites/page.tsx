"use client";

import { BreadcrumbDemo } from "@/components/breadcrumb";
import CardProduct from "@/components/cardProduct";
import SkeletonProducts from "@/components/skeletonProducts";
import { LangType } from "@/types";
import { ProductType } from "@/types/Products";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";

const FavoritePage = () => {
  const lang = useLocale() as LangType;
  const t = useTranslations("Common"); // Assuming there's a common translation file, or I can use a specific one if I knew it.
  const [favorites, setFavorites] = useState<ProductType[] | null>(null);

  useEffect(() => {
    const storedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    setFavorites(storedFavorites);

    // Optional: Listen for storage changes to update in real-time if multiple tabs are open or if component updates
    const handleStorageChange = () => {
      const updatedFavorites = JSON.parse(
        localStorage.getItem("favorites") || "[]"
      );
      setFavorites(updatedFavorites);
    };

    window.addEventListener("storage", handleStorageChange);
    // Custom event for same-tab updates if needed, but for now simple mount check is fine.
    // Actually, since we might toggle favorite on this page (if we add the button), we might want to update the list.
    // But CardProduct handles the button state. If we remove it, it should disappear?
    // The current requirement is just to list them. If I remove one, it won't disappear from the list until refresh unless I lift state up or use a context.
    // For now, let's stick to the basic requirement: "bring all products from local storage".

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <div className="Container my-20">
      <h1 className="Title_Section py-10">
        <BreadcrumbDemo />
      </h1>

      <div className="mt-4">
        {favorites ? (
          favorites.length > 0 ? (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-10 justify-center items-center">
              {favorites.map((item) => (
                <CardProduct key={item.id} product={item} lang={lang} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center min-h-[40vh] text-gray-500">
              <p className="text-xl font-medium">No favorites yet</p>
            </div>
          )
        ) : (
          <SkeletonProducts />
        )}
      </div>
    </div>
  );
};

export default FavoritePage;
