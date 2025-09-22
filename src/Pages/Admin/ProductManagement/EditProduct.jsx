import { Formik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { DashboardLayout } from "../../../Components/Layouts/AdminLayout/DashboardLayout";
import BackButton from "../../../Components/Common/BackButton";
import TextInput from "../../../Components/Common/FormElements/TextInput";
import SelectInput from "../../../Components/Common/FormElements/SelectInput";
import { statusOptions } from "../../../Config/TableStatus";
import withModal from "../../../HOC/withModal";
import { useFormStatus } from "../../../Hooks/useFormStatus";
import CustomButton from "../../../Components/Common/CustomButton";
import { isNullOrEmpty } from "../../../Utils/helper";
import { getDetails, post } from "../../../Services/Api";

const EditProduct = ({ showModal }) => {
    const { isSubmitting, startSubmitting, stopSubmitting } = useFormStatus();
    const [data, setData] = useState({});
    const navigate = useNavigate();
    const getProduct = async () => {
        const response = await getDetails(`/user/product/${id}`);
        if (response) {
            setData(response?.data || {});
        }
    };
    const { id } = useParams();
    useEffect(() => {
        getProduct();
    }, [id]);
    const handleSubmit = async (values) => {
        startSubmitting();
        // Only status update is supported here
        const response = await post(`/admin/providers/product/${id}/toggle-status`);
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
                    <div className="col-xl-4 col-lg-4">
                        <Formik
                            initialValues={{
                                title: data?.title || data?.name || "",
                                status: data?.status || "",
                            }}
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
                                    <div className="row my-4">
                                        <div className="col-12 my-2">
                                            <TextInput
                                                label="Product Title"
                                                labelclass="mainLabel"
                                                type="text"
                                                disabled
                                                placeholder="Product Title"
                                                inputclass="mainInput"
                                                id="title"
                                                value={values.title}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                error={touched.title && errors.title}
                                            />
                                        </div>
                                        <div className="col-12">
                                            <div className="select-inner-wrapper">
                                                <SelectInput
                                                    className="mainInput selectInput w-100"
                                                    required
                                                    id="status"
                                                    name="status"
                                                    value={values?.status}
                                                    onChange={(e) => setFieldValue("status", e)}
                                                    label="Status"
                                                    labelclass="mainLabel"
                                                    onBlur={handleBlur}
                                                    isInputNeeded={false}
                                                    error={touched.status && errors.status}
                                                >
                                                    {statusOptions}
                                                </SelectInput>
                                            </div>
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
