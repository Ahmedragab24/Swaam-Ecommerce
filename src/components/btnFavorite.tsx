"use client";

import { Heart } from "lucide-react";
import { Button } from "./ui/button";
import { type MouseEvent, useState } from "react";

interface BtnFavoriteProps {
  className?: string;
  type?: "page" | "card";
  initialFavorite?: boolean;
  onFavoriteChange?: (isFavorite: boolean) => void;
}

const BtnFavorite = ({
  type = "card",
  className,
  initialFavorite = false,
  onFavoriteChange,
}: BtnFavoriteProps) => {
  const [isFavorite, setIsFavorite] = useState(initialFavorite);

  const handleFavoriteToggle = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const newState = !isFavorite;
    setIsFavorite(newState);
    if (onFavoriteChange) {
      onFavoriteChange(newState);
    }
  };

  return (
    <>
      {type === "card" ? (
        <Button
          variant="blur"
          size="icon"
          className={`absolute top-4 right-4 z-20 cursor-pointer rounded-full hover:scale-105 hover:shadow-inner transition ${className}`}
          onClick={handleFavoriteToggle}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          aria-pressed={isFavorite}
          title={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart
            className={`!h-6 !w-6 ${
              isFavorite ? "text-red-500 fill-red-500" : "text-white"
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
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          aria-pressed={isFavorite}
          title={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart
            className={`!h-6 !w-6 ${
              isFavorite ? "text-red-500 fill-red-500" : ""
            }`}
            aria-hidden="true"
          />
        </Button>
      )}
    </>
  );
};

export default BtnFavorite;
