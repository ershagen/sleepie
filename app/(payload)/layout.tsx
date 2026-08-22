import { redirect } from "next/navigation";

// Payload admin temporarily disabled until DATABASE_URI + PAYLOAD_SECRET are set on Vercel
export default function PayloadLayout() {
  redirect("/");
}
