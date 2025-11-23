import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormField } from "./ui/form";
import CustomFormField from "./CustomFormItem";
import { Button } from "./ui/button";
import LoaderSpin from "./loader";

const DeleteAccountFormSchema = z.object({
  Password: z.string().min(1, "Password is required"),
});

const DeleteAccountForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof DeleteAccountFormSchema>>({
    resolver: zodResolver(DeleteAccountFormSchema),
    defaultValues: {
      Password: "",
    },
  });

  function onSubmit(values: z.infer<typeof DeleteAccountFormSchema>) {
    console.log(values);
    setIsLoading(true);
  }

  return (
    <div className="lg:max-w-3xl mx-auto mb-6 bg-card/30 drop-shadow-md shadow-lg rounded-xl px-8 py-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Header */}
          <div className="text-center mb-8 space-y-4">
            <h1 className="text-2xl text-gray-700 font-medium">حذف الحساب</h1>

            <p className="text-destructive text-lg">
              تحذير: حذف حسابك سيؤدي إلى إزالة جميع بياناتك بشكل دائم. هذا
              الإجراء لا يمكن التراجع عنه.
            </p>
          </div>

          <div className="lg:max-w-md mx-auto grid grid-cols-1 gap-4">
            <FormField
              control={form.control}
              name="Password"
              render={({ field }) => (
                <CustomFormField
                  field={field}
                  type="password"
                  label="ادخل كلمة المرور لتأكيد حسابك"
                  placeholder="************"
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
              {isLoading ? <LoaderSpin type="Btn" size="sm" /> : "حذف حسابي"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default DeleteAccountForm;
