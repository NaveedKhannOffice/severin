import { Formik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { DashboardLayout } from "../../../Components/Layouts/AdminLayout/DashboardLayout";
import BackButton from "../../../Components/Common/BackButton";
import TextInput from "../../../Components/Common/FormElements/TextInput";
import { Select } from "../../../Components/Common/FormElements/SelectInput";
import { statusOptions } from "../../../Config/TableStatus";
import withModal from "../../../HOC/withModal";
import { useFormStatus } from "../../../Hooks/useFormStatus";
import CustomButton from "../../../Components/Common/CustomButton";
import { addProductCategorySchema } from "../../../Config/Validations";
import { productCategoryManagementData } from "../../../Config/data";
import { isNullOrEmpty } from "../../../Utils/helper";
import { getDetails, post } from "../../../Services/Api";

const EditProductCategory = ({ showModal }) => {
  const { isSubmitting, startSubmitting, stopSubmitting } = useFormStatus();
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const getCategory = async () => {
    const response = await getDetails(`/admin/categories/${id}`);
    if (response) {
      setData(response?.data);
    }
  };
  const { id } = useParams();
  useEffect(() => {
    getCategory();
  }, [id]);
  const handleSubmit = async (values) => {
    startSubmitting();
    const response = await post(`/admin/categories/${id}`, values);
    if (response.status) {
      showModal(
        "Successful",
        `Category has been Updated successfully!`,
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
    <DashboardLayout pageTitle="Add Product Category">
      <div className="row my-4">
        <div className="col-12">
          <h2 className="mainTitle">
            <BackButton />
            Edit product Category
          </h2>
        </div>
      </div>
      <div className="dashCard mb-4">
        <div className="row mb-3">
          <div className="col-xl-4 col-lg-4">
            <Formik
              initialValues={{
                category_title: data?.category_title || "",
                status: data?.status || "",
              }}
              validationSchema={addProductCategorySchema}
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
                        label="Category Title"
                        labelclass="mainLabel"
                        type="text"
                        required
                        placeholder="Enter Category Title"
                        inputclass="mainInput"
                        id="category_title"
                        value={values.category_title}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.category_title && errors.category_title}
                      />
                    </div>
                    <div className="col-12">
                      <div className="select-inner-wrapper">
                        <Select
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
                        </Select>
                      </div>
                    </div>
                  </div>
                  <div className="row ">
                    <div className="col-12 mt-3">
                      <CustomButton
                        variant="site-btn primary-btn"
                        className="px-5"
                        text="update category"
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

export default withModal(EditProductCategory);
