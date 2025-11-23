

"use client"

import BtnBanner from "./btnBanner";
import BtnRegister from "./btnRegister";
import Logo from "./logo";
import NavIcons from "./navIcons";
import NavMenu from "./navMenu";
import SearchInput from "./searchInput";
import UserAvatar from "./userAvatar";
import { getAuthTokenClient } from "@/lib/auth/auth-client";

const NavbarDesktop = () => {
  const token = getAuthTokenClient()


  return (
    <div className="hidden lg:flex justify-between items-center gap-4">
      <Logo />
      <NavMenu />
      <SearchInput />
      <NavIcons />
      <div className="flex items-center gap-2">
        <BtnBanner />

        {token ? (
          <UserAvatar />
        ) : (
          <BtnRegister />
        )}
      </div>
    </div>
  );
};

export default NavbarDesktop;
