import React, { useState, useMemo } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  ButtonGroup,
  Dropdown,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import PageHeader from "../../../Components/Common/PageHeader";
import { productsData } from "../../../Config/data";
import { images } from "../../../Assets";
import "./style.css";

const Shop = () => {
  const [sortBy, setSortBy] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [showFilters, setShowFilters] = useState(false);

  // Define breadcrumb paths directly
  const breadcrumbPaths = [["Home", "/"], ["Shop"]];

  // Get products from data
  const products = productsData.detail.data;

  // Get unique categories
  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(products.map((product) => product.category)),
    ];
    return ["all", ...uniqueCategories];
  }, [products]);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;

      const productPrice = parseFloat(product.price.replace(/[^\d.]/g, ""));
      const matchesPrice =
        productPrice >= priceRange[0] && productPrice <= priceRange[1];

      return matchesSearch && matchesCategory && matchesPrice;
    });

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
  }, [products, sortBy, searchTerm, selectedCategory, priceRange]);

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handlePriceRangeChange = (e) => {
    const value = parseInt(e.target.value);
    setPriceRange([0, value]);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setPriceRange([0, 200]);
  };

  return (
    <>
      <PageHeader
        pageHeading="Our Products"
        breadcrumb={true}
        breadcrumbPaths={breadcrumbPaths}
      />

      <Container fluid className="shop-container">
        {/* Header Controls */}
        <Row className="shop-header mb-4">
          <Col xs={12} md={6}>
            <div className="d-flex align-items-center">
              <h2 className="shop-title mb-0">Our Products</h2>
              <span className="product-count ms-3 text-muted">
                ({filteredAndSortedProducts.length} products)
              </span>
            </div>
          </Col>

          <Col xs={12} md={6}>
            <div className="d-flex flex-column flex-md-row gap-3 align-items-md-end">
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
                  variant={
                    viewMode === "grid" ? "primary" : "outline-secondary"
                  }
                  onClick={() => handleViewModeChange("grid")}
                  size="sm"
                >
                  <i className="fas fa-th"></i>
                </Button>
                <Button
                  variant={
                    viewMode === "list" ? "primary" : "outline-secondary"
                  }
                  onClick={() => handleViewModeChange("list")}
                  size="sm"
                >
                  <i className="fas fa-list"></i>
                </Button>
              </ButtonGroup>
            </div>
          </Col>
        </Row>

        {/* Filters Section */}
        <Row className="filters-section mb-4">
          <Col xs={12}>
            <div className="d-flex flex-wrap gap-3 align-items-center">
              <Button
                variant="outline-secondary"
                onClick={() => setShowFilters(!showFilters)}
                className="filter-toggle"
              >
                <i className="fas fa-filter me-2"></i>
                Filters
              </Button>

              {showFilters && (
                <>
                  {/* Category Filter */}
                  <Dropdown>
                    <Dropdown.Toggle variant="outline-secondary" size="sm">
                      Category:{" "}
                      {selectedCategory === "all" ? "All" : selectedCategory}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {categories.map((category) => (
                        <Dropdown.Item
                          key={category}
                          onClick={() => handleCategoryChange(category)}
                          active={selectedCategory === category}
                        >
                          {category === "all" ? "All Categories" : category}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>

                  {/* Price Range Filter */}
                  <div className="price-filter">
                    <Form.Label className="small mb-1">
                      Price Range: CHF {priceRange[1]}
                    </Form.Label>
                    <Form.Range
                      min="0"
                      max="200"
                      value={priceRange[1]}
                      onChange={handlePriceRangeChange}
                      className="price-range-slider"
                    />
                  </div>

                  {/* Clear Filters */}
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={clearFilters}
                  >
                    Clear All
                  </Button>
                </>
              )}
            </div>
          </Col>
        </Row>

        {/* Products Grid/List */}
        <Row
          className={viewMode === "grid" ? "products-grid" : "products-list"}
        >
          {filteredAndSortedProducts.length > 0 ? (
            filteredAndSortedProducts.map((product, index) => (
              <Col
                key={product.id}
                xs={12}
                sm={viewMode === "grid" ? 6 : 12}
                md={viewMode === "grid" ? 4 : 12}
                lg={viewMode === "grid" ? 3 : 12}
                className="mb-4"
              >
                <Card
                  className={`product-card h-100 ${
                    viewMode === "list" ? "list-view" : ""
                  }`}
                >
                  <div className="position-relative">
                    <Card.Img
                      variant="top"
                      src={product.photos?.[0] || images.placeholder}
                      alt={product.name}
                      className="card-image"
                    />
                    {/* Rating Badge */}
                    <div className="rating-badge">
                      <i className="fas fa-star"></i>
                      {product.rating}
                    </div>
                  </div>

                  <Card.Body className="position-relative px-0 pb-0">
                    <div className="d-flex">
                      <div className="flex-grow-1">
                        <Card.Title className="mb-0">
                          <Link
                            to={`/product-detail/${product.id}`}
                            className="text-decoration-none"
                          >
                            {product.name}
                          </Link>
                        </Card.Title>
                        <small className="text-muted">{product.category}</small>
                      </div>
                      <div className="flex-shrink-0">
                        <div className="price fw-bold">{product.price}</div>
                      </div>
                    </div>

                    <div className="product-attributes-wrapper">
                      {/* Color options */}
                      {product.colors && (
                        <div className="d-flex gap-4 align-items-center">
                          <small className="attribute-name flex-shrink-0">
                            Colors:
                          </small>
                          <div className="d-flex gap-1 mt-1">
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

                    <div className="d-flex justify-content-end align-items-center mt-1">
                      <Link
                        to={`/product-detail/${product.id}`}
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
              <div className="empty-state">
                <i className="fas fa-search"></i>
                <h3>No products found</h3>
                <p>Try adjusting your search criteria or filters</p>
                <Button variant="outline-primary" onClick={clearFilters}>
                  Clear Filters
                </Button>
              </div>
            </Col>
          )}
        </Row>
      </Container>
    </>
  );
};

export default Shop;
