import { MapPin, Gavel, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { ProductType } from "@/types/Products";
import { LangType } from "@/types";
import BtnFavorite from "./btnFavorite";
import { cn } from "@/lib/utils";
import SpacialProductBtn from "./SpacialProductBtn";

interface ProductCardProps {
  product: ProductType;
  className?: string;
  lang: LangType;
}

const CardProduct = ({ product, className, lang }: ProductCardProps) => {
  const {
    id,
    name,
    main_image,
    city,
    display_price,
    condition,
    is_auction,
    is_featured,
    category,
    sub_category,
  } = product;

  const conditionBadge = (
    <span className="absolute top-2 rtl:left-2 ltr:right-2 text-xs md:text-base bg-primary text-white  px-2 py-1 rounded-md">
      {condition === "new"
        ? lang === "en"
          ? "New"
          : "جديد"
        : lang === "en"
        ? "Used"
        : "مستعمل"}
    </span>
  );

  const auctionBadge = is_auction;

  const featuredBadge = is_featured && (
    <span className="absolute bottom-2 rtl:left-2 ltr:right-2 bg-yellow-500 text-white flex items-center gap-1 text-xs px-2 py-1 rounded-md shadow">
      <Star size={14} /> {lang === "en" ? "Special" : "مميز"}
    </span>
  );

  return (
    <Card
      className={`relative p-0 w-full md:w-[280px] rounded-3xl border border-primary bg-background/40 backdrop-blur-sm shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden ${className}`}
    >
      <Link
        href={`/${lang}/categories/${category?.id}/${sub_category?.id}/${id}`}
      >
        <CardContent className="flex flex-col gap-3 p-2">
          {/* Image Section */}
          <div className="relative w-full h-[120px] md:h-[220px] rounded-2xl overflow-hidden">
            <Image
              src={main_image}
              alt={name}
              fill
              quality={100}
              className="object-cover group-hover:scale-105 transition duration-300"
            />

            <div className={cn("absolute top-2 rtl:right-2 ltr:left-2")}>
              <BtnFavorite product={product} />
            </div>
            <div
              className={cn(
                "absolute bottom-2 right-2 flex items-center gap-1 bg-orange-500! text-white px-2 rounded-full"
              )}
            >
              <SpacialProductBtn product={product} />
            </div>
            {/* Dynamic Badges */}
            {auctionBadge}
            {conditionBadge}
            {featuredBadge}
          </div>

          <div className="space-y-1 px-2">
            {/* Name */}
            <h3 className="text-sm md:text-base font-bold text-foreground truncate">
              {name}
            </h3>

            {/* Location */}
            <div className="flex items-center text-gray-500 gap-1 text-sm">
              <MapPin size={18} />
              <span>{city?.name_ar || city?.name}</span>
            </div>

            {/* Price */}
            <div className="flex justify-between items-center gap-2">
              <span className="text-primary text-lg font-bold">
                {display_price} {lang === "en" ? "Dinar" : "دينار"}
              </span>

              {auctionBadge && (
                <span className="absolute bottom-2 rtl:left-2 ltr:right-2 bg-amber-600 text-white flex items-center gap-1 text-xs px-3 py-1 rounded-full shadow">
                  <Gavel size={14} /> {lang === "en" ? "Auction" : "مزاد"}
                </span>
              )}
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};

export default CardProduct;
