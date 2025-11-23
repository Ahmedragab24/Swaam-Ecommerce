import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { getLocale } from "next-intl/server";
import Image from "next/image";
import { Button } from "./ui/button";
import { PackageType } from "@/types/Package";

interface IProps {
  Package: PackageType;
}

const CardPackage = async ({ Package }: IProps) => {
  const locale = await getLocale();

  return (
    <Card className="bg-white relative w-auto h-fit rounded-4xl border border-primary duration-300 cursor-pointer group shadow-sm backdrop-blur-md hover:bg-card/40 hover:shadow-xl transition-all">
      <Link href={`/${locale}/packages/${Package.id}`}>
        {/* offer */}
        {Package.isSpacial && (
          <div className="w-[200px] h-auto absolute -top-4 -left-8 z-10">
            <div className="relative w-[150px] h-auto">
              <Image
                src="/products/RectangleRed.png"
                alt="offer"
                width={100}
                height={100}
                quality={100}
                className="w-full h-full object-contain rounded-2xl"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-2 rotate-[-25deg]">
                <span className="text-lg font-bold leading-tight">مميز</span>
                <span className="text-md">{Package.offerPrice}</span>
              </div>
            </div>
          </div>
        )}

        <CardContent
          dir="rtl"
          className="flex flex-col justify-between h-full py-2 px-4"
        >
          {/* Product Details */}
          <div className="flex flex-col gap-2">
            <h3 className="text-2xl font-bold">{Package.name}</h3>
            <h3 className="text-lg text-gray-600">{Package.description}</h3>
            <div className="flex justify-between items-center gap-2">
              <h3 className="text-lg text-gray-600">دينار {Package.price}</h3>
              <Button>اشترك الان</Button>
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};

export default CardPackage;
