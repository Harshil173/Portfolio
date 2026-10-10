/**
 * Format a number with commas: 49191 → "49,191"
 */
export function formatNumber(n: number): string {
  return n.toLocaleString('en-IN');
}

/**
 * Format INR in Crores: 107 → "₹107 Cr"
 */
export function formatCrores(n: number): string {
  return `₹${n.toFixed(0)} Cr`;
}

/**
 * Format INR: 2490 → "₹2,490"
 */
export function formatINR(n: number): string {
  return `₹${n.toLocaleString('en-IN')}`;
}

/**
 * Format percentage: 44 → "44%"
 */
export function formatPercent(n: number): string {
  return `${n.toFixed(1)}%`;
}

/**
 * Format a ratio: 2.72 → "2.72×"
 */
export function formatRatio(n: number): string {
  return `${n.toFixed(2)}×`;
}

/**
 * Format large numbers compactly: 1070000000 → "₹107 Cr"
 */
export function formatRevenueAsCr(n: number): string {
  const crores = n / 10000000;
  if (crores >= 100) {
    return `₹${crores.toFixed(0)} Cr`;
  }
  return `₹${crores.toFixed(1)} Cr`;
}
