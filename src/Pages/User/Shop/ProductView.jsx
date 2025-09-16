import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { images } from "../../../Assets";
import { Container, Row, Col, ProgressBar, Button } from "react-bootstrap";
import "./style.css";
import { Formik, Form, Field } from "formik";
import { useFormStatus } from "../../../Hooks/useFormStatus";
import { productsData, newArrivalsData } from "../../../Config/data";
import { useNavigate, useParams } from "react-router-dom";
import Rating from "react-rating";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";

import { FaRegStar, FaStar } from "react-icons/fa6";
import { getAll, post } from "../../../Services/Api";
import { showToast } from "../../../Components/Common/Toast/index";
import CustomButton from "../../../Components/Common/CustomButton";
import { getColorName, sizeDisplayMap } from "../../../Utils/helper";
import {
  addItem,
  decreaseQty,
  increaseQty,
  removeItem,
} from "../../../Store/actions";
import { FaTrash } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { cartItems } from "../../../Store/selectors";
import NewArrivalsSection from "../Home/NewArrivalsSection";

const ProductView = () => {
  const { id, slug } = useParams();
  const dispatch = useDispatch();
  const cart = useSelector(cartItems);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [inputQuantity, setInputQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newArrivals, setNewArrivals] = useState([]);
  const [newArrivalsLoading, setNewArrivalsLoading] = useState(false);
  const [newArrivalsError, setNewArrivalsError] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [filtereData, setFilterData] = useState([]);

  const [reviewsFilter, setReviewsFilter] = useState("All");
  const navigate = useNavigate();

  const { isSubmitting, startSubmitting, stopSubmitting } = useFormStatus(); // use your custom hook
  const getproductDetails = async () => {
    setLoading(true);
    setError(null);

    try {
      // console.log("=== ProductView Debug Info ===");
      // console.log("URL Params - ID:", id, "Slug:", slug);
      // console.log("ProductsData exists:", !!productsData);
      // console.log("ProductsData structure:", productsData);
      // console.log("ProductsData.detail exists:", !!productsData?.detail);
      // console.log("ProductsData.detail.data exists:", !!productsData?.detail?.data);
      // console.log("ProductsData.detail.data length:", productsData?.detail?.data?.length);
      // console.log("===============================");

      // Check if productsData exists and has the correct structure
      if (!productsData?.detail?.data) {
        console.log("No products data found in static data");
        setError("No products data available");
        setLoading(false);
        return;
      }

      // Find product by ID (try multiple methods)
      let response = productsData.detail.data.find(
        (item) => item.id === id.toString()
      );

      if (!response) {
        // Try with number comparison
        response = productsData.detail.data.find(
          (item) => Number(item.id) === Number(id)
        );
      }

      if (!response) {
        // Try with string comparison
        response = productsData.detail.data.find(
          (item) => String(item.id) === String(id)
        );
      }

      // console.log("Found product:", response);

      if (response) {
        setProductData(response);
        // console.log("Product details set successfully:", response);
      } else {
        console.log("No product found with ID:", id);
        console.log(
          "Available product IDs:",
          productsData.detail.data.map((item) => item.id)
        );
        setError(`Product with ID ${id} not found`);
      }
    } catch (error) {
      console.log("Error in fetching the product: ", error);
      setError("Failed to load product details");
    } finally {
      setLoading(false);
    }
  };

  // API call for New Arrivals
  const getNewArrivals = async () => {
    setNewArrivalsLoading(true);
    setNewArrivalsError(null);

    try {
      // Replace with your actual API endpoint
      // const response = await getAll("/user/new-arrivals");
      const response = newArrivalsData;

      if (response.status) {
        setNewArrivals(response.detail.data || []);
      } else {
        // Fallback to static data if API fails
        setNewArrivals(
          newArrivalsData.status ? newArrivalsData.detail.data : []
        );
      }
    } catch (error) {
      console.log("Error fetching new arrivals: ", error);
      setNewArrivalsError("Failed to load new arrivals");
      // Fallback to static data
      setNewArrivals(newArrivalsData.status ? newArrivalsData.detail.data : []);
    } finally {
      setNewArrivalsLoading(false);
    }
  };

  useEffect(() => {
    getproductDetails();
    getNewArrivals(); // Call API for new arrivals
  }, [id, slug]);

  // Reset input quantity when product changes
  useEffect(() => {
    setInputQuantity(1);
    setCurrentImageIndex(0);
    setSelectedColor("");
    setSelectedSize("");
  }, [id]);

  // Get current images based on selected color
  const getCurrentImages = () => {
    if (!productData) return [];

    // If color is selected and has specific images
    if (selectedColor && productData.colors) {
      const selectedColorData = productData.colors.find(
        (color) => (color.value || color) === selectedColor
      );
      if (selectedColorData && selectedColorData.images) {
        return selectedColorData.images;
      }
    }

    // Fallback to default photos
    return productData.photos || [];
  };

  // Handle color selection and update images
  const handleColorSelect = (color) => {
    setSelectedColor(color);
    setCurrentImageIndex(0); // Reset to first image when color changes
  };

  // Get current cart quantity for this product with selected variants
  const getCartQuantity = () => {
    if (!cart?.cartItems) return 0;
    const cartItemId = `${id}_${selectedColor || "no-color"}_${
      selectedSize || "no-size"
    }`;
    const cartItem = cart.cartItems.find(
      (item) => item.cartItemId === cartItemId
    );
    return cartItem ? cartItem.qty : 0;
  };

  const currentCartQty = getCartQuantity();

  // Handle input quantity change
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value) || 1;
    setInputQuantity(
      Math.max(1, Math.min(value, productData?.stock_quantity || 999))
    );
  };

  // Handle Enter key press to add items
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddToCart();
    }
  };

  // Add items to cart based on input quantity
  const handleAddToCart = () => {
    // Validate required selections
    if (
      productData?.colors &&
      productData.colors.length > 0 &&
      !selectedColor
    ) {
      showToast("Please select a color", "warning");
      return;
    }

    if (productData?.sizes && productData.sizes.length > 0 && !selectedSize) {
      showToast("Please select a size", "warning");
      return;
    }

    const quantityToAdd = inputQuantity;

    // Prepare product data for cart
    const productDataForCart = {
      id: Number(id),
      name: productData?.name,
      price: parseFloat(productData?.price) || 0,
      image: getCurrentImages()[currentImageIndex] || productData?.photos?.[0],
      color: selectedColor || null,
      size: selectedSize || null,
      stock_quantity: productData?.stock_quantity,
    };

    // Add multiple items at once
    for (let i = 0; i < quantityToAdd; i++) {
      dispatch(addItem(productDataForCart));
    }

    showToast(`${quantityToAdd} Item(s) Added To Cart!`, "success");
    // Keep the current quantity instead of resetting to 1
  };

  console.log(newArrivals);
  return (
    <section className="page-content product-view">
      <Container fluid>
        {/* Loading State */}
        {loading && (
          <Row>
            <Col md={12}>
              <div className="text-center py-5">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-2">Loading product details...</p>
              </div>
            </Col>
          </Row>
        )}

        {/* Error State */}
        {error && !loading && (
          <Row>
            <Col md={12}>
              <div className="alert alert-danger text-center py-5">
                <h4>Error Loading Product</h4>
                <p>{error}</p>
                <button
                  className="btn btn-primary"
                  onClick={() => getproductDetails()}
                >
                  Try Again
                </button>
              </div>
            </Col>
          </Row>
        )}

        {/* Product Details */}
        {!loading && !error && productData && (
          <>
            <Row>
              <Col md={6}>
                <div className="product-media-wrap">
                  {/* Main Image */}
                  <div className="product-media-main">
                    <img
                      src={
                        getCurrentImages()[currentImageIndex] ||
                        productData?.photos?.[0]
                      }
                      alt={productData?.name || "Product"}
                      className="main-product-image"
                    />
                  </div>

                  {/* Image Thumbnails */}
                  {getCurrentImages().length > 1 && (
                    <div className="product-thumbnails">
                      {getCurrentImages().map((image, index) => (
                        <div
                          key={index}
                          className={`thumbnail ${
                            currentImageIndex === index ? "active" : ""
                          }`}
                          onClick={() => setCurrentImageIndex(index)}
                        >
                          <img
                            src={image}
                            alt={`${productData?.name} ${index + 1}`}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </Col>
              <Col md={6} className="d-flex">
                <div className="align-self-center flex-grow-1">
                  <div className="product-view__info">
                    <div className="product-view__title mb-2">
                      <h3 className="fw-light">{productData?.name}</h3>
                    </div>
                    {productData?.categories && (
                      <div className="product-view__categories mb-3">
                        {productData.categories.map((category, index) => (
                          <span
                            key={index}
                            className="product-view__category-tag"
                          >
                            {category?.name}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="product-view__price mb-4">
                      <div className="price fw-semibold">
                        <span className="currency-code">CHF</span>
                        {productData?.price}
                      </div>
                    </div>

                    {/* Color Selector - Only show if product has colors */}
                    {productData?.colors && productData.colors.length > 0 && (
                      <div className="color-selector">
                        {/* <div className="color-selector-header">
                          <h6 className="color-selector-title">
                            Select Colors
                          </h6>
                          <div className="selected-color-info">
                            {selectedColor ? (
                              <div className="selected-color-display">
                                <div
                                  className="selected-color-swatch"
                                  style={{ backgroundColor: selectedColor }}
                                ></div>
                                <span className="selected-color-name">
                                  {getColorName(selectedColor)}
                                </span>
                              </div>
                            ) : (
                              <span className="no-color-selected">
                                Select a color
                              </span>
                            )}
                          </div>
                        </div> */}

                        <div className="color-options">
                          {productData.colors.map((color, index) => (
                            <div
                              key={color.value || color}
                              className={`color-option ${
                                selectedColor === (color.value || color)
                                  ? "selected"
                                  : ""
                              }`}
                              onClick={() =>
                                handleColorSelect(color.value || color)
                              }
                            >
                              <div
                                className="color-option-swatch"
                                style={{
                                  backgroundColor: color.value || color,
                                }}
                              ></div>
                              <div className="color-option-content">
                                {selectedColor === (color.value || color) && (
                                  <span className="color-selected-label">Select Colors</span> 
                                )}
                                <span className="color-option-name">
                                  {color.name ||
                                    getColorName(color.value || color)}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Size Selector - Only show if product has sizes */}
                    {productData?.sizes && productData.sizes.length > 0 && (
                      <div className="mb-4">
                        <strong>Size:</strong>{" "}
                        <span>{selectedSize || "Select a size"}</span>
                        <div className="d-flex gap-2 mt-2">
                          {productData.sizes.map((size) => (
                            <button
                              key={size}
                              className={`size-button ${
                                selectedSize === size ? "active" : ""
                              }`}
                              onClick={() => setSelectedSize(size)}
                            >
                              {sizeDisplayMap[size.toLowerCase()] ||
                                size.charAt(0).toUpperCase()}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {productData?.description && (
                      <div className="product-description">
                        <p>{productData?.description}</p>
                      </div>
                    )}
                  </div>
                  <div className="product-view__actions">
                    <div className="d-flex gap-3">
                      {productData?.stock_quantity > 0 ? (
                        <>
                          <div className="product-info-quantity flex-shrink-0">
                            <div className="quantity-picker">
                              <Button
                                className="quantity-picker__btn quantity-picker__btn--minus"
                                onClick={() =>
                                  setInputQuantity(
                                    Math.max(1, inputQuantity - 1)
                                  )
                                }
                              >
                                <FaMinus />
                              </Button>
                              <input
                                type="number"
                                className="quantity-picker__input"
                                value={inputQuantity}
                                onChange={handleQuantityChange}
                                onKeyPress={handleKeyPress}
                                min="1"
                                max={productData?.stock_quantity || 999}
                              />
                              <Button
                                className="quantity-picker__btn quantity-picker__btn--plus"
                                onClick={() =>
                                  setInputQuantity(
                                    Math.min(
                                      inputQuantity + 1,
                                      productData?.stock_quantity || 999
                                    )
                                  )
                                }
                              >
                                <FaPlus />
                              </Button>
                            </div>
                          </div>
                          <div className="product-view__add-to-cart">
                            <CustomButton
                              variant="primary"
                              onClick={handleAddToCart}
                            >
                              Add to Cart
                            </CustomButton>
                          </div>
                        </>
                      ) : (
                        <p className="text-danger fw-bold mb-0">Out of Stock</p>
                      )}
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs={12} className="">
                <NewArrivalsSection
                  data={newArrivals}
                  loading={newArrivalsLoading}
                  error={newArrivalsError}
                  animate={false}
                />
              </Col>
            </Row>
          </>
        )}

        {/* No Product Found */}
        {!loading && !error && !productData && (
          <Row>
            <Col md={12}>
              <div className="alert alert-warning text-center py-5">
                <h4>Product Not Found</h4>
                <p>No product details available.</p>
              </div>
            </Col>
          </Row>
        )}
      </Container>
    </section>
  );
};

export default ProductView;
