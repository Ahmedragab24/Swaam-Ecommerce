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
import { optionsType } from "@/types";
import { useTranslations } from "next-intl";

interface CustomGenderFieldProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  label: string;
  name: string;
  options: optionsType[];
}

const CustomProductStateField = ({
  control,
  label,
  name,
  options,
}: CustomGenderFieldProps) => {
  const t = useTranslations("StateProductOptions");
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="block w-full text-gray-700">{label}</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex rtl:justify-end gap-6"
            >
              {options.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center space-x-2 space-x-reverse border border-primary p-2 rounded-md"
                >
                  <Label htmlFor={item.id} className="ml-2">
                    {t(item.label)}
                  </Label>
                  <RadioGroupItem value={item.value} id={item.id} />
                </div>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage className="text-right" />
        </FormItem>
      )}
    />
  );
};

export default CustomProductStateField;
