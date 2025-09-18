// import React, { useEffect, useState } from 'react'
// import { useDispatch } from "react-redux";
// import { images } from '../../../Assets'
// import { Container, Row, Col, ProgressBar, Button } from 'react-bootstrap'
// import "./style.css"
// import { Formik, Form, Field } from 'formik'
// import { useFormStatus } from '../../../Hooks/useFormStatus'
// import { productsData, newArrivalsData } from '../../../Config/data'
// import { useNavigate, useParams } from 'react-router-dom'
// import Rating from "react-rating";
// import { FaPlus } from "react-icons/fa6";
// import { FaMinus } from "react-icons/fa6";

// import { FaRegStar, FaStar } from 'react-icons/fa6'
// import { getAll, post } from '../../../Services/Api'
// import { showToast } from '../../../Components/Common/Toast/index'
// import CustomButton from '../../../Components/Common/CustomButton'
// import { getColorName, sizeDisplayMap } from '../../../Utils/helper'
// import { addItem, decreaseQty, increaseQty, removeItem } from "../../../Store/actions";
// import { FaTrash } from "react-icons/fa6";
// import { useSelector } from "react-redux";
// import { cartItems } from "../../../Store/selectors";
// import NewArrivalsSection from "../Home/NewArrivalsSection";

// const ProductView = () => {
//     const { id, slug } = useParams();
//     const dispatch = useDispatch();
//     const cart = useSelector(cartItems);
//     const [selectedColor, setSelectedColor] = useState("");
//     const [selectedSize, setSelectedSize] = useState("");
//     const [inputQuantity, setInputQuantity] = useState(1);
//     const [currentImageIndex, setCurrentImageIndex] = useState(0);

//     const [productData, setProductData] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [newArrivals, setNewArrivals] = useState([]);
//     const [newArrivalsLoading, setNewArrivalsLoading] = useState(false);
//     const [newArrivalsError, setNewArrivalsError] = useState(null);
//     const [reviews, setReviews] = useState([]);
//     const [filteredReviews, setFilteredReviews] = useState([]);
//     const [filtereData, setFilterData] = useState([]);

//     const [reviewsFilter, setReviewsFilter] = useState("All");
//     const navigate = useNavigate();

//     const { isSubmitting, startSubmitting, stopSubmitting } = useFormStatus(); // use your custom hook
//     const getproductDetails = async () => {
//       setLoading(true);
//       setError(null);

//       try {
//           // console.log("=== ProductView Debug Info ===");
//           // console.log("URL Params - ID:", id, "Slug:", slug);
//           // console.log("ProductsData exists:", !!productsData);
//           // console.log("ProductsData structure:", productsData);
//           // console.log("ProductsData.detail exists:", !!productsData?.detail);
//           // console.log("ProductsData.detail.data exists:", !!productsData?.detail?.data);
//           // console.log("ProductsData.detail.data length:", productsData?.detail?.data?.length);
//           // console.log("===============================");

//           // Check if productsData exists and has the correct structure
//           if (!productsData?.detail?.data) {
//               console.log("No products data found in static data");
//               setError("No products data available");
//               setLoading(false);
//               return;
//           }

//           // Find product by ID (try multiple methods)
//           let response = productsData.detail.data.find((item) => item.id === id.toString());

//           if (!response) {
//               // Try with number comparison
//               response = productsData.detail.data.find((item) => Number(item.id) === Number(id));
//           }

//           if (!response) {
//               // Try with string comparison
//               response = productsData.detail.data.find((item) => String(item.id) === String(id));
//           }

//           // console.log("Found product:", response);

//           if (response) {
//               setProductData(response);
//               // console.log("Product details set successfully:", response);
//           } else {
//               console.log("No product found with ID:", id);
//               console.log("Available product IDs:", productsData.detail.data.map(item => item.id));
//               setError(`Product with ID ${id} not found`);
//           }

//         } catch (error) {
//             console.log("Error in fetching the product: ", error);
//             setError("Failed to load product details");
//         } finally {
//             setLoading(false);
//         }
//     };

//     // API call for New Arrivals
//     const getNewArrivals = async () => {
//         setNewArrivalsLoading(true);
//         setNewArrivalsError(null);

//         try {
//             // Replace with your actual API endpoint
//             // const response = await getAll("/user/new-arrivals");
//             const response = newArrivalsData;

//             if (response.status) {
//                 setNewArrivals(response.detail.data || []);
//             } else {
//                 // Fallback to static data if API fails
//                 setNewArrivals(newArrivalsData.status ? newArrivalsData.detail.data : []);
//             }
//         } catch (error) {
//             console.log("Error fetching new arrivals: ", error);
//             setNewArrivalsError("Failed to load new arrivals");
//             // Fallback to static data
//             setNewArrivals(newArrivalsData.status ? newArrivalsData.detail.data : []);
//         } finally {
//             setNewArrivalsLoading(false);
//         }
//     };

//     useEffect(() => {
//         getproductDetails();
//         getNewArrivals(); // Call API for new arrivals
//     }, [id, slug]);

//     // Reset input quantity when product changes
//     useEffect(() => {
//         setInputQuantity(1);
//         setCurrentImageIndex(0);
//         setSelectedColor("");
//         setSelectedSize("");
//     }, [id]);

//     // Get current images based on selected color
//     const getCurrentImages = () => {
//         if (!productData) return [];

//         // If color is selected and has specific images
//         if (selectedColor && productData.colors) {
//             const selectedColorData = productData.colors.find(color =>
//                 (color.value || color) === selectedColor
//             );
//             if (selectedColorData && selectedColorData.images) {
//                 return selectedColorData.images;
//             }
//         }

//         // Fallback to default photos
//         return productData.photos || [];
//     };

//     // Handle color selection and update images
//     const handleColorSelect = (color) => {
//         setSelectedColor(color);
//         setCurrentImageIndex(0); // Reset to first image when color changes
//     };

//     // Get current cart quantity for this product with selected variants
//     const getCartQuantity = () => {
//       if (!cart?.cartItems) return 0;
//       const cartItemId = `${id}_${selectedColor || 'no-color'}_${selectedSize || 'no-size'}`;
//       const cartItem = cart.cartItems.find(item => item.cartItemId === cartItemId);
//       return cartItem ? cartItem.qty : 0;
//     };

//     const currentCartQty = getCartQuantity();

//     // Handle input quantity change
//     const handleQuantityChange = (e) => {
//       const value = parseInt(e.target.value) || 1;
//       setInputQuantity(Math.max(1, Math.min(value, productData?.stock_quantity || 999)));
//     };

//     // Handle Enter key press to add items
//     const handleKeyPress = (e) => {
//       if (e.key === 'Enter') {
//         handleAddToCart();
//       }
//     };

//     // Add items to cart based on input quantity
//     const handleAddToCart = () => {
//       // Validate required selections
//       if (productData?.colors && productData.colors.length > 0 && !selectedColor) {
//         showToast("Please select a color", "warning");
//         return;
//       }

//       if (productData?.sizes && productData.sizes.length > 0 && !selectedSize) {
//         showToast("Please select a size", "warning");
//         return;
//       }

//       const quantityToAdd = inputQuantity;

//       // Prepare product data for cart
//       const productDataForCart = {
//         id: Number(id),
//         name: productData?.name,
//         price: parseFloat(productData?.price) || 0,
//         image: getCurrentImages()[currentImageIndex] || productData?.photos?.[0],
//         color: selectedColor || null,
//         size: selectedSize || null,
//         stock_quantity: productData?.stock_quantity
//       };

//       // Add multiple items at once
//       for (let i = 0; i < quantityToAdd; i++) {
//         dispatch(addItem(productDataForCart));
//       }

//       showToast(`${quantityToAdd} Item(s) Added To Cart!`, "success");
//       // Keep the current quantity instead of resetting to 1
//     };

//     console.log(newArrivals);
//     return (
//       <section className='page-content product-view'>
//         <Container fluid>
//           {/* Loading State */}
//           {loading && (
//             <Row>
//               <Col md={12}>
//                 <div className="text-center py-5">
//                   <div className="spinner-border" role="status">
//                     <span className="visually-hidden">Loading...</span>
//                   </div>
//                   <p className="mt-2">Loading product details...</p>
//                 </div>
//               </Col>
//             </Row>
//           )}

//           {/* Error State */}
//           {error && !loading && (
//             <Row>
//               <Col md={12}>
//                 <div className="alert alert-danger text-center py-5">
//                   <h4>Error Loading Product</h4>
//                   <p>{error}</p>
//                   <button
//                     className="btn btn-primary"
//                     onClick={() => getproductDetails()}
//                   >
//                     Try Again
//                   </button>
//                 </div>
//               </Col>
//             </Row>
//           )}

//           {/* Product Details */}
//           {!loading && !error && productData && (
//             <>
//           <Row>
//             <Col md={6}>
//               <div className="product-media-wrap">
//                 {/* Main Image */}
//                 <div className="product-media-main">
//                   <img
//                     src={getCurrentImages()[currentImageIndex] || productData?.photos?.[0]}
//                     alt={productData?.name || "Product"}
//                     className="main-product-image"
//                   />
//                 </div>

//                 {/* Image Thumbnails */}
//                 {getCurrentImages().length > 1 && (
//                   <div className="product-thumbnails">
//                     {getCurrentImages().map((image, index) => (
//                       <div
//                         key={index}
//                         className={`thumbnail ${currentImageIndex === index ? 'active' : ''}`}
//                         onClick={() => setCurrentImageIndex(index)}
//                       >
//                         <img
//                           src={image}
//                           alt={`${productData?.name} ${index + 1}`}
//                         />
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </Col>
//             <Col md={6} className='d-flex'>
//               <div className="align-self-center flex-grow-1">
//                 <div className="product-view__info">
//                   <div className="product-view__title mb-2">
//                     <h3 className='fw-light'>{productData?.name}</h3>
//                   </div>
//                   {productData?.categories && (
//                     <div className="product-view__categories mb-3">
//                       {productData.categories.map((category, index) => (
//                         <span key={index} className="product-view__category-tag">
//                           {category?.name}
//                         </span>
//                       ))}
//                     </div>
//                   )}
//                   <div className="product-view__price mb-4">
//                       <div className="price fw-semibold"><span className='currency-code'>CHF</span>{productData?.price}</div>
//                   </div>

//                   {/* Color Selector - Only show if product has colors */}
//                   {productData?.colors && productData.colors.length > 0 && (
//                     <div className="mb-3">
//                       <strong>Colors:</strong> <span>{selectedColor ? getColorName(selectedColor) : 'Select a color'}</span>
//                       <div className="d-flex gap-2 mt-2">
//                         {productData.colors.map((color) => (
//                           <div
//                             key={color.value || color}
//                             className={`color-swatch ${selectedColor === (color.value || color) ? "selected" : ""}`}
//                             style={{ backgroundColor: color.value || color }}
//                             onClick={() => handleColorSelect(color.value || color)}
//                             title={color.name || getColorName(color.value || color)}
//                           ></div>
//                         ))}
//                       </div>
//                     </div>
//                   )}

//                   {/* Size Selector - Only show if product has sizes */}
//                   {productData?.sizes && productData.sizes.length > 0 && (
//                     <div className="mb-4">
//                       <strong>Size:</strong> <span>{selectedSize || 'Select a size'}</span>
//                       <div className="d-flex gap-2 mt-2">
//                         {productData.sizes.map((size) => (
//                           <button
//                             key={size}
//                             className={`size-button ${selectedSize === size ? "active" : ""}`}
//                             onClick={() => setSelectedSize(size)}
//                           >
//                             {sizeDisplayMap[size.toLowerCase()] || size.charAt(0).toUpperCase()}
//                           </button>
//                         ))}
//                       </div>
//                     </div>
//                   )}

//                   {productData?.description && (
//                     <div className="product-description">
//                       <p>{productData?.description}</p>
//                     </div>
//                   )}
//                 </div>
//                 <div className="product-view__actions">
//                   <div className="d-flex gap-3">
//                     {productData?.stock_quantity > 0 ? (
//                       <>
//                         <div className="product-info-quantity flex-shrink-0">
//                           <div className="quantity-picker">
//                             <Button
//                               className="quantity-picker__btn quantity-picker__btn--minus"
//                               onClick={() => setInputQuantity(Math.max(1, inputQuantity - 1))}
//                             >
//                           <FaMinus />
//                         </Button>
//                             <input
//                               type="number"
//                               className="quantity-picker__input"
//                               value={inputQuantity}
//                               onChange={handleQuantityChange}
//                               onKeyPress={handleKeyPress}
//                               min="1"
//                               max={productData?.stock_quantity || 999}
//                             />
//                             <Button
//                               className="quantity-picker__btn quantity-picker__btn--plus"
//                               onClick={() => setInputQuantity(Math.min(inputQuantity + 1, productData?.stock_quantity || 999))}
//                             >
//                         <FaPlus />
//                       </Button>
//                           </div>
//                         </div>
//                         <div className="product-view__add-to-cart">
//                           <CustomButton variant="primary" onClick={handleAddToCart}>Add to Cart</CustomButton>
//                         </div>
//                       </>
//                     ) : (
//                       <p className="text-danger fw-bold mb-0">Out of Stock</p>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </Col>
//           </Row>
//           <Row>
//             <Col xs={12} className=''>
//             <NewArrivalsSection
//               data={newArrivals}
//               loading={newArrivalsLoading}
//               error={newArrivalsError}
//               animate={false}
//             />
//             </Col>
//           </Row>
//             </>
//           )}

//           {/* No Product Found */}
//           {!loading && !error && !productData && (
//             <Row>
//               <Col md={12}>
//                 <div className="alert alert-warning text-center py-5">
//                   <h4>Product Not Found</h4>
//                   <p>No product details available.</p>
//                 </div>
//               </Col>
//             </Row>
//           )}
//         </Container>
//       </section>
//     )
// }

// export default ProductView

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
import axios from "axios";

// Helper functions (copied from ProductDetails component)
const mapProduct = (p) => {
  if (!p) return null;
  const name = p.title || p.name || p.slug || "Product";
  const description = p.description || "Description";
  const imageFallback =
    p.main_image || p?.product_meta?.[0]?.images?.[0]?.path || "";
  const skus = Array.isArray(p.skus) ? p.skus : [];
  const variants = skus.map((sku) => {
    const attrs = Array.isArray(sku.attrs) ? sku.attrs : [];
    const colorAttr = attrs.find(
      (a) => String(a.name || "").toLowerCase() === "color"
    );
    const vname =
      colorAttr?.value || colorAttr?.name || sku.sku_id || "Variant";
    const vimage =
      sku.image ||
      (Array.isArray(sku.images) && sku.images[0]?.path) ||
      imageFallback;
    const vprice = sku.price ?? null;
    const vstock = sku.vstock ?? null;
    return {
      name: vname,
      image: vimage,
      hex: hexFromColorName(vname),
      price: vprice,
      vstock,
      sku_id: sku.sku_id,
      stock: sku.stock,
    };
  });
  const priceNum = (() => {
    const nums = variants
      .map((v) => parseFloat(v.price ?? "0"))
      .filter((n) => !Number.isNaN(n) && n > 0);
    if (nums.length) return Math.min(...nums);
    const p0 = parseFloat(p.price ?? "0");
    return Number.isNaN(p0) ? 0 : p0;
  })();
  const currency = p.currency || skus[0]?.currency || "USD";
  const priceStr =
    priceNum > 0
      ? `${currency} ${priceNum}`
      : `${currency} ${p.price || "0.00"}`;
  const image = variants[0]?.image || imageFallback;
  return {
    id: p.id || p.ae_product_id || p.slug,
    name,
    description,
    price: priceStr,
    image,
    variants,
    currency,
    stock: typeof p.stock === "number" ? p.stock : null,
  };
};

const colorFromString = (str) => {
  let h = 0;
  for (let i = 0; i < String(str).length; i++)
    h = (h << 5) - h + String(str).charCodeAt(i);
  const c = (h & 0x00ffffff).toString(16).toUpperCase().padStart(6, "0");
  return `#${c.slice(0, 6)}`;
};

const hexFromColorName = (name) => {
  const n = String(name || "")
    .toLowerCase()
    .trim();
  const map = {
    black: "#111827",
    white: "#f3f4f6",
    gray: "#9ca3af",
    grey: "#9ca3af",
    "light grey": "#cbd5e1",
    "dark grey": "#6b7280",
    red: "#ef4444",
    "light red": "#fca5a5",
    "dark red": "#b91c1c",
    orange: "#f97316",
    "light orange": "#fdba74",
    yellow: "#eab308",
    "light yellow": "#fde68a",
    green: "#22c55e",
    "light green": "#86efac",
    teal: "#14b8a6",
    blue: "#3b82f6",
    "light blue": "#93c5fd",
    purple: "#a855f7",
    violet: "#8b5cf6",
    brown: "#92400e",
    beige: "#f5f5dc",
  };
  if (map[n]) return map[n];
  return colorFromString(n);
};

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

  const { isSubmitting, startSubmitting, stopSubmitting } = useFormStatus();

  // API call for product details
  const getproductDetails = async () => {
    setLoading(true);
    setError(null);

    try {
      // First try to fetch from API
      const res = await axios.get(`/user/product/${id}`);
      const raw = res?.data?.data || res?.data;
      const mapped = mapProduct(raw);

      if (mapped) {
        setProductData(mapped);
      } else {
        // Fallback to static data if API returns nothing
        fallbackToStaticData();
      }
    } catch (e) {
      console.log("API Error, falling back to static data: ", e);
      // Fallback to static data if API fails
      fallbackToStaticData();
    } finally {
      setLoading(false);
    }
  };

  // Fallback to static data
  const fallbackToStaticData = () => {
    if (!productsData?.detail?.data) {
      setError("No products data available");
      return;
    }

    let response = productsData.detail.data.find(
      (item) => item.id === id.toString()
    );

    if (!response) {
      response = productsData.detail.data.find(
        (item) => Number(item.id) === Number(id)
      );
    }

    if (!response) {
      response = productsData.detail.data.find(
        (item) => String(item.id) === String(id)
      );
    }

    if (response) {
      setProductData(response);
    } else {
      setError(`Product with ID ${id} not found`);
    }
  };

  // API call for New Arrivals
  const getNewArrivals = async () => {
    setNewArrivalsLoading(true);
    setNewArrivalsError(null);

    try {
      // Try API first
      const res = await axios.get("/user/new-arrivals");
      const data = res?.data?.data || res?.data;

      if (data) {
        setNewArrivals(Array.isArray(data) ? data : []);
      } else {
        // Fallback to static data
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
    if (id) {
      getproductDetails();
      getNewArrivals();
    }
  }, [id]);

  // Reset input quantity when product changes
  useEffect(() => {
    setInputQuantity(1);
    setCurrentImageIndex(0);
    setSelectedColor("");
    setSelectedSize("");
  }, [id]);

  // Get current images based on selected color or product variants
  const getCurrentImages = () => {
    if (!productData) return [];

    // If using API data with variants
    if (productData.variants && productData.variants.length > 0) {
      // If color is selected, find the variant with that color
      if (selectedColor) {
        const variant = productData.variants.find(
          (v) => v.name.toLowerCase() === selectedColor.toLowerCase()
        );
        if (variant && variant.image) {
          return [variant.image];
        }
      }
      // Return all variant images
      return productData.variants.map((v) => v.image).filter((img) => img);
    }

    // Fallback to original logic for static data
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

  // Handle color selection
  const handleColorSelect = (color) => {
    setSelectedColor(color);
    setCurrentImageIndex(0);
  };

  // Get current cart quantity
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

  // Find product by ID (try multiple methods)
  let response = productsData.detail.data.find(
    (item) => item.id === id.toString()
  );

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

  // Add items to cart
  const handleAddToCart = () => {
    // Validate required selections
    if (
      productData?.variants &&
      productData.variants.length > 0 &&
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
      image: getCurrentImages()[currentImageIndex] || productData?.image,
      color: selectedColor || null,
      size: selectedSize || null,
      stock_quantity: productData?.stock_quantity,
    };

    // Add multiple items at once
    for (let i = 0; i < quantityToAdd; i++) {
      dispatch(addItem(productDataForCart));
    }

    showToast(`${quantityToAdd} Item(s) Added To Cart!`, "success");
  };

  // Determine if product is out of stock
  const isOutOfStock = () => {
    if (productData?.variants && selectedColor) {
      const variant = productData.variants.find(
        (v) => v.name.toLowerCase() === selectedColor.toLowerCase()
      );
      return variant && (variant.stock === 0 || variant.vstock === 0);
    }
    return productData?.stock_quantity === 0;
  };

  return (
    <section className="page-content product-view">
      <Container fluid className="mw-100">
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
          <section className="position-relative">
              {productData?.variants &&
                productData.variants.length > 0 && (
                <div className="color-selector">
                  <div className="color-options">
                    {/* <div className="mb-3">
                      <strong>Colors:</strong>{" "}
                      <span>{selectedColor || "Select a color"}</span>
                      <div className="d-flex gap-2 mt-2">
                        {productData.variants.map((variant) => (
                          <div
                            key={variant.name}
                            className={`color-swatch ${
                              selectedColor === variant.name
                                ? "selected"
                                : ""
                            }`}
                            style={{
                              backgroundColor:
                                variant.hex ||
                                hexFromColorName(variant.name),
                            }}
                            onClick={() => handleColorSelect(variant.name)}
                            title={variant.name}
                          ></div>
                        ))}
                      </div>
                    </div>   */}

                  
                    {productData.variants.map((variant, index) => (
                      <>
                      {
                        console.log("Variant" , variant)
                      }
                    <div
                      key={variant.name || variant}
                      className={`color-option ${
                        selectedColor === (variant.name || variant)
                          ? "selected"
                          : ""
                      }`}
                      onClick={() =>
                        handleColorSelect(variant.name || variant)
                      }
                    >
                      <div
                        className="color-option-swatch"
                        style={{
                          backgroundColor: variant.hex || variant,
                        }}
                      ></div>
                      <div className="color-option-content">
                        {selectedColor === (variant.name || variant) && (
                          <span className="color-selected-label">
                            Select Colors
                          </span>
                        )}
                        <span className="color-option-name">
                          {variant.name ||
                            getColorName(variant.name || variant)}
                        </span>
                      </div>
                    </div>
                      </>
                  ))}
                  
                  </div>
                </div>
              )}
            <Container fluid>
              <Row>
                <Col md={6}>
                  <div className="product-media-wrap">
                    {/* Main Image */}
                    <div className="product-media-main">
                      <img
                        src={
                          getCurrentImages()[currentImageIndex] ||
                          productData?.image
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
                          <span className="currency-code">
                            {productData?.currency || "CHF"}
                          </span>
                          {typeof productData?.price === "string"
                            ? productData.price
                            : productData?.price?.toFixed(2) || "0.00"}
                        </div>
                      </div>

                      {/* Variants/Color Selector */}
                      {
                        console.log("Product Varient" , productData?.variants)
                      }
                      

                      {/* Size Selector */}
                      {/* {productData?.sizes && productData.sizes.length > 0 && (
                                            <div className="mb-4">
                                                <strong>Size:</strong> <span>{selectedSize || 'Select a size'}</span>
                                                <div className="d-flex gap-2 mt-2">
                                                    {productData.sizes.map((size) => (
                                                        <button 
                                                            key={size} 
                                                            className={`size-button ${selectedSize === size ? "active" : ""}`} 
                                                            onClick={() => setSelectedSize(size)}
                                                        >
                                                            {sizeDisplayMap[size.toLowerCase()] || size.charAt(0).toUpperCase()}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                          )} */}
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
                                    <span className="color-selected-label">
                                      Select Colors
                                    </span>
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

                      {productData?.description && (
                        <div className="product-description">
                          <p>{productData.description}</p>
                        </div>
                      )}

                      {/* Stock Status */}
                      {isOutOfStock() && (
                        <div className="text-danger fw-bold mb-3">
                          Out of Stock
                        </div>
                      )}
                    </div>
                    <div className="product-view__actions">
                      <div className="d-flex gap-3">
                        {!isOutOfStock() ? (
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
                          <p className="text-danger fw-bold mb-0"></p>
                        )}
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </section>

         
            <section>
              <Container fluid>
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
              </Container>
            </section>
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
