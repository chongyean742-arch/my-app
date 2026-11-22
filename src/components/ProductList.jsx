import React, { useState } from 'react';

export default function ProductList({ products, onAddToCart, cart, onNavigateToCart }) {
  const [notification, setNotification] = useState('');

  const handleAdd = (product) => {
    onAddToCart(product);
    setNotification(`បានបន្ថែម "${product.name}" ទៅក្នុងកន្ត្រកទំនិញជោគជ័យ!`);
    setTimeout(() => {
      setNotification('');
    }, 2500);
  };

  const getProductCartQty = (productId) => {
    const item = cart.find((i) => i.id === productId);
    return item ? item.quantity : 0;
  };

  return (
    <div className="page-container">
      {notification && (
        <div className="toast-notification">
          <span>✨ {notification}</span>
          <button className="toast-btn" onClick={onNavigateToCart}>
            ទៅកាន់កន្ត្រកទំនិញ (View Cart) &rarr;
          </button>
        </div>
      )}

      <div className="page-header">
        <div>
          <h2 className="section-title">Practical Exercise 1: Products Showcase</h2>
          <p className="section-desc">
            ជ្រើសរើសផលិតផលខាងក្រោមដើម្បីបន្ថែមទៅកន្ត្រកទំនិញ (Select products below to add to your shopping cart)
          </p>
        </div>
        <div className="cart-quick-summary">
          <span>ទំនិញក្នុងកន្ត្រក: <strong>{cart.reduce((sum, item) => sum + item.quantity, 0)}</strong> មុខ</span>
          <button className="btn-secondary" onClick={onNavigateToCart}>
            មើលកន្ត្រកទំនិញ (Go to Cart) &rarr;
          </button>
        </div>
      </div>

      <div className="product-grid">
        {products.map((product) => {
          const qtyInCart = getProductCartQty(product.id);
          return (
            <div key={product.id} className="product-card">
              <div className="product-img-wrap">
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-img"
                  loading="lazy"
                />
                <span className="product-category-badge">{product.category}</span>
                {qtyInCart > 0 && (
                  <span className="product-incart-badge">
                    ✓ {qtyInCart} in cart
                  </span>
                )}
              </div>

              <div className="product-content">
                <div className="product-meta">
                  <h3 className="product-name">{product.name}</h3>
                  <div className="product-price">${product.price.toFixed(2)}</div>
                </div>

                <p className="product-desc">{product.description}</p>

                <div className="product-footer">
                  <span className="product-stock">Stock: {product.stock} available</span>
                  {/* Task 2: Create Button Add to Cart */}
                  <button
                    className="btn-primary add-to-cart-btn"
                    onClick={() => handleAdd(product)}
                  >
                    🛒 Add to Cart (បន្ថែមទៅកន្ត្រក)
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
