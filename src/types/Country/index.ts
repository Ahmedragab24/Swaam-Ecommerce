export interface CountryType {
  id: number;
  name_ar: string;
  name_en: string;
  code: string;
  symbol_ar: string;
  symbol_en: string;
  image?: string;
  latitude?: number;
  longitude?: number;
  status?: boolean;
  exchange_rate?: string;
  country_tax?: string;
  created_at?: string | null;
  updated_at?: string | null;
}
export interface CityType {
  id: number;
  name_ar: string;
  name_en: string;
  country_id: number;
}
