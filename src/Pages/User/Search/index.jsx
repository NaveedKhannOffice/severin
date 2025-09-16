// import React, { useEffect, useState } from 'react';
// import { Container, Row, Col, Card, Button } from 'react-bootstrap';
// import { useSearchParams, Link } from 'react-router-dom';
// import { images } from '../../../Assets';
// import { productsData } from '../../../Config/data';
// import { slugify } from '../../../Utils/helper';
// import PageHeader from '../../../Components/Common/PageHeader';
// import './style.css';

// const Search = () => {
//   const [searchParams] = useSearchParams();
//   const query = searchParams.get('q') || '';
//   const [searchResults, setSearchResults] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Breadcrumb configuration
//   const breadcrumbPaths = [
//     ['Home', '/'],
//     ['Search']
//   ];

//   // Search function
//   const performSearch = async (searchQuery) => {
//     if (!searchQuery.trim()) {
//       setSearchResults([]);
//       return;
//     }

//     setLoading(true);
//     setError(null);

//     try {
//       // For now, using static data. Replace with API call later
//       const allProducts = productsData?.detail?.data || [];
      
//       const filteredProducts = allProducts.filter(product =>
//         product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         product.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         product.categories?.some(cat =>
//           cat.name?.toLowerCase().includes(searchQuery.toLowerCase())
//         )
//       );

//       setSearchResults(filteredProducts);
//     } catch (error) {
//       console.error('Search error:', error);
//       setError('Failed to perform search');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (query) {
//       performSearch(query);
//     } else {
//       setSearchResults([]);
//     }
//   }, [query]);

//   return (
//     <>
//       <PageHeader
//         pageHeading={`Search Results${query ? ` for "${query}"` : ''}`}
//         breadcrumb={true}
//         breadcrumbPaths={breadcrumbPaths}
//       />
      
//       <section className="page-content search-page">
//         <Container fluid>
//           {loading && (
//             <Row>
//               <Col md={12}>
//                 <div className="text-center py-5">
//                   <div className="spinner-border" role="status">
//                     <span className="visually-hidden">Searching...</span>
//                   </div>
//                   <p className="mt-2">Searching products...</p>
//                 </div>
//               </Col>
//             </Row>
//           )}

//           {error && (
//             <Row>
//               <Col md={12}>
//                 <div className="alert alert-danger text-center py-5">
//                   <h4>Search Error</h4>
//                   <p>{error}</p>
//                 </div>
//               </Col>
//             </Row>
//           )}

//           {!loading && !error && (
//             <>
//               {query && (
//                 <Row>
//                   <Col md={12}>
//                     <div className="search-info mb-4">
//                       <h3>Search Results for "{query}"</h3>
//                       <p className="text-muted">
//                         {searchResults.length} product{searchResults.length !== 1 ? 's' : ''} found
//                       </p>
//                     </div>
//                   </Col>
//                 </Row>
//               )}

//               {searchResults.length > 0 ? (
//                 <Row>
//                   {searchResults.map((product) => (
//                     <Col key={product.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
//                       <Card className="product-card h-100">
//                         <div className="card-image">
//                           <Link to={`/product/${product.id}/${slugify(product.name)}`}>
//                             <img
//                               src={product.photos?.[0] || images.placeholder}
//                               alt={product.name || 'Product'}
//                               className="card-img-top"
//                             />
//                           </Link>
//                         </div>
//                         <Card.Body className="d-flex flex-column">
//                           <Card.Title className="product-title">
//                             <Link to={`/product/${product.id}/${slugify(product.name)}`}>
//                               {product.name || 'Product'}
//                             </Link>
//                           </Card.Title>
//                           <Card.Text className="product-description">
//                             {product.short_description || product.description || 'No description available'}
//                           </Card.Text>
//                           <div className="product-price mt-auto">
//                             <span className="currency-code">CHF</span> {product.price || '0'}
//                           </div>
//                           <div className="product-actions mt-3">
//                             <Link
//                               to={`/product/${product.id}/${slugify(product.name)}`}
//                               className="btn btn-primary w-100"
//                             >
//                               View Details
//                             </Link>
//                           </div>
//                         </Card.Body>
//                       </Card>
//                     </Col>
//                   ))}
//                 </Row>
//               ) : query ? (
//                 <Row>
//                   <Col md={12}>
//                     <div className="text-center py-5">
//                       <div className="no-results">
//                         <img src={images.placeholder} alt="No results" className="mb-3" />
//                         <h4>No products found</h4>
//                         <p className="text-muted">
//                           We couldn't find any products matching "{query}".
//                           Try searching with different keywords.
//                         </p>
//                         <Link to="/shop" className="btn btn-primary">
//                           Browse All Products
//                         </Link>
//                       </div>
//                     </div>
//                   </Col>
//                 </Row>
//               ) : (
//                 <Row>
//                   <Col md={12}>
//                     <div className="text-center py-5">
//                       <h4>Search Products</h4>
//                       <p className="text-muted">
//                         Use the search bar in the header to find products.
//                       </p>
//                     </div>
//                   </Col>
//                 </Row>
//               )}
//             </>
//           )}
//         </Container>
//       </section>
//     </>
//   );
// };

// export default Search;




import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useSearchParams, Link } from 'react-router-dom';
import { images } from '../../../Assets';
import { productsData } from '../../../Config/data';
import { slugify } from '../../../Utils/helper';
import PageHeader from '../../../Components/Common/PageHeader';
// import http from '../../../utils/http'; // Import your HTTP utility

import './style.css';
import axios from 'axios';
import { toast } from 'react-toastify';

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

  // Map product function from your first example
  const mapProduct = (p) => {
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
      return { 
        name: vname, 
        image: vimage, 
        hex: hexFromColorName(vname), 
        price: vprice, 
        sku_id: sku.sku_id, 
        stock: sku.stock 
      };
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
      description: p.description || p.short_description || '',
      photos: [image].concat(variants.map(v => v.image).filter(Boolean))
    };
  };

  // Helper function for color mapping
  const hexFromColorName = (name) => {
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
    
    // Fallback color generation
    let h = 0;
    for (let i = 0; i < String(n).length; i++) h = (h << 5) - h + String(n).charCodeAt(i);
    const c = (h & 0x00ffffff).toString(16).toUpperCase().padStart(6, '0');
    return `#${c.slice(0, 6)}`;
  };

  // Image fallback handler
  const imgFallback = (e) => {
    e.target.src = images.placeholder;
  };

  // Search function with API integration
  const performSearch = async (searchQuery) => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // API call to search products
      const res = await axios.get('/user/products', { params: { search: searchQuery } });
      const raw = res?.data;
      
      let list = [];
      if (Array.isArray(raw)) list = raw;
      else if (Array.isArray(raw?.data)) list = raw.data;
      else if (raw?.data && typeof raw.data === 'object') list = [raw.data];
      else list = [];
      
      const mapped = list.map(mapProduct).filter(Boolean);
      setSearchResults(mapped);
    } catch (err) {
      console.error('Search error:', err);
      setError('Search failed. Please try again');
      toast.error('Search failed. Please try again');
      setSearchResults([]);
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
                              src={product.image || images.placeholder} 
                              alt={product.name || 'Product'}
                              className="card-img-top"
                              onError={imgFallback}
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
                            {product.description || 'No description available'}
                          </Card.Text>
                          <div className="product-price mt-auto">
                            {product.price}
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