import { z } from "zod";

export const formSchema = z.object({
  phone: z.object({
    code: z.string().min(1, { message: "اختار كود الدولة." }),
    number: z
      .string()
      .min(6, { message: "رقم الجوال يجب أن يكون 6 أرقام على الأقل." }),
  }),
  password: z
    .string()
    .min(8, { message: "كلمة المرور يجب أن تكون 8 أحرف على الأقل." }),
});
