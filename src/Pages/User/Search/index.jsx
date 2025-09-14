import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useSearchParams, Link } from 'react-router-dom';
import { images } from '../../../Assets';
import { productsData } from '../../../Config/data';
import { slugify } from '../../../Utils/helper';
import PageHeader from '../../../Components/Common/PageHeader';
import './style.css';

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Breadcrumb configuration
  const breadcrumbPaths = [
    ['Home', '/'],
    ['Search']
  ];

  // Search function
  const performSearch = async (searchQuery) => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // For now, using static data. Replace with API call later
      const allProducts = productsData?.detail?.data || [];
      
      const filteredProducts = allProducts.filter(product => 
        product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.categories?.some(cat => 
          cat.name?.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );

      setSearchResults(filteredProducts);
    } catch (error) {
      console.error('Search error:', error);
      setError('Failed to perform search');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query) {
      performSearch(query);
    } else {
      setSearchResults([]);
    }
  }, [query]);

  return (
    <>
      <PageHeader
        pageHeading={`Search Results${query ? ` for "${query}"` : ''}`}
        breadcrumb={true}
        breadcrumbPaths={breadcrumbPaths}
      />
      
      <section className="page-content search-page">
        <Container fluid>
          {loading && (
            <Row>
              <Col md={12}>
                <div className="text-center py-5">
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Searching...</span>
                  </div>
                  <p className="mt-2">Searching products...</p>
                </div>
              </Col>
            </Row>
          )}

          {error && (
            <Row>
              <Col md={12}>
                <div className="alert alert-danger text-center py-5">
                  <h4>Search Error</h4>
                  <p>{error}</p>
                </div>
              </Col>
            </Row>
          )}

          {!loading && !error && (
            <>
              {query && (
                <Row>
                  <Col md={12}>
                    <div className="search-info mb-4">
                      <h3>Search Results for "{query}"</h3>
                      <p className="text-muted">
                        {searchResults.length} product{searchResults.length !== 1 ? 's' : ''} found
                      </p>
                    </div>
                  </Col>
                </Row>
              )}

              {searchResults.length > 0 ? (
                <Row>
                  {searchResults.map((product) => (
                    <Col key={product.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                      <Card className="product-card h-100">
                        <div className="card-image">
                          <Link to={`/product/${product.id}/${slugify(product.name)}`}>
                            <img 
                              src={product.photos?.[0] || images.placeholder} 
                              alt={product.name || 'Product'}
                              className="card-img-top"
                            />
                          </Link>
                        </div>
                        <Card.Body className="d-flex flex-column">
                          <Card.Title className="product-title">
                            <Link to={`/product/${product.id}/${slugify(product.name)}`}>
                              {product.name || 'Product'}
                            </Link>
                          </Card.Title>
                          <Card.Text className="product-description">
                            {product.short_description || product.description || 'No description available'}
                          </Card.Text>
                          <div className="product-price mt-auto">
                            <span className="currency-code">CHF</span> {product.price || '0'}
                          </div>
                          <div className="product-actions mt-3">
                            <Link 
                              to={`/product/${product.id}/${slugify(product.name)}`}
                              className="btn btn-primary w-100"
                            >
                              View Details
                            </Link>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              ) : query ? (
                <Row>
                  <Col md={12}>
                    <div className="text-center py-5">
                      <div className="no-results">
                        <img src={images.placeholder} alt="No results" className="mb-3" />
                        <h4>No products found</h4>
                        <p className="text-muted">
                          We couldn't find any products matching "{query}". 
                          Try searching with different keywords.
                        </p>
                        <Link to="/shop" className="btn btn-primary">
                          Browse All Products
                        </Link>
                      </div>
                    </div>
                  </Col>
                </Row>
              ) : (
                <Row>
                  <Col md={12}>
                    <div className="text-center py-5">
                      <h4>Search Products</h4>
                      <p className="text-muted">
                        Use the search bar in the header to find products.
                      </p>
                    </div>
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

export default Search;
