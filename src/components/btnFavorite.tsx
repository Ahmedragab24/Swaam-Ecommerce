"use client";

import { Heart } from "lucide-react";
import { Button } from "./ui/button";
import { type MouseEvent, useEffect, useState } from "react";
import { ProductType } from "@/types/Products";
import { toast } from "sonner";

interface BtnFavoriteProps {
  className?: string;
  type?: "page" | "card";
  initialFavorite?: boolean;
  onFavoriteChange?: (isFavorite: boolean) => void;
  product?: ProductType;
}

import { useTranslations } from "next-intl";

const BtnFavorite = ({
  type = "card",
  className,
  initialFavorite = false,
  onFavoriteChange,
  product,
}: BtnFavoriteProps) => {
  const [isFavorite, setIsFavorite] = useState(initialFavorite);
  const t = useTranslations("ProductDetails");

  useEffect(() => {
    if (product) {
      const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
      const isExist = favorites.some(
        (item: ProductType) => item.id === product.id
      );
      setIsFavorite(isExist);
    }
  }, [product]);

  const handleFavoriteToggle = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent triggering parent click events (like card navigation)

    if (!product) return;

    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    const isExist = favorites.some(
      (item: ProductType) => item.id === product.id
    );

    let newFavorites;
    if (isExist) {
      newFavorites = favorites.filter(
        (item: ProductType) => item.id !== product.id
      );
      setIsFavorite(false);
      toast.success(t("RemovedFromFavorites"));
    } else {
      newFavorites = [...favorites, product];
      setIsFavorite(true);
      toast.success(t("AddedToFavorites"));
    }

    localStorage.setItem("favorites", JSON.stringify(newFavorites));

    if (onFavoriteChange) {
      onFavoriteChange(!isExist);
    }
  };

  return (
    <>
      {type === "card" ? (
        <Button
          variant="blur"
          size="icon"
          className={`cursor-pointer rounded-full hover:scale-105 hover:shadow-inner transition w-6 h-6 md:w-8 md:h-8 ${className}`}
          onClick={handleFavoriteToggle}
          aria-label={
            isFavorite ? t("RemoveFromFavorites") : t("AddToFavorites")
          }
          aria-pressed={isFavorite}
          title={isFavorite ? t("RemoveFromFavorites") : t("AddToFavorites")}
        >
          <Heart
            className={`h-4! md:!h-6 w-4! md:!w-6 ${
              isFavorite ? "text-primary fill-primary" : "text-white"
            } drop-shadow-sm`}
            aria-hidden="true"
          />
        </Button>
      ) : (
        <Button
          variant="ghost"
          size="icon"
          onClick={handleFavoriteToggle}
          className={`${className} hover:bg-gray-100`}
          aria-label={
            isFavorite ? t("RemoveFromFavorites") : t("AddToFavorites")
          }
          aria-pressed={isFavorite}
          title={isFavorite ? t("RemoveFromFavorites") : t("AddToFavorites")}
        >
          <Heart
            className={`!h-6 !w-6 ${
              isFavorite ? "text-red-500 fill-red-500" : ""
            } drop-shadow-sm`}
            aria-hidden="true"
          />
        </Button>
      )}
    </>
  );
};

export default BtnFavorite;
