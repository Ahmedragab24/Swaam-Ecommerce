import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormField } from "./ui/form";
import CustomFormField from "./CustomFormItem";
import { Button } from "./ui/button";
import LoaderSpin from "./loader";
import { ChangePasswordFormSchema } from "@/schemas/changePassword";

const ChangePasswordForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof ChangePasswordFormSchema>>({
    resolver: zodResolver(ChangePasswordFormSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof ChangePasswordFormSchema>) {
    console.log(values);
    setIsLoading(true);
  }

  return (
    <div className="lg:max-w-3xl mx-auto mb-6 bg-card/30 drop-shadow-md shadow-lg rounded-xl px-8 py-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl text-gray-700 font-medium">
              تغيير كلمة المرور
            </h1>
            <p className="max-w-sm mx-auto text-lg text-gray-600 font-medium">
              يجب أن تكون كلمة المرور الجديدة فريدة من نوعها عن تلك التي
              استخدمتها سابقًا
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
                  label="كلمة المرور الحالية"
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
                  label="كلمة المرور الجديدة"
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
                  label="تأكيد كلمة المرور الجديدة"
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
                "تغيير كلمة المرور"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ChangePasswordForm;
