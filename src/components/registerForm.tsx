"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { RegisterFormSchema } from "@/schemas/registerSchema";
import LoaderSpin from "./loader";
import { useTranslations } from "next-intl";
import CustomPhoneInput from "./CustomPhoneInput";
import CustomFormItem from "./CustomFormItem";
import { useRegisterMutation } from "@/store/services/Auth/Auth";
import { toast } from "sonner";
import { ErrorType } from "@/types";
import { RegisterType } from "@/types/Auth";
import { TypeRegisterModel } from "./btnRegister";
import { getFcmToken, getDeviceId } from "@/lib/deviceUtils";

interface IProps {
  switchToLogin: (value: TypeRegisterModel) => void;
  setPhone: (value: string) => void;
}

const RegisterForm = ({ switchToLogin, setPhone }: IProps) => {
  const [Register, { isLoading }] = useRegisterMutation();
  const t = useTranslations("Form");

  const form = useForm<z.infer<typeof RegisterFormSchema>>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      phone: {
        code: "",
        number: "",
      },
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof RegisterFormSchema>) {
    const data: RegisterType = {
      name: values.username,
      phone: values.phone.code + values.phone.number,
      password: values.password,
      code: values.phone.code,
      fcm: getFcmToken(),
      device_id: getDeviceId(),
    };

    try {
      await Register(data).unwrap();
      setPhone(values.phone.code + values.phone.number);
      toast.success(t("RegisterSuccess"));
      switchToLogin("otp");
    } catch (error) {
      const err = error as ErrorType;
      toast.error(err?.data?.message);
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Username */}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <CustomFormItem
                field={field}
                label={t("UserNameLabel")}
                placeholder={t("UserNamePlaceholder")}
                type="text"
              />
            )}
          />

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

          <Button
            size="lg"
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <LoaderSpin type="Btn" size="sm" title={t("Loading")} />
            ) : (
              t("Register")
            )}
          </Button>
        </form>
      </Form>

      {/* Switch to Login */}
      <div className="text-center mt-4 text-gray-500 text-sm">
        {t("HaveAccount")}

        <span
          className="text-primary cursor-pointer hover:underline px-1"
          onClick={() => switchToLogin("login")}
        >
          {t("Login")}
        </span>
      </div>
    </div>
  );
};

export default RegisterForm;
