import CardCategorySkeleton from "./cardCategorySkeleton";

const SkeletonCategories = () => {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 p-4">
      <CardCategorySkeleton />
      <CardCategorySkeleton />
      <CardCategorySkeleton />
      <CardCategorySkeleton />
      <CardCategorySkeleton />
      <CardCategorySkeleton />
    </div>
  );
};

export default SkeletonCategories;
