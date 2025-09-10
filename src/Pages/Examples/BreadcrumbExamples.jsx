import React from "react";
import Breadcrumbs from "../../../Components/Common/Breadcrumbs";

const BreadcrumbExamples = () => {
  return (
    <div className="container mt-4">
      <h2>Breadcrumb Examples</h2>

      <div className="row mt-4">
        <div className="col-12">
          <h4>1. Simple Breadcrumb</h4>
          <Breadcrumbs
            paths={[["Home", "/"], ["Shop", "/shop"], ["Products"]]}
            className="mb-4"
          />
        </div>

        <div className="col-12">
          <h4>2. Breadcrumb with Icon</h4>
          <Breadcrumbs
            paths={[["Home", "/"], ["Admin", "/admin"], ["Dashboard"]]}
            icon="👨‍💼"
            className="mb-4"
          />
        </div>

        <div className="col-12">
          <h4>3. Long Breadcrumb Path</h4>
          <Breadcrumbs
            paths={[
              ["Home", "/"],
              ["Admin", "/admin"],
              ["Products", "/admin/products"],
              ["Categories", "/admin/products/categories"],
              ["Electronics", "/admin/products/categories/electronics"],
              ["Smartphones"],
            ]}
            className="mb-4"
          />
        </div>

        <div className="col-12">
          <h4>4. Auto-generated Breadcrumb</h4>
          <Breadcrumbs className="mb-4" />
        </div>

        <div className="col-12">
          <h4>5. Custom Styling</h4>
          <Breadcrumbs
            paths={[["🏠 Home", "/"], ["🛍️ Shop", "/shop"], ["📦 Products"]]}
            className="mb-4"
            showHome={false}
          />
        </div>
      </div>

      <div className="mt-5">
        <h3>Usage Examples:</h3>
        <pre className="bg-light p-3 rounded">
          {`// Basic usage
<Breadcrumbs 
  paths={[
    ['Home', '/'],
    ['Shop', '/shop'],
    ['Products']
  ]}
/>

// With icon
<Breadcrumbs 
  paths={[
    ['Home', '/'],
    ['Admin', '/admin'],
    ['Dashboard']
  ]}
  icon="👨‍💼"
/>

// Auto-generated (uses current route)
<Breadcrumbs />

// Using the hook
const breadcrumbPaths = useBreadcrumbs([
  ['Home', '/'],
  ['Shop', '/shop'],
  ['Products']
]);
const breadcrumbIcon = useBreadcrumbIcon();

<Breadcrumbs 
  paths={breadcrumbPaths} 
  icon={breadcrumbIcon}
/>`}
        </pre>
      </div>
    </div>
  );
};

export default BreadcrumbExamples;
