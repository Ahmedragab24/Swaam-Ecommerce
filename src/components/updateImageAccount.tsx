"use client";

import { useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Edit3 } from "lucide-react";
import { Control } from "react-hook-form";
import { z } from "zod";
import { UpdateAccountFormSchema } from "@/schemas/updateAccount";
import { FormControl, FormField, FormItem, FormMessage } from "./ui/form";

import { useTranslations } from "next-intl";

export default function EditableAvatar({
  control,
  initialImage,
}: {
  control: Control<z.infer<typeof UpdateAccountFormSchema>>;
  initialImage?: string | null;
}) {
  const t = useTranslations("Form");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState(
    initialImage || "/Icons/userPlaceholder.svg"
  );

  useEffect(() => {
    if (initialImage) {
      setImageUrl(initialImage);
    }
  }, [initialImage]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);

      // يمكنك هنا رفع الصورة إلى السيرفر عبر API
      // مثال: uploadImage(file)
    }
  };

  return (
    <FormField
      control={control}
      name="photo"
      render={({ field: { value, onChange, ...fieldProps } }) => (
        <FormItem>
          <FormControl>
            <div className="w-fit mx-auto relative inline-block mb-4">
              <Avatar className="w-24 h-24 mx-auto border border-gray-500">
                <AvatarImage
                  src={imageUrl}
                  alt={t("ProfilePicture")}
                  className="object-cover"
                />
                <AvatarFallback className="text-xl font-semibold bg-card text-gray-700">
                  م ع
                </AvatarFallback>
              </Avatar>

              {/* زر التعديل */}
              <Button
                size="icon"
                variant="secondary"
                className="absolute -bottom-1 -left-1 w-8 h-8 rounded-full"
                onClick={(e) => {
                  e.preventDefault();
                  fileInputRef.current?.click();
                }}
              >
                <Edit3 className="w-4 h-4" />
              </Button>

              <input
                {...fieldProps}
                type="file"
                accept="image/*"
                ref={(e) => {
                  fieldProps.ref(e);
                  // @ts-ignore
                  fileInputRef.current = e;
                }}
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (file) {
                    const url = URL.createObjectURL(file);
                    setImageUrl(url);
                    onChange(file);
                  }
                }}
                className="hidden"
              />
            </div>
          </FormControl>
          <FormMessage className="rtl:text-right" />
        </FormItem>
      )}
    />
  );
}
