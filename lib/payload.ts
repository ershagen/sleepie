import { getPayload, type Payload } from "payload";
import config from "@payload-config";

let cached: Payload | null = null;

/** Shared Payload client for server routes & RSC */
export async function getPayloadClient(): Promise<Payload> {
  if (cached) return cached;
  cached = await getPayload({ config });
  return cached;
}

export function payloadConfigured() {
  return Boolean(process.env.DATABASE_URI && process.env.PAYLOAD_SECRET);
}
