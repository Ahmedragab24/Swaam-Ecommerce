"use client";

import { BreadcrumbDemo } from "@/components/breadcrumb";
import CardProduct from "@/components/cardProduct";
import SkeletonProducts from "@/components/skeletonProducts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetUserProductsQuery } from "@/store/services/Products";
import { LangType, TypeProductType } from "@/types";
import { useLocale } from "next-intl";
import { useState } from "react";

const MyProductPage = () => {
  const [adType, setAdType] = useState<TypeProductType>("product");
  const { data, isLoading } = useGetUserProductsQuery(adType);
  const userProducts = data?.data?.data;

  const lang = useLocale() as LangType;

  return (
    <div className="Container my-20">
      <h1 className="Title_Section py-10 text-right">
        <BreadcrumbDemo />
      </h1>

      {/* ✔ onValueChange instead of onChange */}
      <Tabs
        value={adType}
        onValueChange={(value) => setAdType(value as TypeProductType)}
        defaultValue="product"
        className="items-center"
        dir={lang === "ar" ? "rtl" : "ltr"}
      >
        <TabsList className="w-full! md:w-1/2!">
          <TabsTrigger value="product">
            {lang === "ar" ? "المنتجات" : "Products"}
          </TabsTrigger>

          <TabsTrigger value="auction">
            {lang === "ar" ? "المزادات" : "Auctions"}
          </TabsTrigger>
        </TabsList>

        {/* منتجات */}
        <TabsContent value="product">
          <div className="mt-4">
            {isLoading ? (
              <SkeletonProducts />
            ) : userProducts?.length ? (
              <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-10 justify-center">
                {userProducts.map((item) => (
                  <CardProduct key={item.id} product={item} lang={lang} />
                ))}
              </div>
            ) : (
              <p className="text-center py-10 text-2xl text-muted-foreground">
                {lang === "ar" ? "لا توجد منتجات" : "No products found"}
              </p>
            )}
          </div>
        </TabsContent>

        {/* مزادات */}
        <TabsContent value="auction">
          <div className="mt-4">
            {isLoading ? (
              <SkeletonProducts />
            ) : userProducts?.length ? (
              <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-10 justify-center">
                {userProducts.map((item) => (
                  <CardProduct key={item.id} product={item} lang={lang} />
                ))}
              </div>
            ) : (
              <p className="text-center py-10 text-2xl text-muted-foreground">
                {lang === "ar" ? "لا توجد مزادات" : "No auctions found"}
              </p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MyProductPage;
