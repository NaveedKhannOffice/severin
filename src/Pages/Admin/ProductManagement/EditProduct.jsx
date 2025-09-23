import { Formik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { DashboardLayout } from "../../../Components/Layouts/AdminLayout/DashboardLayout";
import BackButton from "../../../Components/Common/BackButton";
import TextInput from "../../../Components/Common/FormElements/TextInput";
import CustomButton from "../../../Components/Common/CustomButton";
import withModal from "../../../HOC/withModal";
import { useFormStatus } from "../../../Hooks/useFormStatus";
import { isNullOrEmpty } from "../../../Utils/helper";
import { getDetails, post, productPost } from "../../../Services/Api";


const EditProduct = ({ showModal }) => {
    const { isSubmitting, startSubmitting, stopSubmitting } = useFormStatus();
    const [data, setData] = useState({});
    const [images, setImages] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();

    // Fetch product details
    useEffect(() => {
        const getProduct = async () => {
            const response = await getDetails(`/user/product/${id}`);
            if (response) {
                setData(response?.data || {});
            }
        };
        getProduct();
    }, [id]);

    // Handle image upload
    const handleImageChange = (e, setFieldValue) => {
        const files = Array.from(e.target.files);
        setImages(files);
        setFieldValue("image", files);
    };

    // Submit form
    const handleSubmit = async (values) => {
        startSubmitting();
        // Prepare plain object, let productPost handle FormData
        const payload = {
            product_id: id,
            sku_id: data?.product_meta?.sku_id || data?.sku_id,
            title: values.title || "",
            description: values.description || "",
            additional_information: values.additional_information || "",
            price: values.price || "",
            image: images && images.length > 0 ? images : [],
        };
        const response = await productPost("/admin/product/create-update-meta", payload);
        if (response?.status) {
            showModal(
                "Successful",
                `Product has been updated successfully!`,
                () => navigate(-1),
                true
            );
        }
        stopSubmitting();
    };

    if (isNullOrEmpty(data)) {
        return (
            <DashboardLayout>
                <p>loading...</p>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout pageTitle="Edit Product">
            <div className="row my-4">
                <div className="col-12">
                    <h2 className="mainTitle">
                        <BackButton />
                        Edit Product
                    </h2>
                </div>
            </div>
            <div className="dashCard mb-4">
                <div className="row mb-3">
                    <div className="col-xl-6 col-lg-8">
                        <Formik
                            initialValues={{
                                title: data?.title || "",
                                description: data?.description || "",
                                additional_information: data?.additional_information || "",
                                price: data?.price || "",
                                image: [],
                            }}
                            enableReinitialize
                            onSubmit={handleSubmit}
                        >
                            {({
                                values,
                                errors,
                                touched,
                                handleChange,
                                handleBlur,
                                handleSubmit,
                                setFieldValue,
                            }) => (
                                <form onSubmit={handleSubmit} className="category-wrap">
                                    {/* product_id and sku_id shown as info only */}
                                    <div className="row my-2">
                                        <div className="col-6">
                                            <label className="mainLabel">Product ID</label>
                                            <input
                                                type="text"
                                                className="mainInput"
                                                value={data.product_id || id}
                                                disabled
                                            />
                                        </div>
                                        <div className="col-6">
                                            <label className="mainLabel">SKU ID</label>
                                            <input
                                                type="text"
                                                className="mainInput"
                                                value={data?.sku_id || data?.product_meta?.sku_id}
                                                disabled
                                            />
                                        </div>
                                    </div>
                                    <div className="row my-2">
                                        <div className="col-12 my-2">
                                            <TextInput
                                                label="Title"
                                                labelclass="mainLabel"
                                                type="text"
                                                placeholder="Product Title"
                                                inputclass="mainInput"
                                                id="title"
                                                name="title"
                                                value={values.title}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                error={touched.title && errors.title}
                                            />
                                        </div>
                                        <div className="col-12 my-2">
                                            <TextInput
                                                label="Description"
                                                labelclass="mainLabel"
                                                type="text"
                                                placeholder="Description"
                                                inputclass="mainInput"
                                                id="description"
                                                name="description"
                                                value={values.description}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                error={touched.description && errors.description}
                                            />
                                        </div>
                                        <div className="col-12 my-2">
                                            <TextInput
                                                label="Additional Information"
                                                labelclass="mainLabel"
                                                type="text"
                                                placeholder="Additional Information"
                                                inputclass="mainInput"
                                                id="additional_information"
                                                name="additional_information"
                                                value={values.additional_information}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                error={touched.additional_information && errors.additional_information}
                                            />
                                        </div>
                                        <div className="col-12 my-2">
                                            <TextInput
                                                label="Price"
                                                labelclass="mainLabel"
                                                type="number"
                                                placeholder="Price"
                                                inputclass="mainInput"
                                                id="price"
                                                name="price"
                                                value={values.price}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                error={touched.price && errors.price}
                                            />
                                        </div>
                                        <div className="col-12 my-2">
                                            <label className="mainLabel">Images</label>
                                            <input
                                                type="file"
                                                multiple
                                                accept="image/*"
                                                className="mainInput"
                                                onChange={e => handleImageChange(e, setFieldValue)}
                                            />
                                            {images.length > 0 && (
                                                <div className="mt-2">
                                                    {images.map((img, idx) => (
                                                        <span key={idx} className="badge bg-secondary mx-1">{img.name}</span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="row ">
                                        <div className="col-12 mt-3">
                                            <CustomButton
                                                variant="primary"
                                                className="px-5"
                                                text="Update Product"
                                                pendingText="Submitting..."
                                                isPending={isSubmitting}
                                                type="submit"
                                                disabled={isSubmitting}
                                            />
                                        </div>
                                    </div>
                                </form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default withModal(EditProduct);
