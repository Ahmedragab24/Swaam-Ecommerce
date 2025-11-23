// app/[...missing]/page.tsx
import { notFound } from "next/navigation";

export default function CatchAllPage() {
  notFound();
}
