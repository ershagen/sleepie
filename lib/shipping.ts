import { FREE_SHIPPING_THRESHOLD } from "./products";

/** Standardfrakt SE (kr) under tröskel */
export const STANDARD_SHIPPING_SEK = 49;

export function calcShipping(subtotal: number): number {
  if (subtotal <= 0) return 0;
  if (subtotal >= FREE_SHIPPING_THRESHOLD) return 0;
  return STANDARD_SHIPPING_SEK;
}

export function calcOrderTotal(subtotal: number): {
  subtotal: number;
  shipping: number;
  total: number;
  freeShipping: boolean;
  remainingToFree: number;
} {
  const shipping = calcShipping(subtotal);
  return {
    subtotal,
    shipping,
    total: subtotal + shipping,
    freeShipping: shipping === 0 && subtotal > 0,
    remainingToFree: Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal),
  };
}
