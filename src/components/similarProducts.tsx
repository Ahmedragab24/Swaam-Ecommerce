import type { LangType, ProductType } from "@/types";
import CardProduct from "./cardProduct";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useLocale } from "next-intl";

interface SimilarProductsProps {
  Products: ProductType[];
}

const SimilarProducts = ({ Products }: SimilarProductsProps) => {
  const lang = useLocale() as LangType;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Similar Products</h2>
      </div>

      <Carousel
        opts={{
          align: "center",
        }}
      >
        <CarouselContent className="py-8 rtl:flex-row-reverse md:px-6">
          {Products.map((product: ProductType) => (
            <CarouselItem
              key={product.id}
              className="basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
            >
              <CardProduct
                lang={lang}
                product={product}
                className="!w-[80%] lg:!w-[270px] mx-auto"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex" />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>
    </div>
  );
};

export default SimilarProducts;
