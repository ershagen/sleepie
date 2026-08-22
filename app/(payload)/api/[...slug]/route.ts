import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ error: "Payload API not enabled yet" }, { status: 503 });
}

export async function POST() {
  return NextResponse.json({ error: "Payload API not enabled yet" }, { status: 503 });
}
