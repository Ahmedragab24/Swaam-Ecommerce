"use client";

import { useState } from "react";
import { Edit3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import CustomFormField from "./CustomFormItem";
import { Form, FormField, FormLabel } from "./ui/form";
import LoaderSpin from "./loader";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomNationalityField from "./customNationalityField";
import { UpdateAccountFormSchema } from "@/schemas/updateAccount";
import EditableAvatar from "./updateImageAccount";

const AccountForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof UpdateAccountFormSchema>>({
    resolver: zodResolver(UpdateAccountFormSchema),
    defaultValues: {
      photo: "",
      username: "",
      email: "",
      nationality: "",
      birthYear: "",
      birthMonth: "",
      birthDay: "",
    },
  });

  function onSubmit(values: z.infer<typeof UpdateAccountFormSchema>) {
    console.log(values);
    setIsLoading(true);
  }

  return (
    <div className="max-w-3xl mx-auto mb-6 bg-card/30 drop-shadow-md shadow-lg rounded-xl px-8 md:px-20 py-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Header */}
          <div className="text-center mb-8">
            {/* Profile Picture */}
            <EditableAvatar control={form.control} />

            {/* Name under picture */}
            <p className="text-2xl text-gray-700 font-medium">محمد عبدلله</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 items-center">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <CustomFormField
                  type="text"
                  field={field}
                  label="اسم الكامل"
                  placeholder="محمد عبدالله"
                  icon={<Edit3 className="w-4 h-4" />}
                  className="h-11"
                />
              )}
            />


            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <CustomFormField
                  type="email"
                  field={field}
                  label="البريد الإلكتروني"
                  placeholder="mohamed342@gmail.com"
                  icon={<Edit3 className="w-4 h-4" />}
                  className="h-11"
                />
              )}
            />

            <FormField
              control={form.control}
              name="nationality"
              render={({ field }) => (
                <CustomNationalityField
                  control={form.control}
                  className="!h-11"
                />
              )}
            />

            <div>
              <FormLabel className="rtl:text-right block w-full text-gray-700">
                تاريخ الميلاد
              </FormLabel>
              <div className="flex gap-2 justify-between">
                <FormField
                  control={form.control}
                  name="birthYear"
                  render={({ field }) => (
                    <CustomFormField
                      className="flex-1 h-11"
                      field={field}
                      placeholder="السنة"
                      type="number"
                    />
                  )}
                />

                <FormField
                  control={form.control}
                  name="birthMonth"
                  render={({ field }) => (
                    <CustomFormField
                      className="flex-1 h-11"
                      field={field}
                      placeholder="الشهر"
                      type="number"
                    />
                  )}
                />

                <FormField
                  control={form.control}
                  name="birthDay"
                  render={({ field }) => (
                    <CustomFormField
                      className="flex-1 h-11"
                      field={field}
                      placeholder="اليوم"
                      type="number"
                    />
                  )}
                />
              </div>
            </div>
          </div>

          <Button
            size="lg"
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? <LoaderSpin type="Btn" size="sm" /> : "تعديل البيانات"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AccountForm;
