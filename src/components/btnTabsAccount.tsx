import { Headset, Map, Package, User } from "lucide-react";
import { Button } from "./ui/button";
import React from "react";
import { Tabs } from "@/app/[locale]/(pages)/account/page";

interface Props {
  activeTab: string;
  setActiveTab: (tab: Tabs) => void;
}

import { useTranslations } from "next-intl";

const tabs = [
  {
    icon: User,
    name: "account",
    labelKey: "portfolio",
  },
  {
    name: "changePassword",
    icon: Map,
    labelKey: "changePassword",
  },
  {
    name: "packages",
    icon: Package,
    labelKey: "packages",
  },
  {
    name: "support",
    icon: Headset,
    labelKey: "support",
  },
];

const BtnTabsAccount = ({ activeTab, setActiveTab }: Props) => {
  const t = useTranslations("userAvatar");

  return (
    <>
      {tabs.map(({ icon, name, labelKey }) => (
        <Button
          key={name}
          variant={activeTab === name ? "default" : "ghost"}
          className={`w-full justify-start text-lg hover:bg-primary`}
          onClick={() => setActiveTab(name as Tabs)}
        >
          {icon && React.createElement(icon, { className: "mx-2 h-4 w-4" })}
          <span>{t(labelKey)}</span>
        </Button>
      ))}
    </>
  );
};

export default BtnTabsAccount;
