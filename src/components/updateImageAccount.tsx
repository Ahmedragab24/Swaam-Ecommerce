"use client";

import { useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Edit3 } from "lucide-react";
import { Control } from "react-hook-form";
import { z } from "zod";
import { UpdateAccountFormSchema } from "@/schemas/updateAccount";
import { FormControl, FormField, FormItem, FormMessage } from "./ui/form";

export default function EditableAvatar({
  control,
}: {
  control: Control<z.infer<typeof UpdateAccountFormSchema>>;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState("/Icons/user.png");

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
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <div className="w-fit mx-auto relative inline-block mb-4">
              <Avatar className="w-24 h-24 mx-auto">
                <AvatarImage
                  src={imageUrl}
                  alt="Profile Picture"
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
                {...field}
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
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
