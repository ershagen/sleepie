import { NextResponse } from "next/server";
export async function GET() {
  return NextResponse.json({ error: "not enabled" }, { status: 503 });
}
