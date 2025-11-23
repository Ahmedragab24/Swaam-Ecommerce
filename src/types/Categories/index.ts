export interface CategoryType {
  id: number;
  name: string;
  name_en: string;
  image: string;
}

export interface SubCategoryType {
  id: number;
  name: string;
  name_en: string;
  image: string;
  category_id: number;
  status: number;
  created_at: string;
  updated_at: string;
}
