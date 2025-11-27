import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  count?: number;
}

const GroupCardsSkeletons = ({ count = 4 }: Props) => {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="flex items-start gap-3 p-3 rounded-lg border border-gray-200"
        >
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
      ))}
    </>
  );
};

export default GroupCardsSkeletons;
