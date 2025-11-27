"use client";

import { Menu, X, Sparkles } from "lucide-react";
import Logo from "./logo";
import { Button } from "./ui/button";
import { useState } from "react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet";
import SearchInput from "./searchInput";
import NavIcons from "./navIcons";
import NavMenu from "./navMenu";
import BtnBanner from "./btnBanner";
import BtnRegister from "./btnRegister";
import UserAvatar from "./userAvatar";
import { getAuthTokenClient } from "@/lib/auth/auth-client";

import { useTranslations } from "next-intl";

const NavbarMobile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const token = getAuthTokenClient();
  const t = useTranslations("NavbarMobile");

  return (
    <div className="flex lg:hidden justify-between items-center sticky top-0 z-50">
      {/* Logo Section */}
      <div className="flex items-center">
        <Logo />
      </div>

      {/* Menu Button */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="relative h-10 w-10 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 hover:from-slate-200 hover:to-slate-300 border border-slate-200/50 shadow-sm transition-all duration-300 hover:shadow-md"
          >
            <Menu className="h-5 w-5 text-slate-700" />
            <span className="sr-only">{t("openMenu")}</span>
          </Button>
        </SheetTrigger>

        <SheetContent
          side="right"
          className="w-[340px] sm:w-[400px] p-0 backdrop-blur-lg bg-secondary/30 border-none shadow-2xl !rounded-l-4xl overflow-hidden"
        >
          <SheetTitle className="hidden"></SheetTitle>

          {/* Content Container */}
          <div className="relative z-10 flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-6 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-1 bg-gradient-to-br from-blue-500 to-primary rounded-lg shadow-lg">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-xl font-bold text-white">{t("menu")}</h2>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-9 w-9 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-200"
              >
                <X className="h-4 w-4 text-white" />
              </Button>
            </div>

            {/* Search Card */}
            <div className="mx-6 mb-6">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-xl">
                <SearchInput />
              </div>
            </div>

            {/* Navigation Card */}
            <div className="mx-6 mb-6">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-xl">
                <h3 className="text-sm font-semibold text-white/90 mb-4 flex items-center gap-2">
                  <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-primary rounded-full"></div>
                  {t("browsing")}
                </h3>
                <NavMenu setIsOpen={setIsOpen} />
              </div>
            </div>

            {/* Quick Actions Card */}
            <div className="mx-6 mb-6">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-xl">
                <h3 className="text-sm font-semibold text-white/90 mb-4 flex items-center gap-2">
                  <div className="w-2 h-2 bg-gradient-to-r from-pink-400 to-orange-400 rounded-full"></div>
                  {t("quickActions")}
                </h3>
                <NavIcons setIsOpen={setIsOpen} />
              </div>
            </div>

            {/* Account Actions */}
            <div className="mt-auto mx-4 mb-6">
              <div className="bg-gradient-to-r from-white/15 to-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 shadow-xl">
                <h3 className="text-sm font-semibold text-white/90 mb-4 flex items-center gap-2">
                  <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-blue-400 rounded-full"></div>
                  {t("account")}
                </h3>
                <div className="space-x-3">
                  {token ? <UserAvatar /> : <BtnRegister />}
                  <BtnBanner />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-white/10">
              <p className="text-xs text-white/60 text-center font-medium">
                {t("rights") + " " + new Date().getFullYear()}
              </p>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default NavbarMobile;
