import BannersList from "@/components/bannersList";
import CategoriesList from "@/components/categories";

const HeroSection = () => {
  return (
    <section className="space-y-4 py-4 sm:py-6">
      <BannersList />

      <CategoriesList />
    </section>
  );
};

export default HeroSection;
