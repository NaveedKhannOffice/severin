import { Form, Formik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "../../../../Components/Layouts/AdminLayout/DashboardLayout";
import BackButton from "../../../../Components/Common/BackButton";
import CustomButton from "../../../../Components/Common/CustomButton";
import TextInput from "../../../../Components/Common/FormElements/TextInput";
import UploadAndDisplayFiles from "../../../../Components/UploadAndDisplayFiles/UploadAndDisplayFiles";
import { addBlogSchema } from "../../../../Config/Validations";
import withModal from "../../../../HOC/withModal";
import { useFormStatus } from "../../../../Hooks/useFormStatus";
import { post } from "../../../../Services/Api";
import UploadAndDisplayImage from "../../../../Components/UploadAndDisplayImage/UploadAndDisplayImage";

const AddBlog = ({ showModal }) => {
  const { isSubmitting, startSubmitting, stopSubmitting } = useFormStatus();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    startSubmitting();
    values.banner = values.banner[0];
    values.file = values.file[0];
    const response = await post(`/admin/blogs`, values);
    if (response.status) {
      showModal(
        "Successful",
        `This Blog has been added successfully!`,
        () => navigate(`/admin/content-management?tab=blogs`),
        true
      );
      stopSubmitting();
    }
    stopSubmitting();
  };
  return (
    <DashboardLayout pageTitle="Add Blog">
      <div className="container-fluid">
        <div className="row my-3">
          <div className="col-12">
            <h2 className="mainTitle">
              <BackButton url={`/admin/content-management?tab=blogs`} />
              Add Blog
            </h2>
          </div>
        </div>
        <div className="dashCard mb-4">
          <div className="row mb-3">
            <div className="col-12">
              <Formik
                initialValues={{
                  title: "",
                  category: null,
                  banner: "",
                  file: "",
                }}
                validationSchema={addBlogSchema}
                onSubmit={handleSubmit}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  setFieldValue,
                }) => (
                  <Form className="category-wrap">
                    <div className="row mb-2">
                      <div className="col-md-8 col-lg-6 col-xl-5 col-xxl-4">
                        <TextInput
                          label="Blog Title"
                          labelclass="mainLabel"
                          type="text"
                          required
                          placeholder="Enter Blog Title"
                          inputclass="mainInput"
                          id="title"
                          value={values.title}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.title && errors.title}
                        />
                      </div>
                    </div>
                    <div className="row mb-2">
                      <div className="col-12 col-sm-6">
                        <UploadAndDisplayImage
                          label={"Upload Banner Image"}
                          required
                          onChange={(files) => setFieldValue("banner", files)}
                          numberOfFiles={1}
                          errorFromParent={touched.banner && errors.banner}
                        />
                      </div>
                      <div className="col-12 col-sm-6">
                        <UploadAndDisplayFiles
                          label={"Upload Blog File"}
                          required
                          onChange={(files) => setFieldValue("file", files)}
                          numberOfFiles={1}
                          errorFromParent={touched.file && errors.file}
                        />
                      </div>
                    </div>
                    <p className="mainLabel mb-4 ps-0">
                      Limit: 1 File & 1 Image at a Time
                    </p>
                    <div className="row mb-2">
                      <div className="col-md-8 col-lg-6 col-xl-5 col-xxl-4 mb-3">
                        <div className="radio-checkbox-wrapper gap-3 gap-sm-5">
                          <label className="radio-checkbox-container">
                            <input
                              onChange={handleChange}
                              type="radio"
                              name="category"
                              value="free"
                            />
                            <span className="custom-checkbox"></span>
                            For Free
                          </label>
                          <label className="radio-checkbox-container">
                            <input
                              onChange={handleChange}
                              type="radio"
                              name="category"
                              value="premium"
                            />
                            <span className="custom-checkbox"></span>
                            For Premium
                          </label>
                        </div>
                        <p style={{ color: "red" }} className="mb-0">
                          {touched.category && errors.category}
                        </p>
                      </div>
                    </div>

                    <div className="row ">
                      <div className="col-md-8 col-lg-6 col-xl-5 col-xxl-4 mt-3">
                        <CustomButton
                          variant="site-btn primary-btn"
                          className="px-5"
                          text="Add Blog"
                          pendingText="Submitting..."
                          isPending={isSubmitting}
                          type="submit"
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default withModal(AddBlog);
