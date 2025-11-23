export type TypeNotificationType =
  | "admin"
  | "chat"
  | "auction_follow"
  | "auction_created"
  | "auction_new_public"
  | "asset_created"
  | "project_created"
  | "project_new_public"
  | "ad_created"
  | "realEstate_new_public"
  | "realEstate_created";

export interface NotificationType {
  id: string;
  type: string;
  notifiable_type: string;
  notifiable_id: number;
  data: {
    message_ar: string;
    title_ar: string;
    message_en: string;
    title_en: string;
    user_id: number;
    user_name: string;
    key: TypeNotificationType;
    keyId: string;
  };
  read_at: string | null;
  created_at: string;
  updated_at: string;
}
