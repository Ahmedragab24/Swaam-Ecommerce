"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { formSchema } from "@/schemas/loginSchema";
import LoaderSpin from "./loader";
import { useTranslations } from "next-intl";
import CustomPhoneInput from "./CustomPhoneInput";
import CustomFormItem from "./CustomFormItem";
import { useLoginMutation } from "@/store/services/Auth/Auth";
import { LoginType } from "@/types/Auth";
import { toast } from "sonner";
import { ErrorType } from "@/types";
import { setAuthTokenClient } from "@/lib/auth/auth-client";
import { TypeRegisterModel } from "./btnRegister";

interface IProps {
  switchToLogin: (value: TypeRegisterModel) => void;
  switchToForgetPassword: () => void;
}

const LoginForm = ({ switchToLogin, switchToForgetPassword }: IProps) => {
  const t = useTranslations("Form");
  const [Login, { isLoading }] = useLoginMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: {
        code: "",
        number: "",
      },
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const data: LoginType = {
      phone: values.phone.code + values.phone.number,
      password: values.password,
    };

    try {
      const res = await Login(data).unwrap();

      toast.success(t("LoginSuccess"));
      setAuthTokenClient(res?.token || "");
      setTimeout(() => window.location.reload(), 800);
    } catch (error) {
      const err = error as ErrorType;
      toast.error(err?.data?.message);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Phone */}
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <CustomPhoneInput
              field={field}
              label={t("PhoneLabel")}
              placeholder={t("PhonePlaceholder")}
            />
          )}
        />

        {/* Password */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <CustomFormItem
              field={field}
              label={t("PasswordLabel")}
              placeholder={t("PasswordPlaceholder")}
              type="password"
            />
          )}
        />

        <p
          className="text-sm text-primary mt-1 ml-2 hover:text-primary/80 hover:underline cursor-pointer"
          onClick={switchToForgetPassword}
        >
          {t("IsForgotPassword")}
        </p>

        <Button size="lg" type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <LoaderSpin type="Btn" size="sm" title={t("Loading")} />
          ) : (
            t("Login")
          )}
        </Button>
      </form>

      <h2 className="text-sm text-center mt-10">
        {t("NoHaveAccount") + " "}
        <span
          onClick={() => switchToLogin("register")}
          className="text-primary hover:text-primary/80 cursor-pointer hover:underline px-1"
        >
          {t("Register")}
        </span>
      </h2>
    </Form>
  );
};

export default LoginForm;
