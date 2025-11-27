import { UserPackageResponseType } from "@/types/Auth/Profile";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getUserInfo() {
  try {
    const res = await fetch(`${API_BASE_URL}/profile`, {
      cache: "force-cache",
    });

    if (!res.ok) throw new Error("فشل في جلب البيانات");

    const data: UserPackageResponseType = await res.json();
    return data;
  } catch (error) {
    console.error("خطأ أثناء جلب المنتجات:", error);
    return null;
  }
}
