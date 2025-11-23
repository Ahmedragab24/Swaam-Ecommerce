"use client";

import type React from "react";

import type { Control } from "react-hook-form";
import { FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import Image from "next/image";
import { useState } from "react";
import { Button } from "./ui/button";
import { Plus, X, Upload, ImageIcon, Paperclip } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocale } from "next-intl";

interface CustomUploadImageFieldProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  type: "single" | "photoGroup" | "squareAttachment";
  typeSingle?: "circle" | "square";
}

interface PhotoPreview {
  file: File;
  url: string;
  id: string;
}

const CustomUploadImageField = ({
  control,
  type,
  typeSingle,
}: CustomUploadImageFieldProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [photoGroup, setPhotoGroup] = useState<PhotoPreview[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [attachments, setAttachments] = useState<PhotoPreview[]>([]);
  const locale = useLocale();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFileSelect = (files: FileList | null, field: any) => {
    if (!files) return;

    if (type === "single") {
      const file = files[0];
      if (file) {
        field.onChange(file);
        const imageUrl = URL.createObjectURL(file);
        setPreview(imageUrl);
      }
    } else if (type === "squareAttachment") {
      const newAttachments: PhotoPreview[] = [];
      Array.from(files).forEach((file) => {
        if (file.type.startsWith("image/")) {
          const id = Math.random().toString(36).substr(2, 9);
          const url = URL.createObjectURL(file);
          newAttachments.push({ file, url, id });
        }
      });

      const updatedAttachments = [...attachments, ...newAttachments];
      setAttachments(updatedAttachments);
      field.onChange(updatedAttachments.map((attachment) => attachment.file));
    } else {
      const newPhotos: PhotoPreview[] = [];
      Array.from(files).forEach((file) => {
        if (file.type.startsWith("image/")) {
          const id = Math.random().toString(36).substr(2, 9);
          const url = URL.createObjectURL(file);
          newPhotos.push({ file, url, id });
        }
      });

      const updatedPhotos = [...photoGroup, ...newPhotos];
      setPhotoGroup(updatedPhotos);
      field.onChange(updatedPhotos.map((photo) => photo.file));
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const removePhoto = (photoId: string, field: any) => {
    if (type === "photoGroup") {
      const updatedPhotos = photoGroup.filter((photo) => photo.id !== photoId);
      setPhotoGroup(updatedPhotos);
      field.onChange(updatedPhotos.map((photo) => photo.file));
    } else if (type === "squareAttachment") {
      const updatedAttachments = attachments.filter(
        (attachment) => attachment.id !== photoId
      );
      setAttachments(updatedAttachments);
      field.onChange(updatedAttachments.map((attachment) => attachment.file));
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDrop = (e: React.DragEvent, field: any) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    handleFileSelect(files, field);
  };

  return (
    <FormField
      control={control}
      name={
        type === "single"
          ? "photo"
          : type === "photoGroup"
          ? "photoGroup"
          : "attachments"
      }
      render={({ field }) => (
        <FormItem>
          <FormControl>
            {type === "single" ? (
              typeSingle === "circle" ? (
                <div className="relative">
                  <div className="">
                    <div className="mx-auto relative w-[130px] h-[130px] rounded-full bg-primary overflow-hidden cursor-pointer group">
                      {preview ? (
                        <Image
                          src={preview || "/placeholder.svg"}
                          alt="Uploaded"
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <Image
                          src="/Icons/upload_image.svg"
                          alt="upload"
                          width={100}
                          height={100}
                          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 opacity-60 group-hover:opacity-100 transition-opacity"
                        />
                      )}

                      <Input
                        type="file"
                        accept="image/*"
                        multiple={false}
                        className="w-full h-full absolute inset-0 opacity-0 cursor-pointer !z-20"
                        onChange={(e) =>
                          handleFileSelect(e.target.files, field)
                        }
                      />
                    </div>

                    {preview ? (
                      <Button
                        variant="destructive"
                        size="icon"
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setPreview(null);
                          field.onChange(null);
                        }}
                        className="absolute top-2 right-[175px] !z-30 rounded-full w-6 h-6 transition"
                        title="حذف الصورة"
                      >
                        ×
                      </Button>
                    ) : (
                      <Button
                        size="icon"
                        className="bg-black absolute bottom-2 left-[175px] !z-30 rounded-full w-6 h-6 transition"
                        onClick={(e) => {
                          e.stopPropagation();
                          setPreview(null);
                        }}
                        title="إضافة صورة"
                      >
                        <Plus />
                      </Button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="relative">
                  <div className="mx-auto relative w-[200px] h-[200px] rounded-4xl hover:bg-gray-50 border-2 border-primary overflow-hidden cursor-pointer group">
                    {preview ? (
                      <Image
                        src={preview || "/placeholder.svg"}
                        alt="Uploaded"
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full">
                        <Image
                          src="/Icons/camera-plus.svg"
                          alt="camera"
                          width={64}
                          height={64}
                          className="mb-2 opacity-60 group-hover:opacity-100 transition-opacity"
                        />
                        <p className="text-sm text-gray-500">
                          {locale === "ar"
                            ? "اضغط لإضافة صورة"
                            : "select an image"}
                        </p>
                      </div>
                    )}

                    <Input
                      type="file"
                      accept="image/*"
                      multiple={false}
                      className="w-full h-full absolute inset-0 opacity-0 cursor-pointer !z-20"
                      onChange={(e) => handleFileSelect(e.target.files, field)}
                    />

                    {preview && (
                      <Button
                        variant="destructive"
                        size="icon"
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setPreview(null);
                          field.onChange(null);
                        }}
                        className="absolute top-2 right-2 !z-30 rounded-full w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity"
                        title="حذف الصورة"
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    )}
                  </div>
                </div>
              )
            ) : type === "squareAttachment" ? (
              <div className="w-full">
                {attachments.length === 0 ? (
                  // Square Attachment Upload Zone
                  <div
                    className={cn(
                      "relative border-2 border-dashed rounded-lg p-6 transition-all duration-300 cursor-pointer group",
                      isDragOver
                        ? "border-primary bg-primary/5 scale-[1.01]"
                        : "border-gray-300 hover:border-primary hover:bg-gray-50"
                    )}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, field)}
                  >
                    <Input
                      type="file"
                      accept="image/*"
                      multiple={true}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      onChange={(e) => handleFileSelect(e.target.files, field)}
                    />

                    <div className="flex items-center justify-center gap-4">
                      <div
                        className={cn(
                          "w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300",
                          isDragOver
                            ? "bg-primary text-white scale-110"
                            : "bg-gray-100 text-gray-400 group-hover:bg-primary group-hover:text-white"
                        )}
                      >
                        <Paperclip className="w-6 h-6" />
                      </div>

                      <div className="text-right">
                        <h3 className="text-base font-medium text-gray-700 mb-1">
                          {locale === "ar" ? "إرفاق صور" : "Select Images"}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {locale === "ar"
                            ? "اسحب الصور هنا أو انقر للتحديد"
                            : "Drag and drop images here or click to select"}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Square Attachments Display
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-base font-medium text-gray-700">
                        {locale === "ar" ? "المرفقات" : "Attachments"} (
                        {attachments.length})
                      </h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        type="button"
                        onClick={() => {
                          setAttachments([]);
                          field.onChange([]);
                        }}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 text-xs h-7 px-2"
                      >
                        {locale === "ar" ? "حذف الكل" : "Clear All"}
                      </Button>
                    </div>

                    <div
                      className={cn(
                        "border-2 border-dashed rounded-lg p-3 transition-all duration-300",
                        isDragOver
                          ? "border-primary bg-primary/5"
                          : "border-gray-200"
                      )}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={(e) => handleDrop(e, field)}
                    >
                      <div className="space-y-2">
                        {attachments.map((attachment) => (
                          <div
                            key={attachment.id}
                            className="relative flex items-center bg-gray-50 rounded-lg p-2 group hover:bg-gray-100 transition-all duration-200"
                          >
                            <div className="w-12 h-12 rounded-md overflow-hidden bg-gray-200 flex-shrink-0 mr-3">
                              <Image
                                src={attachment.url || "/placeholder.svg"}
                                alt="Preview"
                                width={48}
                                height={48}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-grow min-w-0">
                              <p className="text-sm font-medium text-gray-700 truncate">
                                {attachment.file.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {(attachment.file.size / 1024 / 1024).toFixed(
                                  2
                                )}{" "}
                                MB
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              type="button"
                              onClick={() => removePhoto(attachment.id, field)}
                              className="w-7 h-7 rounded-full text-gray-400 hover:text-red-600 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all duration-200"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}

                        {/* Add More Button */}
                        <div className="relative flex items-center justify-center bg-gray-50 rounded-lg p-2 hover:bg-gray-100 transition-all duration-200 cursor-pointer">
                          <Input
                            type="file"
                            accept="image/*"
                            multiple={true}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                            onChange={(e) =>
                              handleFileSelect(e.target.files, field)
                            }
                          />
                          <div className="flex items-center text-primary">
                            <Plus className="w-4 h-4 mr-1" />
                            <span className="text-sm">
                              {locale === "ar"
                                ? "إضافة المزيد من المرفقات"
                                : "Add more attachments"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="w-full">
                {photoGroup.length === 0 ? (
                  // Upload Zone - Only shown when no photos are uploaded
                  <div
                    className={cn(
                      "relative border-4 border-dashed border-primary rounded-xl p-8 transition-all duration-300 cursor-pointer group",
                      isDragOver
                        ? "border-primary bg-primary/5 scale-[1.02]"
                        : "border-primary/70 hover:border-primary hover:bg-gray-50"
                    )}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, field)}
                  >
                    <Input
                      type="file"
                      accept="image/*"
                      multiple={true}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      onChange={(e) => handleFileSelect(e.target.files, field)}
                    />

                    <div className="flex flex-col items-center justify-center text-center">
                      <div
                        className={cn(
                          "w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-all duration-300",
                          isDragOver
                            ? "bg-primary text-white scale-110"
                            : "bg-gray-100 text-gray-400 group-hover:bg-primary group-hover:text-white"
                        )}
                      >
                        <Upload className="w-8 h-8" />
                      </div>

                      <h3 className="text-lg font-semibold text-gray-700 mb-2">
                        {locale === "ar"
                          ? "اسحب الصور هنا أو انقر للتحديد"
                          : "Drag the images here or click to select"}
                      </h3>
                      <p className="text-sm text-gray-500 mb-4">
                        {locale === "ar"
                          ? "يمكنك تحديد عدة صور في نفس الوقت"
                          : "You can select multiple photos at once"}
                      </p>

                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <ImageIcon className="w-4 h-4" />
                        <span>
                          {locale === "ar"
                            ? "PNG, JPG, JPEG حتى 10MB لكل صورة"
                            : "PNG, JPG, JPEG up to 10MB per image"}
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Photos Grid - Replaces the upload zone when photos are uploaded
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-semibold text-gray-700">
                        {locale === "ar" ? "الصور المحددة" : "Selected Photos"}(
                        {photoGroup.length})
                      </h4>
                      <Button
                        variant="outline"
                        size="sm"
                        type="button"
                        onClick={() => {
                          setPhotoGroup([]);
                          field.onChange([]);
                        }}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        {locale === "ar" ? "حذف الكل" : "Clear All"}
                      </Button>
                    </div>

                    <div
                      className={cn(
                        "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4 border-2 border-dashed rounded-xl transition-all duration-300",
                        isDragOver
                          ? "border-primary bg-primary/5"
                          : "border-gray-200 hover:border-gray-300"
                      )}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={(e) => handleDrop(e, field)}
                    >
                      {photoGroup.map((photo) => (
                        <div
                          key={photo.id}
                          className="relative group aspect-square rounded-lg overflow-hidden bg-gray-100 border-2 border-gray-200 hover:border-primary transition-all duration-300 hover:shadow-lg"
                        >
                          <Image
                            src={photo.url || "/placeholder.svg"}
                            alt="Preview"
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-110"
                          />

                          {/* Overlay */}
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />

                          {/* Remove Button */}
                          <Button
                            variant="destructive"
                            size="icon"
                            type="button"
                            onClick={() => removePhoto(photo.id, field)}
                            className="absolute top-2 right-2 w-6 h-6 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                          >
                            <X className="w-3 h-3" />
                          </Button>

                          {/* File Info */}
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                            <p className="text-white text-xs truncate">
                              {photo.file.name}
                            </p>
                            <p className="text-white/80 text-xs">
                              {(photo.file.size / 1024 / 1024).toFixed(1)} MB
                            </p>
                          </div>
                        </div>
                      ))}

                      {/* Add More Button */}
                      <div className="relative aspect-square rounded-lg border-2 border-dashed border-gray-300 hover:border-primary transition-all duration-300 cursor-pointer group bg-gray-50 hover:bg-gray-100">
                        <Input
                          type="file"
                          accept="image/*"
                          multiple={true}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                          onChange={(e) =>
                            handleFileSelect(e.target.files, field)
                          }
                        />

                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <div className="w-8 h-8 rounded-full bg-gray-200 group-hover:bg-primary flex items-center justify-center mb-2 transition-all duration-300">
                            <Plus className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors duration-300" />
                          </div>
                          <span className="text-xs text-gray-500 group-hover:text-primary transition-colors duration-300 text-center px-1">
                            {locale === "ar" ? "أضف المزيد" : "Add more"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Drag and Drop Hint */}
                    <div className="text-center">
                      <p className="text-sm text-gray-500">
                        {locale === " ar"
                          ? "يمكنك أيضاً سحب الصور مباشرة إلى المنطقة أعلاه لإضافة المزيد"
                          : "You can also drag and drop the images directly into the area above to add more"}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </FormControl>
          <FormMessage className="text-right" />
        </FormItem>
      )}
    />
  );
};

export default CustomUploadImageField;
