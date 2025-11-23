import { Control } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { useTranslations } from "next-intl";

interface CustomGenderFieldProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
}

const CustomGenderField = ({ control }: CustomGenderFieldProps) => {
  const t = useTranslations("Form");

  return (
    <FormField
      control={control}
      name="gender"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="block w-full text-gray-700">
            {t("GenderLabel")}
          </FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex rtl:justify-end gap-6"
            >
              <div className="flex items-center space-x-2 space-x-reverse border border-muted p-2 rounded-md">
                <Label htmlFor="female" className="ml-2">
                  {t("RadioWoman")}
                </Label>
                <RadioGroupItem value="female" id="female" />
              </div>
              <div className="flex items-center space-x-2 space-x-reverse border border-muted p-2 rounded-md">
                <Label htmlFor="male" className="ml-2">
                  {t("RadioMan")}
                </Label>
                <RadioGroupItem value="male" id="male" />
              </div>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CustomGenderField;
