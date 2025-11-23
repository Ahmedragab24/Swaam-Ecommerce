import { ProductDetailsType } from "@/store/services/Products";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getProductDetails(productId: number) {
  try {
    const res = await fetch(`${API_BASE_URL}/products/${productId}`, {
      cache: "force-cache",
    });

    if (!res.ok) throw new Error("فشل في جلب البيانات");

    const data: ProductDetailsType = await res.json();
    return data;
  } catch (error) {
    console.error("خطأ أثناء جلب المنتجات:", error);
    return null;
  }
}
