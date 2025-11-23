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
import { useLocale } from "next-intl";

const PrivacyAndPoliciesPage = () => {
  const [activeSection, setActiveSection] = useState<string>("info-collection");
  const locale = useLocale();

  const sections = [
    {
      id: "info-collection",
      title: "المعلومات التي نقوم بجمعها",
      icon: Database,
      content: {
        intro: "نقوم بجمع المعلومات التالية لتحسين خدماتنا:",
        subsections: [
          {
            title: "المعلومات الشخصية",
            items: [
              "رقم الهاتف",
              "البريد الإلكتروني",
              "العنوان (عند الحاجة)",
              "صورة الملف الشخصي (اختياري)",
            ],
          },
          {
            title: "معلومات الاستخدام",
            items: [
              "العروض التي تقوم بها على المزادات",
              "المنتجات التي تتابعها أو تبحث عنها",
              "سجل الدخول والنشاط داخل التطبيق",
            ],
          },
          {
            title: "معلومات الجهاز",
            items: [
              "نوع الجهاز ونظام التشغيل",
              "عنوان الـ IP",
              "موقعك الجغرافي (بإذن منك)",
            ],
          },
        ],
      },
    },
    {
      id: "info-usage",
      title: "كيفية استخدام المعلومات",
      icon: Eye,
      content: {
        intro: "نستخدم المعلومات التي نجمعها للأغراض التالية:",
        items: [
          "إدارة حسابك وتوفير الدعم الفني",
          "تحسين تجربة المستخدم داخل التطبيق",
          "إرسال إشعارات حول المزادات أو المنتجات المهتم بها",
          "الكشف عن أي أنشطة مخالفة أو احتيالية",
        ],
      },
    },
    {
      id: "info-sharing",
      title: "مشاركة المعلومات",
      icon: Share2,
      content: {
        intro:
          "لن نشارك معلوماتك الشخصية مع أطراف ثالثة دون موافقتك، باستثناء الحالات التالية:",
        items: [
          "الامتثال للقوانين أو الاستجابة لأوامر قضائية",
          "الحماية من الاحتيال أو منع الأنشطة غير القانونية",
          "التعامل مع شركات شحن أو دفع لتسهيل عمليات البيع والشراء",
        ],
      },
    },
    {
      id: "cookies",
      title: "ملفات تعريف الارتباط (Cookies)",
      icon: Cookie,
      content: {
        intro:
          "قد نستخدم ملفات تعريف الارتباط لجمع بيانات حول نشاطك داخل التطبيق، بهدف تحسين خدماتنا وتقديم مزايا مخصصة لك.",
      },
    },
    {
      id: "user-rights",
      title: "حقوق المستخدم",
      icon: UserCheck,
      content: {
        intro: "لديك الحق في:",
        items: [
          "الوصول إلى بياناتك الشخصية وتعديلها",
          "حذف حسابك في أي وقت",
          "رفض تلقي الإشعارات التسويقية",
        ],
        note: "لطلب أي من الحقوق أعلاه، يرجى التواصل معنا عبر البريد الإلكتروني المذكور أدناه.",
      },
    },
    {
      id: "policy-updates",
      title: "تحديثات السياسة",
      icon: RefreshCw,
      content: {
        intro: "قد نقوم بتحديث سياسة الخصوصية من وقت لآخر.",
        items: [
          "سيتم إشعار المستخدمين بالتغييرات عبر التطبيق أو البريد الإلكتروني",
          "استمرارك في استخدام التطبيق يعني موافقتك على السياسة المحدّثة",
        ],
      },
    },
    {
      id: "contact",
      title: "التواصل معنا",
      icon: Mail,
      content: {
        intro: "للاستفسارات أو الملاحظات المتعلقة بالخصوصية، يرجى التواصل عبر:",
        contacts: [
          {
            type: "email",
            icon: Mail,
            label: "البريد الإلكتروني",
            value: "privacy@example.com",
          },
          {
            type: "phone",
            icon: Phone,
            label: "الهاتف",
            value: "+971 XX XXX XXXX",
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
                المحتويات
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
              سياسة الخصوصية والحقوق
            </h1>
            <p className="text-md text-gray-600 md:text-lg mb-8 leading-relaxed max-w-3xl mx-auto">
              نحن نولي خصوصيتك أهمية قصوى. تهدف هذه السياسة إلى توضيح كيفية جمع،
              استخدام، ومشاركة المعلومات التي يتم جمعها عبر التطبيق.
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
                      # {section.content.intro}
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
              <h3 className="text-2xl font-bold mb-4">
                خصوصيتك مهمة بالنسبة لنا
              </h3>
              <p className="text-blue-100 mb-6 leading-relaxed">
                إذا كان لديك أي استفسارات حول سياسة الخصوصية، لا تتردد في
                التواصل معنا
              </p>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => scrollToSection("contact")}
                className="font-semibold"
              >
                تواصل معنا
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
