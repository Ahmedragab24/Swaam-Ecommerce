import { MembershipType } from ".";
import { CityType, CountryType } from "../Country";
import { PackageType } from "../Package";

export interface UserInfoType {
  id: number;
  name: string;
  email: string;
  phone: string;
  code: string;
  status: number;
  type: MembershipType;
  image: string | null;
  package_id: string | null;
  number_of_auctions: number;
  number_of_products: number;
  email_verified_at: string;
  fcm: string;
  device_id: string;
  country: CountryType;
  city: CityType;
  package: PackageType;
}

export interface ProfileResponseType {
  message: string;
  status_code: number;
  data: { user: UserInfoType };
}

export interface UserPackageResponseType {
  data: {
    is_subscribed: boolean;
    user: UserInfoType;
    currentProducts: number;
    currentAuctions: number;
    remainingProducts: number;
    remainingAuctions: number;
    package: PackageType;
  };
  message: string;
  status_code: number;
}
