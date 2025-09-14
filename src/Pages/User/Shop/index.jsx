import React, { useState, useMemo } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  ButtonGroup,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import PageHeader from "../../../Components/Common/PageHeader";
import { productsData } from "../../../Config/data";
import { images } from "../../../Assets";
import "./style.css";
import { slugify } from "../../../Utils/helper";


const Shop = () => {
  const [sortBy, setSortBy] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // "grid" or "list"
  const [searchTerm, setSearchTerm] = useState("");

  // Define breadcrumb paths directly
  const breadcrumbPaths = [["Home", "/"], ["Shop"]];

  // Get products from data with error handling
  const products = productsData?.detail?.data || [];
  
  // Debug logging
  console.log("Products data:", productsData);
  console.log("Products array:", products);
  console.log("Products length:", products.length);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    if (!products || products.length === 0) {
      console.log("No products available");
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
        switch (sortBy) {
          case "name":
            return a.name.localeCompare(b.name);
          case "price-low":
            return (
              parseFloat(a.price.replace(/[^\d.]/g, "")) -
              parseFloat(b.price.replace(/[^\d.]/g, ""))
            );
          case "price-high":
            return (
              parseFloat(b.price.replace(/[^\d.]/g, "")) -
              parseFloat(a.price.replace(/[^\d.]/g, ""))
            );
          case "rating":
            return parseFloat(b.rating) - parseFloat(a.rating);
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

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
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
                  <option value="rating">Rating</option>
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
          <Row
            className={viewMode === "grid" ? "products-grid" : "products-list"}
          >
            {products.length === 0 ? (
              <Col xs={12} className="text-center">
                <div className="alert alert-warning" role="alert">
                  <h4>No Products Available</h4>
                  <p>There are no products in the database. Please check the data configuration.</p>
                </div>
              </Col>
            ) : filteredAndSortedProducts.length > 0 ? (
              filteredAndSortedProducts.map((product, index) => (
                <Col
                  key={product.id}
                  xs={12}
                  sm={viewMode === "grid" ? 6 : 6}
                  md={viewMode === "grid" ? 4 : 6}
                  lg={viewMode === "grid" ? 3 : 6}
                  className="mb-4"
                >
                  <Card
                    className={`product-card h-100 ${
                      viewMode === "list" ? "list-view" : ""
                    }`}
                  >
                    <div className="position-relative">
                    <Link to={`/product/${product.id}/${slugify(product.name || 'product')}`}>
                      <Card.Img
                        variant="top"
                        src={product.photos?.[0] || product.medias?.[0]?.media_path || images.placeholder}
                        alt={product.name || "Product"}
                        className="card-image"
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
                          <div className="price fw-bold"> <span className='currency-code'>CHF</span>{product.price || '0'}</div>
                        </div>
                      </div>

                      <div className="product-attributes-wrapper">
                        {/* Color options */}
                        {product.colors && (
                          <div className="d-flex gap-4 align-items-center">
                            <small className="attribute-name flex-shrink-0">
                              Colors:
                            </small>
                            <div className="d-flex gap-1">
                              {product.colors
                                .slice(0, 3)
                                .map((color, colorIndex) => (
                                  <div
                                    key={colorIndex}
                                    className="color-swatch"
                                    style={{
                                      width: "16px",
                                      height: "16px",
                                      backgroundColor: color.value,
                                      borderRadius: "50%",
                                      border: "1px solid #ddd",
                                    }}
                                    title={color.name}
                                  />
                                ))}
                            </div>
                          </div>
                        )}

                        {/* Size options */}
                        {product.sizes && (
                          <div className="mb-0 d-flex gap-4 align-items-center">
                            <small className="attribute-name flex-shrink-0">
                              Sizes: {product.sizes.join(" / ")}
                            </small>
                          </div>
                        )}
                      </div>
                      {viewMode === "list" && (
                        <div className="product-short-description my-4">
                          <p>{product.short_description}</p>
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
        </Container>
      </section>
    </>
  );
};

export default Shop;
