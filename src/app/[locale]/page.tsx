import HeroSection from "@/components/heroSection";
import ProductsSection from "@/components/productsSection";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { getHome } from "@/lib/Api/Home";

import { getTranslations } from "next-intl/server";

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
  const t = await getTranslations("HomePage");

  return (
    <main className="min-h-screen w-full mt-10 md:mt-20 overflow-hidden">
      <div className="Container">
        <HeroSection />
        {/* <AuctionSection /> */}
        <ProductsSection
          lang={locale}
          seeMore={t("seeMore")}
          seeMorePath="/all-products"
          titleSection={t("latestProducts")}
          products={LatestProducts}
        />
        <ProductsSection
          seeMore={t("seeMore")}
          seeMorePath="/auction"
          titleSection={t("latestAuctions")}
          products={LatestAuctions}
          lang={locale}
        />
      </div>
    </main>
  );
}
