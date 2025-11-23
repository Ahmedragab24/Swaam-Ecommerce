import { z } from "zod";

export const ForgetPasswordFormSchema = z.object({
  phone: z.object({
    code: z.string().min(1, { message: "اختار كود الدولة." }),
    number: z
      .string()
      .min(9, { message: "رقم الجوال يجب أن يكون 9 أرقام على الأقل." })
      .regex(/^[0-9]+$/, { message: "رقم الجوال غير صحيح." }),
  }),
});
