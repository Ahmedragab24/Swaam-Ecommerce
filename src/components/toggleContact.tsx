import { Phone, MessageCircle } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Control } from "react-hook-form";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import Image from "next/image";

interface ToggleContactProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  name: string;
  label: string;
}

export function ToggleContact({ control, label, name }: ToggleContactProps) {
  const t = useTranslations("ContactOptions");
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const hasError =
          !!fieldState.error && (!field.value || field.value.length === 0);
        return (
          <FormItem>
            <FormLabel className="block text-gray-700 mb-2">{label}</FormLabel>
            <ToggleGroup
              variant="default"
              type="multiple"
              value={field.value || []}
              onValueChange={field.onChange}
              className="flex gap-2 md:gap-3"
            >
              <StyledContactToggle
                value="whatsapp"
                selected={field.value?.includes("whatsapp")}
                hasError={hasError}
              >
                <Image src="/Icons/whatsapp.svg" alt="whatsapp" width={20} height={20} className="w-5 h-5" />
                <span className="text-xs md:text-sm">{t("whatsapp")}</span>
              </StyledContactToggle>

              <StyledContactToggle
                value="message"
                selected={field.value?.includes("message")}
                hasError={hasError}
              >
                <MessageCircle className="w-4 h-4" />
                <span className="text-xs md:text-sm">
                  {t("ContactMessage")}
                </span>
              </StyledContactToggle>

              <StyledContactToggle
                value="call"
                selected={field.value?.includes("call")}
                hasError={hasError}
              >
                <Phone className="w-4 h-4" />
                <span className="text-xs md:text-sm">{t("ContactCall")}</span>
              </StyledContactToggle>


            </ToggleGroup>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}

function StyledContactToggle({
  value,
  children,
  selected,
  hasError,
}: {
  value: string;
  children: React.ReactNode;
  selected?: boolean;
  hasError?: boolean;
}) {
  return (
    <ToggleGroupItem
      value={value}
      aria-label={value}
      className={clsx(
        "flex items-center bg-white justify-center hover:bg-card gap-2 md:px-6 py-2 border rounded-full text-sm rtl:flex-row-reverse cursor-pointer md:h-12 min-w-[100px] aspect-[2/1]",
        "border-sky-600 text-sky-700",
        selected && "!bg-card border-sky-700",
        hasError && "border-red-600 !text-red-600"
      )}
    >
      {children}
    </ToggleGroupItem>
  );
}
