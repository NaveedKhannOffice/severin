import { Form, Formik } from "formik";
import { DashboardLayout } from "../../../Components/Layouts/AdminLayout/DashboardLayout";
import BackButton from "../../../Components/Common/BackButton";
import CustomButton from "../../../Components/Common/CustomButton";
import FormikField from "../../../Components/FormikField";
import { Select } from "../../../Components/Common/FormElements/SelectInput";
import { editStatus } from "../../../Config/TableStatus";
import { addCategorySchema } from "../../../Config/Validations";
import withModal from "../../../HOC/withModal";
import { useFormStatus } from "../../../Hooks/useFormStatus";
import { useNavigate } from "react-router-dom";

const AddCategory = ({ showModal }) => {
  const { startSubmitting, stopSubmitting } = useFormStatus();
  const navigate = useNavigate();

  const handleStatusChange = () => {
    showModal(
      `add category`,
      `Are you sure you want to add this category?`,
      () => updateStatus()
    );
  };

  // Second Modal
  const updateStatus = async () => {
    showModal(
      "Succesful",
      `Category has been added successfully`,
      () => navigate("/admin/category-management"),
      true
    );
  };
  const handleSubmit = async (values, { resetForm }) => {
    console.log(values);
    startSubmitting();
    // try {
    //   const response = await post("/admin-api/push-notifications", values);
    //   if (response.status) {
    // showModal("add category", "Notification Pushed Successfully", null, true);
    handleStatusChange();
    resetForm();

    //   }
    // } catch (error) {
    //   console.error("Error pushing notification:", error);
    // }
    stopSubmitting();
  };

  return (
    <DashboardLayout pageTitle="Add Category">
      <div className="row my-3">
        <div className="col-12">
          <h2 className="mainTitle">
            <BackButton />
            Add Category
          </h2>
        </div>
      </div>
      <div className="dashCard mb-4">
        <div className="row mb-3">
          <div className="col-md-7 col-lg-5 col-xxl-4">
            <Formik
              initialValues={{ categoryname: "", status: "active" }}
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
                        label="category name"
                        labelClass="mainLabel"
                        placeholder="Enter category name"
                        className="mainInput"
                      />
                    </div>
                    <div className="col-12">
                      <Select
                        className="mainInput "
                        required
                        id="status"
                        name="status"
                        value={values.status}
                        onChange={(e) => {
                          setFieldValue("status", e);
                        }}
                        label="status"
                        labelclass="secondaryLabel mainLabel  "
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
                        text="add"
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

export default withModal(AddCategory);
