"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { setAuthTokenClient } from "@/lib/auth/auth-client";
import {
  useResendOtpMutation,
  useVerifyOtpMutation,
} from "@/store/services/Auth/Auth";
import { toast } from "sonner";
import { ErrorType } from "@/types";
import { Form, FormField, FormItem, FormMessage } from "./ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "./ui/input-otp";
import { Button } from "./ui/button";
import { VerifyOtpType } from "@/types/Auth";
import { useTranslations } from "next-intl";

interface Props {
  phone: string;
  setOpen?: (value: boolean) => void;
}

const INITIAL_TIMER_SECONDS = 20;

export default function OtpForm({ phone, setOpen }: Props) {
  const t = useTranslations("Form");

  const OtpFormSchema = z.object({
    code: z.string().min(4, t("Otp.CodeRequired")),
  });

  const [verifyOtp, { isLoading: isVerifyingOtp }] = useVerifyOtpMutation();
  const [resendOtp, { isLoading: isResendingOtp }] = useResendOtpMutation();

  const [resendTimer, setResendTimer] = useState(INITIAL_TIMER_SECONDS);
  const [canResend, setCanResend] = useState(false);
  const isSubmittingRef = useRef(false);

  const form = useForm<z.infer<typeof OtpFormSchema>>({
    resolver: zodResolver(OtpFormSchema),
    defaultValues: { code: "" },
  });

  // Timer countdown effect
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => {
        setResendTimer((prev) => {
          const newValue = prev - 1;
          if (newValue === 0) {
            setCanResend(true);
          }
          return newValue;
        });
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  // Format time display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Reset timer
  const resetTimer = useCallback(() => {
    setResendTimer(INITIAL_TIMER_SECONDS);
    setCanResend(false);
  }, []);

  // Handle resend code
  const handleResendCode = async () => {
    if (!canResend || isResendingOtp) return;

    try {
      await resendOtp(phone).unwrap();
      toast.success(t("Otp.ResendSuccess"));
      resetTimer();
      form.reset({ code: "" });
    } catch (error) {
      console.error("Error resending code:", error);
      const err = error as ErrorType;
      const errorMessage = err.data?.message || t("Otp.ResendError");
      toast.error(errorMessage);
    }
  };

  // Handle code verification
  async function onSendCode(values: z.infer<typeof OtpFormSchema>) {
    if (isVerifyingOtp || isSubmittingRef.current) return;
    isSubmittingRef.current = true;

    const data: VerifyOtpType = {
      phone: phone,
      otp: values.code,
    };

    try {
      const res = await verifyOtp(data).unwrap();
      toast.success(t("LoginSuccess"));
      setAuthTokenClient(res?.token || "");
      setOpen?.(false);
      setTimeout(() => window.location.reload(), 800);
    } catch (error) {
      const err = error as ErrorType;
      const firstError = err.data?.message || t("Otp.UnexpectedError");
      toast.error(firstError);
      form.reset({ code: "" });
    } finally {
      isSubmittingRef.current = false;
    }
  }

  // Auto-submit when code is complete
  const handleCodeChange = (value: string) => {
    form.setValue("code", value, { shouldValidate: true });
    if (value.length === 4 && !isVerifyingOtp && !isSubmittingRef.current) {
      setTimeout(() => {
        form.handleSubmit(onSendCode)();
      }, 300);
    }
  };

  return (
    <div className="max-w-md mx-auto text-center">
      <h2 className="text-lg font-semibold mb-2">{t("Otp.Title")}</h2>
      <div className="flex flex-col justify-center items-center mb-4">
        <p className="text-muted-foreground text-sm">{t("Otp.Description")}</p>
        <span className="text-primary font-semibold">{phone}</span>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSendCode)} className="space-y-4">
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem className="space-y-4">
                <div className="flex justify-center">
                  <InputOTP
                    maxLength={4}
                    pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                    value={field.value}
                    onChange={handleCodeChange}
                    disabled={isVerifyingOtp}
                  >
                    <InputOTPGroup className="gap-3" dir="ltr">
                      <InputOTPSlot
                        index={0}
                        className="w-14 h-14 text-lg rounded-md border"
                      />
                      <InputOTPSlot
                        index={1}
                        className="w-14 h-14 text-lg rounded-md border"
                      />
                      <InputOTPSlot
                        index={2}
                        className="w-14 h-14 text-lg rounded-md border"
                      />
                      <InputOTPSlot
                        index={3}
                        className="w-14 h-14 text-lg rounded-md border"
                      />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full h-11"
            disabled={isVerifyingOtp}
          >
            {isVerifyingOtp ? t("Loading") : t("Submit")}
          </Button>
        </form>
      </Form>
      <div className="mt-4 text-sm text-muted-foreground">
        {canResend ? (
          <Button
            variant="link"
            className="text-primary underline"
            onClick={handleResendCode}
            disabled={isResendingOtp}
          >
            {isResendingOtp ? t("Loading") : t("Otp.ResendBtn")}
          </Button>
        ) : (
          <span>
            {t("Otp.NoCode")} {formatTime(resendTimer)}
          </span>
        )}
      </div>
    </div>
  );
}
