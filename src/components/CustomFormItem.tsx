"use client";

import { useState, type HTMLInputTypeAttribute } from "react";
import { Eye, EyeOff } from "lucide-react";
import { FormControl, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

interface CustomFormItemProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: any;
  className?: string;
  label?: string;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  typeInput?: "text" | "textarea";
  icon?: React.ReactNode;
}

const CustomFormItem = ({
  field,
  label,
  className,
  placeholder,
  type,
  typeInput = "text",
  icon,
}: CustomFormItemProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const isPasswordType = type === "password";

  return (
    <FormItem>
      {label && <FormLabel>{label}</FormLabel>}
      <FormControl>
        {typeInput === "text" ? (
          <div className="relative">
            <Input
              type={isPasswordType && showPassword ? "text" : type}
              placeholder={placeholder}
              {...field}
              className={`${className} ${icon ? "pr-10" : ""}`}
            />
            {isPasswordType && (
              <div
                className="absolute left-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <Eye className="h-4 w-4" aria-hidden="true" />
                )}
                <span className="sr-only">
                  {showPassword ? "Hide password" : "Show password"}
                </span>
              </div>
            )}

            {icon && (
              <div className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400">
                {icon}
              </div>
            )}
          </div>
        ) : (
          <Textarea
            placeholder={placeholder}
            {...field}
            className={`${className}`}
          />
        )}
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

export default CustomFormItem;
