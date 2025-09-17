import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DashboardLayout } from "../../../../Components/Layouts/AdminLayout/DashboardLayout";
import BackButton from "../../../../Components/Common/BackButton";
import CustomButton from "../../../../Components/Common/CustomButton";
import TextInput from "../../../../Components/Common/FormElements/TextInput";
import UploadAndDisplayFiles from "../../../../Components/UploadAndDisplayFiles/UploadAndDisplayFiles";
import UploadAndDisplayImage from "../../../../Components/UploadAndDisplayImage/UploadAndDisplayImage";
import { articlesData } from "../../../../Config/data";
import {
  addArticleSchema,
  updateArticleSchema,
} from "../../../../Config/Validations";
import withModal from "../../../../HOC/withModal";
import { useFormStatus } from "../../../../Hooks/useFormStatus";
import { isNullOrEmpty } from "../../../../Utils/helper";
import { getDetails, post } from "../../../../Services/Api";

const EditArticle = ({ showModal }) => {
  const { isSubmitting, startSubmitting, stopSubmitting } = useFormStatus();
  const { id } = useParams();
  const [article, setArticle] = useState({});
  const navigate = useNavigate();
  const getrticle = async () => {
    const response = await getDetails(`/admin/articles/${id}`);
    if (response) {
      setArticle(response?.data);
    }
  };
  useEffect(() => {
    getrticle();
  }, [id]);

  const handleSubmit = async (values) => {
    console.log("Article data:", values);
    showModal(
      `Update Article`,
      `Are you sure you want to update this Article?`,
      () => onConfirmStatusChange(values)
    );
  };
  const onConfirmStatusChange = async (values) => {
    startSubmitting();
    if (
      values.banner !== "" &&
      values.banner !== "undefined" &&
      values.banner.length > 0
    ) {
      values.banner = values.banner[0];
    }
    if (
      values.file !== "" &&
      values.file !== "undefined" &&
      values.file.length > 0
    ) {
      values.file = values.file[0];
    }
    const response = await post(`/admin/articles/${id}`, values);
    if (response.status) {
      showModal(
        "Successful",
        `This Article has been updated successfully!`,
        () => navigate(`/admin/content-management?tab-blogs`),
        true
      );
      stopSubmitting();
    }
  };

  if (isNullOrEmpty(article)) {
    return (
      <DashboardLayout pageTitle="Edit Article">
        <div className="container-fluid">
          <div className="row mb-5">
            <div className="col-12 my-4 d-flex">
              <BackButton url={`/admin/content-management?tab=blogs`} />
              <h2 className="mainTitle mb-0">Edit Article</h2>
            </div>
            <div className="col-12">
              <div className="dashCard mb-4">loading...</div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }
  return (
    <DashboardLayout pageTitle="Edit Article">
      <div className="container-fluid">
        <div className="row my-3">
          <div className="col-12">
            <h2 className="mainTitle">
              <BackButton url={`/admin/content-management?tab=blogs`} />
              Edit Article
            </h2>
          </div>
        </div>
        <div className="dashCard mb-4">
          <div className="row mb-3">
            <div className="col-12">
              <Formik
                initialValues={{
                  title: article?.title,
                  category: article?.category,
                  banner: "",
                  file: "",
                }}
                validationSchema={updateArticleSchema}
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
                          label="Article Title"
                          labelclass="mainLabel"
                          type="text"
                          required
                          placeholder="Enter Article Title"
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
                          images={article.banner}
                          onChange={(files) => setFieldValue("banner", files)}
                          numberOfFiles={1}
                          errorFromParent={touched.banner && errors.banner}
                        />
                      </div>
                      <div className="col-12 col-sm-6">
                        <UploadAndDisplayFiles
                          files={values.file}
                          required
                          label={"Upload Article File"}
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
                              defaultChecked={article.category === "free"}
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
                              defaultChecked={article.category === "premium"}
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
                          text="Update Article"
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

export default withModal(EditArticle);
