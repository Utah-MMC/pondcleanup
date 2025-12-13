/**
 * Default shipping configuration for Pond Cleanup store
 * Delivery times are in business days (excluding weekends and holidays)
 */

export interface ShippingOption {
  country: string;
  days: string; // e.g., "7-13 business days"
}

export const DEFAULT_SHIPPING_OPTIONS: ShippingOption[] = [
  { country: 'France', days: '7-13 business days' },
  { country: 'Spain', days: '13-19 business days' },
  { country: 'United States', days: '8-16 business days' },
  { country: 'Canada', days: '9-16 business days' },
];

/**
 * Get shipping options for display
 * Returns the default shipping template
 */
export function getShippingOptions(): ShippingOption[] {
  return DEFAULT_SHIPPING_OPTIONS;
}

