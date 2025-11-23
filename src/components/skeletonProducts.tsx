import CardProductSkeleton from "./cardProductSkeleton";

const SkeletonProducts = () => {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <CardProductSkeleton />
      <CardProductSkeleton />
      <CardProductSkeleton />
      <CardProductSkeleton />
    </div>
  );
};

export default SkeletonProducts;
