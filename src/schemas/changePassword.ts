import { z } from "zod";

export const ChangePasswordFormSchema = z
  .object({
    oldPassword: z.string().min(6, {
      message: "كلمة المرور القديمة يجب أن تكون 6 أحرف على الأقل.",
    }),
    newPassword: z.string().min(6, {
      message: "كلمة المرور الجديدة يجب أن تكون 6 أحرف على الأقل.",
    }),
    confirmPassword: z.string().min(6, {
      message: "تأكيد كلمة المرور يجب أن يكون 6 أحرف على الأقل.",
    }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "تأكيد كلمة المرور لا يطابق كلمة المرور الجديدة.",
  })
  .refine((data) => data.oldPassword !== data.newPassword, {
    path: ["newPassword"],
    message: "كلمة المرور الجديدة يجب أن تكون مختلفة عن القديمة.",
  });
