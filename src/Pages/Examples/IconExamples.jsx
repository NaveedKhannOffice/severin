import React from "react";
import Breadcrumbs from "../../../Components/Common/Breadcrumbs";

const IconExamples = () => {
  return (
    <div className="container mt-4">
      <h2>Breadcrumb Icon Examples - Direct Definition</h2>

      <div className="row mt-4">
        <div className="col-12">
          <h4>1. Shop Page with Shopping Icon</h4>
          <Breadcrumbs
            paths={[["Home", "/"], ["Shop", "/shop"], ["Products"]]}
            icon="🛍️"
            className="mb-4"
          />
        </div>

        <div className="col-12">
          <h4>2. Admin Panel with Admin Icon</h4>
          <Breadcrumbs
            paths={[["Home", "/"], ["Admin", "/admin"], ["Dashboard"]]}
            icon="👨‍💼"
            className="mb-4"
          />
        </div>

        <div className="col-12">
          <h4>3. User Profile with User Icon</h4>
          <Breadcrumbs
            paths={[["Home", "/"], ["Profile", "/profile"], ["Settings"]]}
            icon="👤"
            className="mb-4"
          />
        </div>

        <div className="col-12">
          <h4>4. Cart Page with Cart Icon</h4>
          <Breadcrumbs
            paths={[["Home", "/"], ["Shop", "/shop"], ["Cart"]]}
            icon="🛒"
            className="mb-4"
          />
        </div>

        <div className="col-12">
          <h4>5. Products Page with Product Icon</h4>
          <Breadcrumbs
            paths={[["Home", "/"], ["Shop", "/shop"], ["Products"]]}
            icon="📦"
            className="mb-4"
          />
        </div>

        <div className="col-12">
          <h4>6. Settings Page with Settings Icon</h4>
          <Breadcrumbs
            paths={[["Home", "/"], ["Profile", "/profile"], ["Settings"]]}
            icon="⚙️"
            className="mb-4"
          />
        </div>

        <div className="col-12">
          <h4>7. Reports Page with Reports Icon</h4>
          <Breadcrumbs
            paths={[["Home", "/"], ["Admin", "/admin"], ["Reports"]]}
            icon="📈"
            className="mb-4"
          />
        </div>

        <div className="col-12">
          <h4>8. Analytics Page with Analytics Icon</h4>
          <Breadcrumbs
            paths={[["Home", "/"], ["Admin", "/admin"], ["Analytics"]]}
            icon="📊"
            className="mb-4"
          />
        </div>
      </div>

      <div className="mt-5">
        <h3>Code Examples:</h3>
        <pre className="bg-light p-3 rounded">
          {`// Shop Page
const breadcrumbIcon = "🛍️";

// Admin Page  
const breadcrumbIcon = "👨‍💼";

// Profile Page
const breadcrumbIcon = "👤";

// Cart Page
const breadcrumbIcon = "🛒";

// Products Page
const breadcrumbIcon = "📦";

// Settings Page
const breadcrumbIcon = "⚙️";

// Reports Page
const breadcrumbIcon = "📈";

// Analytics Page
const breadcrumbIcon = "📊";

// Usage in component
<Breadcrumbs 
  paths={breadcrumbPaths} 
  icon={breadcrumbIcon}
/>`}
        </pre>
      </div>

      <div className="mt-4">
        <h3>Available Icons:</h3>
        <div className="row">
          <div className="col-md-3">
            <p>
              <strong>🛍️</strong> - Shop
            </p>
            <p>
              <strong>👨‍💼</strong> - Admin
            </p>
            <p>
              <strong>👤</strong> - Profile
            </p>
            <p>
              <strong>🛒</strong> - Cart
            </p>
          </div>
          <div className="col-md-3">
            <p>
              <strong>📦</strong> - Products
            </p>
            <p>
              <strong>⚙️</strong> - Settings
            </p>
            <p>
              <strong>📈</strong> - Reports
            </p>
            <p>
              <strong>📊</strong> - Analytics
            </p>
          </div>
          <div className="col-md-3">
            <p>
              <strong>🔐</strong> - Auth
            </p>
            <p>
              <strong>👥</strong> - Users
            </p>
            <p>
              <strong>📋</strong> - Orders
            </p>
            <p>
              <strong>🏠</strong> - Home
            </p>
          </div>
          <div className="col-md-3">
            <p>
              <strong>📝</strong> - Blog
            </p>
            <p>
              <strong>💬</strong> - Messages
            </p>
            <p>
              <strong>🔔</strong> - Notifications
            </p>
            <p>
              <strong>⭐</strong> - Favorites
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IconExamples;
