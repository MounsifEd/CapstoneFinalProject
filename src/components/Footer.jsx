import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <h4>Quick Links</h4>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/cart">Cart</Link>
            </li>
            <li>
              <a href="#!" aria-disabled="true">
                Contact (coming soon)
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4>Follow Us</h4>
          <div className="social-icons">
            <span>Instagram</span>
            <span>Facebook</span>
            <span>X</span>
          </div>
        </div>
        <div>
          <p>© {new Date().getFullYear()} ReactShop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;