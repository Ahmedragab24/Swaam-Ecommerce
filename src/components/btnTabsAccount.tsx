import { Headset, Map, Package, Trash2, User } from "lucide-react";
import { Button } from "./ui/button";
import React from "react";
import { Tabs } from "@/app/[locale]/(pages)/account/page";

interface Props {
  activeTab: string;
  setActiveTab: (tab: Tabs) => void;
}

const tabs = [
  {
    icon: User,
    name: "account",
  },
  {
    name: "changePassword",
    icon: Map,
  },
  {
    name: "packages",
    icon: Package,
  },
  {
    name: "support",
    icon: Headset,
  },
  {
    name: "deleteAccount",
    icon: Trash2,
  },
];

const BtnTabsAccount = ({ activeTab, setActiveTab }: Props) => {
  return (
    <>
      {tabs.map(({ icon, name }) => (
        <Button
          key={name}
          variant={activeTab === name ? "default" : "ghost"}
          className={`w-full justify-start text-lg hover:bg-primary ${
            name === "deleteAccount" ? "text-red-800" : ""
          }`}
          onClick={() => setActiveTab(name as Tabs)}
        >
          {icon && React.createElement(icon, { className: "mx-2 h-4 w-4" })}
          <span>{name}</span>
        </Button>
      ))}
    </>
  );
};

export default BtnTabsAccount;
