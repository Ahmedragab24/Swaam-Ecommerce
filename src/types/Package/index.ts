export interface PackageType {
  id: number;
  name: string;
  description: string;
  dscription?: string;
  max_products?: number;
  max_auctions?: number;
  price: string | number;
  created_at?: string;
  updated_at?: string;
  isSpacial?: boolean;
  offerPrice?: number;
}
