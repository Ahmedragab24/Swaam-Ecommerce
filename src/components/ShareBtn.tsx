"use client";

import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import React from "react";
import { toast } from "sonner";

const ShareButton = () => {
  const handleShare = async () => {
    const shareData = {
      title: document.title,
      text: "شاهد هذا العقار:",
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        toast.success("تم المشاركة بنجاح ✅");
      } catch (err) {
        console.error("فشل في المشاركة:", err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("تم نسخ الرابط إلى الحافظة ✅");
      } catch (err) {
        console.error("فشل في النسخ:", err);
      }
    }
  };

  return (
    <Button
      onClick={handleShare}
      className="bg-gray-100/60 rounded-full w-6 h-6 md:w-8 md:h-8 !p-2 md:!p-4 border-2 border-gray-200 hover:bg-gray-50 transition-colors"
    >
      <Share2
        strokeWidth={1.25}
        className="transition-colors w-3 h-3 md:!w-5 md:!h-5 text-primary"
      />
    </Button>
  );
};

export default ShareButton;
