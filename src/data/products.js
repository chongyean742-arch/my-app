export const INITIAL_PRODUCTS = [
  {
    id: 1,
    name: 'Laptop',
    price: 650,
    category: 'Computers',
    description: 'High performance laptop with Intel Core i5, 16GB RAM, 512GB SSD.',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=600&q=80',
    stock: 12
  },
  {
    id: 2,
    name: 'Mouse',
    price: 15,
    category: 'Accessories',
    description: 'Ergonomic wireless optical mouse with quiet click and high precision sensor.',
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=600&q=80',
    stock: 45
  },
  {
    id: 3,
    name: 'Keyboard',
    price: 25,
    category: 'Accessories',
    description: 'Slim mechanical feel gaming & office keyboard with RGB backlight.',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80',
    stock: 28
  },
  {
    id: 4,
    name: 'Monitor',
    price: 120,
    category: 'Displays',
    description: '24-inch Full HD 1080p IPS display with 75Hz refresh rate and ultra-thin bezels.',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=600&q=80',
    stock: 15
  }
];

export const SHIPPING_OPTIONS = [
  { id: 'standard', name: 'Standard Shipping (3-5 Business Days)', price: 5, description: 'Reliable ground delivery' },
  { id: 'express', name: 'Express Shipping (1-2 Business Days)', price: 15, description: 'Fast priority air delivery' },
  { id: 'pickup', name: 'Store Pickup (Phnom Penh Store)', price: 0, description: 'Pick up for free within 2 hours' }
];
