import { Link } from "react-router-dom";
import ProductImage from "../components/ProductImage";
import { CartItem, Product } from "../types";
import { formatPrice } from "../utils";

interface Props {
  cart: CartItem[];
  products: Product[];
  cartTotal: number;
  onChangeCartQty: (id: number, change: number) => void;
  onRemove: (id: number) => void;
  onClear: () => void;
}

export default function CartPage({ cart, products, cartTotal, onChangeCartQty, onRemove, onClear }: Props) {
  return (
    <div className="page">
      <h1>Your Bag</h1>
      {cart.length === 0 ? (
        <>
          <p className="empty">Your bag is empty.</p>
          <Link to="/" className="btn">Start shopping</Link>
        </>
      ) : (
        <>
          <ul className="cart-list">
            {cart.map((item) => {
              const product = products.find((p) => p.id === item.productId);
              if (!product) return null;
              return (
                <li key={item.productId} className="cart-item">
                  <div className="thumb"><ProductImage src={product.image} alt={product.name} /></div>
                  <div className="cart-info">
                    <strong>{product.name}</strong>
                    <span>{formatPrice(product.price)} each</span>
                  </div>
                  <div className="stepper" role="group" aria-label={`Cart quantity of ${product.name}`}>
                    <button onClick={() => onChangeCartQty(product.id, -1)} aria-label={`Decrease ${product.name}`}>-</button>
                    <span>{item.qty}</span>
                    <button onClick={() => onChangeCartQty(product.id, 1)} aria-label={`Increase ${product.name}`}>+</button>
                  </div>
                  <strong>{formatPrice(product.price * item.qty)}</strong>
                  <button className="link-btn" onClick={() => onRemove(product.id)}>Remove</button>
                </li>
              );
            })}
          </ul>
          <p className="cart-total">Cart Total: <strong>{formatPrice(cartTotal)}</strong></p>
          <button className="btn secondary" onClick={onClear}>Clear Cart</button>
        </>
      )}
    </div>
  );
}
