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

export const metadata: Metadata = {
  title: "Swaam",
  description: "Swaam ecommerce",
  icons: [{ url: "/logoIcon.png" }],
  keywords: ["كلمة مفتاحية 1", "كلمة مفتاحية 2", "اسم المنتج", "الخ..."],
  authors: [{ name: "Swaam", url: "https://Swaam.com" }],
  creator: "Swaam",
  publisher: "Swaam",
  robots: "index, follow",
  // openGraph: {
  //   title: "Swaam",
  //   description: "وصف موجز يظهر عند المشاركة على فيسبوك أو LinkedIn",
  //   url: "https://yourdomain.com/your-page",
  //   siteName: "Swaam Store",
  //   images: [
  //     {
  //       url: "/logoBg.png",
  //       width: 1200,
  //       height: 630,
  //       alt: "logo",
  //     },
  //   ],
  //   locale: "ar_AE",
  //   alternateLocale: "en_Us",
  //   type: "website",
  // },
};

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
