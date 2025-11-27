import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { useLocale } from "next-intl";
import { Button } from "./ui/button";
import { PackageType } from "@/types/Package";
import { ShoppingBag, Gavel } from "lucide-react";
import { useGetUserInfoQuery } from "@/store/services/Auth/Profile";

interface IProps {
  Package: PackageType;
}

const CardPackage = ({ Package }: IProps) => {
  const locale = useLocale();
  const { data } = useGetUserInfoQuery();
  const userId = data?.data?.user?.id;

  return (
    <Card className="bg-white relative w-full h-fit rounded-3xl border border-primary/20 hover:border-primary duration-300 cursor-pointer group shadow-sm hover:shadow-xl transition-all overflow-hidden">
      <CardContent className="p-4">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div className="bg-[#00BCD4] text-white px-4 py-1.5 rounded-full text-sm font-bold">
            {Number(Package.price).toFixed(2)}{" "}
            {locale === "en" ? "KWD" : "دينار"}
          </div>
          <h3 className="text-xl font-bold text-[#00BCD4]">{Package.name}</h3>
        </div>

        {/* Features Box */}
        <div className="bg-[#F0F9FF] rounded-2xl p-4 mb-6 space-y-3">
          {/* Ads Count */}
          <div className="flex items-center justify-between bg-white p-3 rounded-xl shadow-sm">
            <div className="bg-[#E1F5FE] p-2 rounded-lg">
              <ShoppingBag className="text-[#00BCD4]" size={20} />
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500 mb-0.5">
                {locale === "en" ? "Number of Ads" : "عدد الاعلانات"}
              </p>
              <p className="font-bold text-gray-800">
                {Package.max_products} {locale === "en" ? "Ads" : "إعلانات"}
              </p>
            </div>
          </div>

          {/* Auctions Count */}
          <div className="flex items-center justify-between bg-white p-3 rounded-xl shadow-sm">
            <div className="bg-[#FFF3E0] p-2 rounded-lg">
              <Gavel className="text-[#FF9800]" size={20} />
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500 mb-0.5">
                {locale === "en" ? "Number of Auctions" : "عدد المزادات"}
              </p>
              <p className="font-bold text-gray-800">
                {Package.max_auctions} {locale === "en" ? "Auctions" : "مزادات"}
              </p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <Button className="w-full bg-[#00BCD4] hover:bg-[#00ACC1] text-white rounded-xl h-12 text-lg font-medium">
          <Link
            className="w-full"
            href={`https://admin.sawaam.com/sadad/create-invoice?package_id=${Package.id}&user_id=${userId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {locale === "en" ? "Select Package" : "اختيار الباقة"}
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default CardPackage;
