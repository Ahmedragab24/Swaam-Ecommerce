import { z } from "zod";

export const ForgetPasswordFormSchema = z.object({
  phone: z.object({
    code: z.string().min(1, { message: "اختار كود الدولة." }),
    number: z
      .string()
      .min(6, { message: "رقم الجوال يجب أن يكون 6 أرقام على الأقل." }),
  }),
});
