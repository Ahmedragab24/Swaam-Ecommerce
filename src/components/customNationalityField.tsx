import { Control } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Nationality } from "@/constants";
import { useTranslations } from "next-intl";

interface CustomNationalityFieldProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  className?: string;
}

const CustomNationalityField = ({
  control,
  className,
}: CustomNationalityFieldProps) => {
  const t = useTranslations("Form");

  return (
    <FormField
      control={control}
      name="nationality"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="rtl:text-right block text-gray-700">
            {t("NationalityLabel")}
          </FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className={`rtl:text-right w-full ${className}`}>
                <SelectValue placeholder={t("NationalityPlaceholder")} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {Nationality.map(({ label, value }) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage className="rtl:text-right" />
        </FormItem>
      )}
    />
  );
};

export default CustomNationalityField;
