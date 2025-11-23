import { z } from "zod";

export const AddAuctionFormSchema = z.object({
  photo: z.custom<File>(
    (val) => val instanceof File && val.type.startsWith("image/"),
    {
      message: "الرجاء رفع صورة صحيحة.",
    }
  ),

  photoGroup: z.array(z.any()).optional(),
  productName: z.string().min(2, { message: "اسم المنتج مطلوب." }),
  productCategory: z.string().min(2, { message: "التصنيف مطلوب." }),
  productState: z.string().min(2, { message: "حالة المنتج مطلوبة." }),
  description: z
    .string()
    .min(5, { message: "الوصف يجب أن يكون 5 أحرف على الأقل." }),
  otherDetails: z.string().optional(),
  location: z.string().min(2, { message: "الموقع مطلوب." }),

  contactMethods: z
    .array(z.enum(["whatsapp", "call", "message"]))
    .min(1, { message: "يرجى اختيار طريقة تواصل واحدة على الأقل." }),


  auctionDuration: z.string().min(1, { message: "الرجاء إدخال مدة المزاد." }),
  priceTo: z.string().min(1, { message: "يرجى إدخال سعر صحيح." }),
});
