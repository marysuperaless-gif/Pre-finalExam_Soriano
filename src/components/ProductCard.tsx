import { Link } from "react-router-dom";
import { Product } from "../types";
import { formatPrice } from "../utils";
import ProductImage from "./ProductImage";
import StockBadge from "./StockBadge";

interface Props {
  product: Product;
  onChangeStock: (id: number, change: number) => void;
  onAddToCart: (id: number, qty: number) => void;
}

export default function ProductCard({ product, onChangeStock, onAddToCart }: Props) {
  const subtotal = product.price * product.quantity; // subtotal = price x quantity
  return (
    <article className={`card ${product.quantity < 5 ? "card-low" : ""}`}>
      <Link to={`/product/${product.id}`} className="card-image" aria-label={`View ${product.name}`}>
        <ProductImage src={product.image} alt={product.name} />
        <StockBadge quantity={product.quantity} />
      </Link>
      <div className="card-body">
        <p className="muted">{product.category}</p>
        <h3><Link to={`/product/${product.id}`}>{product.name}</Link></h3>
        <p className="rating">Rating: {product.rating.toFixed(1)} / 5</p>
        <p className="price">{formatPrice(product.price)}</p>

        {/* +/- buttons change the available quantity (stock) */}
        <div className="stepper" role="group" aria-label={`Quantity of ${product.name}`}>
          <button onClick={() => onChangeStock(product.id, -1)} disabled={product.quantity === 0}
            aria-label={`Decrease quantity of ${product.name}`}>-</button>
          <span aria-live="polite">Qty: {product.quantity}</span>
          <button onClick={() => onChangeStock(product.id, 1)}
            aria-label={`Increase quantity of ${product.name}`}>+</button>
        </div>
        <p className="subtotal">Subtotal: <strong>{formatPrice(subtotal)}</strong></p>

        <button className="btn" onClick={() => onAddToCart(product.id, 1)} disabled={product.quantity === 0}>
          {product.quantity === 0 ? "Unavailable" : "Add to Cart"}
        </button>
      </div>
    </article>
  );
}
