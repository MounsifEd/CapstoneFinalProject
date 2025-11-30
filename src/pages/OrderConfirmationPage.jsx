import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const LAST_ORDER_KEY = "lastOrder";

function OrderConfirmationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [order, setOrder] = useState(location.state?.order || null);

  useEffect(() => {
    if (!order) {
      try {
        const saved = localStorage.getItem(LAST_ORDER_KEY);
        if (saved) {
          setOrder(JSON.parse(saved));
        }
      } catch {
        // ignore
      }
    }
  }, [order]);

  if (!order) {
    return (
      <section className="page">
        <h1>Order Confirmation</h1>
        <p>No order found.</p>
        <button className="btn" onClick={() => navigate("/")}>
          Back to Home
        </button>
      </section>
    );
  }

  const { items, address, paymentMethod, totals } = order;

  return (
    <section className="page">
      <h1>Thank you for your order!</h1>
      <p>Your order ID: {order.id}</p>

      <h2>Order Summary</h2>
      <div className="order-items">
        {items.map((item) => (
          <div key={item.id} className="order-item">
            <div>
              <strong>{item.title}</strong>
              <p>Quantity: {item.quantity}</p>
            </div>
            <div>
              <p>Unit: ${item.unitPrice.toFixed(2)}</p>
              <p>Line total: ${item.lineTotal.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>

      <h2>Totals</h2>
      <ul>
        <li>Subtotal: ${totals.subtotal.toFixed(2)}</li>
        <li>GST: ${totals.gst.toFixed(2)}</li>
        <li>QST: ${totals.qst.toFixed(2)}</li>
        <li>
          <strong>Total: ${totals.total.toFixed(2)}</strong>
        </li>
      </ul>

      <h2>Shipping Address</h2>
      <p>
        {address.name}
        <br />
        {address.address}
        <br />
        {address.city}, {address.province} {address.postalCode}
      </p>

      <h2>Payment Method</h2>
      <p>
        {paymentMethod === "credit" && "Credit Card (simulated)"}
        {paymentMethod === "paypal" && "PayPal (simulated)"}
        {paymentMethod === "bank" && "Bank Transfer (simulated)"}
      </p>

      <button className="btn primary" onClick={() => navigate("/")}>
        Back to Home
      </button>
    </section>
  );
}

export default OrderConfirmationPage;