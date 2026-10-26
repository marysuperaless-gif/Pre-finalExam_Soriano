// Small helper functions used by many components.

export const formatPrice = (value: number): string => `$${value.toFixed(2)}`;

// Builds a simple colored picture (an SVG) with the product name on it.
// This keeps the sample data free of external image links that could break.
export function makeImage(name: string, color: string): string {
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400">` +
    `<rect width="400" height="400" fill="${color}"/>` +
    `<circle cx="200" cy="170" r="80" fill="#ffffff" fill-opacity="0.55"/>` +
    `<text x="200" y="320" font-family="Arial" font-size="26" font-weight="bold" ` +
    `fill="#333" text-anchor="middle">${name}</text></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}
