import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MapPin, Eye, Calendar, Tag, ShieldCheck, Gavel } from "lucide-react";
import ProductImages from "@/components/productImages";
import BtnAuctionDetails from "@/components/btnAuctionDetails";
import { getProductDetails } from "@/lib/Api/Products";
import { ProductType } from "@/types/Products";
import { formatDistanceToNow } from "date-fns";
import { ar, enUS } from "date-fns/locale"; // Import English locale
import ShareButton from "@/components/ShareBtn";
import ProductsSection from "@/components/productsSection";
import { LangType } from "@/types";
import { getLocale, getTranslations } from "next-intl/server";

interface ProductDetailsProps {
  params: Promise<{ productID: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
  type?: string;
}

export default async function ProductDetailsPage({
  params,
  type,
}: ProductDetailsProps) {
  const lang = (await getLocale()) as LangType;

  // تم تغيير المسار ليطابق ملف JSON المرفق (AddAuction.Details يحتوي على معظم المفاتيح المطلوبة)
  const t = await getTranslations("AddAuction.Details");

  const { productID } = await params;
  const Product_ID = productID ? Number(productID) : 0;

  const data = await getProductDetails(Product_ID);

  if (!data?.data?.product) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-400">
          {t("ProductNotFound")}
        </h2>
      </div>
    );
  }

  const Product: ProductType = data.data.product;
  const Similar = data.data.similar_products || [];

  // تحديد لغة التاريخ بناءً على لغة الموقع
  const dateLocale = lang === "en" ? enUS : ar;

  return (
    <div className="Container pt-28">
      <div className="flex justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
            {Product.name}
          </h1>
          <span className="text-base text-gray-500">
            {/* استخدام مفتاح Category من ملف الترجمة */}
            {t("Category")} /{" "}
            {lang === "en" ? Product.category?.name_en : Product.category?.name}
          </span>{" "}
        </div>
        <div className="flex items-center gap-2 self-end md:self-auto">
          <ShareButton />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 xl:col-span-8 space-y-8">
          <div className="w-full bg-white rounded-3xl p-2 shadow-sm border border-gray-100 overflow-hidden">
            <ProductImages
              productName={Product.name}
              productImages={{
                mainImage: Product.main_image,
                secondaryImages: Product.images,
              }}
            />
          </div>

          <Card className="border-none shadow-sm rounded-2xl overflow-hidden">
            <div className="bg-white p-6 md:p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Tag className="w-5 h-5 text-primary" />
                {/* تم استخدام DescriptionLabel لأنه الموجود في ملف JSON بدلاً من Title */}
                {t("DescriptionLabel")}
              </h3>
              <p className="text-gray-600 leading-loose whitespace-pre-line text-base md:text-lg">
                {Product.description}
              </p>

              {Product.notes && (
                <div className="mt-6 p-4 bg-yellow-50 rounded-xl border border-yellow-100 text-yellow-800 text-sm">
                  <strong>{t("Notes")}: </strong>
                  {Product.notes}
                </div>
              )}
            </div>
          </Card>
        </div>

        <div className="lg:col-span-5 xl:col-span-4">
          <div className="flex flex-col gap-6 lg:sticky lg:top-24">
            <Card className="border-none shadow-md rounded-2xl overflow-hidden bg-white">
              <CardContent className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">
                      {t("CurrentPrice")}
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl md:text-4xl font-extrabold text-primary">
                        {Product.display_price}{" "}
                        {/* ترجمة العملة يدوياً أو يمكن إضافتها لملف الترجمة */}
                        {lang === "en" ? "KWD" : "د.ك"}
                      </span>
                    </div>
                  </div>
                  {Product.is_auction && (
                    <Badge
                      variant="destructive"
                      className="px-3 py-1 text-sm animate-pulse"
                    >
                      <Gavel className="w-4 h-4 mr-1" /> {t("Auction")}
                    </Badge>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4 py-4 border-y border-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                      <Tag className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-400">
                        {t("Condition")}
                      </span>
                      <span className="font-medium text-base">
                        {/* الترجمة بناءً على القيمة القادمة من الباك إند */}
                        {Product.condition === "new" ? t("New") : t("Used")}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                      <Eye className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-400">
                        {t("Views")}
                      </span>
                      <span className="font-medium text-base">
                        {Product.views_count}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-400">{t("City")}</span>
                      <span className="font-medium text-base">
                        {/* التعامل مع اسم المدينة حسب اللغة إذا توفر */}
                        {lang === "en" && Product.city?.name_en
                          ? Product.city.name_en
                          : Product.city?.name}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-400">
                        {t("PublishedAt")}
                      </span>
                      <span className="font-medium text-base">
                        {formatDistanceToNow(new Date(Product.created_at), {
                          addSuffix: true,
                          locale: dateLocale, // استخدام اللغة الديناميكية
                        })}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  {Product.is_auction && <BtnAuctionDetails />}
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm rounded-2xl bg-white">
              <div className="p-6 flex items-center gap-4">
                <div className="relative">
                  <Avatar className="h-16 w-16 border-2 border-white shadow-md">
                    <AvatarImage
                      src={Product.user.image}
                      alt={Product.user.name}
                    />
                    <AvatarFallback className="bg-primary/10 text-primary font-bold text-xl">
                      {Product.user.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="text-lg font-bold text-gray-900 truncate">
                    {Product.user.name}
                  </h4>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <ShieldCheck className="w-4 h-4 text-green-600" />
                    <span>{t("TrustedSeller")}</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
      {Similar.length > 0 && (
        <ProductsSection
          seeMore={t("SeeMore")}
          seeMorePath="/"
          titleSection={t("SimilarProducts")}
          products={Similar}
          lang={lang}
        />
      )}
    </div>
  );
}
