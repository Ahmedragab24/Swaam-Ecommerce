import { AdsType } from "@/types/Ads";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Phone, MessageCircle } from "lucide-react";

interface Props {
  ad: AdsType;
}

const AdsCard: React.FC<Props> = ({ ad }) => {
  return (
    <div className="relative w-full  rounded-3xl overflow-hidden shadow-lg group">
      {/* Image */}
      <div className="relative inset-0 w-full h-[400px]">
        <Image
          src={ad.image}
          alt={ad.title}
          fill
          className="object-fill"
          quality={100}
        />
      </div>

      {/* Overlay Content - Buttons at the bottom */}
      <div className="flex gap-3 z-10 bg-white p-2">
        {/* Whatsapp Button */}
        <Link
          href={`https://wa.me/${ad.whatsapp_number}`}
          target="_blank"
          className="flex-1 bg-[#4CAF50] hover:bg-[#45a049] text-white h-12 rounded-2xl flex items-center justify-center transition-colors"
        >
          <MessageCircle size={24} fill="white" className="text-white" />
        </Link>

        {/* Phone Button */}
        <Link
          href={`tel:${ad.phone_number}`}
          className="flex-1 bg-[#2196F3] hover:bg-[#1e88e5] text-white h-12 rounded-2xl flex items-center justify-center transition-colors"
        >
          <Phone size={24} fill="white" className="text-white" />
        </Link>
      </div>
    </div>
  );
};

export default AdsCard;
