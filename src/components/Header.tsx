import { Link, NavLink } from "react-router-dom";

interface Props {
  search: string;
  onSearchChange: (value: string) => void;
  cartCount: number;
}

export default function Header({ search, onSearchChange, cartCount }: Props) {
  return (
    <header className="header">
      <Link to="/" className="logo" aria-label="Actiquer home">
        <small>SINCE 1994</small>ACTIQUER
      </Link>
      <div className="search">
        <label htmlFor="search" className="sr-only">Search products</label>
        <input id="search" type="search" placeholder="Search for product, brand and more..."
          value={search} onChange={(e) => onSearchChange(e.target.value)} />
      </div>
      <nav className="nav" aria-label="Main navigation">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/add">Add Product</NavLink>
        <NavLink to="/cart" className="bag">Your Bag <span className="count">{cartCount}</span></NavLink>
      </nav>
    </header>
  );
}
