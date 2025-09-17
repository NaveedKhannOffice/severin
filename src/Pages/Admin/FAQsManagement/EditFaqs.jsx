import { ErrorMessage, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { CiCirclePlus, CiTrash } from "react-icons/ci";
import { DashboardLayout } from "../../../Components/Layouts/AdminLayout/DashboardLayout";
import BackButton from "../../../Components/Common/BackButton";
import CustomButton from "../../../Components/Common/CustomButton";
import TextInput from "../../../Components/Common/FormElements/TextInput";
import UploadAndDisplayImages from "../../../Components/UploadAndDisplayImage/UploadAndDisplayImage";
import UploadAndDisplayVideo from "../../../Components/UploadAndDisplayVideo/UploadAndDisplayVideo";
import { faqSchema, updateFaqSchema } from "../../../Config/Validations";
import withModal from "../../../HOC/withModal";
import { useFormStatus } from "../../../Hooks/useFormStatus";
import { getDetails, post } from "../../../Services/Api";
import { useNavigate, useParams } from "react-router-dom";
import { isNullOrEmpty } from "../../../Utils/helper";

const EditFaqs = ({ showModal }) => {
  const { id } = useParams();
  const { isSubmitting, startSubmitting, stopSubmitting } = useFormStatus();
  const navigate = useNavigate();

  const [faqData, setFaqData] = useState(null);

  const getFaqApiData = async () => {
    const response = await getDetails(`/admin/faqs/${id}`);
    if (response) {
      setFaqData(response?.data);
    }
  };

  useEffect(() => {
    getFaqApiData();
  }, []);

  const handleSubmit = (values, { resetForm }) => {
    startSubmitting();

    showModal(
      "Update FAQ",
      "Are you sure you want to update this FAQ?",
      async () => {
        await onConfirmStatusChange(values);
        stopSubmitting();
      }
    );

    const onConfirmStatusChange = async (values) => {
      if (
        values.image &&
        values.image !== "" &&
        values.image !== "undefined" &&
        values.image.length > 0
      ) {
        values.image = values.image[0];
      }
      if (
        values.video &&
        values.video !== "undefined" &&
        values.video.length > 0
      ) {
        values.video = values.video[0]; // Handle video selection
      }
      const response = await post(`/admin/faqs/${id}`, values);
      if (response.status) {
        showModal(
          "Successful",
          "FAQ has been updated successfully!",
          () => navigate(`/admin/faqs`),
          true
        );
        stopSubmitting();
      }

      console.log("Submitted Values: ", values);
    };
  };

  if (isNullOrEmpty(faqData)) {
    return (
      <DashboardLayout>
        <p>loading...</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout pageTitle="Edit FAQ">
      <div className="container-fluid">
        <div className="row my-3">
          <div className="col-12">
            <h2 className="mainTitle">
              <BackButton />
              Edit FAQ
            </h2>
          </div>
        </div>
        <div className="row mb-4">
          <div className="col-12">
            <div className="dashCard">
              <Row>
                <Col xs={10}>
                  <Formik
                    initialValues={{
                      question: faqData.question || "",
                      type: faqData.type || "",
                      answer: faqData.answer || "",
                      video: [],
                      image: [],
                    }}
                    onSubmit={handleSubmit}
                    validationSchema={updateFaqSchema}
                    enableReinitialize
                  >
                    {({
                      values,
                      handleChange,
                      handleSubmit,
                      handleBlur,
                      setFieldValue,
                      touched,
                      errors,
                    }) => (
                      <Form onSubmit={handleSubmit}>
                        <div className="faq-section">
                          {/* TextInput for question */}
                          <TextInput
                            label="Question"
                            required
                            labelclass="mainLabel"
                            type="text"
                            placeholder="Add question"
                            inputclass="mainInput"
                            id="question"
                            value={values.question}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.question && errors.question}
                          />

                          <div className="d-flex gap-sm-4 gap-1 my-4 circle-wrapper align-items-center">
                            <Form.Label className="mb-0">
                              Answer Type:{" "}
                            </Form.Label>
                            <div className="d-flex gap-2">
                              <label className="d-flex align-items-center gap-2 cp circle">
                                <Form.Check
                                  type="radio"
                                  name="type"
                                  value="text"
                                  checked={values.type === "text"}
                                  onChange={() => setFieldValue("type", "text")}
                                  className="cp"
                                />
                                <span>Text</span>
                              </label>
                            </div>
                            <div className="d-flex gap-2">
                              <label className="d-flex align-items-center gap-2 cp circle">
                                <Form.Check
                                  type="radio"
                                  name="type"
                                  value="image"
                                  checked={values.type === "image"}
                                  onChange={() =>
                                    setFieldValue("type", "image")
                                  }
                                  className="cp"
                                />
                                <span>Image</span>
                              </label>
                            </div>
                            <div className="d-flex gap-2">
                              <label className="d-flex align-items-center gap-2 cp circle">
                                <Form.Check
                                  type="radio"
                                  name="type"
                                  value="video"
                                  checked={values.type === "video"}
                                  onChange={() =>
                                    setFieldValue("type", "video")
                                  }
                                />
                                <span>Video</span>
                              </label>
                            </div>
                          </div>

                          <ErrorMessage
                            name="type"
                            component="div"
                            className="text-danger"
                          />

                          {values.type === "text" && (
                            <TextInput
                              label="Answer"
                              required
                              labelclass="mainLabel"
                              type="textarea"
                              rows={3}
                              placeholder="Add Text answer"
                              inputclass="mainInput"
                              id="answer"
                              value={values.answer}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={touched.answer && errors.answer}
                            />
                          )}

                          {values.type === "image" && (
                            <div className="mt-4">
                              <UploadAndDisplayImages
                                // images={[values.image]}
                                onChange={(files) =>
                                  setFieldValue("image", files)
                                }
                                numberOfFiles={1}
                                errorFromParent={touched.image && errors.image}
                              />
                            </div>
                          )}

                          {values.type === "video" && (
                            <div className="mt-4">
                              <UploadAndDisplayVideo
                                // videos={[values.video ?? ""]}
                                onChange={(files) =>
                                  setFieldValue("video", files)
                                }
                                numberOfFiles={1}
                                errorFromParent={touched.video && errors.video}
                              />
                            </div>
                          )}
                        </div>

                        <CustomButton
                          variant="site-btn primary-btn"
                          className="px-5"
                          text="Update"
                          pendingText="Submitting..."
                          isPending={isSubmitting}
                          type="submit"
                          disabled={isSubmitting}
                        />
                      </Form>
                    )}
                  </Formik>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default withModal(EditFaqs);
