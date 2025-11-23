import { BreadcrumbDemo } from "@/components/breadcrumb";
import CardProduct from "@/components/cardProduct";
import SkeletonProducts from "@/components/skeletonProducts";
import { ProductsAuction } from "@/constants";
import { LangType } from "@/types";
import { useLocale } from "next-intl";

const AuctionPage = () => {
  const lang = useLocale() as LangType


  return (
    <div className="Container my-20">
      <h1 className="Title_Section py-10 text-right">
        <BreadcrumbDemo />
      </h1>
      <div>
        {ProductsAuction ? (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-10 justify-center items-center">
            {ProductsAuction.map((item) => (
              <CardProduct key={item.id} product={item} lang={lang} />
            ))}
          </div>
        ) : (
          <SkeletonProducts />
        )}
      </div>
    </div>
  );
};

export default AuctionPage;
