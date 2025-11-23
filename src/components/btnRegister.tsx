"use client";

import { useState } from "react";
import LoginForm from "./loginForm";
import Model from "./model";
import RegisterForm from "./registerForm";
import ForgetPasswordForm from "./forgetPasswordForm";
import { useTranslations } from "next-intl";
import OtpForm from "./OtpForm";
import RestPasswordForm from "./RestPasswordForm";

export type TypeRegisterModel =
  | "login"
  | "register"
  | "forgetPassword"
  | "otp"
  | "restPassword";

const BtnRegister = () => {
  const [variant, setVariant] = useState<TypeRegisterModel>("login");
  const [phone, setPhone] = useState("");
  const [open, setOpen] = useState(false);
  const t = useTranslations("Models");

  return (
    <Model
      open={open}
      setOpen={setOpen}
      ModelContentStyle={
        variant === "login"
          ? "!max-w-[400px]"
          : variant === "register"
          ? "!max-w-[520px]"
          : "!max-w-[320px] p-8"
      }
      BtnTitle={t("Register.BtnTitle")}
      // BtnStyle="text-white hover:text-primary cursor-pointer"
      BtnVariant="default"
      ModelTitle={
        variant === "login"
          ? t("Register.LoginModelTitle")
          : variant === "register"
          ? t("Register.RegisterModelTitle")
          : t("Register.ForgetModelTitle")
      }
      ModelDescription={
        variant === "login"
          ? t("Register.LoginModelDescription")
          : variant === "register"
          ? t("Register.RegisterModelDescription")
          : t("Register.ForgetModelDescription")
      }
    >
      {variant === "login" && (
        <LoginForm
          switchToLogin={setVariant}
          switchToForgetPassword={() => setVariant("forgetPassword")}
        />
      )}
      {variant === "register" && (
        <RegisterForm switchToLogin={setVariant} setPhone={setPhone} />
      )}
      {variant === "forgetPassword" && (
        <ForgetPasswordForm switchToLogin={setVariant} />
      )}
      {variant === "otp" && <OtpForm phone={phone} setOpen={setOpen} />}
      {variant === "restPassword" && (
        <RestPasswordForm switchToLogin={setVariant} />
      )}
    </Model>
  );
};

export default BtnRegister;
