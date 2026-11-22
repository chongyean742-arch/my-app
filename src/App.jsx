import React, { useState } from 'react';
import { INITIAL_PRODUCTS } from './data/products';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import ShoppingCart from './components/ShoppingCart';
import CheckoutForm from './components/CheckoutForm';
import OrderConfirmation from './components/OrderConfirmation';
import './App.css';

function App() {
  const [products] = useState(INITIAL_PRODUCTS);
  const [cart, setCart] = useState([
    {
      id: 1,
      name: 'Laptop',
      price: 650,
      quantity: 1,
      category: 'Computers',
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 2,
      name: 'Mouse',
      price: 15,
      quantity: 1,
      category: 'Accessories',
      image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=600&q=80'
    }
  ]);
  const [activeTab, setActiveTab] = useState('products');
  const [orderCounter, setOrderCounter] = useState(1);
  const [currentOrder, setCurrentOrder] = useState(null);

  // Add product to cart (Task 2)
  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [
          ...prevCart,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            category: product.category,
            image: product.image,
            quantity: 1
          }
        ];
      }
    });
  };

  // Update QTY (+ and - or direct input)
  const handleUpdateQty = (productId, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: newQty } : item
      )
    );
  };

  // Remove item / remove QTY
  const handleRemoveItem = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  // Clear entire cart
  const handleClearCart = () => {
    if (window.confirm('តើអ្នកពិតជាចង់លុបទំនិញទាំងអស់ចេញពីកន្ត្រកមែនទេ? (Clear all items?)')) {
      setCart([]);
    }
  };

  // Proceed to Checkout button action
  const handleProceedToCheckout = () => {
    if (cart.length === 0) {
      alert('កន្ត្រកទំនិញរបស់អ្នកទទេ! (Your cart is empty!)');
      return;
    }
    setActiveTab('checkout');
  };

  // Place Order Action (Practical Exercise Checkout & Order Confirmation)
  const handlePlaceOrder = ({ customer, shippingMethod, items, subtotal, shippingCost, grandTotal }) => {
    const formattedOrderId = `ORD-${String(orderCounter).padStart(4, '0')}`;
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    const newOrder = {
      orderId: formattedOrderId,
      customer,
      shippingMethod,
      items,
      subtotal,
      shippingCost,
      grandTotal,
      date: formattedDate,
      status: 'Pending'
    };

    setCurrentOrder(newOrder);
    setOrderCounter((prev) => prev + 1);
    setCart([]); // Clear cart after placing order
    setActiveTab('confirmation');
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="app-root">
      {/* Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={totalCartCount}
        hasOrder={!!currentOrder}
      />

      {/* Main Content Area */}
      <main className="app-main">
        {activeTab === 'products' && (
          <ProductList
            products={products}
            onAddToCart={handleAddToCart}
            cart={cart}
            onNavigateToCart={() => setActiveTab('cart')}
          />
        )}

        {activeTab === 'cart' && (
          <ShoppingCart
            cart={cart}
            onUpdateQty={handleUpdateQty}
            onRemoveItem={handleRemoveItem}
            onClearCart={handleClearCart}
            onProceedToCheckout={handleProceedToCheckout}
            onContinueShopping={() => setActiveTab('products')}
          />
        )}

        {activeTab === 'checkout' && (
          <CheckoutForm
            cart={cart}
            onPlaceOrder={handlePlaceOrder}
            onBackToCart={() => setActiveTab('cart')}
          />
        )}

        {activeTab === 'confirmation' && (
          <OrderConfirmation
            order={currentOrder}
            onContinueShopping={() => setActiveTab('products')}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="site-footer no-print">
        <div className="footer-container">
          <p>
            TechShop E-Commerce System &copy; 2026. Built with React.js & Vite for Practical Exercises 1, 2 & 3.
          </p>
          <div className="footer-links">
            <button className="footer-link-btn" onClick={() => setActiveTab('products')}>Products</button>
            <span>•</span>
            <button className="footer-link-btn" onClick={() => setActiveTab('cart')}>Shopping Cart</button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
