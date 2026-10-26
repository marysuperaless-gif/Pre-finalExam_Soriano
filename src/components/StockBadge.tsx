// Conditional formatting: badge text depends on the available quantity.
export default function StockBadge({ quantity }: { quantity: number }) {
  if (quantity === 0) return <span className="badge out">Out of Stock</span>;
  if (quantity < 5) return <span className="badge low">Low Stock</span>;
  return null; 
}
