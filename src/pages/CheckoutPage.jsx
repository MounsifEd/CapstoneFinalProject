import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CartSummary from "../components/CartSummary";
import { saveLastOrderToStorage } from "../services/storage";

const GST = 0.05;
const QST = 0.09975;

function CheckoutPage() {
  const { cartItems, subtotal, clearCart, getDiscountedPrice } = useCart();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("Quebec");
  const [postalCode, setPostalCode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("credit");
  const [error, setError] = useState("");

  const gst = Number((subtotal * GST).toFixed(2));
  const qst = province === "Quebec" ? Number((subtotal * QST).toFixed(2)) : 0;
  const total = Number((subtotal + gst + qst).toFixed(2));

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (!name || !address || !city || !province || !postalCode) {
      setError("Please fill all shipping fields.");
      return;
    }

    const orderItems = cartItems.map((item) => ({
      id: item.id,
      title: item.title,
      quantity: item.quantity,
      unitPrice: getDiscountedPrice(item),
      lineTotal: Number(
        (getDiscountedPrice(item) * item.quantity).toFixed(2)
      ),
    }));

    const order = {
      id: Date.now(),
      items: orderItems,
      address: { name, address, city, province, postalCode },
      paymentMethod,
      totals: { subtotal, gst, qst, total },
      createdAt: new Date().toISOString(),
    };

    saveLastOrderToStorage(order);  // ⭐ NEW
    clearCart();
    navigate("/order-confirmation", { state: { order } });
  };

  if (cartItems.length === 0)
    return (
      <section className="page">
        <h1>Checkout</h1>
        <p>Your cart is empty.</p>
      </section>
    );

  return (
    <section className="page checkout">
      <h1>Checkout</h1>

      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={handlePlaceOrder}>
          <h2>Shipping Address</h2>

          <label>
            Full Name
            <input value={name} onChange={(e) => setName(e.target.value)} />
          </label>

          <label>
            Address
            <input value={address} onChange={(e) => setAddress(e.target.value)} />
          </label>

          <label>
            City
            <input value={city} onChange={(e) => setCity(e.target.value)} />
          </label>

          <label>
            Province / State
            <select value={province} onChange={(e) => setProvince(e.target.value)}>
              <option value="Quebec">Quebec</option>
              <option value="Ontario">Ontario</option>
              <option value="Alberta">Alberta</option>
              <option value="British Columbia">British Columbia</option>
              <option value="Other">Other</option>
            </select>
          </label>

          <label>
            Postal Code
            <input
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </label>

          <h2>Payment Method</h2>
          <label>
            <input
              type="radio"
              checked={paymentMethod === "credit"}
              value="credit"
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Credit Card (simulated)
          </label>

          <label>
            <input
              type="radio"
              checked={paymentMethod === "paypal"}
              value="paypal"
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            PayPal (simulated)
          </label>

          <label>
            <input
              type="radio"
              checked={paymentMethod === "bank"}
              value="bank"
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Bank Transfer (simulated)
          </label>

          {error && <p className="error-text">{error}</p>}

          <button className="btn primary full-width">Place Order</button>
        </form>

        <CartSummary subtotal={subtotal} gst={gst} qst={qst} total={total} />
      </div>
    </section>
  );
}

export default CheckoutPage;
