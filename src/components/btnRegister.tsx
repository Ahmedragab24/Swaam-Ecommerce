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
          : variant === "otp"
          ? "!max-w-[400px] p-8"
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
          : variant === "forgetPassword"
          ? t("Register.ForgetModelTitle")
          : variant === "otp"
          ? ""
          : variant === "restPassword"
          ? ""
          : ""
      }
      ModelDescription={
        variant === "login"
          ? t("Register.LoginModelDescription")
          : variant === "register"
          ? t("Register.RegisterModelDescription")
          : variant === "forgetPassword"
          ? t("Register.ForgetModelDescription")
          : variant === "otp"
          ? ""
          : variant === "restPassword"
          ? ""
          : ""
      }
    >
      {variant === "login" && (
        <LoginForm
          setPhone={setPhone}
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
