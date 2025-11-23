import { Skeleton } from "./ui/skeleton";

const CardCategorySkeleton = () => {
  return (
    <div className="flex flex-col items-center gap-4">
      <Skeleton className="w-[200px] h-[130px] bg-card" />
      <div className="flex flex-col items-end gap-4">
        <Skeleton className="h-4 w-[120px] bg-card" />
      </div>
    </div>
  );
};

export default CardCategorySkeleton;
