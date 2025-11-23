import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/button";
import LoaderSpin from "./loader";
import { Form, FormField } from "./ui/form";
import { ForgetPasswordFormSchema } from "@/schemas/foregetPasswordSchema";
import { useTranslations } from "next-intl";
import CustomPhoneInput from "./CustomPhoneInput";
import { useForgotPasswordMutation } from "@/store/services/Auth/Auth";
import { toast } from "sonner";
import { ErrorType } from "@/types";
import { TypeRegisterModel } from "./btnRegister";

interface IProps {
  switchToLogin: (value: TypeRegisterModel) => void;
}

const ForgetPasswordForm = ({ switchToLogin }: IProps) => {
  const [forgetPassword, { isLoading }] = useForgotPasswordMutation();
  const t = useTranslations("Form");

  const form = useForm<z.infer<typeof ForgetPasswordFormSchema>>({
    resolver: zodResolver(ForgetPasswordFormSchema),
    defaultValues: {
      phone: {
        code: "",
        number: "",
      },
    },
  });

  async function onSubmit(values: z.infer<typeof ForgetPasswordFormSchema>) {
    try {
      await forgetPassword(values.phone.code + values.phone.number).unwrap();
      switchToLogin("restPassword");
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

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <LoaderSpin title={t("Loading")} type="Btn" size="sm" />
          ) : (
            t("Send")
          )}
        </Button>
      </form>

      <h2
        onClick={() => switchToLogin("login")}
        className="text-sm text-center mt-10 text-primary hover:text-primary/80 cursor-pointer hover:underline px-1"
      >
        {t("BackToLogin")}
      </h2>
    </Form>
  );
};

export default ForgetPasswordForm;
