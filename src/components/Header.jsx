import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Header() {
  const { itemCount } = useCart();

  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="logo">
          ReactShop
        </Link>
        <nav className="nav">
          <NavLink to="/" className="nav-link">
            Home
          </NavLink>
          <NavLink to="/cart" className="nav-link">
            Cart ({itemCount})
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;