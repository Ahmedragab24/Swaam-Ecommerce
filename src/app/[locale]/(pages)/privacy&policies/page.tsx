"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Shield,
  Database,
  Cookie,
  UserCheck,
  RefreshCw,
  Mail,
  Phone,
  Eye,
  Lock,
  Share2,
  FileText,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { useState } from "react";
import { BreadcrumbDemo } from "@/components/breadcrumb";
import { useLocale, useTranslations } from "next-intl";
import { useSettingsQuery } from "@/store/services/Settings";
import Link from "next/link";

const PrivacyAndPoliciesPage = () => {
  const [activeSection, setActiveSection] = useState<string>("info-collection");
  const locale = useLocale();
  const t = useTranslations("PrivacyPolicy");
  const { data } = useSettingsQuery();
  const Data = data?.data;

  const sections = [
    {
      id: "info-collection",
      title: t("Sections.InfoCollection.Title"),
      icon: Database,
      content: {
        intro: t("Sections.InfoCollection.Intro"),
        subsections: [
          {
            title: t("Sections.InfoCollection.Subsections.Personal.Title"),
            items: [
              t("Sections.InfoCollection.Subsections.Personal.Items.Phone"),
              t("Sections.InfoCollection.Subsections.Personal.Items.Email"),
              t("Sections.InfoCollection.Subsections.Personal.Items.Address"),
              t(
                "Sections.InfoCollection.Subsections.Personal.Items.ProfilePic"
              ),
            ],
          },
          {
            title: t("Sections.InfoCollection.Subsections.Usage.Title"),
            items: [
              t("Sections.InfoCollection.Subsections.Usage.Items.Bids"),
              t("Sections.InfoCollection.Subsections.Usage.Items.Followed"),
              t("Sections.InfoCollection.Subsections.Usage.Items.Activity"),
            ],
          },
          {
            title: t("Sections.InfoCollection.Subsections.Device.Title"),
            items: [
              t("Sections.InfoCollection.Subsections.Device.Items.Type"),
              t("Sections.InfoCollection.Subsections.Device.Items.IP"),
              t("Sections.InfoCollection.Subsections.Device.Items.Location"),
            ],
          },
        ],
      },
    },
    {
      id: "info-usage",
      title: t("Sections.InfoUsage.Title"),
      icon: Eye,
      content: {
        intro: t("Sections.InfoUsage.Intro"),
        items: [
          t("Sections.InfoUsage.Items.Manage"),
          t("Sections.InfoUsage.Items.Improve"),
          t("Sections.InfoUsage.Items.Notify"),
          t("Sections.InfoUsage.Items.Detect"),
        ],
      },
    },
    {
      id: "info-sharing",
      title: t("Sections.InfoSharing.Title"),
      icon: Share2,
      content: {
        intro: t("Sections.InfoSharing.Intro"),
        items: [
          t("Sections.InfoSharing.Items.Legal"),
          t("Sections.InfoSharing.Items.Fraud"),
          t("Sections.InfoSharing.Items.Logistics"),
        ],
      },
    },
    {
      id: "cookies",
      title: t("Sections.Cookies.Title"),
      icon: Cookie,
      content: {
        intro: t("Sections.Cookies.Intro"),
      },
    },
    {
      id: "user-rights",
      title: t("Sections.UserRights.Title"),
      icon: UserCheck,
      content: {
        intro: t("Sections.UserRights.Intro"),
        items: [
          t("Sections.UserRights.Items.Access"),
          t("Sections.UserRights.Items.Delete"),
          t("Sections.UserRights.Items.OptOut"),
        ],
        note: t("Sections.UserRights.Note"),
      },
    },
    {
      id: "policy-updates",
      title: t("Sections.PolicyUpdates.Title"),
      icon: RefreshCw,
      content: {
        intro: t("Sections.PolicyUpdates.Intro"),
        items: [
          t("Sections.PolicyUpdates.Items.Notify"),
          t("Sections.PolicyUpdates.Items.Consent"),
        ],
      },
    },
    {
      id: "contact",
      title: t("Sections.Contact.Title"),
      icon: Mail,
      content: {
        intro: t("Sections.Contact.Intro"),
        contacts: [
          {
            type: "email",
            icon: Mail,
            label: t("Sections.Contact.EmailLabel"),
            value: Data?.email,
          },
          {
            type: "phone",
            icon: Phone,
            label: t("Sections.Contact.PhoneLabel"),
            value: Data?.phone,
          },
        ],
      },
    },
  ];

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen container mx-auto my-20">
      <div className="grid lg:grid-cols-4 gap-8 pt-10">
        {/* Table of Contents */}
        <div className="lg:col-span-1">
          <div className="mb-6">
            <BreadcrumbDemo />
          </div>
          <Card className="sticky top-24 bg-white border border-primary shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                {t("TableOfContents")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <nav className="space-y-2">
                  {sections.map((section) => {
                    const IconComponent = section.icon;
                    return (
                      <Button
                        key={section.id}
                        variant={
                          activeSection === section.id ? "default" : "ghost"
                        }
                        className="w-full justify-between h-auto p-3"
                        onClick={() => scrollToSection(section.id)}
                      >
                        {locale === "ar" && <ChevronLeft className="w-4 h-4" />}
                        <div className="flex items-center gap-2">
                          <IconComponent className="w-4 h-4" />
                          <span className="text-sm leading-tight">
                            {section.title}
                          </span>
                        </div>
                        {locale === "en" && (
                          <ChevronRight className="w-4 h-4" />
                        )}
                      </Button>
                    );
                  })}
                </nav>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="p-2 bg-primary/10 rounded-full shadow-lg backdrop-blur-sm border border-primary/20">
                <Shield className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h1 className="text-xl md:text-3xl font-bold mb-1 text-gray-900">
              {t("Title")}
            </h1>
            <p className="text-md text-gray-600 md:text-lg mb-8 leading-relaxed max-w-3xl mx-auto">
              {t("Intro")}
            </p>
          </div>
          {sections.map((section, index) => {
            const IconComponent = section.icon;
            return (
              <Card
                key={section.id}
                id={section.id}
                className="overflow-hidden bg-white border border-primary shadow-lg rounded-xl"
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-xl md:text-2xl">
                    <div className="p-2 bg-primary/20 rounded-lg">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <span className="text-gray-800">
                      {index + 1}. {section.title}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="prose prose-lg max-w-none">
                    <p className="text-gray-700 leading-relaxed mb-4">
                      {section.content.intro}
                    </p>

                    {/* Render subsections for info-collection */}
                    {section.content.subsections && (
                      <div className="space-y-6">
                        {section.content.subsections.map((subsection, idx) => (
                          <div key={idx} className="Gradient_Card_Sky p-8">
                            <h4 className="font-semibold text-lg mb-3 text-gray-800">
                              {subsection.title}
                            </h4>
                            <ul className="space-y-2">
                              {subsection.items.map((item, itemIdx) => (
                                <li
                                  key={itemIdx}
                                  className="flex items-center gap-3"
                                >
                                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                                  <span className="text-gray-700 flex-1">
                                    {item}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Render regular items */}
                    {section.content.items && (
                      <ul className="space-y-3">
                        {section.content.items.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2" />
                            <span className="text-gray-700 leading-relaxed flex-1">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Render contacts for contact section */}
                    {section.content.contacts && (
                      <div className="grid md:grid-cols-2 gap-4 mt-6">
                        {section.content.contacts.map((contact, idx) => {
                          const ContactIcon = contact.icon;
                          return (
                            <div
                              key={idx}
                              className="bg-primary/10 border border-primary/20 rounded-lg p-4 hover:bg-primary/15 transition-colors"
                            >
                              <div>
                                <div className="flex items-center gap-3">
                                  <div className="p-2 bg-primary/20 rounded-lg">
                                    <ContactIcon className="w-5 h-5 text-primary" />
                                  </div>
                                  <div className="flex-1">
                                    <p className="font-semibold text-gray-800">
                                      {contact.label}
                                    </p>
                                    <p className="text-primary font-medium">
                                      {contact.value}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Render note if exists */}
                    {section.content.note && (
                      <div className="bg-blue-50 border-r-4 border-blue-400 p-4 mt-6">
                        <p className="text-blue-800 font-medium">
                          {section.content.note}
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}

          {/* Footer CTA */}
          <Card className="bg-gradient-to-r from-sky-400 to-sky-300 text-white">
            <CardContent className="p-8 text-center">
              <Lock className="w-12 h-12 mx-auto mb-4 opacity-80" />
              <h3 className="text-2xl font-bold mb-4">{t("Footer.Title")}</h3>
              <p className="text-blue-100 mb-6 leading-relaxed">
                {t("Footer.Description")}
              </p>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => scrollToSection("contact")}
                className="font-semibold"
              >
                {t("Footer.Button")}
                <Mail className="w-4 h-4 mr-2" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PrivacyAndPoliciesPage;
