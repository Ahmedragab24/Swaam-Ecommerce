"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import CardProduct from "./cardProduct";
import SeeMore from "./seeMore";
import TitleSection from "./titleSection";
import SkeletonProducts from "./skeletonProducts";
import { Suspense } from "react";
import { ProductType } from "@/types/Products";
import { LangType } from "@/types";
import Image from "next/image";

interface IProps {
  seeMore?: string;
  seeMorePath: string;
  titleSection: string;
  products: ProductType[];
  lang: LangType;
}

export default function ProductsSection({
  seeMore = "مشاهدة الكل",
  seeMorePath,
  titleSection,
  products,
  lang,
}: IProps) {
  return (
    <section className="py-10">
      <div className="flex flex-col gap-8">
        {/* Header */}
        <div className="flex justify-between items-end">
          <TitleSection title={titleSection} />
          <SeeMore title={seeMore} path={seeMorePath} />
        </div>

        <Suspense fallback={<SkeletonProducts />}>
          {products.length > 0 ? (
            <Carousel
              opts={{
                align: "start",
                loop: false,
                direction: lang === "ar" ? "rtl" : "ltr",
              }}
              className="w-full"
            >
              <CarouselContent className="">
                {products.map((item) => (
                  <CarouselItem
                    key={item.id}
                    className="basis-1/2 sm:basis-1/2 md:basis-1/3 xl:basis-1/4 shadow-none!"
                  >
                    <div className="pb-8 md:px-4">
                      <CardProduct product={item} lang={lang} />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>

              {/* Arrows */}
              <CarouselPrevious className="hidden md:flex -left-2 lg:-left-4 xl:-left-6" />
              <CarouselNext className="hidden md:flex -right-2 lg:-right-4 xl:-right-6" />
            </Carousel>
          ) : (
            <div className="flex flex-col items-center justify-center gap-2">
              <Image
                src="/Icons/empty.png"
                alt="No Products"
                width={250}
                height={250}
                className="object-contain w-25 h-25 md:w-40 md:h-40"
              />
              <h2 className="text-xl font-bold text-gray-600">
                لا توجد منتجات حالياً
              </h2>
              <p className="text-gray-400 text-center max-w-sm">
                تابعنا للحصول على أحدث المنتجات قريباً.
              </p>
            </div>
          )}
        </Suspense>
      </div>
    </section>
  );
}
