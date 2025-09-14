import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import PageHeader from "../../../Components/Common/PageHeader";
import CustomButton from "../../../Components/Common/CustomButton";
import { Col, Container, Row, Button, Card, Form } from "react-bootstrap";
import { FaPlus, FaMinus, FaTrash, } from "react-icons/fa6";
import { FiTag } from "react-icons/fi";
import { BsCartX } from "react-icons/bs";
import { images } from "../../../Assets";
import { cartItems } from "../../../Store/selectors";
import { increaseQty, decreaseQty, removeItem } from "../../../Store/actions";
import { showToast } from "../../../Components/Common/Toast/index";
import TextInput from "../../../Components/Common/FormElements/TextInput";
import { slugify } from "../../../Utils/helper";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector(cartItems);
  const [promoCode, setPromoCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [inputValues, setInputValues] = useState({});
  
  // Define breadcrumb paths directly
  const breadcrumbPaths = [["Home", "/"], ["Shop", "/shop"], ["Cart"]];

  // Calculate cart totals
  const calculateSubtotal = () => {
    if (!cart?.cartItems) return 0;
    return cart.cartItems.reduce((total, item) => {
      return total + (item.price * item.qty);
    }, 0);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const deliveryCharges = subtotal > 0 ? 10 : 0; // $10 delivery charges
    return subtotal + deliveryCharges - appliedDiscount;
  };

  const subtotal = calculateSubtotal();
  const deliveryCharges = subtotal > 0 ? 10 : 0;
  const total = calculateTotal();

  // Handle promo code application
  const handleApplyPromoCode = () => {
    if (!promoCode.trim()) {
      showToast("Please enter a promo code", "error");
      return;
    }

    // Mock promo codes for demo
    const validPromoCodes = {
      "SAVE10": 10,
      "WELCOME20": 20,
      "FREESHIP": deliveryCharges,
      "DISCOUNT15": 15
    };

    const discount = validPromoCodes[promoCode.toUpperCase()];
    if (discount) {
      setAppliedDiscount(discount);
      showToast(`Promo code "${promoCode}" applied! Discount: CHF ${discount}`, "success");
    } else {
      showToast("Invalid promo code", "error");
    }
  };

  // Handle quantity changes
  const handleIncreaseQty = (id, showToastMessage = true) => {
    dispatch(increaseQty(id));
    if (showToastMessage) {
      showToast("Quantity increased", "success");
    }
  };

  const handleDecreaseQty = (id, showToastMessage = true) => {
    dispatch(decreaseQty(id));
    if (showToastMessage) {
      showToast("Quantity decreased", "success");
    }
  };

  const handleRemoveItem = (cartItemId) => {
    dispatch(removeItem(cartItemId));
    showToast("Item removed from cart", "success");
  };

  // Handle Enter key press for quantity input
  const handleKeyPress = (e, cartItemId) => {
    if (e.key === 'Enter') {
      const newQuantity = Math.max(1, parseInt(e.target.value) || 1);
      handleQuantityChange(cartItemId, newQuantity);
      // Clear local state
      setInputValues(prev => ({
        ...prev,
        [cartItemId]: undefined
      }));
    }
  };

  const handleQuantityChange = (cartItemId, newQuantity) => {
    const quantity = parseInt(newQuantity) || 1;
    const validQuantity = Math.max(1, quantity);
    
    // Find current quantity and calculate difference
    const cartItem = cart.cartItems.find(item => item.cartItemId === cartItemId);
    if (!cartItem) return;
    
    const currentQty = cartItem.qty;
    const difference = validQuantity - currentQty;
    
    if (difference > 0) {
      // Increase quantity - dispatch directly without toast
      for (let i = 0; i < difference; i++) {
        dispatch(increaseQty(cartItemId));
      }
    } else if (difference < 0) {
      // Decrease quantity - dispatch directly without toast
      for (let i = 0; i < Math.abs(difference); i++) {
        dispatch(decreaseQty(cartItemId));
      }
    }
    
    showToast(`Quantity updated to ${validQuantity}`, "success");
  };

  return (
    <>
     <PageHeader
        pageHeading="Shopping Cart"
        breadcrumb={true}
        breadcrumbPaths={breadcrumbPaths}
      />
      <section className="page-content cart-page">
        <Container fluid>
           {cart?.cartItems?.length > 0 ? (
        <Row>
          <Col lg={8} className="d-flex flex-column">
            {/* Cart Items */}
            <div className="cart-items flex-grow-1">
              {cart.cartItems.map((item, index) => (
                <div key={item.cartItemId} className="cart-item-card">
                  <div className="d-flex align-items-start p-3">
                    {/* Product Image */}
                    <div className="product-image me-3">
                    <Link to={`/product/${item.id}/${slugify(item.name)}`}>
                      <img 
                        src={item.image || images.placeholder} 
                        alt={item.name || "Product"}
                      />
                      </Link>
                    </div>
                    
                    {/* Product Details */}
                    <div className="product-details flex-grow-1">
                      <div className="d-flex justify-content-between align-items-start mb-4">
                        <div>
                          <h6 className="product-name mb-1">
                          <Link to={`/product/${item.id}/${slugify(item.name)}`}>
                            {item.name || `Product ${item.id}`}
                          </Link>
                          </h6>
                          <div className="product-attributes text-muted small">
                            {item.color && <span>Color: {item.color}</span>}
                            {item.size && <span>Size: {item.size}</span>}
                          </div>
                        </div>
                        <Button 
                          variant="link" 
                          className="remove-btn text-danger p-0"
                          onClick={() => handleRemoveItem(item.cartItemId)}
                        >
                          <FaTrash size={16} />
                        </Button>
                      </div>
                      
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="product-price">
                          <span className='currency-code'>CHF</span> {item.price || 0}
                        </div>
                        
                        {/* Quantity Controls */}
                        <div className="quantity-picker quantity-controls d-flex align-items-center">
                          <Button 
                            className="quantity-picker__btn quantity-picker__btn--minus"
                            onClick={() => handleDecreaseQty(item.cartItemId)}
                            disabled={item.qty <= 1}
                          >
                            <FaMinus />
                          </Button>
                          <input  type="number"
                            className="quantity-picker__input" 
                            value={inputValues[item.cartItemId] !== undefined ? inputValues[item.cartItemId] : item.qty}
                            onChange={(e) => {
                              const value = Math.max(1, parseInt(e.target.value) || 1);
                              setInputValues(prev => ({
                                ...prev,
                                [item.cartItemId]: value
                              }));
                            }}
                            onKeyPress={(e) => handleKeyPress(e, item.cartItemId)}
                            onBlur={(e) => {
                              // Only update if the input value is different from current cart quantity
                              const value = Math.max(1, parseInt(e.target.value) || 1);
                              const currentCartQty = cart.cartItems.find(cartItem => cartItem.cartItemId === item.cartItemId)?.qty || 0;
                              
                              if (value !== currentCartQty) {
                                handleQuantityChange(item.cartItemId, value);
                              }
                              
                              // Clear local state
                              setInputValues(prev => ({
                                ...prev,
                                [item.cartItemId]: undefined
                              }));
                            }}
                            min="1"
                            max={item.stock_quantity || 999}
                          />
                          <Button
                            className="quantity-picker__btn quantity-picker__btn--plus"
                            onClick={() => handleIncreaseQty(item.cartItemId)}
                          >
                            <FaPlus />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Col>
               
          <Col lg={4}>
            {/* Order Summary */}
            <Card className="cart-total sticky-top">
              <Card.Header className="px-3 py-3">
                <Card.Title className="mb-0">Order Summary</Card.Title>
              </Card.Header>
              <Card.Body className="px-3 py-3">   
                <div className="checkout-item sub-total">
                  <h6 className="item-title mb-0">Subtotal</h6>
                  <span className="item-value"><span className='currency-code'>CHF</span> {subtotal.toFixed(2)}</span>
                </div>
                <div className="checkout-item sub-total">
                  <h6 className="item-title mb-0">Shipping (under CHF 50)</h6>
                  <span className="item-value">Free</span>
                </div>
                <div className="checkout-item delivery-charges">
                  <h6 className="item-title mb-0">Discount</h6>
                  <span className="item-value">
                    {appliedDiscount > 0 ? (
                      <span className='currency-code'>CHF</span> - appliedDiscount.toFixed(2)
                    ) : (
                      "---"
                    )}
                  </span>
                </div>
              </Card.Body>
              <Card.Footer className="px-3 py-3"> 
                <div className="checkout-item cart-total-price mb-3">
                  <h5 className="item-title mb-0">Total</h5>
                  <span className="item-value"><span className='currency-code'>CHF</span> {total.toFixed(2)}</span>
                </div>
                
                {/* Promo Code Section */}
                <div className="promo-code-section mb-3">
                  <div className="d-flex gap-2">
                    <TextInput
                      type="text"
                      placeholder="Add promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      inputIcon={FiTag}
                    />
                    <CustomButton
                      variant="primary"
                      onClick={handleApplyPromoCode}
                      className="px-4"
                    >
                      Apply
                    </CustomButton>
                  </div>
                </div>

                <div className="checkout-actions d-flex flex-column gap-2">
                  <CustomButton
                    variant="primary"
                    className="w-100"
                    onClick={() => navigate('/checkout')}
                    >
                    Go To Checkout
                  </CustomButton>
                  <CustomButton
                    variant="outline-primary"
                    className="w-100"
                    onClick={() => navigate('/shop')}
                  >
                  Continue Shopping
                  </CustomButton>
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
           ) : (
            <Row>
              <Col md={12}>
                <div className="text-center">
                  <div className="mb-4">
                  <BsCartX size={70} />
                  </div>
                  <h3 className="mb-3">Your cart is empty</h3>
                  <p className="text-muted mb-4">Looks like you haven't added any items to your cart yet.</p>
                  <CustomButton
                    variant="primary"
                    onClick={() => navigate('/shop')}
                  >
                    Return to Shop
                  </CustomButton>
              </div>
            </Col>
          </Row>
           )}
        </Container>
      </section>
    </>
  );
};

export default Cart;
