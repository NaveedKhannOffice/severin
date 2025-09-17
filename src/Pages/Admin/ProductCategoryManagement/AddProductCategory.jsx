import { Formik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router";
import { DashboardLayout } from "../../../Components/Layouts/AdminLayout/DashboardLayout";
import BackButton from "../../../Components/Common/BackButton";
import TextInput from "../../../Components/Common/FormElements/TextInput";
import { Select } from "../../../Components/Common/FormElements/SelectInput";
import { statusOptions } from "../../../Config/TableStatus";
import withModal from "../../../HOC/withModal";
import { useFormStatus } from "../../../Hooks/useFormStatus";
import CustomButton from "../../../Components/Common/CustomButton";
import { addProductCategorySchema } from "../../../Config/Validations";
import { post } from "../../../Services/Api";

const AddProductCategory = ({ showModal }) => {
  const { isSubmitting, startSubmitting, stopSubmitting } = useFormStatus();
  const navigate = useNavigate();
  const handleSubmit = async (values) => {
    startSubmitting();
    values.type = "product";
    const response = await post(`/admin/categories`, values);
    if (response.status) {
      showModal(
        "Successful",
        `Category has been added successfully!`,
        () => navigate(-1),
        true
      );
      stopSubmitting();
    }
    stopSubmitting();
  };

  return (
    <DashboardLayout pageTitle="Add Product Category">
      <div className="row my-3">
        <div className="col-12">
          <h2 className="mainTitle">
            <BackButton />
            Add Product Category
          </h2>
        </div>
      </div>
      <div className="dashCard mb-4">
        <div className="row mb-3">
          <div className="col-xl-4 col-lg-4">
            <Formik
              initialValues={{
                category_title: "",
                status: 1,
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
                        text="Add Category"
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

export default withModal(AddProductCategory);
