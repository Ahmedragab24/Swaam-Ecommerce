import Image from "next/image";
import React from "react";
import { BannerType } from "@/types/Home";

interface CardHeroProps {
  banner: BannerType;
}

const CardHero = ({ banner }: CardHeroProps) => {
  return (
    <div className="relative bg-secondary rounded-3xl h-[20vh] md:h-[40vh] shadow-lg overflow-hidden">
      {/* Background Image */}
      <Image
        src={banner?.image || ""}
        alt="banner background"
        fill
        priority
        className="object-fill object-center"
        quality={100}
      />

      {/* Content */}
      {/* <div className="relative z-10 w-full h-full flex items-center justify-between px-8 md:px-16">
          <div className="flex flex-col items-start justify-center gap-4 text-white">
            <h1 className="text-md md:text-4xl font-bold drop-shadow-lg">
              {banner?.title}
            </h1>
            <p className="text-lg md:text-5xl text-white drop-shadow-lg">
              {banner?.subtitle}
            </p>
          </div>
        </div> */}
    </div>
  );
};

export default CardHero;
