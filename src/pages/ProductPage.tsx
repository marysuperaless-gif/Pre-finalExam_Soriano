import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import ProductImage from "../components/ProductImage";
import StockBadge from "../components/StockBadge";
import { Product } from "../types";
import { formatPrice } from "../utils";

interface Props {
  products: Product[];
  onAddToCart: (id: number, qty: number) => void;
}

// Dedicated detail page. The id comes from the URL: /product/:id
export default function ProductPage({ products, onAddToCart }: Props) {
  const { id } = useParams();
  const [qty, setQty] = useState(1); // how many the shopper wants
  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="page">
        <p className="empty">Product not found.</p>
        <Link to="/" className="btn">Back to products</Link>
      </div>
    );
  }

  const specs = product.specifications.split(",").map((s) => s.trim()).filter(Boolean);
  const maxQty = Math.max(product.quantity, 1);
  const chosen = Math.min(qty, maxQty);

  return (
    <div className="page detail">
      <Link to="/" className="back">&larr; Back to products</Link>
      <div className="detail-grid">
        <div className="detail-image">
          <ProductImage src={product.image} alt={product.name} />
        </div>
        <div>
          <p className="muted">{product.category}</p>
          <h1>{product.name} <StockBadge quantity={product.quantity} /></h1>
          <p className="rating">Rating: {product.rating.toFixed(1)} / 5</p>
          <p className="price big">{formatPrice(product.price)}</p>
          <p>{product.description}</p>
          <h2>Specifications</h2>
          <ul>{specs.map((s) => <li key={s}>{s}</li>)}</ul>
          <p>Available: <strong>{product.quantity}</strong></p>

          {product.quantity === 0 ? (
            <p className="low-note">This product is out of stock.</p>
          ) : (
            <>
              <div className="stepper" role="group" aria-label="Choose quantity">
                <button onClick={() => setQty(Math.max(1, chosen - 1))} aria-label="Decrease quantity">-</button>
                <span aria-live="polite">{chosen}</span>
                <button onClick={() => setQty(Math.min(maxQty, chosen + 1))} aria-label="Increase quantity">+</button>
              </div>
              <p>Total: <strong>{formatPrice(product.price * chosen)}</strong></p>
              <button className="btn" onClick={() => onAddToCart(product.id, chosen)}>Add to Cart</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
