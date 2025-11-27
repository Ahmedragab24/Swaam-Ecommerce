import { zodResolver } from "@hookform/resolvers/zod";
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
import { useLocale, useTranslations } from "next-intl";
import { useContactUsMutation } from "@/store/services/Settings";
import { toast } from "sonner";
import { Headset, MessageCircle } from "lucide-react";

const SupportFormSchema = z.object({
  type: z.string().min(1, "type is required"),
  message: z.string().min(1, "message is required"),
});

const SupportForm = () => {
  const [ContactUs, { isLoading }] = useContactUsMutation();
  const locale = useLocale();
  const t = useTranslations("SupportForm");

  const form = useForm<z.infer<typeof SupportFormSchema>>({
    resolver: zodResolver(SupportFormSchema),
    defaultValues: {
      type: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof SupportFormSchema>) {
    try {
      await ContactUs(values.message).unwrap();
      form.reset();
      toast.success(t("Success"));
    } catch (error) {
      toast.error(t("Error"));
    }
  }

  return (
    <div
      className="lg:max-w-3xl mx-auto mb-6 bg-white/70 dark:bg-card/60 backdrop-blur-xl shadow-xl border border-gray-200 dark:border-gray-700 rounded-2xl px-8 py-10"
      dir={locale === "ar" ? "rtl" : "ltr"}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Header */}
          <div className="text-center mb-8 space-y-3">
            <div className="flex justify-center">
              <div className="p-3 rounded-full bg-primary/10 text-primary">
                <Headset className="w-8 h-8" />
              </div>
            </div>
            <h1 className="text-3xl text-gray-800 dark:text-gray-200 font-bold">
              {t("Title")}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              {t("Description")}
            </p>
          </div>

          {/* Form Fields */}
          <div className="lg:max-w-lg mx-auto grid grid-cols-1 gap-8">
            {/* Radio Group */}
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="space-y-4">
                  <FormLabel
                    dir={locale === "ar" ? "rtl" : "ltr"}
                    className="text-lg font-semibold flex items-center gap-2"
                  >
                    <MessageCircle className="w-5 h-5 text-primary" />
                    {t("ProblemTypeLabel")}
                  </FormLabel>

                  <FormControl>
                    <RadioGroup
                      dir={locale === "ar" ? "rtl" : "ltr"}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-1 gap-4"
                    >
                      {[
                        { value: "login", label: t("LoginIssue") },
                        { value: "add", label: t("AdditionError") },
                        { value: "auction", label: t("AuctionDisplayIssue") },
                        { value: "tech", label: t("TechnicalIssue") },
                      ].map((item) => (
                        <FormItem
                          key={item.value}
                          className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                        >
                          <FormControl>
                            <RadioGroupItem value={item.value} />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer">
                            {item.label}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Message */}
            <CustomFormField
              field={form.register("message")}
              label={t("MessageDetailsLabel")}
              placeholder={t("MessagePlaceholder")}
              type="text"
              typeInput="textarea"
              className="w-full h-32 rounded-xl"
            />

            {/* Submit Button */}
            <Button
              size="lg"
              type="submit"
              className="w-full rounded-xl text-lg py-6 font-semibold"
              disabled={isLoading}
            >
              {isLoading ? <LoaderSpin type="Btn" size="sm" /> : t("Send")}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SupportForm;
