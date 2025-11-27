"use client";

import CardHero from "./cardHero";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import type { CarouselApi } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import React from "react";
import { motion } from "framer-motion";
import { useGetHomeQuery } from "@/store/services/Home";
import { Skeleton } from "./ui/skeleton";

const BannersList = () => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const plugin = React.useRef(
    Autoplay({ delay: 2800, stopOnInteraction: true })
  );

  const { data, isLoading } = useGetHomeQuery();

  const Banners = React.useMemo(() => {
    return data?.data?.banners ?? [];
  }, [data]);

  // Track selected slide
  React.useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      const index = api.selectedScrollSnap();
      setSelectedIndex(index);
    };

    api.on("select", onSelect);
    onSelect();

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <div className="w-full">
      {isLoading ? (
        <Skeleton className="h-[500px] w-full rounded-2xl" />
      ) : Banners.length === 0 ? (
        <p className="text-center text-gray-500 py-10">No Banners Found</p>
      ) : (
        <Carousel
          plugins={[plugin.current]}
          onMouseEnter={() => plugin.current.stop()}
          onMouseLeave={() => plugin.current.play()}
          opts={{
            align: "start",
            loop: true,
          }}
          setApi={setApi}
          className="w-full"
        >
          <CarouselContent className="-ml-1 sm:-ml-2 lg:-ml-4 rtl:flex-row-reverse pb-4 pt-8">
            {Banners.map((banner, index) => (
              <CarouselItem
                key={banner.id}
                className="pl-1 sm:pl-2 lg:pl-4 basis-full sm:basis-1/2 lg:basis-1/2"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.15,
                    ease: "easeOut",
                  }}
                  className="w-full h-full"
                >
                  <CardHero banner={banner} />
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Pagination Dots */}
          <div className="flex justify-center items-center gap-1 sm:gap-2 mt-2 sm:mt-4">
            {Banners.map((_, index) => {
              const isActive = selectedIndex === index;
              return (
                <button
                  key={index}
                  onClick={() => api?.scrollTo(index)}
                  disabled={!api}
                  className={`transition-all duration-300 cursor-pointer 
                    ${
                      isActive
                        ? "w-6 sm:w-8 lg:w-12 h-1 sm:h-1.5 lg:h-2 bg-primary rounded-full"
                        : "w-1 sm:w-1.5 lg:w-2 h-1 sm:h-1.5 lg:h-2 bg-gray-400 rounded-full hover:bg-gray-500"
                    }
                  `}
                  aria-label={`Go to slide ${index + 1}`}
                />
              );
            })}
          </div>
        </Carousel>
      )}
    </div>
  );
};

export default BannersList;
