import React from 'react';

export default function ShoppingCart({
  cart,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
  onProceedToCheckout,
  onContinueShopping
}) {
  // Calculate Subtotal and Grand Total
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  // In cart view, standard shipping estimate or preview
  const estimatedShipping = cart.length > 0 ? 5.00 : 0.00;
  const grandTotal = subtotal + estimatedShipping;

  if (cart.length === 0) {
    return (
      <div className="page-container">
        <div className="empty-cart-card">
          <div className="empty-icon">🛍️</div>
          <h2>កន្ត្រកទំនិញរបស់អ្នកទទេស្អាត!</h2>
          <p>Your shopping cart is currently empty. Please add some products to get started.</p>
          <button className="btn-primary" onClick={onContinueShopping}>
            ទៅកាន់បញ្ជីផលិតផល (Start Shopping)
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h2 className="section-title">Practical Exercise 1: Shopping Cart Page</h2>
          <p className="section-desc">
            គ្រប់គ្រងបរិមាណទំនិញ គណនាតម្លៃ និងបន្តទៅកាន់ការទូទាត់ (Manage quantities, calculate totals & proceed)
          </p>
        </div>
        <button className="btn-secondary" onClick={onContinueShopping}>
          &larr; ទិញទំនិញបន្ថែម (Continue Shopping)
        </button>
      </div>

      <div className="cart-layout">
        {/* View Cart & Items List */}
        <div className="cart-items-section">
          <div className="cart-table-card">
            <div className="cart-table-header">
              <span className="col-product">ផលិតផល (Product)</span>
              <span className="col-price">តម្លៃរាយ (Unit Price)</span>
              <span className="col-qty">បរិមាណ (Quantity)</span>
              <span className="col-total">សរុប (Item Total)</span>
              <span className="col-action">សកម្មភាព</span>
            </div>

            <div className="cart-items-list">
              {cart.map((item) => {
                const itemTotal = item.price * item.quantity;
                return (
                  <div key={item.id} className="cart-item-row">
                    <div className="col-product item-product-info">
                      <img src={item.image} alt={item.name} className="cart-thumb" />
                      <div>
                        <h4 className="cart-item-name">{item.name}</h4>
                        <span className="cart-item-cat">{item.category}</span>
                      </div>
                    </div>

                    <div className="col-price item-unit-price">
                      ${item.price.toFixed(2)}
                    </div>

                    {/* Update QTY Controls */}
                    <div className="col-qty item-qty-control">
                      <div className="qty-group">
                        <button
                          className="qty-btn"
                          title="បន្ថយបរិមាណ (Decrease)"
                          onClick={() => onUpdateQty(item.id, item.quantity - 1)}
                        >
                          −
                        </button>
                        <input
                          type="number"
                          min="1"
                          max="99"
                          value={item.quantity}
                          onChange={(e) => {
                            const val = parseInt(e.target.value, 10);
                            if (!isNaN(val) && val >= 1) {
                              onUpdateQty(item.id, val);
                            }
                          }}
                          className="qty-input"
                        />
                        <button
                          className="qty-btn"
                          title="បន្ថែមបរិមាណ (Increase)"
                          onClick={() => onUpdateQty(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="col-total item-total-price">
                      ${itemTotal.toFixed(2)}
                    </div>

                    {/* Remove QTY / Item button */}
                    <div className="col-action">
                      <button
                        className="btn-remove"
                        title="លុបមុខទំនិញនេះចេញពីកន្ត្រក (Remove)"
                        onClick={() => onRemoveItem(item.id)}
                      >
                        🗑️ Remove
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="cart-table-footer">
              <button className="btn-outline-danger" onClick={onClearCart}>
                សំអាតកន្ត្រកទាំងមូល (Clear Entire Cart)
              </button>
            </div>
          </div>
        </div>

        {/* Order Summary & Calculations */}
        <div className="cart-summary-section">
          <div className="summary-card">
            <h3 className="summary-title">សង្ខេបតម្លៃ (Cart Summary)</h3>

            <div className="summary-row">
              <span>ចំនួនសរុប (Total Items):</span>
              <strong>{totalItemsCount} pcs</strong>
            </div>

            {/* Calculate Subtotal */}
            <div className="summary-row">
              <span>តម្លៃសរុបរង (Subtotal):</span>
              <strong className="subtotal-val">${subtotal.toFixed(2)}</strong>
            </div>

            <div className="summary-row">
              <span>ថ្លៃដឹកជញ្ជូនប៉ាន់ស្មាន (Est. Shipping):</span>
              <span>${estimatedShipping.toFixed(2)}</span>
            </div>

            <div className="summary-divider"></div>

            {/* Calculate Grand Total */}
            <div className="summary-row grand-total-row">
              <span>សរុបរួម (Grand Total):</span>
              <span className="grand-total-val">${grandTotal.toFixed(2)}</span>
            </div>

            <div className="summary-note">
              * តម្លៃដឹកជញ្ជូនពិតប្រាកដនឹងត្រូវជ្រើសរើសនៅទំព័រ Checkout
            </div>

            {/* Task 3: Create BTN Proceed to Checkout */}
            <button
              className="btn-primary btn-checkout-action"
              onClick={onProceedToCheckout}
            >
              Proceed to Checkout (ទៅកាន់ការទូទាត់) &rarr;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
