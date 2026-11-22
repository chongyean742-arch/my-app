import React, { useState } from 'react';
import { SHIPPING_OPTIONS } from '../data/products';

export default function CheckoutForm({
  cart,
  onPlaceOrder,
  onBackToCart
}) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    shippingMethodId: 'standard'
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Subtotal calculation
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Selected Shipping Method
  const selectedShipping = SHIPPING_OPTIONS.find(
    (opt) => opt.id === formData.shippingMethodId
  ) || SHIPPING_OPTIONS[0];

  // Calculate Grand Total
  const shippingCost = selectedShipping.price;
  const grandTotal = subtotal + shippingCost;

  // Validation logic
  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'firstName':
        if (!value.trim()) {
          error = 'សូមបញ្ចូលនាមខ្លួន (First name is required)';
        } else if (value.trim().length < 2) {
          error = 'នាមខ្លួនត្រូវមានយ៉ាងហោចណាស់ ២ តួអក្សរ (Min 2 characters)';
        }
        break;
      case 'lastName':
        if (!value.trim()) {
          error = 'សូមបញ្ចូលនាមត្រកូល (Last name is required)';
        } else if (value.trim().length < 2) {
          error = 'នាមត្រកូលត្រូវមានយ៉ាងហោចណាស់ ២ តួអក្សរ (Min 2 characters)';
        }
        break;
      case 'email':
        if (!value.trim()) {
          error = 'សូមបញ្ចូលអ៊ីមែល (Email is required)';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
          error = 'ទម្រង់អ៊ីមែលមិនត្រឹមត្រូវ (Invalid email format)';
        }
        break;
      case 'phone':
        if (!value.trim()) {
          error = 'សូមបញ្ចូលលេខទូរស័ព្ទ (Phone number is required)';
        } else if (!/^[0-9+\s-]{8,15}$/.test(value.trim())) {
          error = 'លេខទូរស័ព្ទត្រូវមានពី ៨ ទៅ ១៥ ខ្ទង់ (Phone must be 8-15 digits)';
        }
        break;
      case 'address':
        if (!value.trim()) {
          error = 'សូមបញ្ចូលអាសយដ្ឋានដឹកជញ្ជូន (Address is required)';
        } else if (value.trim().length < 5) {
          error = 'អាសយដ្ឋានត្រូវមានព័ត៌មានលម្អិតយ៉ាងហោចណាស់ ៥ តួ (Min 5 characters)';
        }
        break;
      default:
        break;
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const err = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: err }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const err = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: err }));
  };

  const validateAll = () => {
    const newErrors = {};
    const fields = ['firstName', 'lastName', 'email', 'phone', 'address'];
    fields.forEach((field) => {
      const err = validateField(field, formData[field]);
      if (err) newErrors[field] = err;
    });
    setErrors(newErrors);
    setTouched({
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
      address: true
    });
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateAll();
    if (!isValid) {
      alert('សូមបំពេញព័ត៌មានដែលចាំបាច់ឱ្យបានត្រឹមត្រូវ! (Please correct the errors in the form)');
      return;
    }

    // Call onPlaceOrder with order payload
    onPlaceOrder({
      customer: {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        address: formData.address.trim()
      },
      shippingMethod: selectedShipping,
      items: [...cart],
      subtotal,
      shippingCost,
      grandTotal
    });
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h2 className="section-title">Practical Exercise: Checkout Form</h2>
          <p className="section-desc">
            បំពេញព័ត៌មានអតិថិជន និងវិធីសាស្ត្រដឹកជញ្ជូនដើម្បីបញ្ចប់ការទិញ (Customer details & shipping)
          </p>
        </div>
        <button className="btn-secondary" onClick={onBackToCart}>
          &larr; ត្រឡប់ទៅកន្ត្រកទំនិញ (Back to Cart)
        </button>
      </div>

      <form onSubmit={handleSubmit} className="checkout-layout">
        {/* Left Column: Customer Form & Shipping Method */}
        <div className="checkout-main-form">
          {/* Customer Information Card */}
          <div className="card form-section-card">
            <h3 className="card-heading">
              <span className="step-num">1</span> ព័ត៌មានអតិថិជន (Customer Information)
            </h3>

            <div className="form-grid-2">
              {/* 1. First Name */}
              <div className="form-group">
                <label className="form-label" htmlFor="firstName">
                  នាមខ្លួន (First Name) <span className="req-star">*</span>
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="e.g. Sokha"
                  className={`form-input ${errors.firstName && touched.firstName ? 'input-error' : ''}`}
                  value={formData.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.firstName && touched.firstName && (
                  <span className="field-error-msg">{errors.firstName}</span>
                )}
              </div>

              {/* 2. Last Name */}
              <div className="form-group">
                <label className="form-label" htmlFor="lastName">
                  នាមត្រកូល (Last Name) <span className="req-star">*</span>
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="e.g. Chan"
                  className={`form-input ${errors.lastName && touched.lastName ? 'input-error' : ''}`}
                  value={formData.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.lastName && touched.lastName && (
                  <span className="field-error-msg">{errors.lastName}</span>
                )}
              </div>
            </div>

            <div className="form-grid-2">
              {/* 3. Email */}
              <div className="form-group">
                <label className="form-label" htmlFor="email">
                  អ៊ីមែល (Email Address) <span className="req-star">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  className={`form-input ${errors.email && touched.email ? 'input-error' : ''}`}
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.email && touched.email && (
                  <span className="field-error-msg">{errors.email}</span>
                )}
              </div>

              {/* 4. Phone Number */}
              <div className="form-group">
                <label className="form-label" htmlFor="phone">
                  លេខទូរស័ព្ទ (Phone Number) <span className="req-star">*</span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="e.g. 012 345 678"
                  className={`form-input ${errors.phone && touched.phone ? 'input-error' : ''}`}
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.phone && touched.phone && (
                  <span className="field-error-msg">{errors.phone}</span>
                )}
              </div>
            </div>

            {/* 5. Address */}
            <div className="form-group">
              <label className="form-label" htmlFor="address">
                អាសយដ្ឋានដឹកជញ្ជូន (Delivery Address) <span className="req-star">*</span>
              </label>
              <textarea
                id="address"
                name="address"
                rows="3"
                placeholder="House No, Street No, Sangkat, Khan, Phnom Penh..."
                className={`form-textarea ${errors.address && touched.address ? 'input-error' : ''}`}
                value={formData.address}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.address && touched.address && (
                <span className="field-error-msg">{errors.address}</span>
              )}
            </div>
          </div>

          {/* 7. Shipping Method */}
          <div className="card form-section-card">
            <h3 className="card-heading">
              <span className="step-num">2</span> វិធីសាស្ត្រដឹកជញ្ជូន (Shipping Method)
            </h3>
            <div className="shipping-methods-group">
              {SHIPPING_OPTIONS.map((option) => (
                <label
                  key={option.id}
                  className={`shipping-option-card ${
                    formData.shippingMethodId === option.id ? 'selected' : ''
                  }`}
                >
                  <input
                    type="radio"
                    name="shippingMethodId"
                    value={option.id}
                    checked={formData.shippingMethodId === option.id}
                    onChange={handleChange}
                    className="shipping-radio"
                  />
                  <div className="shipping-opt-info">
                    <div className="shipping-opt-title">{option.name}</div>
                    <div className="shipping-opt-desc">{option.description}</div>
                  </div>
                  <div className="shipping-opt-price">
                    {option.price === 0 ? 'FREE' : `$${option.price.toFixed(2)}`}
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: 8. Display Order Summary & 9. Calculate Grand Total & 10. Place Order */}
        <div className="checkout-summary-column">
          <div className="card order-summary-card">
            <h3 className="summary-title">8. បង្ហាញសង្ខេបការបញ្ជាទិញ (Order Summary)</h3>

            <div className="order-items-scroll">
              {cart.map((item) => (
                <div key={item.id} className="summary-item-line">
                  <div className="summary-item-left">
                    <img src={item.image} alt={item.name} className="summary-thumb" />
                    <div>
                      <div className="summary-item-name">{item.name}</div>
                      <div className="summary-item-qty">Qty: {item.quantity} × ${item.price.toFixed(2)}</div>
                    </div>
                  </div>
                  <div className="summary-item-price">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div className="summary-divider"></div>

            <div className="summary-row">
              <span>តម្លៃទំនិញសរុប (Subtotal):</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className="summary-row">
              <span>ថ្លៃដឹកជញ្ជូន ({selectedShipping.name.split('(')[0]}):</span>
              <span>{shippingCost === 0 ? 'Free ($0.00)' : `$${shippingCost.toFixed(2)}`}</span>
            </div>

            <div className="summary-divider"></div>

            {/* 9. Calculate Grand Total */}
            <div className="summary-row grand-total-row">
              <span>9. សរុបរួម (Grand Total):</span>
              <span className="grand-total-val">${grandTotal.toFixed(2)}</span>
            </div>

            {/* 10. Create Place Order Button */}
            <button type="submit" className="btn-primary btn-place-order">
              🚀 10. Place Order (បញ្ជាទិញឥឡូវនេះ)
            </button>

            <p className="order-secure-notice">
              🔒 Safe & Secure 256-bit SSL encrypted checkout
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
