import { z } from "zod";

export const UpdateAccountFormSchema = z.object({
  photo: z.string().optional(),
  username: z.string().min(2, {
    message: "الاسم يجب أن يحتوي على حرفين على الأقل.",
  }),

  email: z.string().email({
    message: "يرجى إدخال بريد إلكتروني صحيح.",
  }),

  nationality: z.string().min(2, {
    message: "يرجى إدخال الجنسية بشكل صحيح.",
  }),

  birthYear: z
    .string()
    .refine((val) => /^\d{4}$/.test(val), {
      message: "سنة الميلاد يجب أن تتكون من 4 أرقام.",
    })
    .refine(
      (val) => {
        const year = Number(val);
        return year >= 1900 && year <= new Date().getFullYear();
      },
      {
        message: "يرجى إدخال سنة ميلاد منطقية.",
      }
    ),

  birthMonth: z
    .string()
    .refine((val) => /^\d{1,2}$/.test(val), {
      message: "الشهر يجب أن يكون رقمًا بين 1 و12.",
    })
    .refine(
      (val) => {
        const month = Number(val);
        return month >= 1 && month <= 12;
      },
      {
        message: "يرجى إدخال شهر صالح.",
      }
    ),

  birthDay: z
    .string()
    .refine((val) => /^\d{1,2}$/.test(val), {
      message: "اليوم يجب أن يكون رقمًا بين 1 و31.",
    })
    .refine(
      (val) => {
        const day = Number(val);
        return day >= 1 && day <= 31;
      },
      {
        message: "يرجى إدخال يوم صالح.",
      }
    ),
});
