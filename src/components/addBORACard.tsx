"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { PlusCircle, Megaphone, Gavel, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface IProps {
  setOpen?: (open: boolean) => void;
}

const AddBORACard = ({ setOpen }: IProps) => {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("AddBOrACard");

  const handleClick = (path: string) => {
    setOpen?.(false);
    setTimeout(() => {
      router.push(path);
    }, 150);
  };

  const cardVariants = {
    initial: { y: 10, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.3 } },
    hover: { y: -5, scale: 1.02, transition: { duration: 0.2 } },
    tap: { scale: 0.98, transition: { duration: 0.1 } },
  };

  const iconVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: { delay: 0.1, duration: 0.2 },
    },
    hover: { rotate: 90, scale: 1.1, transition: { duration: 0.2 } },
  };

  return (
    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center w-full max-w-3xl mx-auto py-4">
      <motion.div
        className="w-full sm:w-1/2 max-w-[280px]"
        initial="initial"
        animate="animate"
        whileHover="hover"
        whileTap="tap"
        variants={cardVariants}
      >
        <div
          onClick={() => handleClick(`/${locale}/addAdvertise`)}
          className="group Gradient_Card_Teal group"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_120%,#22c55e_0%,transparent_50%)]"></div>

          {/* Content */}
          <div className="relative p-6 flex flex-col items-center">
            <div className="mb-4 bg-white dark:bg-teal-900/30 rounded-full p-3 shadow-md">
              <motion.div variants={iconVariants}>
                <Megaphone className="w-8 h-8 text-teal-600 dark:text-teal-400" />
              </motion.div>
            </div>

            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2 text-center">
              {t("Advertence.Title")}
            </h3>

            <p className="text-gray-600 dark:text-gray-300 text-sm text-center mb-4">
              {t("Advertence.Description")}
            </p>

            <motion.div
              className="flex items-center justify-center gap-1 text-teal-600 dark:text-teal-400 font-medium"
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
              whileHover={{ x: 5, transition: { duration: 0.2 } }}
            >
              <span>{t("Advertence.Button")}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </motion.div>

            {/* Decorative Plus Icon */}
            <div className="absolute -bottom-6 -left-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <PlusCircle className="w-20 h-20 text-teal-800 dark:text-teal-200" />
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="w-full sm:w-1/2 max-w-[280px]"
        initial="initial"
        animate="animate"
        whileHover="hover"
        whileTap="tap"
        variants={cardVariants}
        transition={{ delay: 0.1 }}
      >
        <div
          onClick={() => handleClick(`/${locale}/addAuction`)}
          className="Gradient_Card_Yellow"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_120%,#f59e0b_0%,transparent_50%)]"></div>

          {/* Content */}
          <div className="relative p-6 flex flex-col items-center">
            <div className="mb-4 bg-white dark:bg-amber-900/30 rounded-full p-3 shadow-md">
              <motion.div variants={iconVariants}>
                <Gavel className="w-8 h-8 text-amber-600 dark:text-amber-400" />
              </motion.div>
            </div>

            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2 text-center">
              {t("Auction.Title")}
            </h3>

            <p className="text-gray-600 dark:text-gray-300 text-sm text-center mb-4">
              {t("Auction.Description")}
            </p>

            <motion.div
              className="flex items-center justify-center gap-1 text-amber-600 dark:text-amber-400 font-medium"
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}
              whileHover={{ x: 5, transition: { duration: 0.2 } }}
            >
              <span> {t("Auction.Button")}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </motion.div>

            {/* Decorative Plus Icon */}
            <div className="absolute -bottom-6 -left-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <PlusCircle className="w-20 h-20 text-amber-800 dark:text-amber-200" />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AddBORACard;
