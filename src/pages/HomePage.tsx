import { useState } from "react";
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";
import { CATEGORIES, Product } from "../types";
import { formatPrice } from "../utils";

interface Props {
  products: Product[];
  search: string;
  overallTotal: number;
  onChangeStock: (id: number, change: number) => void;
  onAddToCart: (id: number, qty: number) => void;
}

export default function HomePage({ products, search, overallTotal, onChangeStock, onAddToCart }: Props) {
  // "All" means no category filter.
  const [category, setCategory] = useState<string>("All");

  // Filter by category AND by the search text from the header.
  const visible = products.filter(
    (p) =>
      (category === "All" || p.category === category) &&
      p.name.toLowerCase().includes(search.trim().toLowerCase())
  );
  const featured = [...products].sort((a, b) => b.rating - a.rating).slice(0, 4);
  const lowStockCount = products.filter((p) => p.quantity < 5).length;

  return (
    <div className="layout">
      <aside className="sidebar" aria-label="Filters and totals">
        <h2>Categories</h2>
        <div className="filters" role="group" aria-label="Filter by category">
          {["All", ...CATEGORIES].map((c) => (
            <button key={c} className={category === c ? "chip active" : "chip"}
              aria-pressed={category === c} onClick={() => setCategory(c)}>{c}</button>
          ))}
        </div>
        <h2>Inventory Total</h2>
        <p className="big">{formatPrice(overallTotal)}</p>
        <p className="muted">Sum of price x quantity for all {products.length} products (not the cart).</p>
        {lowStockCount > 0 && <p className="low-note">{lowStockCount} product(s) low on stock</p>}
      </aside>

      <section className="main">
        <Hero />
        <div className="promos">
          <div className="promo"><span>BEST OFFER</span><strong>MAKEUP</strong></div>
          <div className="promo dark"><strong>PROMO CODE : 045</strong><span>Register your email for special offers</span></div>
          <div className="promo"><span>BUY 1 &amp; GET 1 FREE</span><strong>CLOTHING</strong></div>
        </div>

        <h2 className="section-title">Featured Products</h2>
        <div className="grid">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} onChangeStock={onChangeStock} onAddToCart={onAddToCart} />
          ))}
        </div>

        <h2 className="section-title">Product List ({visible.length})</h2>
        {/* Conditional rendering: empty state or the grid */}
        {visible.length === 0 ? (
          <p className="empty">No products match your filter. Try another category or search.</p>
        ) : (
          <div className="grid">
            {visible.map((p) => (
              <ProductCard key={p.id} product={p} onChangeStock={onChangeStock} onAddToCart={onAddToCart} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
