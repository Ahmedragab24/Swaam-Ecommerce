"use client";

import { useState } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { BreadcrumbDemo } from "@/components/breadcrumb";
import BtnTabsAccount from "@/components/btnTabsAccount";
import AccountForm from "@/components/accountForm";
import ChangePasswordForm from "@/components/changePasswordForm";
import UserPackages from "@/components/userPackages";
import SupportForm from "@/components/supportForm";
import { useLocale } from "next-intl";

export type Tabs = "account" | "changePassword" | "packages" | "support";

const AccountPage = () => {
  const [activeTab, setActiveTab] = useState<Tabs>("account");
  const lang = useLocale();

  const handleTabChange = (value: string) => {
    setActiveTab(value as Tabs);
  };

  return (
    <div className="relative min-h-screen Container my-20">
      {/* Breadcrumb */}
      <h1 className="Title_Section pt-10 pb-4">
        <BreadcrumbDemo />
      </h1>

      {/* Main Content */}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar - 1/4 width on desktop */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 z-30">
            <Card className="Gradient_Card_Teal p-4 cursor-auto">
              <nav className="space-y-2">
                <BtnTabsAccount
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                />
              </nav>
            </Card>
          </div>
        </div>

        {/* Main Content Area - 3/4 width on desktop */}
        <div className="lg:col-span-3">
          <Card className="Gradient_Card_Teal p-8 cursor-auto">
            <Tabs
              value={activeTab}
              onValueChange={handleTabChange}
              className="w-full"
              dir={lang === "ar" ? "rtl" : "ltr"}
            >
              <TabsContent value="account" className="mt-6">
                <AccountForm />
              </TabsContent>

              <TabsContent value="changePassword" className="mt-6">
                <ChangePasswordForm />
              </TabsContent>

              <TabsContent value="packages" className="mt-6">
                <UserPackages />
              </TabsContent>

              <TabsContent value="support" className="mt-6">
                <SupportForm />
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
