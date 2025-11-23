import { BreadcrumbDemo } from "@/components/breadcrumb";
import CardCategory from "@/components/cardCategory";
import SkeletonCategories from "@/components/skeletonCategories";
import { getHome } from "@/lib/Api/Home";

const CategoriesPage = async () => {
  const data = await getHome();
  const Categories = data?.data?.categories || [];

  return (
    <div className="Container my-20">
      <h1 className="Title_Section py-10 text-right">
        <BreadcrumbDemo />
      </h1>

      {Categories ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {Categories.map((category) => (
            <div className="h-full" key={category?.id}>
              <CardCategory category={category} />
            </div>
          ))}
        </div>
      ) : (
        <SkeletonCategories />
      )}
    </div>
  );
};

export default CategoriesPage;
