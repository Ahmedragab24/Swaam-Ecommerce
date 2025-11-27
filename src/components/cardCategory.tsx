import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";
import { CategoryType } from "@/types/Categories";

interface CardCategoryProps {
  category: CategoryType;
}

const CardCategory = ({ category }: CardCategoryProps) => {
  const locale = useLocale();
  return (
    <Link href={`/${locale}/categories/${category?.id}`} className="group">
      <div className="flex justify-center bg-white rounded-2xl p-2 md:p-4 shadow-lg group-hover:scale-105 group-hover:shadow-card transition-all duration-300">
        <Image
          src={category?.image || ""}
          alt={category?.name || ""}
          width={200}
          height={200}
          loading="lazy"
          className="group-hover:scale-110 transition-all duration-300 w-25 h-25"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <h1 className="text-center text-sm md:text-lg font-bold mt-3 group-hover:scale-110 group-hover:text-muted transition-all duration-300">
        {locale === "ar" ? category?.name || "" : category?.name_en || ""}
      </h1>
    </Link>
  );
};

export default CardCategory;
