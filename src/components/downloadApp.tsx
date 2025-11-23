import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const scaleVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  },
};

const DownloadApp = () => {
  return (
    <div className="container mx-auto px-4 mb-16">
      <motion.div
        className="bg-background rounded-2xl p-8 shadow-lg border"
        variants={scaleVariants}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div
            className="text-center md:text-right"
            variants={itemVariants}
          >
            <motion.h2
              className="text-2xl md:text-3xl font-bold mb-4 text-foreground"
              variants={itemVariants}
            >
              احصل على أفضل الصفقات من خلال تطبيقنا
            </motion.h2>
            <motion.p
              className="text-primary font-semibold text-lg mb-8"
              variants={itemVariants}
            >
              حمل التطبيق الآن واستمتع بتجربة فريدة
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
              variants={containerVariants}
            >
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="https://apps.apple.com/eg/app/automark-%D8%A7%D9%88%D8%AA%D9%88%D9%85%D8%A7%D8%B1%D9%83/id6473959588?l=ar"
                  className="flex items-center gap-3 px-6 py-3 bg-black rounded-xl transition-all hover:bg-gray-800 group"
                >
                  <Image
                    src="/Icons/apple.png"
                    alt="Apple Store"
                    width={32}
                    height={32}
                    className="w-8 h-8"
                  />
                  <div className="text-right">
                    <p className="text-gray-400 text-xs">متوفر على</p>
                    <h3 className="text-white font-semibold">App Store</h3>
                  </div>
                </Link>
              </motion.div>

              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="https://play.google.com/store/apps/details?id=com.secItDevelopers.auto_mark_app"
                  className="flex items-center gap-3 px-6 py-3 bg-black rounded-xl transition-all hover:bg-gray-800 group"
                >
                  <Image
                    src="/Icons/google_play.png"
                    alt="Google Play"
                    width={32}
                    height={32}
                    className="w-8 h-8"
                  />
                  <div className="text-right">
                    <p className="text-gray-400 text-xs">احصل عليه من</p>
                    <h3 className="text-white font-semibold">Google Play</h3>
                  </div>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative h-[300px] md:h-[400px]"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: {
                type: "spring",
                stiffness: 50,
                damping: 20,
              },
            }}
            viewport={{ once: true }}
            whileHover={{
              y: -10,
              transition: {
                type: "spring",
                stiffness: 200,
                damping: 10,
              },
            }}
          >
            <Image
              src="/hexa.png"
              alt="تطبيق اوتو مارك"
              fill
              className="object-contain"
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default DownloadApp;
