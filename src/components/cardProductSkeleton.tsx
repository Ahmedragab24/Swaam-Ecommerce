import { Skeleton } from "@/components/ui/skeleton";

const CardProductSkeleton = () => {
  return (
    <div className="p-8 rounded-4xl border border-primary">
      <div className="flex flex-col items-center gap-4">
        <Skeleton className="h-[200px] w-[240px] bg-card" />
        <div className="flex flex-col items-end gap-4">
          <Skeleton className="h-4 w-[230px] bg-card" />
          <Skeleton className="h-4 w-[200px] bg-card" />
          <Skeleton className="h-4 w-[180px] bg-card" />
        </div>
      </div>
    </div>
  );
};

export default CardProductSkeleton;
