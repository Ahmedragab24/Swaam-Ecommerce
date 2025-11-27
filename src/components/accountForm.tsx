"use client";

import { Edit3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import CustomFormField from "./CustomFormItem";
import { Form, FormField } from "./ui/form";
import LoaderSpin from "./loader";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateAccountFormSchema } from "@/schemas/updateAccount";
import EditableAvatar from "./updateImageAccount";
import {
  useGetUserInfoQuery,
  useUpdateProfileMutation,
} from "@/store/services/Auth/Profile";
import { toast } from "sonner";
import CustomPhoneInput from "./CustomPhoneInput";
import { arabCountries } from "@/constants/phoneCode";

const getPhoneData = (phone: string | undefined) => {
  if (!phone) return { code: arabCountries[0].code, number: "" };
  const country = arabCountries.find((c) => phone.startsWith(c.code));
  if (country) {
    return {
      code: country.code,
      number: phone.replace(country.code, ""),
    };
  }
  return { code: arabCountries[0].code, number: phone };
};

import { useTranslations } from "next-intl";

const AccountForm = () => {
  const [UpdateAccount, { isLoading }] = useUpdateProfileMutation();
  const t = useTranslations("Form");

  const { data } = useGetUserInfoQuery();
  const userInfo = data?.data.user;

  const form = useForm<z.infer<typeof UpdateAccountFormSchema>>({
    resolver: zodResolver(UpdateAccountFormSchema),
    defaultValues: {
      photo: "",
      username: userInfo?.name ?? "",
      phone: getPhoneData(userInfo?.phone),
    },
  });

  async function onSubmit(values: z.infer<typeof UpdateAccountFormSchema>) {
    const data = new FormData();
    data.append("image", values?.photo || "");
    data.append("name", values?.username || "");

    const fullPhone =
      values.phone?.code && values.phone?.number
        ? values.phone.code + values.phone.number
        : "";
    data.append("phone", fullPhone);

    try {
      await UpdateAccount(data).unwrap();
      toast.success(t("UpdateSuccess"));
    } catch (error) {
      console.log(error);
      toast.error(t("UpdateError"));
    }
  }

  return (
    <div className="max-w-3xl mx-auto mb-6 bg-card/30 drop-shadow-md shadow-lg rounded-xl px-8 md:px-20 py-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Header */}
          <div className="text-center mb-8">
            {/* Profile Picture */}
            <EditableAvatar
              control={form.control}
              initialImage={userInfo?.image}
            />

            {/* Name under picture */}
            <p className="text-2xl text-gray-700 font-medium">
              {userInfo?.name}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 items-center">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <CustomFormField
                  type="text"
                  field={field}
                  label={t("UserNameLabel")}
                  placeholder={t("UserNamePlaceholder")}
                  icon={<Edit3 className="w-4 h-4" />}
                  className="h-11"
                />
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <CustomPhoneInput
                  field={{
                    value: field.value,
                    onChange: field.onChange,
                    onBlur: field.onBlur,
                    name: field.name,
                  }}
                  label={t("PhoneLabel")}
                  placeholder={t("PhonePlaceholder")}
                />
              )}
            />
          </div>

          <Button
            size="lg"
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? <LoaderSpin type="Btn" size="sm" /> : t("UpdateBtn")}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AccountForm;
