import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { images } from "../../../Assets";
import { slugify } from "../../../Utils/helper";

const ProductCard = ({ product }) => {
  const hasVariants = Array.isArray(product.variants) && product.variants.length > 0;
  const defaultIdx = hasVariants ? Math.max(0, product.variants.findIndex(v => v.image || (v.price && parseFloat(v.price) > 0) || (v.stock && v.stock > 0))) : 0;
  const [idx, setIdx] = React.useState(defaultIdx);

  const currentImage = hasVariants ? (product.variants[idx].image || product.image) : product.image;
  const currentPrice = hasVariants && product.variants[idx]?.price ?
    `${product.currency || ''} ${product.variants[idx].price}` : product.price;

  return (
    <Card className="product-card h-100">
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
                        cursor: "pointer",
                        padding: 0,
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

        <div className="d-flex justify-content-end align-items-center mt-1">
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
};

const NewArrivalsSection = ({ data, loading, error }) => {
  if (loading) {
    return (
      <section className="new-arrivals-section py-5">
        <Container>
          <Row>
            <Col className="text-center">
              <div className="loading">Loading new arrivals...</div>
            </Col>
          </Row>
        </Container>
      </section>
    );
  }

  if (error) {
    return (
      <section className="new-arrivals-section py-5">
        <Container>
          <Row>
            <Col className="text-center">
              <div className="error">Failed to load new arrivals</div>
            </Col>
          </Row>
        </Container>
      </section>
    );
  }

  if (!data || data.length === 0) {
    return null;
  }

  return (
    <section className="new-arrivals-section py-5">
      <Container>
        <Row className="mb-4">
          <Col xs={12} md={5} className="section-header">
            <h2 className="section-title">New Arrivals</h2>
          </Col>
          <Col xs={12} md={7} className="d-flex align-items-center justify-content-md-end">
            <Link to="/shop" className="btn btn-primary btn btn-primary">
              View All Products
            </Link>
          </Col>
        </Row>
        
        <Row>
          {data.map((product, index) => (
            <Col key={product.id + '-' + index} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default NewArrivalsSection;
