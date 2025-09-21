// import React, { useState, useMemo } from "react";
// import {
//   Container,
//   Row,
//   Col,
//   Card,
//   Form,
//   Button,
//   ButtonGroup,
// } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import PageHeader from "../../../Components/Common/PageHeader";
// import { productsData } from "../../../Config/data";
// import { images } from "../../../Assets";
// import "./style.css";
// import { slugify } from "../../../Utils/helper";


// const Shop = () => {
//   const [sortBy, setSortBy] = useState("");
//   const [viewMode, setViewMode] = useState("grid"); // "grid" or "list"
//   const [searchTerm, setSearchTerm] = useState("");

//   // Define breadcrumb paths directly
//   const breadcrumbPaths = [["Home", "/"], ["Shop"]];

//   // Get products from data with error handling
//   const products = productsData?.detail?.data || [];

//   // Debug logging
//   console.log("Products data:", productsData);
//   console.log("Products array:", products);
//   console.log("Products length:", products.length);

//   // Filter and sort products
//   const filteredAndSortedProducts = useMemo(() => {
//     if (!products || products.length === 0) {
//       console.log("No products available");
//       return [];
//     }

//     let filtered = products.filter(
//       (product) =>
//         product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         product.category?.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     // Sort products
//     if (sortBy) {
//       filtered.sort((a, b) => {
//         switch (sortBy) {
//           case "name":
//             return a.name.localeCompare(b.name);
//           case "price-low":
//             return (
//               parseFloat(a.price.replace(/[^\d.]/g, "")) -
//               parseFloat(b.price.replace(/[^\d.]/g, ""))
//             );
//           case "price-high":
//             return (
//               parseFloat(b.price.replace(/[^\d.]/g, "")) -
//               parseFloat(a.price.replace(/[^\d.]/g, ""))
//             );
//           case "rating":
//             return parseFloat(b.rating) - parseFloat(a.rating);
//           case "newest":
//             return new Date(b.created_at) - new Date(a.created_at);
//           case "oldest":
//             return new Date(a.created_at) - new Date(b.created_at);
//           default:
//             return 0;
//         }
//       });
//     }

//     return filtered;
//   }, [products, sortBy, searchTerm]);

//   const handleSortChange = (e) => {
//     setSortBy(e.target.value);
//   };

//   const handleViewModeChange = (mode) => {
//     setViewMode(mode);
//   };

//   return (
//     <>
//       <PageHeader
//         pageHeading="Our Products"
//         breadcrumb={true}
//         breadcrumbPaths={breadcrumbPaths}
//       />
//       <section className="page-content shop-page">
//         <Container fluid>
//           {/* Header Controls */}
//           <Row className="shop-header mb-2">
//             <Col xs={12} md={6} className="align-self-center">
//               <div className="d-flex align-items-center">
//                 <h2 className="shop-title mb-0">Our Products</h2>
//                 <span className="product-count ms-3 text-muted">
//                   ({filteredAndSortedProducts.length} products)
//                 </span>
//               </div>
//             </Col>

//             <Col xs={12} md={6}>
//               <div className="d-flex flex-column flex-md-row gap-3 align-items-md-end justify-content-end">
//                 {/* Search */}
//                 <Form.Control
//                   type="text"
//                   placeholder="Search products..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="search-input"
//                 />

//                 {/* Sort Dropdown */}
//                 <Form.Select
//                   value={sortBy}
//                   onChange={handleSortChange}
//                   className="sort-select"
//                 >
//                   <option value="">Sort by</option>
//                   <option value="name">Sort by Name</option>
//                   <option value="price-low">Price: Low to High</option>
//                   <option value="price-high">Price: High to Low</option>
//                   <option value="rating">Rating</option>
//                   <option value="newest">Newest First</option>
//                   <option value="oldest">Oldest First</option>
//                 </Form.Select>

//                 {/* View Mode Toggle */}
//                 <ButtonGroup className="view-toggle">
//                   <Button
//                     variant={viewMode === "grid" ? "primary" : "grid"}
//                     onClick={() => handleViewModeChange("grid")}
//                   >
//                     <images.GridIcon />
//                   </Button>
//                   <Button
//                     variant={viewMode === "list" ? "primary" : "grid"}
//                     onClick={() => handleViewModeChange("list")}
//                   >
//                     <images.GridIconV />
//                   </Button>
//                 </ButtonGroup>
//               </div>
//             </Col>
//           </Row>

//           {/* Products Grid/List */}
//           <Row
//             className={viewMode === "grid" ? "products-grid" : "products-list"}
//           >
//             {products.length === 0 ? (
//               <Col xs={12} className="text-center">
//                 <div className="alert alert-warning" role="alert">
//                   <h4>No Products Available</h4>
//                   <p>There are no products in the database. Please check the data configuration.</p>
//                 </div>
//               </Col>
//             ) : filteredAndSortedProducts.length > 0 ? (
//               filteredAndSortedProducts.map((product, index) => (
//                 <Col
//                   key={product.id}
//                   xs={12}
//                   sm={viewMode === "grid" ? 6 : 6}
//                   md={viewMode === "grid" ? 4 : 6}
//                   lg={viewMode === "grid" ? 3 : 6}
//                   className="mb-4"
//                 >
//                   <Card
//                     className={`product-card h-100 ${
//                       viewMode === "list" ? "list-view" : ""
//                     }`}
//                   >
//                     <div className="position-relative">
//                     <Link to={`/product/${product.id}/${slugify(product.name || 'product')}`}>
//                       <Card.Img
//                         variant="top"
//                         src={product.photos?.[0] || product.medias?.[0]?.media_path || images.placeholder}
//                         alt={product.name || "Product"}
//                         className="card-image"
//                       />
//                     </Link>
//                     </div>

//                     <Card.Body className="position-relative px-0 pb-0">
//                       <div className="d-flex mb-3">
//                         <div className="flex-grow-1">
//                           <Card.Title className="mb-0">
//                             <Link
//                               to={`/product/${product.id}/${slugify(product.name || 'product')}`}
//                               className="text-decoration-none"
//                             >
//                               {product.name || `Product ${product.id}`}
//                             </Link>
//                           </Card.Title>
//                         </div>
//                         <div className="flex-shrink-0">
//                           <div className="price fw-bold"> <span className='currency-code'>CHF</span>{product.price || '0'}</div>
//                         </div>
//                       </div>

//                       <div className="product-attributes-wrapper">
//                         {/* Color options */}
//                         {product.colors && (
//                           <div className="d-flex gap-4 align-items-center">
//                             <small className="attribute-name flex-shrink-0">
//                               Colors:
//                             </small>
//                             <div className="d-flex gap-1">
//                               {product.colors
//                                 .slice(0, 3)
//                                 .map((color, colorIndex) => (
//                                   <div
//                                     key={colorIndex}
//                                     className="color-swatch"
//                                     style={{
//                                       width: "16px",
//                                       height: "16px",
//                                       backgroundColor: color.value,
//                                       borderRadius: "50%",
//                                       border: "1px solid #ddd",
//                                     }}
//                                     title={color.name}
//                                   />
//                                 ))}
//                             </div>
//                           </div>
//                         )}

//                         {/* Size options */}
//                         {product.sizes && (
//                           <div className="mb-0 d-flex gap-4 align-items-center">
//                             <small className="attribute-name flex-shrink-0">
//                               Sizes: {product.sizes.join(" / ")}
//                             </small>
//                           </div>
//                         )}
//                       </div>
//                       {viewMode === "list" && (
//                         <div className="product-short-description my-4">
//                           <p>{product.short_description}</p>
//                         </div>
//                       )}

//                       <div className={`d-flex justify-content-end align-items-center ${viewMode === "grid" ? 'mt-1' : "mt-3"}`}>
//                         <Link
//                           to={`/product/${product.id}/${slugify(product.name || 'product')}`}
//                           className="btn btn-link"
//                         >
//                           — See Details
//                         </Link>
//                       </div>
//                     </Card.Body>
//                   </Card>
//                 </Col>
//               ))
//             ) : (
//               <Col xs={12} className="text-center">
//                 <div className="alert alert-info" role="alert">
//                   No products found matching your search criteria.
//                 </div>
//               </Col>
//             )}
//           </Row>
//         </Container>
//       </section>
//     </>
//   );
// };

// export default Shop;





import React, { useState, useMemo, useEffect } from "react";
import {
   Container,
   Row,
   Col,
   Card,
   Form,
   Button,
   ButtonGroup,
   Spinner
} from "react-bootstrap";
import { Link } from "react-router-dom";
import PageHeader from "../../../Components/Common/PageHeader";
import { productsData } from "../../../Config/data";
import { images } from "../../../Assets";
import "./style.css";
import { slugify } from "../../../Utils/helper";
import axios from "axios";

const Shop = () => {
   const [sortBy, setSortBy] = useState("");
   const [viewMode, setViewMode] = useState("grid"); // "grid" or "list"
   const [searchTerm, setSearchTerm] = useState("");
   const [products, setProducts] = useState([]);
   const [loading, setLoading] = useState(true);
   const [visible, setVisible] = useState(12); // Initial number of products to show
   const loadMoreCount = 12; // Number of products to load each time

   // Define breadcrumb paths directly
   const breadcrumbPaths = [["Home", "/"], ["Shop"]];

   // Simple HTTP fetch function since the http util might not exist
   const fetchData = async (url) => {
      try {
         const response = await axios.get(url);
         return response;
      } catch (error) {
         console.error('Error fetching data:', error);
         throw error;
      }
   };

   // Simple toast notification function
   const showToast = (message, type = 'error') => {
      // You can replace this with a proper toast notification library
      console[type](message);
      // For a real implementation, you might want to use react-toastify or similar
   };

   // Load products from API
   useEffect(() => {
      let cancelled = false;
      async function load() {
         setLoading(true);
         try {
            // Replace with your actual API endpoint
            const apiUrl = '/user/products'; // Update this to your actual API endpoint
            const data = await fetchData(apiUrl);
            const raw = data?.data;
            
            let list = [];
            if (Array.isArray(raw)) list = raw;
            else if (Array.isArray(raw?.data)) list = raw.data;
            else if (raw?.data && typeof raw.data === 'object') list = [raw.data];
            else list = [];

            const mapped = list.map(mapProduct).filter(Boolean);
            if (!cancelled) setProducts(mapped.length ? mapped : []);
         } catch (err) {
            showToast('Could not load products');
            if (!cancelled) setProducts([]);
         } finally {
            if (!cancelled) setLoading(false);
         }
      }
      load();
      return () => { cancelled = true };
   }, []);

   // Filter and sort products
   const filteredAndSortedProducts = useMemo(() => {
      if (!products || products.length === 0) {
         return [];
      }

      let filtered = products.filter(
         (product) =>
            product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.category?.toLowerCase().includes(searchTerm.toLowerCase())
      );

      // Sort products
      if (sortBy) {
         filtered.sort((a, b) => {
            const priceVal = (p) => {
               if (!p) return 0;
               const nums = String(p).match(/([\d.]+)/g);
               if (!nums || !nums.length) return 0;
               return Math.min(...nums.map((n) => parseFloat(n)));
            };

            switch (sortBy) {
               case "name":
                  return a.name.localeCompare(b.name);
               case "price-low":
                  return priceVal(a.price) - priceVal(b.price);
               case "price-high":
                  return priceVal(b.price) - priceVal(a.price);
               case "newest":
                  return new Date(b.created_at) - new Date(a.created_at);
               case "oldest":
                  return new Date(a.created_at) - new Date(b.created_at);
               default:
                  return 0;
            }
         });
      }

      return filtered;
   }, [products, sortBy, searchTerm]);

   const visibleProducts = filteredAndSortedProducts.slice(0, visible);

   const handleSortChange = (e) => {
      setSortBy(e.target.value);
   };

   const handleViewModeChange = (mode) => {
      setViewMode(mode);
   };

   const loadMore = () => {
      setVisible((v) => Math.min(v + loadMoreCount, filteredAndSortedProducts.length));
   };

   return (
      <>
         <PageHeader
            pageHeading="Our Products"
            breadcrumb={true}
            breadcrumbPaths={breadcrumbPaths}
         />
         <section className="page-content shop-page">
            <Container fluid>
               {/* Header Controls */}
               <Row className="shop-header mb-2">
                  <Col xs={12} md={6} className="align-self-center">
                     <div className="d-flex align-items-center">
                        <h2 className="shop-title mb-0">Our Products</h2>
                        <span className="product-count ms-3 text-muted">
                           ({filteredAndSortedProducts.length} products)
                        </span>
                     </div>
                  </Col>

                  <Col xs={12} md={6}>
                     <div className="d-flex flex-column flex-md-row gap-3 align-items-md-end justify-content-end">
                        {/* Search */}
                        <Form.Control
                           type="text"
                           placeholder="Search products..."
                           value={searchTerm}
                           onChange={(e) => setSearchTerm(e.target.value)}
                           className="search-input"
                        />

                        {/* Sort Dropdown */}
                        <Form.Select
                           value={sortBy}
                           onChange={handleSortChange}
                           className="sort-select"
                        >
                           <option value="">Sort by</option>
                           <option value="name">Sort by Name</option>
                           <option value="price-low">Price: Low to High</option>
                           <option value="price-high">Price: High to Low</option>
                           <option value="newest">Newest First</option>
                           <option value="oldest">Oldest First</option>
                        </Form.Select>

                        {/* View Mode Toggle */}
                        <ButtonGroup className="view-toggle">
                           <Button
                              variant={viewMode === "grid" ? "primary" : "grid"}
                              onClick={() => handleViewModeChange("grid")}
                           >
                              <images.GridIcon />
                           </Button>
                           <Button
                              variant={viewMode === "list" ? "primary" : "grid"}
                              onClick={() => handleViewModeChange("list")}
                           >
                              <images.GridIconV />
                           </Button>
                        </ButtonGroup>
                     </div>
                  </Col>
               </Row>

               {/* Products Grid/List */}
               {loading ? (
                  <Row className="justify-content-center my-5">
                     <Col xs="auto">
                        <Spinner animation="border" role="status">
                           <span className="visually-hidden">Loading products...</span>
                        </Spinner>
                        <p className="text-center mt-2">Loading products...</p>
                     </Col>
                  </Row>
               ) : (
                  <>
                     <Row
                        className={viewMode === "grid" ? "products-grid" : "products-list"}
                     >
                        {products.length === 0 ? (
                           <Col xs={12} className="text-center">
                              <div className="alert alert-warning" role="alert">
                                 <h4>No Products Available</h4>
                                 <p>There are no products in the database.</p>
                              </div>
                           </Col>
                        ) : visibleProducts.length > 0 ? (
                           visibleProducts.map((product, index) => (
                              <Col
                                 key={product.id + '-' + index}
                                 xs={12}
                                 sm={viewMode === "grid" ? 6 : 6}
                                 md={viewMode === "grid" ? 4 : 6}
                                 lg={viewMode === "grid" ? 3 : 6}
                                 className="mb-4"
                              >
                                 <ProductCard product={product} viewMode={viewMode} />
                              </Col>
                           ))
                        ) : (
                           <Col xs={12} className="text-center">
                              <div className="alert alert-info" role="alert">
                                 No products found matching your search criteria.
                              </div>
                           </Col>
                        )}
                     </Row>

                     {/* Load More Button */}
                     {visible < filteredAndSortedProducts.length && (
                        <Row className="mt-4">
                           <Col className="text-center">
                              <Button
                                 variant="outline-primary"
                                 onClick={loadMore}
                                 disabled={loading}
                              >
                                 Load More
                              </Button>
                           </Col>
                        </Row>
                     )}
                  </>
               )}
            </Container>
         </section>
      </>
   );
};

// Product Card Component
function ProductCard({ product, viewMode }) {
   const hasVariants = Array.isArray(product.variants) && product.variants.length > 0;
   const defaultIdx = hasVariants ? Math.max(0, product.variants.findIndex(v => v.image || (v.price && parseFloat(v.price) > 0) || (v.stock && v.stock > 0))) : 0;
   const [idx, setIdx] = React.useState(defaultIdx);

   const currentImage = hasVariants ? (product.variants[idx].image || product.image) : product.image;
   const currentPrice = hasVariants && product.variants[idx]?.price ?
      `${product.currency || ''} ${product.variants[idx].price}` : product.price;

   return (
      <Card className={`product-card h-100 ${viewMode === "list" ? "list-view" : ""}`}>
         <div className="position-relative">
            <Link to={`/product/${product.id}/${slugify(product.name || 'product')}`}>
               <Card.Img
                  variant="top"
                  src={currentImage}
                  alt={product.name || "Product"}
                  className="card-image"
                  onError={(e) => {
                     e.target.src = images.placeholder;
                  }}
               />
            </Link>
         </div>

         <Card.Body className="position-relative px-0 pb-0">
            <div className="d-flex mb-3">
               <div className="flex-grow-1">
                  <Card.Title className="mb-0">
                     <Link
                        to={`/product/${product.id}/${slugify(product.name || 'product')}`}
                        className="text-decoration-none"
                     >
                        {product.name || `Product ${product.id}`}
                     </Link>
                  </Card.Title>
               </div>
               <div className="flex-shrink-0">
                  <div className="price fw-bold">{currentPrice}</div>
               </div>
            </div>

            <div className="product-attributes-wrapper">
               {/* Color options */}
               {hasVariants && (
                  <div className="d-flex gap-4 align-items-center">
                     <small className="attribute-name flex-shrink-0">
                        Colors:
                     </small>
                     <div className="d-flex gap-1">
                        {product.variants
                           .slice(0, 3)
                           .map((variant, variantIndex) => (
                              <button
                                 key={variantIndex}
                                 className={`color-swatch ${variantIndex === idx ? "active" : ""}`}
                                 style={{
                                    width: "16px",
                                    height: "16px",
                                    backgroundColor: variant.hex,
                                    borderRadius: "50%",
                                    border: variantIndex === idx ? "2px solid #000" : "1px solid #ddd",
                                 }}
                                 title={variant.name}
                                 onClick={() => setIdx(variantIndex)}
                              />
                           ))}
                     </div>
                     <small className="text-muted">{product.variants[idx].name}</small>
                  </div>
               )}
            </div>

            {viewMode === "list" && product.description && (
               <div className="product-short-description my-4">
                  <p>{product.description}</p>
               </div>
            )}

            <div className={`d-flex justify-content-end align-items-center ${viewMode === "grid" ? 'mt-1' : "mt-3"}`}>
               <Link
                  to={`/product/${product.id}/${slugify(product.name || 'product')}`}
                  className="btn btn-link"
               >
                  — See Details
               </Link>
            </div>
         </Card.Body>
      </Card>
   );
}

// Helper functions from the first example
function mapProduct(p) {
   if (!p) return null;
   const name = p.title || p.name || p.slug || 'Product';
   const imageFallback = p.main_image || p?.product_meta?.[0]?.images?.[0]?.path || '';
   const skus = Array.isArray(p.skus) ? p.skus : [];
   const variants = skus.map((sku) => {
      const attrs = Array.isArray(sku.attrs) ? sku.attrs : [];
      const colorAttr = attrs.find((a) => String(a.name || '').toLowerCase() === 'color');
      const vname = (colorAttr?.value || colorAttr?.name || sku.sku_id || 'Variant');
      const vimage = sku.image || (Array.isArray(sku.images) && sku.images[0]?.path) || imageFallback;
      const vprice = sku.price ?? null;
      return { name: vname, image: vimage, hex: hexFromColorName(vname), price: vprice, sku_id: sku.sku_id, stock: sku.stock };
   });

   const priceNum = (() => {
      const nums = variants
         .map((v) => parseFloat(v.price ?? '0'))
         .filter((n) => !Number.isNaN(n) && n > 0);
      if (nums.length) return Math.min(...nums);
      const p0 = parseFloat(p.price ?? '0');
      return Number.isNaN(p0) ? 0 : p0;
   })();

   const currency = p.currency || (skus[0]?.currency) || 'USD';
   const priceStr = priceNum > 0 ? `${currency} ${priceNum.toFixed(2)}` : `${currency} ${p.price || '0.00'}`;
   const image = variants[0]?.image || imageFallback;

   return {
      id: p.id || p.ae_product_id || p.slug,
      name,
      price: priceStr,
      image,
      variants,
      currency,
      description: p.description || p.short_description || ''
   };
}

function hexFromColorName(name) {
   const n = String(name || '').toLowerCase().trim();
   const map = {
      black: '#111827',
      white: '#f3f4f6',
      gray: '#9ca3af', grey: '#9ca3af', 'light grey': '#cbd5e1', 'dark grey': '#6b7280',
      red: '#ef4444', 'light red': '#fca5a5', 'dark red': '#b91c1c',
      orange: '#f97316', 'light orange': '#fdba74',
      yellow: '#eab308', 'light yellow': '#fde68a',
      green: '#22c55e', 'light green': '#86efac', teal: '#14b8a6',
      blue: '#3b82f6', 'light blue': '#93c5fd',
      purple: '#a855f7', violet: '#8b5cf6',
      brown: '#92400e', beige: '#f5f5dc',
   };
   if (map[n]) return map[n];

   // Fallback to generating a color from the string
   let h = 0;
   for (let i = 0; i < String(name).length; i++) h = (h << 5) - h + String(name).charCodeAt(i);
   const c = (h & 0x00ffffff).toString(16).toUpperCase().padStart(6, '0');
   return `#${c.slice(0, 6)}`;
}

export default Shop;