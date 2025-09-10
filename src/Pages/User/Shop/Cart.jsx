import React from "react";
import PageHeader from "../../../Components/Common/PageHeader";
import Breadcrumbs from "../../../Components/Common/Breadcrumbs";

const Cart = () => {
  // Define breadcrumb paths directly
  const breadcrumbPaths = [["Home", "/"], ["Shop", "/shop"], ["Cart"]];

  // Define icon directly for this page
  const breadcrumbIcon = "🛒";

  return (
    <>
      <PageHeader pageHeading="Shopping Cart" />
      <Breadcrumbs
        paths={breadcrumbPaths}
        icon={breadcrumbIcon}
        separator="•" // Bullet separator
        className="mt-2"
      />
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header">
                <h5>Cart Items</h5>
              </div>
              <div className="card-body">
                <div className="text-center py-4">
                  <p className="text-muted">Your cart is empty</p>
                  <a href="/shop" className="btn btn-primary">
                    Continue Shopping
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-header">
                <h5>Order Summary</h5>
              </div>
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <span>Subtotal:</span>
                  <span>$0.00</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Tax:</span>
                  <span>$0.00</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                  <strong>Total:</strong>
                  <strong>$0.00</strong>
                </div>
                <button className="btn btn-success w-100 mt-3" disabled>
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
