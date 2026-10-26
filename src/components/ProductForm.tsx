import { FormEvent, useState } from "react";
import { CATEGORIES, Category, Product } from "../types";
import ProductImage from "./ProductImage";

interface Props { onAddProduct: (product: Omit<Product, "id">) => void; }

// Every form field is stored as text first, then converted when saved.
const emptyForm = {
  image: "", name: "", category: "" as Category | "", description: "",
  specifications: "", rating: "", price: "", quantity: "",
};
type FormValues = typeof emptyForm;
type Errors = Partial<Record<keyof FormValues, string>>;

// Returns an object of error messages. Empty object = form is valid.
function validate(v: FormValues): Errors {
  const e: Errors = {};
  if (!v.image.trim()) e.image = "Image URL is required.";
  if (!v.name.trim()) e.name = "Product name is required.";
  if (!v.category) e.category = "Please choose a category.";
  if (!v.description.trim()) e.description = "Description is required.";
  if (!v.specifications.trim()) e.specifications = "Specifications are required.";

  if (v.rating.trim() === "") e.rating = "Rating is required.";
  else if (isNaN(Number(v.rating)) || Number(v.rating) < 0 || Number(v.rating) > 5)
    e.rating = "Rating must be a number from 0 to 5.";

  if (v.price.trim() === "") e.price = "Price is required.";
  else if (isNaN(Number(v.price)) || Number(v.price) <= 0)
    e.price = "Price must be a number greater than 0.";

  if (v.quantity.trim() === "") e.quantity = "Quantity is required.";
  else if (!Number.isInteger(Number(v.quantity)) || Number(v.quantity) < 0)
    e.quantity = "Quantity must be a whole number (0 or more).";
  return e;
}

export default function ProductForm({ onAddProduct }: Props) {
  const [values, setValues] = useState<FormValues>(emptyForm);
  const [errors, setErrors] = useState<Errors>({});

  // One handler for all inputs: update only the field that changed.
  const handleChange = (field: keyof FormValues, value: string) =>
    setValues({ ...values, [field]: value });

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return; // stop: show messages

    onAddProduct({
      image: values.image.trim(), name: values.name.trim(),
      category: values.category as Category, description: values.description.trim(),
      specifications: values.specifications.trim(), rating: Number(values.rating),
      price: Number(values.price), quantity: Number(values.quantity),
    });
    setValues(emptyForm); // reset the form
  };

  // Small helper that renders one labeled field with its error message.
  const field = (id: keyof FormValues, label: string, type = "text", extra = {}) => (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <input id={id} type={type} value={values[id]} aria-invalid={!!errors[id]}
        aria-describedby={errors[id] ? `${id}-error` : undefined}
        onChange={(e) => handleChange(id, e.target.value)} {...extra} />
      {errors[id] && <p className="error" id={`${id}-error`} role="alert">{errors[id]}</p>}
    </div>
  );

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      {field("image", "Image URL")}
      {/* Live preview with fallback when the link does not load */}
      <div className="preview">
        {values.image.trim()
          ? <ProductImage src={values.image.trim()} alt="Product preview" />
          : <div className="image-fallback">Image preview appears here</div>}
      </div>
      {field("name", "Product Name")}
      <div className="field">
        <label htmlFor="category">Category</label>
        <select id="category" value={values.category} aria-invalid={!!errors.category}
          onChange={(e) => handleChange("category", e.target.value)}>
          <option value="">Select a category</option>
          {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        {errors.category && <p className="error" role="alert">{errors.category}</p>}
      </div>
      <div className="field">
        <label htmlFor="description">Description</label>
        <textarea id="description" rows={3} value={values.description} aria-invalid={!!errors.description}
          onChange={(e) => handleChange("description", e.target.value)} />
        {errors.description && <p className="error" role="alert">{errors.description}</p>}
      </div>
      <div className="field">
        <label htmlFor="specifications">Specifications (separate with commas)</label>
        <textarea id="specifications" rows={2} value={values.specifications} aria-invalid={!!errors.specifications}
          onChange={(e) => handleChange("specifications", e.target.value)} />
        {errors.specifications && <p className="error" role="alert">{errors.specifications}</p>}
      </div>
      <div className="row">
        {field("rating", "Rating (0-5)", "number", { step: "0.1" })}
        {field("price", "Price ($)", "number", { step: "0.01" })}
        {field("quantity", "Quantity", "number")}
      </div>
      <button className="btn" type="submit">Add Product</button>
    </form>
  );
}
