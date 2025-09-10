import React from "react";
import PageHeader from "../../../Components/Common/PageHeader";
import Breadcrumbs from "../../../Components/Common/Breadcrumbs";

const ProductDetail = () => {
  // Define breadcrumb paths directly
  const breadcrumbPaths = [
    ["Home", "/"],
    ["Shop", "/shop"],
    ["Products", "/shop/products"],
    ["Product Detail"],
  ];

  // Define icon directly for this page
  const breadcrumbIcon = "📦";

  return (
    <>
      <PageHeader pageHeading="Product Detail" />
      <Breadcrumbs
        paths={breadcrumbPaths}
        icon={breadcrumbIcon}
        separator="»" // Double arrow separator
        className="mt-2"
      />
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-6">
            <img
              src="/placeholder.jpg"
              alt="Product"
              className="img-fluid rounded"
              style={{ height: "400px", objectFit: "cover" }}
            />
          </div>
          <div className="col-md-6">
            <h3>Product Name</h3>
            <p className="text-muted">Product Description</p>
            <h4 className="text-primary">$99.99</h4>
            <button className="btn btn-primary">Add to Cart</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
