import React, { useEffect, useRef, useState } from "react";
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
import { transform } from "framer-motion";

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
    const [isScrollingImages, setIsScrollingImages] = useState(false);
    const [imageSliderRef, setImageSliderRef] = useState(null);
    const [isHeaderScrolled, setIsHeaderScrolled] = useState(false);

    const [productData, setProductData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newArrivals, setNewArrivals] = useState([]);
    const [newArrivalsLoading, setNewArrivalsLoading] = useState(false);
    const [newArrivalsError, setNewArrivalsError] = useState(null);
    const navigate = useNavigate();


    const containerRef = useRef(null);
    const leftRef = useRef(null);
    const rightRef = useRef(null);
    const [stickyStyle, setStickyStyle] = useState({});

    useEffect(() => {
        const handleScroll = () => {
            const left = leftRef.current;
            const right = rightRef.current;

            if (!left || !right) return;

            const leftRect = left.getBoundingClientRect();
            const rightHeight = right.offsetHeight;
            const header = document.getElementById("header");
            const headerHeight = header ? header.offsetHeight : 0;
            const topOffset = headerHeight + 90; // header offset

            console.log(topOffset, "topOffset")
            console.log(rightHeight, "right Height")
            console.log(left.offsetTop, "left Height")
            console.log(window.scrollY, "window.scrollY")

            if (
                window.scrollY > left.offsetTop - topOffset &&
                window.scrollY < left.offsetTop + left.offsetHeight - rightHeight - topOffset
            ) {
                // fixed state - smooth transition
                setStickyStyle({
                    position: "fixed",
                    top: topOffset + "px",
                    // width: right.offsetWidth + "px",
                    transition: "all 0.3s ease-out",
                });
            } else if (
                // window.scrollY >= left.offsetTop + left.offsetHeight - rightHeight - topOffset
                window.scrollY >= left.offsetTop + left.offsetHeight - rightHeight - topOffset
            ) {
                // stop at bottom - smooth transition
                setStickyStyle({
                    position: "absolute",
                    bottom: "0",
                    width: right.offsetWidth + "px",
                    transition: "all 0.3s ease-out",
                    // transform: rotateY(rightHeight)
                    // top: "0"
                });
            } else {
                // normal state - smooth transition
                setStickyStyle({
                    position: "static",
                    transition: "all 0.3s ease-out",
                });
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);



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
            // Fetch products from API
            const productsResponseNew = await getAll('/user/products?is_new_arrival=1');

            let productsListNew = [];
            if (productsResponseNew?.data) {
                if (Array.isArray(productsResponseNew.data)) {
                    productsListNew = productsResponseNew.data;
                } else if (Array.isArray(productsResponseNew.data.data)) {
                    productsListNew = productsResponseNew.data.data;
                }
            }

            // Map the products
            const newArrivalsData = productsListNew.map(mapProduct).filter(Boolean);

            // Update state
            setNewArrivals(Array.isArray(newArrivalsData) ? newArrivalsData : []);
        } catch (error) {
            console.error("Error fetching new arrivals: ", error);
            setNewArrivalsError("Failed to load new arrivals");

            // Fallback to empty array
            setNewArrivals([]);
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
        const cartItemId = `${id}_${selectedColor || "no-color"}_${selectedSize || "no-size"
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
            price: productData?.price || 0,
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
                            {/* Color Selector - Only show if product has colors */}
                            {productData?.variants &&
                                productData.variants.length > 0 && (
                                    <div className="color-selector">
                                        <div className="color-options">
                                            {productData.variants.map((variants, index) => (
                                                <div
                                                    key={variants.name || variants}
                                                    className={`color-option ${selectedColor === (variants.name || variants)
                                                        ? "selected"
                                                        : ""
                                                        }`}
                                                    onClick={() =>
                                                        handleColorSelect(variants.name || variants)
                                                    }
                                                >
                                                    <div
                                                        className="color-option-swatch"
                                                        style={{
                                                            backgroundColor: variants.hex || variants,
                                                        }}
                                                    ></div>
                                                    <div className="color-option-content">
                                                        {selectedColor ===
                                                            (variants.name || variants) && (
                                                                <span className="color-selected-label">
                                                                    Select Colors
                                                                </span>
                                                            )}
                                                        <span className="color-option-name">
                                                            {variants.name ||
                                                                getColorName(variants.name || variants)}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            <Container fluid>
                                <div style={{ display: "flex", alignItems: "flex-start" }}>
                                    {/* Left column (images) */}
                                    <div
                                        ref={leftRef}
                                        style={{ flex: "1 1 60%", padding: "20px" }}
                                    >
                                        <div className="product-gallery d-flex gap-4">
                                            {/* {getCurrentImages().length > 1 && (
                        <div
                          className="product-thumbnails-slider flex-shrink-0"
                          ref={setImageSliderRef}
                          onScroll={handleImageScroll}
                          onWheel={handleWheelOnSlider}
                        >
                          {getCurrentImages().map((image, index) => (
                            <div
                              key={index}
                              className={`thumbnail-item ${
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
                      )} */}
                                            <div className="product-slider flex-grow-1">
                                                <div
                                                    className={`${isHeaderScrolled ? "fixed-position" : ""
                                                        }`}
                                                >
                                                    {/* Main Image */}
                                                    {getCurrentImages().length > 1 ? (
                                                        getCurrentImages().map((image, index) => (
                                                            <div
                                                                key={index}
                                                                className={`slide ${currentImageIndex === index ? "active" : ""
                                                                    }`}
                                                                onClick={() => setCurrentImageIndex(index)}
                                                            >
                                                                <img
                                                                    src={image}
                                                                    alt={`${productData?.name} ${index + 1}`}
                                                                />
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <img
                                                            src={productData?.image}
                                                            alt={productData?.name || "Product"}
                                                            className="main-product-image"
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right column (details) */}
                                    <div
                                        style={{
                                            flex: "1 1 40%",
                                            padding: "20px",
                                            position: "relative",
                                        }}
                                    >
                                        <div
                                            ref={rightRef}
                                            style={{
                                                ...stickyStyle,
                                            }}
                                        >
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
                                                        {/* <span className="currency-code">
                              {productData?.currency || "CHF"}
                            </span> */}
                                                        {typeof productData?.price === "string"
                                                            ? productData.price
                                                            : productData?.price?.toFixed(2) || "0.00"}
                                                    </div>
                                                </div>

                                                {/* Variants/Color Selector */}
                                                {/* {console.log("Product Varient", productData?.variants)} */}



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
                                    </div>
                                </div>
                            </Container>
                        </section>
                        <section>
                            <Container fluid>
                                <Row>
                                    <Col xs={12} className="">
                                        {productData?.description}
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
