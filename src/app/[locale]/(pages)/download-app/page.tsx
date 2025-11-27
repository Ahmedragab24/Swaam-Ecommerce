"use client";

import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Download, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";
import { BreadcrumbDemo } from "@/components/breadcrumb";
import { useSettingsQuery } from "@/store/services/Settings";

export default function AppDownloadSection() {
  const lang = useLocale();
  const isRTL = lang === "ar";
  const { data } = useSettingsQuery();
  const appDownload = data?.data;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.25 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  const title = isRTL ? "حمّل التطبيق الآن على هاتفك" : "Download Our App";

  const desc = isRTL
    ? "احصل على تجربة أفضل مع تطبيقنا المتاح على متجر جوجل بلاي وآب ستور"
    : "Get a better experience with our app available on Google Play and App Store";

  const footerDesc = isRTL
    ? "استمتع بتجربة سلسة على جميع أجهزتك"
    : "Enjoy a seamless experience across all your devices";

  const playLink = appDownload?.google_play;
  const storeLink = appDownload?.app_store;

  return (
    <section className="mt-28 mb-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <BreadcrumbDemo />
        </div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`${isRTL ? "text-right" : "text-left"} mb-12`}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          <p className="text-muted-foreground text-lg">{desc}</p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {/* Google Play */}
          <motion.div variants={item}>
            <Card className="overflow-hidden border shadow-lg rounded-2xl p-0">
              <CardContent className="p-0 relative group">
                <Link
                  href={playLink || "#"}
                  target={playLink ? "_blank" : undefined}
                  className={`${
                    !playLink &&
                    "pointer-events-none opacity-60 cursor-not-allowed"
                  } block relative h-full`}
                >
                  <Image
                    src="/downloadGooglePlay.jpg"
                    alt={isRTL ? "تحميل من جوجل بلاي" : "Google Play Download"}
                    width={500}
                    height={500}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white">
                    <Download className="w-12 h-12 mb-3" />
                    <span className="text-xl font-medium">Google Play</span>
                    <div className="flex items-center mt-2">
                      <span className="mr-1">
                        {isRTL ? "حمل الآن" : "Download Now"}
                      </span>
                      <ExternalLink className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </CardContent>
            </Card>
          </motion.div>

          {/* App Store */}
          <motion.div variants={item}>
            <Card className="overflow-hidden border shadow-lg rounded-2xl p-0">
              <CardContent className="p-0 relative group">
                <Link
                  href={storeLink || "#"}
                  target={storeLink ? "_blank" : undefined}
                  className={`${
                    !storeLink &&
                    "pointer-events-none opacity-60 cursor-not-allowed"
                  } block relative h-full`}
                >
                  <Image
                    src="/downloadAppleStore.jpg"
                    alt={isRTL ? "تحميل من آب ستور" : "App Store Download"}
                    width={500}
                    height={500}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white">
                    <Download className="w-12 h-12 mb-3" />
                    <span className="text-xl font-medium">App Store</span>
                    <div className="flex items-center mt-2">
                      <span className="mr-1">
                        {isRTL ? "حمل الآن" : "Download Now"}
                      </span>
                      <ExternalLink className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Footer Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className={`${isRTL ? "text-right" : "text-left"} mt-12`}
        >
          <p className="text-muted-foreground text-lg">{footerDesc}</p>
        </motion.div>
      </div>
    </section>
  );
}
