"use client";

import { Nav_Icons } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLocale, useTranslations } from "next-intl";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface NavMenuProps {
  setIsOpen?: (value: boolean) => void;
}

const NavIcons = ({ setIsOpen }: NavMenuProps) => {
  const pathname = usePathname();

  const getPathWithoutLocale = () => {
    const segments = pathname.split("/");
    if (["en", "ar"].includes(segments[1])) {
      segments.splice(1, 1);
    }
    return segments.join("/") || "/";
  };

  const cleanPath = getPathWithoutLocale();
  const locale = useLocale();
  const t = useTranslations("Nav_Icons");

  return (
    <ul className="flex gap-4 items-center">
      {Nav_Icons.map((item) =>
        item.languages ? (
          <Tooltip key={item.name}>
            <TooltipTrigger>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="text-muted transition-all hover:text-muted/70 hover:scale-105 cursor-pointer">
                    <item.Icon className="h-6 w-6 text-muted hover:text-muted/70 cursor-pointer" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {item.languages.map((menuItem) => (
                    <DropdownMenuItem
                      key={menuItem.code}
                      asChild
                      className="cursor-pointer"
                    >
                      <Link
                        href={`/${menuItem.code}${
                          cleanPath === "/" ? "" : cleanPath
                        }`}
                      >
                        <div className="w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              locale === menuItem.code
                                ? "bg-primary"
                                : "bg-gray-400"
                            }`}
                          ></div>
                        </div>
                        {menuItem.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </TooltipTrigger>
            <TooltipContent>
              <p>{t(item.name)}</p>
            </TooltipContent>
          </Tooltip>
        ) : (
          <Tooltip key={item.name}>
            <TooltipTrigger>
              <Link
                href={`/${locale}${item.path}`}
                onClick={() => setIsOpen && setIsOpen(false)}
                className="text-muted transition-all hover:text-muted/70 hover:scale-105 cursor-pointer"
              >
                <li>
                  <item.Icon className="h-6 w-6" />
                </li>
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>{t(item.name)}</p>
            </TooltipContent>
          </Tooltip>
        )
      )}
    </ul>
  );
};

export default NavIcons;
