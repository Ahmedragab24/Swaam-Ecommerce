export type ProductConditionType = "new" | "used";
export type TypeProductType = "product" | "auction";
export type SortByType =
  | "latest"
  | "price_asc"
  | "price_desc"
  | "oldest"
  | "views"
  | "auction_ending";

export interface ProductType {
  id: number;
  name: string;
  description: string;
  images: string[];
  main_image: string;
  type: TypeProductType;
  condition: ProductConditionType;
  price: string;
  is_auction: boolean;
  communication_methods: string[];
  notes: string;
  is_active: boolean;
  is_featured: boolean;
  views_count: number;
  created_at: string;
  updated_at: string;
  user: {
    id: number;
    name: string;
    email: string;
    image: string;
    phone: string;
  };
  category: {
    id: number;
    name: string;
    name_en: string;
    image: string;
  };
  sub_category: {
    id: number;
    name: string;
    name_en: string;
    image: string;
  };
  city: {
    id: number;
    name_ar: string;
    name_en: string;
    name: string;
  };
  is_owner: boolean;
  display_price: string;
}
