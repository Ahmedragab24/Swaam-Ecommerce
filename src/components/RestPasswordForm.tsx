"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormField } from "@/components/ui/form";
import { useResetPasswordMutation } from "@/store/services/Auth/Auth";
import { useTranslations } from "next-intl";
import { ErrorType } from "@/types";
import { toast } from "sonner";
import { getAuthTokenClient } from "@/lib/auth/auth-client";
import { TypeRegisterModel } from "./btnRegister";
import CustomFormItem from "./CustomFormItem";
import LoaderSpin from "./loader";
import { Button } from "./ui/button";

interface Props {
  switchToLogin: (value: TypeRegisterModel) => void;
}

export const RestPasswordFormSchema = z
  .object({
    password: z.string().min(6, "PasswordMinLength"),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "PasswordNotMatch",
    path: ["password_confirmation"],
  });

const RestPasswordForm = ({ switchToLogin }: Props) => {
  const t = useTranslations("Form");

  const [RestPassword, { isLoading }] = useResetPasswordMutation();

  const form = useForm<z.infer<typeof RestPasswordFormSchema>>({
    resolver: zodResolver(RestPasswordFormSchema),
    defaultValues: {
      password: "",
      password_confirmation: "",
    },
  });

  async function onSubmit(values: z.infer<typeof RestPasswordFormSchema>) {
    try {
      const token = getAuthTokenClient();
      await RestPassword({
        body: {
          new_password: values.password,
          new_password_confirmation: values.password_confirmation,
        },
        token,
      }).unwrap();

      toast.success(t("PasswordChangedSuccess"));
      switchToLogin("login");
      form.reset();
    } catch (error) {
      const err = error as ErrorType;
      toast.error(err.data.message);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <CustomFormItem
              field={field}
              label={t("NewPasswordLabel")}
              type="password"
              placeholder={t("NewPasswordPlaceholder")}
            />
          )}
        />

        <FormField
          control={form.control}
          name="password_confirmation"
          render={({ field }) => (
            <CustomFormItem
              field={field}
              label={t("ConfirmPasswordLabel")}
              type="password"
              placeholder={t("ConfirmPasswordPlaceholder")}
            />
          )}
        />

        <Button size="lg" type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <LoaderSpin type="Btn" size="sm" title={t("Loading")} />
          ) : (
            t("Submit")
          )}
        </Button>

        <p
          className="text-start text-sm hover:underline underline-offset-4 cursor-pointer"
          onClick={() => switchToLogin("login")}
        >
          {t("BackToLogin")}
        </p>
      </form>
    </Form>
  );
};

export default RestPasswordForm;
