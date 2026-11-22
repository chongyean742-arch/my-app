import React from 'react';

export default function OrderConfirmation({ order, onContinueShopping }) {
  if (!order) {
    return (
      <div className="page-container">
        <div className="empty-cart-card">
          <h2>មិនទាន់មានការបញ្ជាទិញនៅឡើយទេ (No Order Found)</h2>
          <p>Please browse products and place an order first.</p>
          <button className="btn-primary" onClick={onContinueShopping}>
            ទិញទំនិញ (Shop Now)
          </button>
        </div>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="page-container print-area">
      <div className="confirmation-card">
        {/* Success Header Banner */}
        <div className="success-banner">
          <div className="success-icon-badge">✓</div>
          {/* Requirement 1: Message: Order Placed Successfully! */}
          <h2 className="success-title">Order Placed Successfully!</h2>
          <p className="success-subtitle">
            ការបញ្ជាទិញរបស់អ្នកត្រូវបានទទួលជោគជ័យហើយ! យើងខ្ញុំនឹងរៀបចំផ្ញើជូនលោកអ្នកក្នុងពេលឆាប់ៗ។
          </p>
        </div>

        {/* Order Meta Badges / Info Bar */}
        <div className="order-meta-grid">
          <div className="meta-box">
            <span className="meta-label">Order ID (លេខសម្គាល់):</span>
            {/* Requirement 2: Order ID: ORD-0001 */}
            <span className="meta-value order-id-highlight">{order.orderId}</span>
          </div>

          <div className="meta-box">
            <span className="meta-label">Order Status (ស្ថានភាព):</span>
            {/* Requirement 7: Order Status: Pending */}
            <span className="status-badge-pending">
              <span className="status-dot"></span> {order.status || 'Pending'}
            </span>
          </div>

          <div className="meta-box">
            <span className="meta-label">Order Date (កាលបរិច្ឆេទ):</span>
            {/* Requirement 4: Order Date */}
            <span className="meta-value">{order.date}</span>
          </div>

          <div className="meta-box">
            <span className="meta-label">Customer Name (ឈ្មោះអតិថិជន):</span>
            {/* Requirement 3: Customer Name */}
            <span className="meta-value">
              {order.customer.firstName} {order.customer.lastName}
            </span>
          </div>
        </div>

        {/* Customer & Shipping Summary */}
        <div className="order-details-two-col">
          <div className="detail-panel">
            <h4 className="panel-title">👤 Customer Contact Information</h4>
            <p><strong>Name:</strong> {order.customer.firstName} {order.customer.lastName}</p>
            <p><strong>Email:</strong> {order.customer.email}</p>
            <p><strong>Phone:</strong> {order.customer.phone}</p>
            <p><strong>Address:</strong> {order.customer.address}</p>
          </div>

          <div className="detail-panel">
            <h4 className="panel-title">🚚 Delivery & Payment Method</h4>
            <p><strong>Shipping:</strong> {order.shippingMethod.name}</p>
            <p><strong>Shipping Cost:</strong> {order.shippingCost === 0 ? 'FREE' : `$${order.shippingCost.toFixed(2)}`}</p>
            <p><strong>Payment Mode:</strong> Cash on Delivery (COD) / Bank Transfer</p>
            <p><strong>Status:</strong> <span className="status-badge-pending">{order.status}</span></p>
          </div>
        </div>

        {/* Requirement 5: Ordered Products */}
        <div className="ordered-products-section">
          <h3 className="section-subtitle">📦 Ordered Products (ទំនិញដែលបានបញ្ជាទិញ)</h3>
          <div className="order-products-table-wrap">
            <table className="order-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>ផលិតផល (Product)</th>
                  <th>តម្លៃរាយ (Unit Price)</th>
                  <th>បរិមាណ (QTY)</th>
                  <th style={{ textAlign: 'right' }}>សរុប (Item Total)</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>
                      <div className="table-product-cell">
                        <img src={item.image} alt={item.name} className="table-thumb" />
                        <div>
                          <strong>{item.name}</strong>
                          <div className="table-subtext">{item.category}</div>
                        </div>
                      </div>
                    </td>
                    <td>${item.price.toFixed(2)}</td>
                    <td><strong>{item.quantity}</strong></td>
                    <td style={{ textAlign: 'right' }}>
                      <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Total Calculation breakdown & Requirement 6: Total Amount */}
        <div className="order-calculation-box">
          <div className="calc-row">
            <span>តម្លៃទំនិញសរុប (Subtotal):</span>
            <span>${order.subtotal.toFixed(2)}</span>
          </div>
          <div className="calc-row">
            <span>ថ្លៃដឹកជញ្ជូន (Shipping Fee):</span>
            <span>${order.shippingCost.toFixed(2)}</span>
          </div>
          <div className="calc-divider"></div>
          <div className="calc-row total-highlight">
            {/* Requirement 6: Total Amount */}
            <span>Total Amount (តម្លៃសរុបរួម):</span>
            <span className="total-amount-val">${order.grandTotal.toFixed(2)}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="order-actions-bar no-print">
          <button className="btn-secondary" onClick={handlePrint}>
            🖨️ Print Receipt (បោះពុម្ពវិក្កយបត្រ)
          </button>
          <button className="btn-primary" onClick={onContinueShopping}>
            🛍️ Continue Shopping (បន្តការទិញទំនិញ)
          </button>
        </div>
      </div>
    </div>
  );
}
