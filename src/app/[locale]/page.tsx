import HeroSection from "@/components/heroSection";
import ProductsSection from "@/components/productsSection";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { getHome } from "@/lib/Api/Home";

type IProps = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: IProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  const data = await getHome();
  const LatestProducts = data?.data?.latest_products || [];
  const LatestAuctions = data?.data?.latest_auctions || [];

  return (
    <main className="min-h-screen w-full mt-20 overflow-hidden">
      <div className="Container">
        <HeroSection />
        {/* <AuctionSection /> */}
        <ProductsSection
          lang={locale}
          seeMore={locale === "en" ? "See more" : "مشاهدة الكل"}
          seeMorePath="/"
          titleSection={locale === "en" ? "Latest products" : "أحدث المنتجات"}
          products={LatestProducts}
        />
        <ProductsSection
          seeMore="مشاهدة الكل"
          seeMorePath="/"
          titleSection="اخر المزادات"
          products={LatestAuctions}
          lang={locale}
        />
      </div>
    </main>
  );
}
