import { Formik } from "formik";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { DashboardLayout } from "../../../Components/Layouts/AdminLayout/DashboardLayout";
import BackButton from "../../../Components/Common/BackButton";
import TextInput from "../../../Components/Common/FormElements/TextInput";
import CustomButton from "../../../Components/Common/CustomButton";
import withModal from "../../../HOC/withModal";
import { useFormStatus } from "../../../Hooks/useFormStatus";
import { isNullOrEmpty } from "../../../Utils/helper";
import { getDetails, productPost } from "../../../Services/Api";
import { FaPlus, FaTrash } from "react-icons/fa6";
import "./EditProduct.css";

const createUid = () => `${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;

const normaliseHex = (value) => {
    if (typeof value !== "string") return "#000000";
    let input = value.trim();
    if (!input) return "#000000";
    if (input.startsWith("#")) {
        input = input.slice(1);
    }
    input = input.replace(/[^0-9a-fA-F]/g, "");
    if (input.length === 3) {
        input = input
            .split("")
            .map((ch) => ch + ch)
            .join("");
    }
    if (input.length < 6) {
        input = input.padEnd(6, "0");
    }
    return `#${input.slice(0, 6)}`;
};

const toColorRow = (item) => {
    if (!item) {
        return { id: createUid(), value: "#000000", name: "" };
    }
    if (typeof item === "string") {
        return { id: createUid(), value: normaliseHex(item), name: item };
    }
    const value = normaliseHex(item.value || item.hex || item.hex_code || item.color || item.code || "#000000");
    const name = item.name || item.label || item.title || "";
    return { id: createUid(), value, name };
};

const toSizeRow = (item) => {
    if (!item) {
        return { id: createUid(), name: "" };
    }
    if (typeof item === "string") {
        return { id: createUid(), name: item };
    }
    return { id: createUid(), name: item.name || item.label || item.title || item.value || "" };
};

const EditProduct = ({ showModal }) => {
    const { isSubmitting, startSubmitting, stopSubmitting } = useFormStatus();
    const [data, setData] = useState({});
    const [colorMode, setColorMode] = useState("no-color");
    const [colors, setColors] = useState([]);
    const [sizeMode, setSizeMode] = useState("no-size");
    const [sizes, setSizes] = useState([]);
    const [mainImageFile, setMainImageFile] = useState(null);
    const [hoverImageFile, setHoverImageFile] = useState(null);
    const [mainImagePreview, setMainImagePreview] = useState("");
    const [hoverImagePreview, setHoverImagePreview] = useState("");
    const mainImageBaseline = useRef("");
    const hoverImageBaseline = useRef("");
    const navigate = useNavigate();
    const { id } = useParams();

    const updateMainPreview = useCallback((nextPreview) => {
        setMainImagePreview((prev) => {
            if (prev && prev.startsWith("blob:")) {
                URL.revokeObjectURL(prev);
            }
            return nextPreview;
        });
    }, []);

    const updateHoverPreview = useCallback((nextPreview) => {
        setHoverImagePreview((prev) => {
            if (prev && prev.startsWith("blob:")) {
                URL.revokeObjectURL(prev);
            }
            return nextPreview;
        });
    }, []);

    useEffect(() => {
        return () => {
            if (mainImagePreview && mainImagePreview.startsWith("blob:")) {
                URL.revokeObjectURL(mainImagePreview);
            }
            if (hoverImagePreview && hoverImagePreview.startsWith("blob:")) {
                URL.revokeObjectURL(hoverImagePreview);
            }
        };
    }, [mainImagePreview, hoverImagePreview]);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await getDetails(`/user/product/${id}`);
                const payload = response?.data || {};
                setData(payload);
                const meta = payload?.product_meta || {};

                const resolvedMainImage = meta?.main_image || payload?.main_image || meta?.image || payload?.image || "";
                const resolvedHoverImage = meta?.hover_image || payload?.hover_image || "";

                mainImageBaseline.current = resolvedMainImage || "";
                hoverImageBaseline.current = resolvedHoverImage || "";

                if (resolvedMainImage) {
                    updateMainPreview(resolvedMainImage);
                }
                if (resolvedHoverImage) {
                    updateHoverPreview(resolvedHoverImage);
                }

                const initialColors = meta?.colors || payload?.colors;
                if (Array.isArray(initialColors) && initialColors.length > 0) {
                    setColorMode("with-color");
                    setColors(initialColors.map(toColorRow));
                } else {
                    setColorMode("no-color");
                    setColors([]);
                }

                const initialSizes = meta?.sizes || payload?.sizes;
                if (Array.isArray(initialSizes) && initialSizes.length > 0) {
                    setSizeMode("with-size");
                    setSizes(initialSizes.map(toSizeRow));
                } else {
                    setSizeMode("no-size");
                    setSizes([]);
                }
            } catch (error) {
                console.error("Failed to load product details", error);
            }
        };

        fetchProduct();
    }, [id, updateHoverPreview, updateMainPreview]);

    useEffect(() => {
        if (colorMode === "with-color" && colors.length === 0) {
            setColors([toColorRow(null)]);
        }
    }, [colorMode, colors.length]);

    useEffect(() => {
        if (sizeMode === "with-size" && sizes.length === 0) {
            setSizes([toSizeRow(null)]);
        }
    }, [sizeMode, sizes.length]);

    const initialValues = useMemo(() => {
        const meta = data?.product_meta || {};
        return {
            title: data?.title || meta?.title || "",
            shortDescription:
                meta?.short_description ||
                data?.short_description ||
                meta?.additional_information ||
                data?.additional_information ||
                "",
            longDescription:
                meta?.long_description ||
                meta?.description ||
                data?.description ||
                "",
            price: data?.price || meta?.price || "",
            mainImage: null,
            hoverImage: null,
        };
    }, [data]);

    const handleMainImageChange = useCallback((event, setFieldValue) => {
        const file = event.target.files && event.target.files[0];
        if (!file) return;
        if (!file.type.startsWith("image/")) {
            event.target.value = "";
            return;
        }
        setMainImageFile(file);
        setFieldValue("mainImage", file);
        updateMainPreview(URL.createObjectURL(file));
    }, [updateMainPreview]);

    const handleHoverImageChange = useCallback((event, setFieldValue) => {
        const file = event.target.files && event.target.files[0];
        if (!file) return;
        if (!file.type.startsWith("image/")) {
            event.target.value = "";
            return;
        }
        setHoverImageFile(file);
        setFieldValue("hoverImage", file);
        updateHoverPreview(URL.createObjectURL(file));
    }, [updateHoverPreview]);

    const handleColorValueChange = (id, value) => {
        const normalised = normaliseHex(value);
        setColors((prev) => prev.map((color) => (color.id === id ? { ...color, value: normalised } : color)));
    };

    const handleColorNameChange = (id, name) => {
        setColors((prev) => prev.map((color) => (color.id === id ? { ...color, name } : color)));
    };

    const handleSizeNameChange = (id, name) => {
        setSizes((prev) => prev.map((size) => (size.id === id ? { ...size, name } : size)));
    };

    const addColorRow = () =>
        setColors((prev) => prev.concat({ id: createUid(), value: "#000000", name: "" }));

    const removeColorRow = (id) =>
        setColors((prev) => prev.filter((color) => color.id !== id));

    const addSizeRow = () =>
        setSizes((prev) => prev.concat({ id: createUid(), name: "" }));

    const removeSizeRow = (id) =>
        setSizes((prev) => prev.filter((size) => size.id !== id));

    const extractFileName = (pathLike) => {
        if (!pathLike) return "";
        if (typeof pathLike === "string") {
            const segments = pathLike.split(/\\\\|\//);
            return segments[segments.length - 1] || "";
        }
        if (pathLike?.name) {
            return pathLike.name;
        }
        return "";
    };

    const handleSubmit = async (values) => {
        startSubmitting();
        try {
            const payload = {
                product_id: id,
                sku_id: data?.product_meta?.sku_id || data?.sku_id,
                title: values.title || "",
                short_description: values.shortDescription || "",
                long_description: values.longDescription || "",
                description: values.longDescription || "",
                additional_information: values.shortDescription || "",
                price: values.price || "",
                has_color: colorMode === "with-color" ? 1 : 0,
                colors: colorMode === "with-color"
                    ? colors.filter((color) => color.name || color.value).map((color) => ({
                          name: color.name || "",
                          value: color.value || "#000000",
                      }))
                    : [],
                has_size: sizeMode === "with-size" ? 1 : 0,
                sizes: sizeMode === "with-size"
                    ? sizes.filter((size) => size.name).map((size) => size.name)
                    : [],
            };

            if (mainImageFile) {
                payload.main_image = mainImageFile;
            }
            if (hoverImageFile) {
                payload.hover_image = hoverImageFile;
            }

            const response = await productPost("/admin/product/create-update-meta", payload);
            if (response?.status) {
                showModal(
                    "Successful",
                    "Product has been updated successfully!",
                    () => navigate(-1),
                    true
                );
            }
        } finally {
            stopSubmitting();
        }
    };

    if (isNullOrEmpty(data)) {
        return (
            <DashboardLayout>
                <div className="product-edit__loading">Loading product details...</div>
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
                <Formik initialValues={initialValues} enableReinitialize onSubmit={handleSubmit}>
                    {({ values, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
                        <form onSubmit={handleSubmit} className="product-edit">
                            <div className="product-edit__meta">
                                <div>
                                    <span className="product-edit__meta-label">Product ID</span>
                                    <span className="product-edit__meta-value">{data.product_id || id}</span>
                                </div>
                                <div>
                                    <span className="product-edit__meta-label">SKU</span>
                                    <span className="product-edit__meta-value">{data?.product_meta?.sku_id || data?.sku_id || "—"}</span>
                                </div>
                                <div>
                                    <span className="product-edit__meta-label">Status</span>
                                    <span className="product-edit__meta-badge">{data?.status_label || "Active"}</span>
                                </div>
                            </div>

                            <section className="product-edit__section">
                                <header className="product-edit__section-header">
                                    <h3>Basic Details</h3>
                                    <p>Update the core information customers see on the product page.</p>
                                </header>
                                <div className="row g-3">
                                    <div className="col-lg-8">
                                        <TextInput
                                            id="title"
                                            name="title"
                                            label="Product Title"
                                            labelClassName="mainLabel"
                                            placeholder="Enter product title"
                                            value={values.title}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                    </div>
                                    <div className="col-lg-4">
                                        <TextInput
                                            id="price"
                                            name="price"
                                            type="number"
                                            label="Price"
                                            labelClassName="mainLabel"
                                            placeholder="0.00"
                                            value={values.price}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                    </div>
                                </div>
                            </section>

                            <section className="product-edit__section">
                                <header className="product-edit__section-header">
                                    <h3>Descriptions</h3>
                                    <p>Craft compelling copy for both quick previews and detailed product storytelling.</p>
                                </header>
                                <div className="row g-4">
                                    <div className="col-lg-5">
                                        <TextInput
                                            id="shortDescription"
                                            name="shortDescription"
                                            type="textarea"
                                            rows={5}
                                            label="Short Description"
                                            labelClassName="mainLabel"
                                            placeholder="Appears in listings and quick views"
                                            value={values.shortDescription}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                    </div>
                                    <div className="col-lg-7">
                                        <TextInput
                                            id="longDescription"
                                            name="longDescription"
                                            type="textarea"
                                            rows={7}
                                            label="Detailed Description"
                                            labelClassName="mainLabel"
                                            placeholder="Tell the full product story, materials, rituals, and care."
                                            value={values.longDescription}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                    </div>
                                </div>
                            </section>

                            <section className="product-edit__section">
                                <header className="product-edit__section-header">
                                    <h3>Media</h3>
                                    <p>Showcase your product with consistent, on-brand imagery.</p>
                                </header>
                                <div className="row g-4">
                                    <div className="col-md-6">
                                        <div className="product-edit__upload">
                                            <label className="mainLabel" htmlFor="mainImage">Main Image</label>
                                            <div className="product-edit__upload-control">
                                                <input
                                                    id="mainImage"
                                                    name="mainImage"
                                                    type="file"
                                                    accept="image/*"
                                                    className="form-control"
                                                    onChange={(event) => handleMainImageChange(event, setFieldValue)}
                                                />
                                                <small className="text-muted">Upload a square JPG or PNG. This is the default storefront image.</small>
                                            </div>
                                            {mainImagePreview && (
                                                <figure className="product-edit__preview">
                                                    <img src={mainImagePreview} alt="Main product visual" />
                                                    <figcaption>{extractFileName(mainImageFile || mainImageBaseline.current)}</figcaption>
                                                </figure>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="product-edit__upload">
                                            <label className="mainLabel" htmlFor="hoverImage">Hover Image</label>
                                            <div className="product-edit__upload-control">
                                                <input
                                                    id="hoverImage"
                                                    name="hoverImage"
                                                    type="file"
                                                    accept="image/*"
                                                    className="form-control"
                                                    onChange={(event) => handleHoverImageChange(event, setFieldValue)}
                                                />
                                                <small className="text-muted">Displayed on hover for gallery cards and quick shop views.</small>
                                            </div>
                                            {hoverImagePreview && (
                                                <figure className="product-edit__preview">
                                                    <img src={hoverImagePreview} alt="Secondary product visual" />
                                                    <figcaption>{extractFileName(hoverImageFile || hoverImageBaseline.current)}</figcaption>
                                                </figure>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="product-edit__section">
                                <header className="product-edit__section-header">
                                    <h3>Variants</h3>
                                    <p>Control purchasable options such as colors and sizes.</p>
                                </header>
                                <div className="product-edit__option-group">
                                    <div className="product-edit__option-header">
                                        <span className="mainLabel mb-0">Color Options</span>
                                        <div className="product-edit__option-toggles">
                                            <label className="form-check product-edit__toggle">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="colorMode"
                                                    value="no-color"
                                                    checked={colorMode === "no-color"}
                                                    onChange={() => setColorMode("no-color")}
                                                />
                                                <span className="form-check-label">No color variants</span>
                                            </label>
                                            <label className="form-check product-edit__toggle">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="colorMode"
                                                    value="with-color"
                                                    checked={colorMode === "with-color"}
                                                    onChange={() => setColorMode("with-color")}
                                                />
                                                <span className="form-check-label">Manage colors</span>
                                            </label>
                                        </div>
                                    </div>

                                    {colorMode === "with-color" && (
                                        <div className="product-edit__option-stack">
                                            {colors.map((color) => (
                                                <div key={color.id} className="product-edit__variant-card">
                                                    <div className="product-edit__color-picker">
                                                        <input
                                                            type="color"
                                                            value={color.value}
                                                            onChange={(event) => handleColorValueChange(color.id, event.target.value)}
                                                        />
                                                    </div>
                                                    <div className="flex-grow-1">
                                                        <label className="mainLabel" htmlFor={`color-name-${color.id}`}>Color Name</label>
                                                        <input
                                                            id={`color-name-${color.id}`}
                                                            className="form-control"
                                                            type="text"
                                                            placeholder="e.g., Warm Gray"
                                                            value={color.name}
                                                            onChange={(event) => handleColorNameChange(color.id, event.target.value)}
                                                        />
                                                    </div>
                                                    <button
                                                        type="button"
                                                        className="product-edit__icon-btn"
                                                        onClick={() => removeColorRow(color.id)}
                                                        aria-label="Remove color option"
                                                        disabled={colors.length === 1}
                                                    >
                                                        <FaTrash />
                                                    </button>
                                                </div>
                                            ))}
                                            <button type="button" className="product-edit__add-btn" onClick={addColorRow}>
                                                <FaPlus /> Add color
                                            </button>
                                        </div>
                                    )}
                                </div>

                                <div className="product-edit__option-group mt-4">
                                    <div className="product-edit__option-header">
                                        <span className="mainLabel mb-0">Size Options</span>
                                        <div className="product-edit__option-toggles">
                                            <label className="form-check product-edit__toggle">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="sizeMode"
                                                    value="no-size"
                                                    checked={sizeMode === "no-size"}
                                                    onChange={() => setSizeMode("no-size")}
                                                />
                                                <span className="form-check-label">No size variants</span>
                                            </label>
                                            <label className="form-check product-edit__toggle">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="sizeMode"
                                                    value="with-size"
                                                    checked={sizeMode === "with-size"}
                                                    onChange={() => setSizeMode("with-size")}
                                                />
                                                <span className="form-check-label">Manage sizes</span>
                                            </label>
                                        </div>
                                    </div>

                                    {sizeMode === "with-size" && (
                                        <div className="product-edit__option-stack">
                                            {sizes.map((size) => (
                                                <div key={size.id} className="product-edit__variant-card product-edit__variant-card--size">
                                                    <div className="flex-grow-1">
                                                        <label className="mainLabel" htmlFor={`size-name-${size.id}`}>Size Label</label>
                                                        <input
                                                            id={`size-name-${size.id}`}
                                                            className="form-control"
                                                            type="text"
                                                            placeholder="e.g., Small"
                                                            value={size.name}
                                                            onChange={(event) => handleSizeNameChange(size.id, event.target.value)}
                                                        />
                                                    </div>
                                                    <button
                                                        type="button"
                                                        className="product-edit__icon-btn"
                                                        onClick={() => removeSizeRow(size.id)}
                                                        aria-label="Remove size option"
                                                        disabled={sizes.length === 1}
                                                    >
                                                        <FaTrash />
                                                    </button>
                                                </div>
                                            ))}
                                            <button type="button" className="product-edit__add-btn" onClick={addSizeRow}>
                                                <FaPlus /> Add size
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </section>

                            <div className="product-edit__actions">
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
                        </form>
                    )}
                </Formik>
            </div>
        </DashboardLayout>
    );
};

export default withModal(EditProduct);
