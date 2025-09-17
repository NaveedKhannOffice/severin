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
import { addServiceCategorySchema } from "../../../Config/Validations";
import UploadAndDisplayImages from "../../../Components/UploadAndDisplayImage/UploadAndDisplayImage";
import { post } from "../../../Services/Api";

const AddServiceCategory = ({ showModal }) => {
  const navigate = useNavigate();
  const { isSubmitting, startSubmitting, stopSubmitting } = useFormStatus();
  const [errorsData, setErrorsData] = useState({});

  const handleSubmit = async (values) => {
    startSubmitting();
    values.photo = values.photo[0];
    const response = await post(`/admin/categories`, values);
    if (response.status) {
      showModal(
        "Successful",
        `Category has been added successfully`,
        () => navigate(-1),
        true
      );
      stopSubmitting();
    }

    stopSubmitting();
  };

  return (
    <DashboardLayout pageTitle="Add Service Category">
      <div className="container-fluid">
        <div className="row mb-5">
          <div className="col-12 my-4 d-flex">
            <BackButton />
            <h2 className="mainTitle mb-0">Add Service Category</h2>
          </div>
          <div className="col-12">
            <div className="dashCard mb-4">
              <div className="row mb-3">
                <div className="col-12">
                  <Formik
                    initialValues={{
                      category_title: "",
                      status: "1",
                      photo: "",
                      type: "service",
                    }}
                    validationSchema={addServiceCategorySchema}
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
                        <div className="row">
                          <div className="col-md-8 col-lg-6 col-xl-5 col-xxl-4 my-2">
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
                              error={
                                touched.category_title && errors.category_title
                              }
                            />
                          </div>
                          <div className="row mb-4">
                            <div className="col-md-8 col-lg-6 col-xl-5 col-xxl-4">
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
                        </div>
                        <UploadAndDisplayImages
                          height={"400px"}
                          onChange={(files) => setFieldValue("photo", files)}
                          numberOfFiles={1}
                          errorFromParent={touched.photo && errors.photo}
                        />
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
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default withModal(AddServiceCategory);
