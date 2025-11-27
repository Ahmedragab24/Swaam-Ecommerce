import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const AdsCardSkeleton = () => {
  return (
    <div className="relative w-full aspect-[3/5] rounded-3xl overflow-hidden shadow-lg bg-gray-100">
      <Skeleton className="w-full h-full" />

      <div className="absolute bottom-4 left-4 right-4 flex gap-3 z-10">
        <Skeleton className="flex-1 h-12 rounded-2xl" />
        <Skeleton className="flex-1 h-12 rounded-2xl" />
      </div>
    </div>
  );
};

export default AdsCardSkeleton;
