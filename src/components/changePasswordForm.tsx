import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormField } from "./ui/form";
import CustomFormField from "./CustomFormItem";
import { Button } from "./ui/button";
import LoaderSpin from "./loader";
import { ChangePasswordFormSchema } from "@/schemas/changePassword";
import { useChangePasswordMutation } from "@/store/services/Auth/Profile";
import { ChangePasswordType } from "@/types/Auth";
import { toast } from "sonner";
import { useLocale } from "next-intl";

import { useTranslations } from "next-intl";

const ChangePasswordForm = () => {
  const [ChangePasswordFormLoading, { isLoading }] =
    useChangePasswordMutation();
  const lang = useLocale();
  const t = useTranslations("Form");

  const form = useForm<z.infer<typeof ChangePasswordFormSchema>>({
    resolver: zodResolver(ChangePasswordFormSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof ChangePasswordFormSchema>) {
    const data: ChangePasswordType = {
      current_password: values.oldPassword,
      new_password: values.newPassword,
      new_password_confirmation: values.confirmPassword,
    };

    try {
      await ChangePasswordFormLoading(data).unwrap();
      toast.success(t("PasswordChangedSuccess"));
    } catch (error) {
      console.log(error);
      toast.error(t("UpdateError"));
    }
  }

  return (
    <div
      className="lg:max-w-3xl mx-auto mb-6 bg-card/30 drop-shadow-md shadow-lg rounded-xl px-8 py-8"
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl text-gray-700 font-medium">
              {t("ChangePasswordTitle")}
            </h1>
            <p className="max-w-sm mx-auto text-lg text-gray-600 font-medium">
              {t("ChangePasswordDescription")}
            </p>
          </div>

          <div className="lg:max-w-md mx-auto grid grid-cols-1 gap-4">
            <FormField
              control={form.control}
              name="oldPassword"
              render={({ field }) => (
                <CustomFormField
                  field={field}
                  type="password"
                  label={t("CurrentPasswordLabel")}
                  placeholder="************"
                  className="h-11"
                />
              )}
            />

            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <CustomFormField
                  field={field}
                  type="password"
                  label={t("NewPasswordLabel")}
                  placeholder="************"
                  className="h-11"
                />
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <CustomFormField
                  field={field}
                  label={t("ConfirmPasswordLabel")}
                  placeholder="************"
                  type="password"
                  className="h-11"
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
                <LoaderSpin type="Btn" size="sm" />
              ) : (
                t("ChangePasswordBtn")
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ChangePasswordForm;
