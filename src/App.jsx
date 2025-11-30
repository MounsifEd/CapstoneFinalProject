import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./Pages/CheckoutPage";
import OrderConfirmationPage from "./Pages/OrderConfirmationPage";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;