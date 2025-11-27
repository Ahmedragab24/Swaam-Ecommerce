import { z } from "zod";

export const UpdateAccountFormSchema = z.object({
  photo: z.any().optional(),
  username: z.string().optional(),
  phone: z
    .object({
      code: z.string(),
      number: z.string(),
    })
    .optional(),
});
