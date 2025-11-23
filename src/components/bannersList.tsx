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

const BannersList = () => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const plugin = React.useRef(
    Autoplay({ delay: 2800, stopOnInteraction: true })
  );
  const { data } = useGetHomeQuery();
  const Banners = data?.data?.banners || [];

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
          {Banners.map((banner) => (
            <CarouselItem
              key={banner.id}
              className="pl-1 sm:pl-2 lg:pl-4 basis-full sm:basis-1/2 lg:basis-1/2"
            >
              <div className="h-full">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: banner.id * 0.1,
                    ease: "easeOut",
                  }}
                  className="w-full h-full"
                >
                  <CardHero banner={banner} />
                </motion.div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Pagination Dots */}
        <div className="flex justify-center items-center gap-1 sm:gap-2 mt-2 sm:mt-4">
          {Banners.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`transition-all duration-300 cursor-pointer hover:opacity-80 ${
                selectedIndex === index
                  ? "w-6 sm:w-8 lg:w-12 h-1 sm:h-1.5 lg:h-2 bg-primary rounded-full"
                  : "w-1 sm:w-1.5 lg:w-2 h-1 sm:h-1.5 lg:h-2 bg-gray-400 rounded-full hover:bg-gray-500"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </Carousel>
    </div>
  );
};

export default BannersList;
