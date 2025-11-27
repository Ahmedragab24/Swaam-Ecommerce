"use client";

import Link from "next/link";
import Image from "next/image";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserMenu } from "@/constants";
import { LogOut } from "lucide-react";
import { usePathname } from "@/i18n/navigation";
import { useGetUserInfoQuery } from "@/store/services/Auth/Profile";
import { useLogoutMutation } from "@/store/services/Auth/Auth";
import { toast } from "sonner";
import {
  getAuthTokenClient,
  removeAuthTokenClient,
} from "@/lib/auth/auth-client";
import { useLocale, useTranslations } from "next-intl";

const UserAvatar = () => {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("userAvatar");
  const { data } = useGetUserInfoQuery();
  const userInfo = data?.data.user;
  const [logOutMutation] = useLogoutMutation();
  const token = getAuthTokenClient();

  console.log("userInfo", userInfo);

  const getPathWithoutLocale = () => {
    const segments = pathname.split("/");
    if (["en", "ar"].includes(segments[1])) {
      segments.splice(1, 1);
    }
    return segments.join("/") || "/";
  };

  const cleanPath = getPathWithoutLocale();

  const logOut = async () => {
    try {
      await logOutMutation(token).unwrap();
      removeAuthTokenClient();
      toast.success(t("LogoutSuccessfully"));
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (error) {
      console.error(error);
      // Even if API fails, we should probably clear local state
      removeAuthTokenClient();
      toast.error(t("LogoutFailed"));
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  };

  return (
    <DropdownMenu dir={locale === "ar" ? "rtl" : "ltr"}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="rounded-full !p-0 cursor-pointer duration-500 group transition-all"
        >
          <span className="flex text-sm text-white dark:group-hover:text-white font-medium gap-2 group-hover:text-muted rtl:pr-2 ltr:pl-2">
            <h3>{userInfo?.name}</h3>
          </span>
          <Avatar className="h-9 w-9">
            <AvatarImage
              src={userInfo?.image || "/Logo/user.png"}
              alt="User Avatar"
              className="bg-background"
            />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56 p-2" sideOffset={8}>
        {/* User Profile Header */}
        <div className="flex items-center gap-3 p-3 mb-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <Avatar className="h-12 w-12">
            <AvatarImage
              src={userInfo?.image || "/Logo/user.png"}
              alt="User Avatar"
              className="object-cover"
            />
            <AvatarFallback className="bg-red-100 text-red-600 font-semibold">
              {(userInfo?.name || "U").charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div
            className={`flex flex-col items-${
              locale === "ar" ? "end" : "start"
            }`}
          >
            <span className="font-semibold text-gray-900 dark:text-white">
              {userInfo?.name}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {userInfo?.email}
            </span>
          </div>
        </div>

        <DropdownMenuSeparator />

        {/* Menu Items */}
        {UserMenu.map((item, index) => {
          const isLogout = item.name === "logOut";

          return (
            <div key={item.name}>
              {item.path ? (
                <DropdownMenuItem
                  asChild
                  className="text-gray-600"
                  onClick={() => (isLogout ? logOut() : null)}
                >
                  <Link
                    href={`/${locale}${item.path}`}
                    className={`flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer transition-colors ${
                      isLogout
                        ? "text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                        : "hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                  >
                    {isLogout ? (
                      <LogOut className="h-4 w-4" />
                    ) : (
                      <Image
                        src={item.icon || "/placeholder.svg"}
                        alt={item.name}
                        width={18}
                        height={18}
                        className="opacity-70"
                      />
                    )}
                    <span className="font-medium">{t(item.name)}</span>
                  </Link>
                </DropdownMenuItem>
              ) : item.languages ? (
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger className="flex items-center gap-3 px-3 py-2 text-gray-600">
                    <Image
                      src={item.icon || "/placeholder.svg"}
                      alt={item.name}
                      width={18}
                      height={18}
                      className="opacity-70"
                    />
                    <span className="font-medium">{t(item.name)}</span>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent
                    className={`w-48 absolute top-4 ltr:right-0 rtl:left-0 z-10 bg-white rounded-md shadow-md`}
                  >
                    {item.languages.map((menuItem) => (
                      <DropdownMenuItem key={menuItem.code} asChild>
                        <Link
                          href={`/${menuItem.code}${
                            cleanPath === "/" ? "" : cleanPath
                          }`}
                          className="flex items-center gap-3 px-3 py-2 cursor-pointer"
                        >
                          <div className="w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                          </div>
                          <span>{menuItem.label}</span>
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
              ) : (
                <DropdownMenuItem
                  className={`flex items-center gap-3 px-3 py-2 cursor-pointer ${
                    isLogout
                      ? "text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                      : ""
                  }`}
                  onClick={() => (isLogout ? logOut() : null)}
                >
                  {isLogout ? (
                    <LogOut className="h-4 w-4" />
                  ) : (
                    <Image
                      src={item.icon || "/placeholder.svg"}
                      alt={item.name}
                      width={18}
                      height={18}
                      className="opacity-70"
                    />
                  )}
                  <span className="font-medium">{t(item.name)}</span>
                </DropdownMenuItem>
              )}

              {/* Add separator before logout */}
              {isLogout && index < UserMenu.length - 1 && (
                <DropdownMenuSeparator />
              )}
            </div>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAvatar;
