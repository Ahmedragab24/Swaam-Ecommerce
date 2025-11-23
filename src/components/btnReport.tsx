"use client";

import { CircleAlert } from "lucide-react";
import Model from "./model";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField } from "./ui/form";
import CustomFormField from "./CustomFormItem";
import { Button } from "./ui/button";
import LoaderSpin from "./loader";
import CustomSelect from "./customSelect";

const formSchema = z.object({
  reportDescription: z.string().min(2, {
    message: "يجب أن يحتوي على 2 حروف على الأقل.",
  }),
  reportType: z.string().min(2, {
    message: "نوع الإبلاغ مطلوب",
  }),
});

const ReportListType = [
  { value: "product", label: "Product" },
  { value: "user", label: "User" },
  { value: "order", label: "Order" },
  { value: "category", label: "Category" },
  { value: "brand", label: "Brand" },
  { value: "review", label: "Review" },
];

const BtnReport = () => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reportDescription: "",
      reportType: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    setIsLoading(true);
  }

  return (
    <Model
      BtnSize={"icon"}
      BtnVariant="ghost"
      BtnIcon={<CircleAlert className="!h-6 !w-6" />}
      ModelTitle="الإبلاغ"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="reportDescription"
            render={({ field }) => (
              <CustomFormField
                field={field}
                type="text"
                label="تفاصيل الإبلاغ"
                placeholder="وصف الإبلاغ"
                typeInput="textarea"
                className="h-[170px]"
              />
            )}
          />

          <FormField
            control={form.control}
            name="reportType"
            render={({ field }) => (
              <CustomSelect
                control={form.control}
                name="reportType"
                label="نوع الابلاغ"
                placeholder="منتج ممنوع"
                selectList={ReportListType}
                className="!h-11"
              />
            )}
          />

          <Button
            size="lg"
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? <LoaderSpin type="Btn" size="sm" /> : "إبلاغ"}
          </Button>
        </form>
      </Form>
    </Model>
  );
};

export default BtnReport;
