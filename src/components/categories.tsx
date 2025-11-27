"use client";

import type { LangType } from "@/types";
import CardCategory from "./cardCategory";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import React from "react";
import TitleSection from "./titleSection";
import SeeMore from "./seeMore";
import SkeletonCategories from "./skeletonCategories";
import { useLocale } from "next-intl";
import { useGetHomeQuery } from "@/store/services/Home";

const CategoriesList = () => {
  const locale = useLocale() as LangType;
  const isRtl = locale === "ar";
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );
  const { data, isLoading } = useGetHomeQuery();
  const Categories = data?.data?.categories || [];

  return (
    <div className="w-full">
      <div className="w-full flex flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-2">
        <TitleSection title={isRtl ? "الأقسام" : "Categories"} />
        <SeeMore
          title={isRtl ? "مشاهدة الكل" : "See More"}
          path={`${locale}/categories`}
        />
      </div>

      {isLoading ? (
        <SkeletonCategories />
      ) : Categories ? (
        <div className="relative">
          <Carousel
            plugins={[plugin.current]}
            onMouseEnter={() => plugin.current.stop()}
            onMouseLeave={() => plugin.current.play()}
            opts={{
              align: "start",
              loop: true,
              dragFree: true,
            }}
            // className="w-full gap-8"
          >
            <CarouselContent className="-ml-1 sm:-ml-2 lg:-ml-4 pt-1 rtl:flex-row-reverse space-x-2 md:space-x-0">
              {Categories.map((category) => (
                <CarouselItem
                  key={category.id}
                  className="pl-1 sm:pl-2 lg:pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6"
                >
                  <div className="h-full">
                    <CardCategory category={category} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Navigation Arrows - Hidden on mobile, visible on larger screens */}
            <CarouselPrevious className="hidden md:flex -left-2 lg:-left-4 xl:-left-6" />
            <CarouselNext className="hidden md:flex -right-2 lg:-right-4 xl:-right-6" />
          </Carousel>
        </div>
      ) : (
        <SkeletonCategories />
      )}
    </div>
  );
};

export default CategoriesList;
