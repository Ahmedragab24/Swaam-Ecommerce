export type MembershipType = "user" | "provider";

export interface RegisterType {
  name?: string;
  phone?: string;
  code?: string;
  password?: string;
  email?: string;
  type?: MembershipType;
  country_id?: number;
  fcm?: string;
  device_id?: string;
}
export interface SocialRegisterType {
  name?: string;
  phone?: string;
  email?: string;
  login_type: "google" | "apple" | "facebook" | "normal";
  fcm?: string;
  device_id?: string;
}

export interface LoginType {
  phone: string;
  password: string;
}

export interface VerifyOtpType {
  phone: string;
  otp: string;
}
export interface ResendOtpType {
  phone: string;
}
export interface ForgetPasswordType {
  phone: string;
}
export interface ResetPasswordType {
  new_password: string;
  new_password_confirmation: string;
}
export interface ChangePasswordType {
  current_password: string;
  new_password: string;
  new_password_confirmation: string;
}
