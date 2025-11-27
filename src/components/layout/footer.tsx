"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Facebook,
  Twitter,
  Mail,
  Phone,
  Instagram,
  Music2,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useSettingsQuery } from "@/store/services/Settings";
import { getAuthTokenClient } from "@/lib/auth/auth-client";
import { toast } from "sonner";

const Footer = () => {
  const locale = useLocale();
  const t = useTranslations("Footer");
  const token = getAuthTokenClient();

  const { data } = useSettingsQuery();
  const Info = data?.data;

  return (
    <motion.footer
      className="bg-card backdrop-blur-xl pt-12 pb-6 rounded-t-3xl shadow-lg border-t border-muted/20"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="container mx-auto px-4">
        {/* Grid Sections */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-y-10 md:gap-x-10 mb-10">
          {/* Info Section */}
          <div
            className={`space-y-4 text-center ${
              locale === "ar" ? "sm:text-right" : "sm:text-left"
            }`}
          >
            <Image
              src={"/logoNoBg.png"}
              alt="Logo"
              width={130}
              height={60}
              className="mx-auto sm:mx-0 object-cover"
            />

            <p className="text-muted-foreground leading-relaxed text-sm max-w-xs mx-auto sm:mx-0">
              {Info?.info}
            </p>
          </div>

          {/* Quick Links */}
          <div
            className={`flex flex-col justify-center items-center ${
              locale === "ar" ? "text-right" : "text-left"
            } text-center sm:text-inherit`}
          >
            <h3 className="font-semibold text-sm md:text-xl mb-4">
              {t("quickLinks")}
            </h3>

            <ul className="space-y-2 text-sm md:text-base">
              {[
                { name: t("home"), path: "/" },
                { name: t("categories"), path: "/categories" },
                { name: t("auctions"), path: "/auction" },
                { name: t("packages"), path: "/packages" },
              ].map((link) => (
                <li key={link.name}>
                  {!token && link.path === "/packages" ? (
                    <div
                      onClick={() => {
                        toast.error(t("loginToAccessPackages"));
                      }}
                      className="text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                    >
                      {link.name}
                    </div>
                  ) : (
                    <Link
                      href={link.path}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Policies */}
          <div
            className={`flex flex-col justify-center items-center ${
              locale === "ar" ? "text-right" : "text-left"
            } text-center sm:text-inherit`}
          >
            <h3 className="font-semibold text-sm md:text-xl mb-4">
              {t("policies")}
            </h3>

            <ul className="space-y-2 text-sm md:text-base">
              {[
                { name: t("privacy"), path: `/${locale}/privacy&policies` },
                { name: t("terms"), path: `/${locale}/privacy&policies` },
                { name: t("faq"), path: `/${locale}/privacy&policies` },
                { name: t("downloadApp"), path: `/${locale}/download-app` },
              ].map((policy) => (
                <li key={policy.name}>
                  <Link
                    href={policy.path}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {policy.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Social */}
          <div
            className={`flex flex-col justify-center items-center ${
              locale === "ar" ? "text-right" : "text-left"
            } text-center sm:text-inherit`}
          >
            <h3 className="font-semibold text-sm md:text-xl mb-4">
              {t("social")}
            </h3>

            {/* Contact */}
            <div className="space-y-2 text-sm md:text-base">
              <a
                href={`mailto:${Info?.email}`}
                className="flex items-center justify-center sm:justify-start gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="w-4 h-4 text-primary" />
                <span>{Info?.email}</span>
              </a>

              <a
                href={`tel:${Info?.phone}`}
                className="flex items-center justify-center sm:justify-start gap-2 text-sm md:text-base text-muted-foreground hover:text-primary transition-colors"
              >
                <Phone className="w-4 h-4 text-primary" />
                <span>{Info?.phone}</span>
              </a>
            </div>

            {/* Social Icons */}
            <div className="flex justify-center sm:justify-start gap-4 mt-4">
              {[
                { icon: Music2, href: Info?.tiktok },
                { icon: Facebook, href: Info?.facebook },
                { icon: Twitter, href: Info?.twitter },
                { icon: Instagram, href: Info?.instagram },
              ].map(({ icon: Icon, href }, index) => (
                <Link
                  key={index}
                  href={href || "#"}
                  target="_blank"
                  className="p-2 rounded-full border border-border bg-card hover:bg-secondary transition"
                >
                  <Icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-primary pt-5 mt-5 flex flex-col md:flex-row justify-between items-center text-sm gap-3 text-muted-foreground text-center">
          <p>{t("rights", { year: new Date().getFullYear() })}</p>

          <a
            href="https://ahmed-elmadany.vercel.app/"
            target="_blank"
            className="hover:text-primary transition"
          >
            {t("developer")}
          </a>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
