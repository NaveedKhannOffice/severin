import { ErrorMessage, Formik } from "formik";
import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { CiCirclePlus, CiTrash } from "react-icons/ci";
import { DashboardLayout } from "../../../Components/Layouts/AdminLayout/DashboardLayout";
import BackButton from "../../../Components/Common/BackButton";
import CustomButton from "../../../Components/Common/CustomButton";
import TextInput from "../../../Components/Common/FormElements/TextInput";
import UploadAndDisplayImage from "../../../Components/UploadAndDisplayImage/UploadAndDisplayImage";

import UploadAndDisplayVideo from "../../../Components/UploadAndDisplayVideo/UploadAndDisplayVideo";
import { faqSchema } from "../../../Config/Validations";
import withModal from "../../../HOC/withModal";
import { useFormStatus } from "../../../Hooks/useFormStatus";
import { post } from "../../../Services/Api";

const AddFaQs = ({ showModal }) => {
  const { isSubmitting, startSubmitting, stopSubmitting } = useFormStatus();
  const navigate = useNavigate();

  const initialValues = {
    question: "",
    type: "text",
    answer: "",
    video: [],
    image: [],
  };

  const handleSubmit = (values, { resetForm }) => {
    startSubmitting();

    showModal("Add FAQ", "Are you sure you want to add this FAQ?", async () => {
      await onConfirmStatusChange(values);
      stopSubmitting();
    });

    const onConfirmStatusChange = async (values) => {
      if (
        values.image !== "" &&
        values.image !== "undefined" &&
        values.image.length > 0
      ) {
        values.image = values.image[0];
      }
      if (
        values.video !== "" &&
        values.video !== "undefined" &&
        values.video.length > 0
      ) {
        values.video = values.video[0];
      }
      const response = await post(`/admin/faqs`, values);
      if (response.status) {
        showModal(
          "Successful",
          "FAQ has been added successfully!",
          () => navigate(-1),
          true
        );
        stopSubmitting();
      }
      resetForm();
      console.log("Submitted Values: ", values);
    };
  };

  return (
    <DashboardLayout pageTitle="Add Faqs">
      <div className="container-fluid">
        <div className="row my-3">
          <div className="col-12">
            <h2 className="mainTitle">
              <BackButton />
              Add FAQ
            </h2>
          </div>
        </div>
        <div className="row mb-4">
          <div className="col-12">
            <div className="dashCard">
              <Row>
                <Col xs={10}>
                  <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    validationSchema={faqSchema}
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
                            <Form.Label className="mb-0">Answer: </Form.Label>
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
                              <UploadAndDisplayImage
                                onChange={(files) => {
                                  setFieldValue("image", files);
                                }}
                                numberOfFiles={1}
                                errorFromParent={touched.image && errors.image}
                              />
                              {/* <ErrorMessage name="image" component="div" className="text-danger" /> */}
                            </div>
                          )}

                          {values.type === "video" && (
                            <div className="mt-4">
                              <UploadAndDisplayVideo
                                id="video"
                                onChange={(files) =>
                                  setFieldValue("video", files)
                                }
                                numberOfFiles={1}
                                errorFromParent={touched.video && errors.video}
                              />
                              {/* <ErrorMessage name="video" component="div" className="text-danger" /> */}
                            </div>
                          )}
                        </div>

                        <CustomButton
                          variant="site-btn primary-btn"
                          className="px-5"
                          text="Add"
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

export default withModal(AddFaQs);
