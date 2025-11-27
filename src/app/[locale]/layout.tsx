import type { Metadata } from "next";
import { Tajawal } from "next/font/google";
import "@/styles/globals.css";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import ScrollUp from "@/components/layout/scrollUp";
import { NextIntlClientProvider } from "next-intl";
import StoreProvider from "@/providers/StoreProvider";
import { Toaster } from "@/components/ui/sonner";

const TajawalSans = Tajawal({
  variable: "--font-TajawalSans-sans",
  weight: ["400", "700", "800"],
  subsets: ["latin"],
});

import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("title"),
    description: t("description"),
    icons: [{ url: "/logoIcon.png" }],
    keywords: t("keywords").split(", "),
    authors: [{ name: "Swaam", url: "https://Swaam.com" }],
    creator: "Swaam",
    publisher: "Swaam",
    robots: "index, follow",
    openGraph: {
      title: t("title"),
      description: t("ogDescription"),
      url: "https://yourdomain.com/your-page",
      siteName: "Swaam Store",
      images: [
        {
          url: "/logoBg.png",
          width: 1200,
          height: 630,
          alt: "logo",
        },
      ],
      locale: locale === "ar" ? "ar_AE" : "en_US",
      type: "website",
    },
  };
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;

  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      suppressHydrationWarning
    >
      <body
        className={` ${TajawalSans.variable} antialiased font-[TajawalSans-sans]`}
      >
        <NextIntlClientProvider>
          <StoreProvider>
            <Navbar />
            {children}
            <Footer />
            <ScrollUp />
            <Toaster />
          </StoreProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
