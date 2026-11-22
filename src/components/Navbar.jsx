import React from 'react';

export default function Navbar({ activeTab, setActiveTab, cartCount, hasOrder }) {
  return (
    <header className="site-header">
      <div className="header-container">
        <div className="brand" onClick={() => setActiveTab('products')}>
          <div className="brand-icon">🛒</div>
          <div>
            <h1 className="brand-title">TechShop E-Commerce</h1>
            <p className="brand-subtitle">React.js Shopping Cart & Checkout System</p>
          </div>
        </div>

        <nav className="nav-menu">
          <button
            className={`nav-btn ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => setActiveTab('products')}
          >
            📦 Products (ផលិតផល)
          </button>

          <button
            className={`nav-btn ${activeTab === 'cart' ? 'active' : ''}`}
            onClick={() => setActiveTab('cart')}
          >
            🛒 Cart (កន្ត្រក)
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>

          <button
            className={`nav-btn ${activeTab === 'checkout' ? 'active' : ''}`}
            onClick={() => {
              if (cartCount > 0) {
                setActiveTab('checkout');
              } else {
                alert('កន្ត្រកទំនិញរបស់អ្នកទទេ! សូមបន្ថែមផលិតផលជាមុនសិន។ (Your cart is empty! Please add products first.)');
              }
            }}
          >
            💳 Checkout (ទូទាត់)
          </button>

          {hasOrder && (
            <button
              className={`nav-btn ${activeTab === 'confirmation' ? 'active' : ''}`}
              onClick={() => setActiveTab('confirmation')}
            >
              ✅ Order Confirmation
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
