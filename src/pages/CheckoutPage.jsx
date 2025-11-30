import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CartSummary from "../components/CartSummary";

const GST_RATE = 0.05;
const QST_RATE = 0.09975;
const LAST_ORDER_KEY = "lastOrder";

function calculateTotals(subtotal, province) {
  const gst = Number((subtotal * GST_RATE).toFixed(2));
  const qst =
    province === "Quebec"
      ? Number((subtotal * QST_RATE).toFixed(2))
      : 0;
  const total = Number((subtotal + gst + qst).toFixed(2));
  return { subtotal, gst, qst, total };
}

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

  if (cartItems.length === 0) {
    return (
      <section className="page">
        <h1>Checkout</h1>
        <p>Your cart is empty.</p>
      </section>
    );
  }

  const { gst, qst, total } = calculateTotals(subtotal, province);

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setError("");

    if (
      !name.trim() ||
      !address.trim() ||
      !city.trim() ||
      !province.trim() ||
      !postalCode.trim()
    ) {
      setError("Please fill in all shipping fields.");
      return;
    }

    const orderItems = cartItems.map((item) => {
      const effectivePrice = getDiscountedPrice(item);
      return {
        id: item.id,
        title: item.title,
        quantity: item.quantity,
        unitPrice: effectivePrice,
        lineTotal: Number(
          (effectivePrice * item.quantity).toFixed(2)
        ),
      };
    });

    const order = {
      id: Date.now(),
      items: orderItems,
      address: {
        name,
        address,
        city,
        province,
        postalCode,
      },
      paymentMethod,
      totals: { subtotal, gst, qst, total },
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(LAST_ORDER_KEY, JSON.stringify(order));
    clearCart();
    navigate("/order-confirmation", { state: { order } });
  };

  return (
    <section className="page checkout-page">
      <h1>Checkout</h1>
      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={handlePlaceOrder}>
          <h2>Shipping Address</h2>
          <label>
            Full name
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>

          <label>
            Address
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </label>

          <label>
            City
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </label>

          <label>
            Province / State
            <select
              value={province}
              onChange={(e) => setProvince(e.target.value)}
            >
              <option value="Quebec">Quebec</option>
              <option value="Ontario">Ontario</option>
              <option value="British Columbia">British Columbia</option>
              <option value="Alberta">Alberta</option>
              <option value="Other">Other</option>
            </select>
          </label>

          <label>
            Postal code
            <input
              type="text"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
            />
          </label>

          <h2>Payment Method</h2>
          <div className="payment-methods">
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="credit"
                checked={paymentMethod === "credit"}
                onChange={(e) =>
                  setPaymentMethod(e.target.value)
                }
              />
              Credit Card (simulated)
            </label>
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="paypal"
                checked={paymentMethod === "paypal"}
                onChange={(e) =>
                  setPaymentMethod(e.target.value)
                }
              />
              PayPal (simulated)
            </label>
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="bank"
                checked={paymentMethod === "bank"}
                onChange={(e) =>
                  setPaymentMethod(e.target.value)
                }
              />
              Bank Transfer (simulated)
            </label>
          </div>

          {error && <p className="error-text">{error}</p>}

          <button type="submit" className="btn primary full-width">
            Place Order
          </button>
        </form>

        <CartSummary
          subtotal={subtotal}
          gst={gst}
          qst={qst}
          total={total}
        />
      </div>
    </section>
  );
}

export default CheckoutPage;