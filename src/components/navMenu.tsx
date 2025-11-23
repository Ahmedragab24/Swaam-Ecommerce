"use client";

import { Nav_Link } from "@/constants";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavMenuProps {
  setIsOpen?: (value: boolean) => void;
}

const NavMenu = ({ setIsOpen }: NavMenuProps) => {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("navBar");

  return (
    <ul className="flex gap-4">
      {Nav_Link.map((link) => (
        <li key={link.name} onClick={() => setIsOpen && setIsOpen(false)}>
          <Link
            href={`/${locale}${link.path}`}
            className={`Nav_Link ${
              pathname === `/${locale}${link.path}` ? "text-muted" : ""
            }`}
          >
            {t(link.name)}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NavMenu;
