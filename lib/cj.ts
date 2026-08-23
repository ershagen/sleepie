/**
 * CJDropshipping API client (API 2.0)
 * Docs: https://developers.cjdropshipping.com/en/api/api2/
 */

const CJ_BASE = "https://developers.cjdropshipping.com/api2.0/v1";

type TokenCache = {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
};

let tokenCache: TokenCache | null = null;

function getApiKey(): string {
  const full =
    process.env.CJ_API_CREDENTIALS || process.env.CJ_API_KEY || "";
  if (!full) {
    throw new Error("CJ_API_KEY / CJ_API_CREDENTIALS saknas");
  }
  return full;
}

export async function getAccessToken(): Promise<string> {
  if (tokenCache && tokenCache.expiresAt > Date.now() + 60_000) {
    return tokenCache.accessToken;
  }

  const res = await fetch(`${CJ_BASE}/authentication/getAccessToken`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ apiKey: getApiKey() }),
  });

  const data = await res.json();
  if (!data?.success && data?.code !== 200) {
    throw new Error(data?.message || "CJ getAccessToken failed");
  }

  const accessToken = data.data.accessToken as string;
  const refreshToken = data.data.refreshToken as string;
  tokenCache = {
    accessToken,
    refreshToken,
    expiresAt: Date.now() + 14 * 24 * 60 * 60 * 1000,
  };

  return accessToken;
}

async function cjFetch<T = unknown>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = await getAccessToken();
  const res = await fetch(`${CJ_BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "CJ-Access-Token": token,
      ...(options.headers || {}),
    },
  });

  const data = await res.json();
  if (!res.ok || (data.code && data.code !== 200)) {
    throw new Error(
      data?.message || `CJ API error ${res.status} on ${path}`
    );
  }
  return data as T;
}

export type CjProduct = {
  pid?: string;
  productName?: string;
  productNameEn?: string;
  productImage?: string;
  sellPrice?: number;
  productSku?: string;
};

export async function searchProducts(params: {
  productNameEn?: string;
  page?: number;
  size?: number;
}) {
  const qs = new URLSearchParams();
  if (params.productNameEn) qs.set("productNameEn", params.productNameEn);
  qs.set("page", String(params.page ?? 1));
  qs.set("size", String(params.size ?? 20));

  return cjFetch<{ data?: { list?: CjProduct[]; total?: number } }>(
    `/product/list?${qs.toString()}`,
    { method: "GET" }
  );
}

export async function queryProduct(pid: string) {
  return cjFetch(`/product/query?pid=${encodeURIComponent(pid)}`, {
    method: "GET",
  });
}

export async function queryVariants(pid: string) {
  return cjFetch(`/product/variant/query?pid=${encodeURIComponent(pid)}`, {
    method: "GET",
  });
}

export type CreateOrderInput = {
  orderNumber: string;
  shippingZip: string;
  shippingCountryCode: string;
  shippingCountry: string;
  shippingProvince?: string;
  shippingCity: string;
  shippingCounty?: string;
  shippingPhone: string;
  shippingCustomer: string;
  shippingAddress: string;
  shippingAddress2?: string;
  email?: string;
  products: Array<{ vid: string; quantity: number }>;
  isSandbox?: 0 | 1;
  logisticName?: string;
  fromCountryCode?: string;
};

export type CreateOrderResult = {
  orderId: string | null;
  orderNum: string | null;
  cjOrderId: string | null;
  raw: unknown;
  endpoint: string;
};

/** Pick cheapest logistic name for destination */
export async function pickLogisticName(input: {
  endCountryCode: string;
  products: Array<{ vid: string; quantity: number }>;
  preferred?: string;
}): Promise<string | null> {
  if (input.preferred) return input.preferred;
  try {
    const res = await freightCalculate({
      endCountryCode: input.endCountryCode,
      products: input.products,
    });
    const options = normalizeFreightOptions(res?.data);
    return options[0]?.logisticName || null;
  } catch (e) {
    console.error("[cj:pickLogistic]", e);
    return null;
  }
}

/**
 * Create CJ order.
 * Uses createOrder (v1) which works for SE without IOSS.
 * Optionally tries V2 when CJ_IOSS_NUMBER is set.
 */
export async function createOrder(
  input: CreateOrderInput
): Promise<CreateOrderResult> {
  const logisticName =
    input.logisticName ||
    (await pickLogisticName({
      endCountryCode: input.shippingCountryCode,
      products: input.products,
    })) ||
    undefined;

  const baseBody: Record<string, unknown> = {
    orderNumber: input.orderNumber,
    fromCountryCode: input.fromCountryCode || "CN",
    shippingZip: input.shippingZip,
    shippingCountryCode: input.shippingCountryCode,
    shippingCountry: input.shippingCountry,
    shippingProvince: input.shippingProvince || input.shippingCity,
    shippingCity: input.shippingCity,
    shippingCounty: input.shippingCounty || "",
    shippingPhone: input.shippingPhone,
    shippingCustomer: input.shippingCustomer,
    shippingCustomerName: input.shippingCustomer,
    shippingAddress: input.shippingAddress,
    shippingAddress2: input.shippingAddress2 || "",
    products: input.products.map((p) => ({
      vid: p.vid,
      quantity: p.quantity,
    })),
    isSandbox: input.isSandbox ?? 0,
  };

  if (logisticName) baseBody.logisticName = logisticName;
  if (input.email) {
    baseBody.email = input.email;
    baseBody.customerEmail = input.email;
  }

  const ioss = process.env.CJ_IOSS_NUMBER;
  if (ioss) {
    baseBody.iossNumber = ioss;
    baseBody.ioss = ioss;
  }

  // Prefer v1 for EU without IOSS (V2 hard-requires IOSS for SE)
  const useV2 = Boolean(ioss);
  const path = useV2
    ? `/shopping/order/createOrderV2`
    : `/shopping/order/createOrder`;

  const res = await cjFetch<{ data?: unknown; message?: string }>(path, {
    method: "POST",
    body: JSON.stringify(baseBody),
  });

  const data = res?.data;
  let orderId: string | null = null;
  let orderNum: string | null = null;
  let cjOrderId: string | null = null;

  if (typeof data === "string") {
    // v1 often returns orderNumber as string
    orderNum = data;
  } else if (data && typeof data === "object") {
    const d = data as Record<string, unknown>;
    orderId = (d.orderId as string) || null;
    orderNum = (d.orderNum as string) || (d.orderNumber as string) || null;
    cjOrderId = (d.cjOrderId as string) || null;
  }

  // If v1 only returned orderNum, resolve orderId via list/detail
  if (!orderId && orderNum) {
    try {
      const detail = await getOrderDetail(orderNum);
      const d = (detail as { data?: Record<string, unknown> })?.data;
      if (d) {
        orderId = (d.orderId as string) || orderId;
        cjOrderId = (d.cjOrderId as string) || cjOrderId;
        orderNum = (d.orderNum as string) || orderNum;
      }
    } catch {
      // ignore
    }
  }

  return {
    orderId,
    orderNum,
    cjOrderId: cjOrderId || orderId,
    raw: data,
    endpoint: path,
  };
}

export async function getOrderDetail(orderId: string) {
  return cjFetch(
    `/shopping/order/getOrderDetail?orderId=${encodeURIComponent(orderId)}`,
    { method: "GET" }
  );
}

export async function listOrders(pageNum = 1, pageSize = 20) {
  return cjFetch<{ data?: { total?: number; list?: unknown[] } }>(
    `/shopping/order/list?pageNum=${pageNum}&pageSize=${pageSize}`,
    { method: "GET" }
  );
}

/** Cancel CJ order before shipment */
export async function deleteOrder(orderId: string) {
  return cjFetch<{ data?: string; message?: string }>(
    `/shopping/order/deleteOrder?orderId=${encodeURIComponent(orderId)}`,
    { method: "DELETE" }
  );
}

export async function getBalance() {
  return cjFetch<{ data?: { amount?: number } }>(`/shopping/pay/getBalance`, {
    method: "GET",
  });
}

/** Pay CJ order from account balance (required for live fulfill) */
export async function payBalance(orderId: string) {
  return cjFetch(`/shopping/pay/payBalance`, {
    method: "POST",
    body: JSON.stringify({ orderId }),
  });
}

export type FreightProduct = { vid: string; quantity: number };

export type FreightOption = {
  logisticName?: string;
  logisticPrice?: number;
  logisticAging?: string;
  [key: string]: unknown;
};

export async function freightCalculate(input: {
  startCountryCode?: string;
  endCountryCode: string;
  products: FreightProduct[];
}) {
  return cjFetch<{ data?: FreightOption[] | FreightOption }>(
    `/logistic/freightCalculate`,
    {
      method: "POST",
      body: JSON.stringify({
        startCountryCode: input.startCountryCode || "CN",
        endCountryCode: input.endCountryCode,
        products: input.products,
      }),
    }
  );
}

export type TrackInfo = {
  trackingNumber?: string;
  logisticName?: string;
  trackingFrom?: string;
  trackingTo?: string;
  deliveryDay?: string;
  deliveryTime?: string;
  trackingStatus?: string;
  lastMileCarrier?: string;
  lastTrackNumber?: string;
};

export async function trackInfo(trackNumber: string) {
  return cjFetch<{ data?: TrackInfo[] }>(
    `/logistic/trackInfo?trackNumber=${encodeURIComponent(trackNumber)}`,
    { method: "GET" }
  );
}

export function normalizeFreightOptions(data: unknown): FreightOption[] {
  if (!data) return [];
  const list = Array.isArray(data) ? data : [data];
  return list
    .filter(Boolean)
    .sort(
      (a, b) =>
        Number(a.logisticPrice ?? a.postage ?? 999) -
        Number(b.logisticPrice ?? b.postage ?? 999)
    );
}
