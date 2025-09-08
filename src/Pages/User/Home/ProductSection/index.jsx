import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faHeart } from "@fortawesome/free-solid-svg-icons";
import { images } from "../../../../Assets";
import "./style.css";

const ProductSection = ({ data, loading, error }) => {
  // Use data from props instead of internal state
  const products = data || [];

  // console.log("Toggle wishlist for product:", products);

  // Handle wishlist toggle
  const handleWishlistToggle = (productId) => {
    // console.log("Toggle wishlist for product:", productId);
    // Implement wishlist functionality here
  };

  if (loading) {
    return (
      <section className="section product-sec">
        <Container fluid>
          <Row>
            <Col xs={12} className="text-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    );
  }

  if (error) {
    return (
      <section className="section product-sec">
        <Container fluid>
          <Row>
            <Col xs={12} className="text-center">
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    );
  }

  return (
    <section className="section product-sec">
      <Container fluid>
        <Row>
          <Col
            xs={12}
            className="mb-2 d-flex justify-content-between align-items-center"
          >
            <h2 className="section-title mb-0" data-aos="flip-up">Our Products</h2>
            <Link to="/shop" className="btn btn-primary">
              View More
            </Link>
          </Col>

          {products.length > 0 ? (
            products.map((product, index) => (
              <Col
                key={product.id}
                xs={12}
                sm={6}
                md={4}
                lg={3}
                className="mb-4"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <Card className="product-card h-100">
                  <div className="position-relative">
                    <Card.Img
                      variant="top"
                      src={product.photos?.[0] || images.placeholder}
                      alt={product.name}
                      className="card-image"
                    />
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
                      </div>
                      <div className="flex-shrink-0">
                        <div className="price fw-bold">
                          {product.price}
                        </div>
                      </div>
                    </div>

                    <div className="product-attributes-wrapper">
                    {/* Color options */}
                    {product.colors && (
                      <div className="d-flex gap-4 align-items-center">
                        <small className="attribute-name flex-shrink-0">Colors:</small>
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
                        See Details
                      </Link>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <Col xs={12} className="text-center">
              <div className="alert alert-info" role="alert">
                No new arrivals available at the moment.
              </div>
            </Col>
          )}
        </Row>
      </Container>
    </section>
  );
};

export default ProductSection;
