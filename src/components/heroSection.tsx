import BannersList from "@/components/bannersList";
import CategoriesList from "@/components/categories";
import { Suspense } from "react";
import SkeletonCategories from "./skeletonCategories";

const HeroSection = () => {
  return (
    <section className="space-y-4 py-4 sm:py-6">
      <Suspense fallback={<div>Loading...</div>}>
        <BannersList />
      </Suspense>
      <Suspense fallback={<SkeletonCategories />}>
        <CategoriesList />
      </Suspense>
    </section>
  );
};

export default HeroSection;
