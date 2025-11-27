import { CityType } from "../Country";

export interface AdsType {
  id: number;
  title: string;
  status: string;
  phone_number: string;
  whatsapp_number: string;
  expires_at: string;
  image: string;
  city_id: number;
  user_id: number;
  created_at: string;
  updated_at: string;
  city: CityType;
}

export interface AdsResponse {
  data: AdsType[];
  message: string;
  status_code: number;
}
