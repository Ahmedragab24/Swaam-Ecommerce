import { HomeResponse } from "@/store/services/Home";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getHome() {
  try {
    const res = await fetch(`${API_BASE_URL}/home`, {
      cache: "force-cache",
    });

    if (!res.ok) throw new Error("فشل في جلب البيانات");

    const data: HomeResponse = await res.json();
    return data;
  } catch (error) {
    console.error("خطأ أثناء جلب المنتجات:", error);
    return null;
  }
}
