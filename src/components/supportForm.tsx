import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import CustomFormField from "./CustomFormItem";
import { Button } from "./ui/button";
import LoaderSpin from "./loader";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useLocale } from "next-intl";
const SupportFormSchema = z.object({
  type: z.string().min(1, "type is required"),
  message: z.string().min(1, "message is required"),
});

const SupportForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const locale = useLocale();

  const form = useForm<z.infer<typeof SupportFormSchema>>({
    resolver: zodResolver(SupportFormSchema),
    defaultValues: {
      type: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof SupportFormSchema>) {
    console.log(values);
    setIsLoading(true);
  }

  return (
    <div className="lg:max-w-3xl mx-auto mb-6 bg-card/30 drop-shadow-md shadow-lg rounded-xl px-8 py-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Header */}
          <div className="text-center mb-8 space-y-4">
            <h1 className="text-2xl text-gray-700 font-bold">الدعم الفني</h1>
          </div>

          <div className="lg:max-w-md mx-auto grid grid-cols-1 gap-6">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel
                    dir={locale === "ar" ? "rtl" : "ltr"}
                    className="text-lg font-semibold"
                  >
                    هل تواجه مشكلة محددة في التطبيق ؟
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      dir={locale === "ar" ? "rtl" : "ltr"}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col"
                    >
                      <FormItem className="flex items-center gap-3">
                        <FormControl>
                          <RadioGroupItem value="all" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          عدم تسجيل الدخول
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center gap-3">
                        <FormControl>
                          <RadioGroupItem value="mentions" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          خطأ في الأضافة
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center gap-3">
                        <FormControl>
                          <RadioGroupItem value="none" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          مشكلة في عرض المزادات{" "}
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center gap-3">
                        <FormControl>
                          <RadioGroupItem value="ewf" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          مشكلة في التقنية والبرمجة
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <CustomFormField
              field={form.register("message")}
              label="الرسالة"
              placeholder="وضح مشكلتك ...."
              type="text"
              typeInput="textarea"
              className="w-full h-28"
            />

            <Button
              size="lg"
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? <LoaderSpin type="Btn" size="sm" /> : "ارسال"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SupportForm;
