"use client";

import { Button } from "@/components/ui/button";
import { ShoppingBag, Package, Heart, Sparkles, Star } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  const t = useTranslations("NotFoundPage");

  return (
    <div className="min-h-screen flex items-center justify-center p-4 mt-5">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-pink-200/30 to-orange-200/30 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-br from-green-200/30 to-teal-200/30 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="relative inline-block">
            {/* Large 404 Text */}
            <h1 className="text-8xl sm:text-9xl lg:text-[12rem] font-black text-transparent bg-gradient-to-r from-teal-400 via-sky-400 to-primary bg-clip-text leading-none">
              404
            </h1>

            {/* Floating Shopping Elements */}
            <div className="absolute top-4 -right-8 animate-bounce delay-300">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-lg">
                <ShoppingBag className="h-6 w-6 text-white" />
              </div>
            </div>

            <div className="absolute bottom-8 -left-6 animate-bounce delay-700">
              <div className="p-2 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full shadow-lg">
                <Package className="h-5 w-5 text-white" />
              </div>
            </div>

            <div className="absolute top-1/2 -right-12 animate-bounce delay-1000">
              <div className="p-2 bg-gradient-to-r from-green-500 to-teal-500 rounded-full shadow-lg">
                <Heart className="h-4 w-4 text-white" />
              </div>
            </div>

            {/* Sparkle Effects */}
            <Sparkles className="absolute top-2 left-8 h-6 w-6 text-yellow-400 animate-pulse" />
            <Star className="absolute bottom-4 right-16 h-5 w-5 text-blue-400 animate-pulse delay-500" />
            <Sparkles className="absolute top-16 right-4 h-4 w-4 text-purple-400 animate-pulse delay-1000" />
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-6 mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 leading-tight">
            {t("title")}
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {t("message")}
          </p>

          <Button
            size="lg"
            className="text-xl h-12"
            onClick={() => router.push("/")}
          >
            {t("button")}
          </Button>
        </div>
      </div>
    </div>
  );
}
