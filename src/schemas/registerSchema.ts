import { z } from "zod";

export const RegisterFormSchema = z.object({
  phone: z.object({
    code: z.string().min(1, { message: "اختار كود الدولة." }),
    number: z
      .string()
      .min(9, { message: "رقم الجوال يجب أن يكون 9 أرقام على الأقل." })
      .regex(/^[0-9]+$/, { message: "رقم الجوال غير صحيح." }),
  }),
  password: z
    .string()
    .min(8, { message: "كلمة المرور يجب أن تكون 8 أحرف على الأقل." }),

  username: z
    .string()
    .min(2, { message: "اسم المستخدم يجب أن يحتوي على حرفين على الأقل." })
    .max(30, { message: "اسم المستخدم لا يجب أن يزيد عن 30 حرفًا." }),
});
