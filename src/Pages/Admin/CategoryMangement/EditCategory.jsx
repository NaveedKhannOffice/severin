import React, { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { DashboardLayout } from "../../../Components/Layouts/AdminLayout/DashboardLayout";
import BackButton from "../../../Components/Common/BackButton";
import CustomButton from "../../../Components/Common/CustomButton";
import FormikField from "../../../Components/FormikField";
import { Select } from "../../../Components/Common/FormElements/SelectInput";
import { editStatus, statusOptions } from "../../../Config/TableStatus";
import { addCategorySchema } from "../../../Config/Validations";
import withModal from "../../../HOC/withModal";
import { useFormStatus } from "../../../Hooks/useFormStatus";
import { categoryManagementData } from "../../../Config/data";
import { useNavigate, useParams } from "react-router-dom";

const EditCategory = ({ showModal }) => {
  const { startSubmitting, stopSubmitting } = useFormStatus();
  const { id } = useParams();
  let navigate = useNavigate();
  const [category, setCategory] = useState(null);

  useEffect(() => {
    // Find the category by ID
    const foundCategory = categoryManagementData.detail.data.find(
      (e) => e.id == id
    );
    setCategory(foundCategory);
  }, [id]);

  const handleStatusChange = () => {
    showModal(
      `Update Category`,
      `Are you sure you want to update the category?`,
      () => updateStatus()
    );
  };

  const updateStatus = async () => {
    showModal(
      "Successful",
      `Category has been updated successfully`,
      () => {
        navigate(-1);
      },
      true
    );
  };

  const handleSubmit = async (values, { resetForm }) => {
    console.log(values);
    startSubmitting();

    try {
      // Example API request to update the category
      // const response = await post("/admin-api/update-category", values);
      // if (response.status) {
      handleStatusChange();
      resetForm();
      // }
    } catch (error) {
      console.error("Error updating category:", error);
    }

    stopSubmitting();
  };

  if (!category) {
    return <div>Loading...</div>; // Handle loading state
  }

  return (
    <DashboardLayout pageTitle="Edit Category">
      <div className="row my-3">
        <div className="col-12">
          <h2 className="mainTitle">
            <BackButton />
            Edit Category
          </h2>
        </div>
      </div>
      <div className="dashCard mb-4">
        <div className="row mb-3">
          <div className="col-md-7 col-lg-5 col-xxl-4">
            <Formik
              initialValues={{
                categoryname: category.category_name || "",
                status: category.status_detail || "",
              }}
              validationSchema={addCategorySchema}
              onSubmit={handleSubmit}
            >
              {({
                isSubmitting,
                values,
                errors,
                touched,
                handleBlur,
                handleSubmit,
                setFieldValue,
                handleChange,
              }) => (
                <Form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-12 my-3">
                      <FormikField
                        name="categoryname"
                        required
                        label="Category Name"
                        labelClass="mainLabel"
                        placeholder="Enter category name"
                        className="mainInput"
                        value={values.categoryname}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-12">
                      <Select
                        className="mainInput"
                        required
                        id="status"
                        name="status"
                        value={values.status}
                        onChange={(value) => setFieldValue("status", value)}
                        label="Status"
                        labelclass="secondaryLabel mainLabel "
                        onBlur={handleBlur}
                        error={touched.status && errors.status}
                      >
                        {editStatus}
                      </Select>
                    </div>
                  </div>

                  <div className="row mt-4">
                    <div className="col-md-12">
                      <CustomButton
                        variant="site-btn primary-btn"
                        className="px-5"
                        text="Update"
                        pendingText="Submitting..."
                        isPending={isSubmitting}
                        type="submit"
                      />
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default withModal(EditCategory);
