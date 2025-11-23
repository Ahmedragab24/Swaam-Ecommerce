import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLocale } from "next-intl";
import Link from "next/link";

interface Props {
  title: string;
  path: string;
}

const SeeMore = ({ title, path }: Props) => {
  const locale = useLocale();
  const Rtl = locale === "ar" ? "rtl" : "ltr";

  return (
    <div className="flex justify-center items-center gap-1 sm:gap-2 group">
      <Link
        href={path}
        className="text-primary text-sm sm:text-lg lg:text-xl xl:text-2xl font-bold group-hover:text-primary/70 duration-300"
      >
        {title}
      </Link>

      {Rtl === "rtl" ? (
        <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 text-secondary my-auto transition-transform duration-300 group-hover:-translate-x-1 group-hover:text-primary" />
      ) : (
        <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-secondary my-auto transition-transform duration-300 group-hover:translate-x-1 group-hover:text-primary" />
      )}
    </div>
  );
};

export default SeeMore;
