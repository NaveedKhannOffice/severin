import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DashboardLayout } from "../../../Components/Layouts/AdminLayout/DashboardLayout";
import BackButton from "../../../Components/Common/BackButton";
import { FaEdit } from "react-icons/fa";
import { getDetails } from "../../../Services/Api";


const ViewProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      // Replace with your actual API endpoint
      const response = await getDetails(`/user/product/${id}`);
      if (response && response.status) {
        setProduct(response.data);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <DashboardLayout pageTitle="Product Detail">
      <div className="row my-3">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center my-3 my-md-0 flex-wrap">
            <div className="flex-grow-1 d-flex my-3">
              <BackButton />
              <h2 className="mainTitle mb-0">View Product Detail</h2>
            </div>
            <div className="flex-shrink-0 ms-sm-0 ms-2">
              <button className="site-btn primary-btn">
                <FaEdit /> Edit Product
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="dashCard">
        <div className="row">
          <div className="col-md-6">
            <h4 className="secondaryLabel">Title</h4>
            <p className="secondaryText wrapText mb-0">{product.title}</p>
            <h4 className="secondaryLabel mt-3">Description</h4>
            <p className="secondaryText wrapText mb-0">{product.description}</p>
            <h4 className="secondaryLabel mt-3">Slug</h4>
            <p className="secondaryText wrapText mb-0">{product.slug}</p>
            <h4 className="secondaryLabel mt-3">Price</h4>
            <p className="secondaryText wrapText mb-0">{product.price} {product.currency}</p>
            <h4 className="secondaryLabel mt-3">AliExpress Product ID</h4>
            <p className="secondaryText wrapText mb-0">{product.ae_product_id}</p>
          </div>
          <div className="col-md-6">
            <h4 className="secondaryLabel">Main Image</h4>
            {product.main_image ? (
              <img src={product.main_image} alt="Main" style={{maxWidth: '100%', height: 'auto'}} />
            ) : (
              <span>No image</span>
            )}
          </div>
        </div>
      </div>

      {/* SKUs Section */}
      <div className="dashCard mt-4">
        <h3 className="mainTitle">SKUs</h3>
        <div className="row">
          {product.skus && product.skus.length > 0 ? (
            product.skus.map((sku) => (
              <div className="col-md-4 mb-3" key={sku.sku_id}>
                <div className="card p-2">
                  <h5>SKU: {sku.sku_id}</h5>
                  <p>Price: {sku.price} {sku.currency}</p>
                  <p>Stock: {sku.stock}</p>
                  <div>
                    <strong>Attributes:</strong>
                    <ul>
                      {sku.attrs && sku.attrs.map((attr, idx) => (
                        <li key={idx}>{attr.name}: {attr.value} ({attr.definition})</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <strong>Image:</strong><br />
                    {sku.image ? (
                      <img src={sku.image} alt="SKU" style={{maxWidth: '100px', height: 'auto'}} />
                    ) : 'No image'}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12">No SKUs found.</div>
          )}
        </div>
      </div>

      {/* Product Meta Section */}
      <div className="dashCard mt-4">
        <h3 className="mainTitle">Product Meta</h3>
        <div className="row">
          {product.product_meta && product.product_meta.length > 0 ? (
            product.product_meta.map((meta) => (
              <div className="col-md-4 mb-3" key={meta.id}>
                <div className="card p-2">
                  <h5>SKU: {meta.sku_id}</h5>
                  <p>Price: {meta.price} {product.currency}</p>
                  <p>Status: {meta.is_active ? 'Active' : 'Inactive'}</p>
                  <p>Created At: {meta.created_at}</p>
                  <div>
                    <strong>Images:</strong><br />
                    {meta.images && meta.images.length > 0 ? (
                      meta.images.map((img, idx) => (
                        <img key={idx} src={img.path} alt="Meta" style={{maxWidth: '100px', height: 'auto', marginRight: '5px'}} />
                      ))
                    ) : 'No images'}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12">No product meta found.</div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ViewProduct;
