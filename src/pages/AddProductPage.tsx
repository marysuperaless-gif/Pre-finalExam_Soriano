import ProductForm from "../components/ProductForm";
import { Product } from "../types";

export default function AddProductPage({ onAddProduct }: { onAddProduct: (p: Omit<Product, "id">) => void }) {
  return (
    <div className="page">
      <h1>Add New Product</h1>
      <p className="muted">All fields are required.</p>
      <ProductForm onAddProduct={onAddProduct} />
    </div>
  );
}
