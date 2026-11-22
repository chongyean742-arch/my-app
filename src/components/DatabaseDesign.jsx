import React, { useState } from 'react';

export default function DatabaseDesign() {
  const [activeTab, setActiveTab] = useState('erd');
  const [copied, setCopied] = useState(false);

  const sqlScript = `-- ========================================================
-- E-COMMERCE ORDER DATABASE SCHEMA (MySQL / PostgreSQL compatible)
-- Tables: Customers, Categories, Products, Orders, Order_Items
-- ========================================================

-- 1. Table: Categories
CREATE TABLE Categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Table: Products
CREATE TABLE Products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(150) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
    stock_quantity INT NOT NULL DEFAULT 0 CHECK (stock_quantity >= 0),
    category_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_products_category
        FOREIGN KEY (category_id) REFERENCES Categories(category_id)
        ON DELETE RESTRICT ON UPDATE CASCADE
);

-- 3. Table: Customers
CREATE TABLE Customers (
    customer_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    phone_number VARCHAR(25) NOT NULL,
    address TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Table: Orders
CREATE TABLE Orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    order_number VARCHAR(50) NOT NULL UNIQUE, -- e.g. 'ORD-0001'
    customer_id INT NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    shipping_method VARCHAR(100) NOT NULL,
    shipping_fee DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    subtotal DECIMAL(10, 2) NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    order_status ENUM('Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled') NOT NULL DEFAULT 'Pending',
    CONSTRAINT fk_orders_customer
        FOREIGN KEY (customer_id) REFERENCES Customers(customer_id)
        ON DELETE RESTRICT ON UPDATE CASCADE
);

-- 5. Table: Order_Items
CREATE TABLE Order_Items (
    order_item_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL CHECK (quantity > 0),
    unit_price DECIMAL(10, 2) NOT NULL CHECK (unit_price >= 0),
    item_total DECIMAL(10, 2) GENERATED ALWAYS AS (quantity * unit_price) STORED,
    CONSTRAINT fk_order_items_order
        FOREIGN KEY (order_id) REFERENCES Orders(order_id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_order_items_product
        FOREIGN KEY (product_id) REFERENCES Products(product_id)
        ON DELETE RESTRICT ON UPDATE CASCADE
);

-- Sample Data Insertion for Testing
INSERT INTO Categories (category_name, description) VALUES
('Computers', 'Laptops, Desktops, and Computer sets'),
('Accessories', 'Mice, Keyboards, Audio, Cables'),
('Displays', 'Monitors, screens, and display adapters');

INSERT INTO Products (product_name, price, stock_quantity, category_id) VALUES
('Laptop', 650.00, 12, 1),
('Mouse', 15.00, 45, 2),
('Keyboard', 25.00, 28, 2),
('Monitor', 120.00, 15, 3);
`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(sqlScript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h2 className="section-title">Practical Exercise: Database Design (ERD)</h2>
          <p className="section-desc">
            ការរចនា Database និងទំនាក់ទំនងរវាង Tables (Entity-Relationship Diagram & Data Dictionary)
          </p>
        </div>
        <div className="erd-tab-buttons">
          <button
            className={`btn-subtab ${activeTab === 'erd' ? 'active' : ''}`}
            onClick={() => setActiveTab('erd')}
          >
            📊 Visual ERD
          </button>
          <button
            className={`btn-subtab ${activeTab === 'tables' ? 'active' : ''}`}
            onClick={() => setActiveTab('tables')}
          >
            📋 Data Dictionary
          </button>
          <button
            className={`btn-subtab ${activeTab === 'sql' ? 'active' : ''}`}
            onClick={() => setActiveTab('sql')}
          >
            💾 SQL Schema
          </button>
        </div>
      </div>

      {activeTab === 'erd' && (
        <div className="erd-content-block">
          <div className="card erd-overview-card">
            <h3 className="card-heading">🎯 ទំនាក់ទំនងរវាង Tables ទាំង ៥ (ERD Relationships)</h3>
            <p className="erd-summary-intro">
              នៅក្នុងប្រព័ន្ធ E-Commerce នេះ មានតារាងសំខាន់ៗចំនួន ៥ ដែលមានទំនាក់ទំនង (Relationships) ដូចខាងក្រោម៖
            </p>

            <div className="relationship-list">
              <div className="rel-card">
                <div className="rel-badge">1 : N (One-to-Many)</div>
                <h4>Categories (1) &rarr; Products (N)</h4>
                <p>
                  ប្រភេទ (Category) មួយ អាចមានផលិតផល (Products) ច្រើន។ ប៉ុន្តែផលិតផលនីមួយៗស្ថិតនៅក្នុង Category តែមួយ។
                  <br />
                  <span className="code-tag">FK: Products.category_id &rarr; Categories.category_id</span>
                </p>
              </div>

              <div className="rel-card">
                <div className="rel-badge">1 : N (One-to-Many)</div>
                <h4>Customers (1) &rarr; Orders (N)</h4>
                <p>
                  អតិថិជន (Customer) ម្នាក់ អាចធ្វើការបញ្ជាទិញ (Orders) បានច្រើនដង។ ប៉ុន្តែការបញ្ជាទិញមួយជារបស់អតិថិជនតែម្នាក់។
                  <br />
                  <span className="code-tag">FK: Orders.customer_id &rarr; Customers.customer_id</span>
                </p>
              </div>

              <div className="rel-card">
                <div className="rel-badge">1 : N (One-to-Many)</div>
                <h4>Orders (1) &rarr; Order_Items (N)</h4>
                <p>
                  ការបញ្ជាទិញ (Order) មួយ អាចមានទំនិញជាច្រើនមុខ (Order_Items)។
                  <br />
                  <span className="code-tag">FK: Order_Items.order_id &rarr; Orders.order_id</span>
                </p>
              </div>

              <div className="rel-card">
                <div className="rel-badge">1 : N (One-to-Many)</div>
                <h4>Products (1) &rarr; Order_Items (N)</h4>
                <p>
                  ផលិតផល (Product) មួយ អាចត្រូវបានបញ្ជាទិញនៅក្នុង Order_Items ច្រើនដងដោយអតិថិជនផ្សេងៗគ្នា។
                  <br />
                  <span className="code-tag">FK: Order_Items.product_id &rarr; Products.product_id</span>
                </p>
              </div>
            </div>

            <div className="many-to-many-note">
              <strong>💡 ចំណាំសំខាន់ (Note on Many-to-Many):</strong>
              <p>
                រវាង <strong>Orders</strong> និង <strong>Products</strong> គឺជាទំនាក់ទំនង <strong>Many-to-Many (N:M)</strong> 
                (Order មួយមាន Products ច្រើន ហើយ Product មួយអាចស្ថិតក្នុង Orders ច្រើន)។ 
                ដូច្នេះយើងបង្កើតតារាងកណ្ដាល (Junction Table) គឺ <strong>Order_Items</strong> 
                ដើម្បីបំបែកទំនាក់ទំនង Many-to-Many នេះឱ្យទៅជា 1:N ចំនួនពីរ!
              </p>
            </div>
          </div>

          {/* Visual ERD Diagram Box */}
          <div className="erd-canvas-card card">
            <h3 className="card-heading">📐 គំនូសតាង ERD Diagram</h3>
            <div className="erd-flow-diagram">
              {/* Row 1: Categories and Customers */}
              <div className="erd-diagram-row">
                <div className="erd-table-box table-category">
                  <div className="table-header-bar">
                    <span className="table-icon">📂</span> Categories
                  </div>
                  <ul className="table-field-list">
                    <li className="pk-field"><span className="key-badge pk">PK</span> category_id (INT)</li>
                    <li>category_name (VARCHAR)</li>
                    <li>description (TEXT)</li>
                    <li>created_at (TIMESTAMP)</li>
                  </ul>
                </div>

                <div className="erd-arrow-h">&rarr; 1:N &rarr;</div>

                <div className="erd-table-box table-product">
                  <div className="table-header-bar">
                    <span className="table-icon">📦</span> Products
                  </div>
                  <ul className="table-field-list">
                    <li className="pk-field"><span className="key-badge pk">PK</span> product_id (INT)</li>
                    <li>product_name (VARCHAR)</li>
                    <li>description (TEXT)</li>
                    <li>price (DECIMAL)</li>
                    <li>stock_quantity (INT)</li>
                    <li className="fk-field"><span className="key-badge fk">FK</span> category_id (INT)</li>
                  </ul>
                </div>
              </div>

              {/* Junction Connector */}
              <div className="erd-junction-zone">
                <div className="erd-arrow-v">&darr; 1:N &darr;</div>
              </div>

              {/* Row 2: Order Items (Center Junction) */}
              <div className="erd-diagram-row center-junction">
                <div className="erd-table-box table-order-items">
                  <div className="table-header-bar junction-header">
                    <span className="table-icon">📑</span> Order_Items (Junction Table)
                  </div>
                  <ul className="table-field-list">
                    <li className="pk-field"><span className="key-badge pk">PK</span> order_item_id (INT)</li>
                    <li className="fk-field"><span className="key-badge fk">FK</span> order_id (INT)</li>
                    <li className="fk-field"><span className="key-badge fk">FK</span> product_id (INT)</li>
                    <li>quantity (INT)</li>
                    <li>unit_price (DECIMAL)</li>
                    <li>item_total (DECIMAL)</li>
                  </ul>
                </div>
              </div>

              <div className="erd-junction-zone">
                <div className="erd-arrow-v">&uarr; 1:N &uarr;</div>
              </div>

              {/* Row 3: Orders and Customers */}
              <div className="erd-diagram-row">
                <div className="erd-table-box table-customer">
                  <div className="table-header-bar">
                    <span className="table-icon">👤</span> Customers
                  </div>
                  <ul className="table-field-list">
                    <li className="pk-field"><span className="key-badge pk">PK</span> customer_id (INT)</li>
                    <li>first_name (VARCHAR)</li>
                    <li>last_name (VARCHAR)</li>
                    <li>email (VARCHAR)</li>
                    <li>phone_number (VARCHAR)</li>
                    <li>address (TEXT)</li>
                    <li>created_at (TIMESTAMP)</li>
                  </ul>
                </div>

                <div className="erd-arrow-h">&rarr; 1:N &rarr;</div>

                <div className="erd-table-box table-orders">
                  <div className="table-header-bar">
                    <span className="table-icon">🧾</span> Orders
                  </div>
                  <ul className="table-field-list">
                    <li className="pk-field"><span className="key-badge pk">PK</span> order_id (INT)</li>
                    <li>order_number (VARCHAR)</li>
                    <li className="fk-field"><span className="key-badge fk">FK</span> customer_id (INT)</li>
                    <li>order_date (TIMESTAMP)</li>
                    <li>shipping_method (VARCHAR)</li>
                    <li>shipping_fee (DECIMAL)</li>
                    <li>subtotal (DECIMAL)</li>
                    <li>total_amount (DECIMAL)</li>
                    <li>order_status (VARCHAR/ENUM)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'tables' && (
        <div className="card dictionary-card">
          <h3 className="card-heading">📋 Data Dictionary (ការពិពណ៌នាលម្អិតអំពី Tables ទាំង ៥)</h3>

          {/* Customers Table */}
          <div className="dict-table-block">
            <h4>1. Table: Customers (តារាងអតិថិជន)</h4>
            <table className="dict-table">
              <thead>
                <tr>
                  <th>Column Name</th>
                  <th>Data Type</th>
                  <th>Constraint</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>customer_id</td><td>INT</td><td>PRIMARY KEY, AUTO_INCREMENT</td><td>លេខសម្គាល់អតិថិជន</td></tr>
                <tr><td>first_name</td><td>VARCHAR(100)</td><td>NOT NULL</td><td>នាមខ្លួន (First name)</td></tr>
                <tr><td>last_name</td><td>VARCHAR(100)</td><td>NOT NULL</td><td>នាមត្រកូល (Last name)</td></tr>
                <tr><td>email</td><td>VARCHAR(150)</td><td>NOT NULL, UNIQUE</td><td>អាសយដ្ឋានអ៊ីមែល</td></tr>
                <tr><td>phone_number</td><td>VARCHAR(25)</td><td>NOT NULL</td><td>លេខទូរស័ព្ទទំនាក់ទំនង</td></tr>
                <tr><td>address</td><td>TEXT</td><td>NOT NULL</td><td>អាសយដ្ឋានដឹកជញ្ជូន</td></tr>
                <tr><td>created_at</td><td>TIMESTAMP</td><td>DEFAULT CURRENT_TIMESTAMP</td><td>កាលបរិច្ឆេទបង្កើតគណនី</td></tr>
              </tbody>
            </table>
          </div>

          {/* Categories Table */}
          <div className="dict-table-block">
            <h4>2. Table: Categories (តារាងប្រភេទផលិតផល)</h4>
            <table className="dict-table">
              <thead>
                <tr>
                  <th>Column Name</th>
                  <th>Data Type</th>
                  <th>Constraint</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>category_id</td><td>INT</td><td>PRIMARY KEY, AUTO_INCREMENT</td><td>លេខសម្គាល់ប្រភេទផលិតផល</td></tr>
                <tr><td>category_name</td><td>VARCHAR(100)</td><td>NOT NULL, UNIQUE</td><td>ឈ្មោះប្រភេទ (e.g. Computers, Accessories)</td></tr>
                <tr><td>description</td><td>TEXT</td><td>NULL</td><td>ការពិពណ៌នាអំពីប្រភេទ</td></tr>
                <tr><td>created_at</td><td>TIMESTAMP</td><td>DEFAULT CURRENT_TIMESTAMP</td><td>កាលបរិច្ឆេទបង្កើត</td></tr>
              </tbody>
            </table>
          </div>

          {/* Products Table */}
          <div className="dict-table-block">
            <h4>3. Table: Products (តារាងផលិតផល)</h4>
            <table className="dict-table">
              <thead>
                <tr>
                  <th>Column Name</th>
                  <th>Data Type</th>
                  <th>Constraint</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>product_id</td><td>INT</td><td>PRIMARY KEY, AUTO_INCREMENT</td><td>លេខសម្គាល់ផលិតផល</td></tr>
                <tr><td>product_name</td><td>VARCHAR(150)</td><td>NOT NULL</td><td>ឈ្មោះផលិតផល (Laptop, Mouse, etc.)</td></tr>
                <tr><td>description</td><td>TEXT</td><td>NULL</td><td>ពត៌មានលម្អិតពីផលិតផល</td></tr>
                <tr><td>price</td><td>DECIMAL(10,2)</td><td>NOT NULL</td><td>តម្លៃរាយផលិតផល ($650, $15, etc.)</td></tr>
                <tr><td>stock_quantity</td><td>INT</td><td>NOT NULL, DEFAULT 0</td><td>ចំនួនទំនិញក្នុងស្តុក</td></tr>
                <tr><td>category_id</td><td>INT</td><td>FOREIGN KEY &rarr; Categories</td><td>ភ្ជាប់ទៅកាន់ Categories</td></tr>
                <tr><td>created_at</td><td>TIMESTAMP</td><td>DEFAULT CURRENT_TIMESTAMP</td><td>កាលបរិច្ឆេទបន្ថែម</td></tr>
              </tbody>
            </table>
          </div>

          {/* Orders Table */}
          <div className="dict-table-block">
            <h4>4. Table: Orders (តារាងការបញ្ជាទិញ)</h4>
            <table className="dict-table">
              <thead>
                <tr>
                  <th>Column Name</th>
                  <th>Data Type</th>
                  <th>Constraint</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>order_id</td><td>INT</td><td>PRIMARY KEY, AUTO_INCREMENT</td><td>លេខសម្គាល់ Order (Internal PK)</td></tr>
                <tr><td>order_number</td><td>VARCHAR(50)</td><td>NOT NULL, UNIQUE</td><td>លេខកូដវិក្កយបត្រ (e.g. ORD-0001)</td></tr>
                <tr><td>customer_id</td><td>INT</td><td>FOREIGN KEY &rarr; Customers</td><td>អតិថិជនដែលបានកុម្ម៉ង់</td></tr>
                <tr><td>order_date</td><td>TIMESTAMP</td><td>DEFAULT CURRENT_TIMESTAMP</td><td>កាលបរិច្ឆេទបញ្ជាទិញ</td></tr>
                <tr><td>shipping_method</td><td>VARCHAR(100)</td><td>NOT NULL</td><td>វិធីសាស្ត្រដឹកជញ្ជូន</td></tr>
                <tr><td>shipping_fee</td><td>DECIMAL(10,2)</td><td>NOT NULL, DEFAULT 0.00</td><td>ថ្លៃដឹកជញ្ជូន ($5, $15, $0)</td></tr>
                <tr><td>subtotal</td><td>DECIMAL(10,2)</td><td>NOT NULL</td><td>តម្លៃទំនិញសរុប (មុនបូកថ្លៃដឹក)</td></tr>
                <tr><td>total_amount</td><td>DECIMAL(10,2)</td><td>NOT NULL</td><td>តម្លៃសរុបរួម (Grand Total)</td></tr>
                <tr><td>order_status</td><td>VARCHAR(50)</td><td>DEFAULT 'Pending'</td><td>ស្ថានភាព Order: Pending, Shipped, etc.</td></tr>
              </tbody>
            </table>
          </div>

          {/* Order_Items Table */}
          <div className="dict-table-block">
            <h4>5. Table: Order_Items (តារាងទំនិញក្នុង Order នីមួយៗ - Junction Table)</h4>
            <table className="dict-table">
              <thead>
                <tr>
                  <th>Column Name</th>
                  <th>Data Type</th>
                  <th>Constraint</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>order_item_id</td><td>INT</td><td>PRIMARY KEY, AUTO_INCREMENT</td><td>លេខសម្គាល់បន្ទាត់ទំនិញ</td></tr>
                <tr><td>order_id</td><td>INT</td><td>FOREIGN KEY &rarr; Orders</td><td>ភ្ជាប់ទៅកាន់ Order</td></tr>
                <tr><td>product_id</td><td>INT</td><td>FOREIGN KEY &rarr; Products</td><td>ភ្ជាប់ទៅកាន់ Product ដែលទិញ</td></tr>
                <tr><td>quantity</td><td>INT</td><td>NOT NULL, CHECK &gt; 0</td><td>ចំនួនទំនិញដែលបានទិញ</td></tr>
                <tr><td>unit_price</td><td>DECIMAL(10,2)</td><td>NOT NULL</td><td>តម្លៃរាយនៅពេលកុម្ម៉ង់</td></tr>
                <tr><td>item_total</td><td>DECIMAL(10,2)</td><td>NOT NULL</td><td>សរុប = quantity * unit_price</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'sql' && (
        <div className="card sql-card">
          <div className="sql-card-header">
            <h3>💾 SQL DDL Create Table Script</h3>
            <button className="btn-secondary" onClick={copyToClipboard}>
              {copied ? '✓ Copied!' : '📋 Copy SQL Code'}
            </button>
          </div>
          <pre className="sql-code-block">
            <code>{sqlScript}</code>
          </pre>
        </div>
      )}
    </div>
  );
}
