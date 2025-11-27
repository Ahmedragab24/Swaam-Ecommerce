import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const CardPackageSkeleton = () => {
  return (
    <div className="bg-white relative w-full h-fit rounded-3xl border border-gray-200 p-4 shadow-sm">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <Skeleton className="h-8 w-24 rounded-full" />
        <Skeleton className="h-8 w-32 rounded-lg" />
      </div>

      {/* Content Box */}
      <div className="bg-blue-50/50 rounded-2xl p-4 mb-6 space-y-4">
        <div className="flex justify-between items-center bg-white p-3 rounded-xl">
          <Skeleton className="h-10 w-10 rounded-lg" />
          <div className="space-y-2 text-right">
            <Skeleton className="h-4 w-20 ml-auto" />
            <Skeleton className="h-5 w-16 ml-auto" />
          </div>
        </div>
        <div className="flex justify-between items-center bg-white p-3 rounded-xl">
          <Skeleton className="h-10 w-10 rounded-lg" />
          <div className="space-y-2 text-right">
            <Skeleton className="h-4 w-20 ml-auto" />
            <Skeleton className="h-5 w-16 ml-auto" />
          </div>
        </div>
      </div>

      {/* Button */}
      <Skeleton className="h-12 w-full rounded-xl" />
    </div>
  );
};

export default CardPackageSkeleton;
