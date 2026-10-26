import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import AddProductPage from "./pages/AddProductPage";
import CartPage from "./pages/CartPage";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import { initialProducts } from "./data";
import { CartItem, Product } from "./types";

export default function App() {

  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState(""); // feedback shown at the bottom
  const navigate = useNavigate();

  // Hide the feedback message after 2.5 seconds.
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => setMessage(""), 2500);
    return () => clearTimeout(timer); // cleanup if message changes early
  }, [message]);

  // ---- DERIVED VALUES: calculated from state on every render ----
  // Overall product total = sum of (price x quantity) for every product.
  const overallTotal = products.reduce((sum, p) => sum + p.price * p.quantity, 0);
  // Cart total = sum of (price x cart qty) for items in the cart only.
  const cartTotal = cart.reduce((sum, item) => {
    const product = products.find((p) => p.id === item.productId);
    return product ? sum + product.price * item.qty : sum;
  }, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  // ---- ACTIONS ----
  // Change a product's available quantity by +1 / -1 (never below 0).
  const changeStock = (id: number, change: number) => {
    setProducts(products.map((p) => (p.id === id ? { ...p, quantity: Math.max(0, p.quantity + change) } : p)));
    // Keep the cart valid: it cannot hold more than the new stock.
    setCart(
      cart
        .map((i) => {
          const product = products.find((p) => p.id === i.productId);
          const stock = i.productId === id && product ? Math.max(0, product.quantity + change) : Infinity;
          return { ...i, qty: Math.min(i.qty, stock) };
        })
        .filter((i) => i.qty > 0)
    );
  };

  const addProduct = (data: Omit<Product, "id">) => {
    const newId = products.reduce((max, p) => Math.max(max, p.id), 0) + 1;
    setProducts([...products, { ...data, id: newId }]);
    setMessage(`"${data.name}" was added to the product list.`);
    navigate("/");
  };

  const addToCart = (id: number, qty: number) => {
    const product = products.find((p) => p.id === id);
    if (!product) return;
    const existing = cart.find((i) => i.productId === id);
    const newQty = (existing ? existing.qty : 0) + qty;
    if (newQty > product.quantity) {
      setMessage(`Only ${product.quantity} of "${product.name}" available.`);
      return;
    }
    setCart(existing ? cart.map((i) => (i.productId === id ? { ...i, qty: newQty } : i)) : [...cart, { productId: id, qty }]);
    setMessage(`${qty} x "${product.name}" added to your cart.`);
  };

  const changeCartQty = (id: number, change: number) => {
    const product = products.find((p) => p.id === id);
    if (!product) return;
    setCart(
      cart
        .map((i) => (i.productId === id ? { ...i, qty: Math.min(product.quantity, i.qty + change) } : i))
        .filter((i) => i.qty > 0)
    );
  };

  const removeFromCart = (id: number) => setCart(cart.filter((i) => i.productId !== id));

  return (
    <>
      <Header search={search} onSearchChange={setSearch} cartCount={cartCount} />
      <main>
        <Routes>
          <Route path="/" element={
            <HomePage products={products} search={search} overallTotal={overallTotal}
              onChangeStock={changeStock} onAddToCart={addToCart} />} />
          <Route path="/product/:id" element={<ProductPage products={products} onAddToCart={addToCart} />} />
          <Route path="/add" element={<AddProductPage onAddProduct={addProduct} />} />
          <Route path="/cart" element={
            <CartPage cart={cart} products={products} cartTotal={cartTotal}
              onChangeCartQty={changeCartQty} onRemove={removeFromCart} onClear={() => setCart([])} />} />
        </Routes>
      </main>
      {/* Feedback message; role="status" lets screen readers announce it */}
      {message && <div className="toast" role="status">{message}</div>}
    </>
  );
}
