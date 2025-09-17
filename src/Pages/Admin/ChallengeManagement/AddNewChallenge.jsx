import { Formik } from "formik";
import { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import BackButton from "../../../Components/Common/BackButton";
import CustomButton from "../../../Components/Common/CustomButton";
import TextInput from "../../../Components/Common/FormElements/TextInput";
import { DashboardLayout } from "../../../Components/Layouts/AdminLayout/DashboardLayout";
import { Select } from "../../../Components/Common/FormElements/SelectInput";
import {
  badgeType,
  challengeTypes,
  statusOptions,
} from "../../../Config/TableStatus";
import {
  addChallengeSchema,
  referRewardValidationSchema,
} from "../../../Config/Validations";
import withModal from "../../../HOC/withModal";
import { post } from "../../../Services/Api";
import { Navigate, useNavigate } from "react-router-dom";

const AddNewChallenge = ({ showModal }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const initialValues = {
    challengeTitle: "",
    challengeDescription: "",
    badgeType: "gold",
    challengeType: "daily",
    status: 1,
    startTime: "",
    endTime: "",
  };

  const handleSubmit = async (values) => {
    setIsSubmitting(true);

    // Show confirmation modal
    showModal(
      "Add Challenge",
      "Are you sure you want to add this challenge?",
      async () => {
        // On confirm, log the form data and simulate API call

        try {
          const restruturedData = {
            title: values.challengeTitle,
            type: values.challengeType,
            badge_type: values.badgeType,
            from: values.startTime,
            to: values.endTime,
            description: values.challengeDescription,
            status: values.status,
          };
          console.log("Form Data:", restruturedData);

          const response = await post(
            `/admin/create-challenge`,
            restruturedData
          );
          if (response.status) {
            setIsSubmitting(false);

            showModal(
              "Success",
              "Challenge has been added successfully!",
              () => navigate(-1),
              true
            );
          }
        } catch (error) {
          console.error("Submission Error:", error);
          showModal("Error", "An unexpected error occurred");
        } finally {
          setIsSubmitting(false);
        }
      }
    );
  };

  return (
    <DashboardLayout pageTitle="Add Challenge">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="my-4 d-flex">
              <BackButton />
              <h2 className="mainTitle mb-0">Add Challenge</h2>
            </div>

            <Formik
              initialValues={initialValues}
              validationSchema={addChallengeSchema}
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
                <Form onSubmit={handleSubmit}>
                  {/* First Card - Basic Info */}
                  <div className="dashCard mb-4">
                    <div className="row mb-3">
                      <div className="col-md-8 col-lg-7 col-xl-5">
                        <Row>
                          <Col xs={12} className="mb-3">
                            <TextInput
                              label="Challenge Title"
                              id="challengeTitle"
                              name="challengeTitle"
                              type="text"
                              required
                              placeholder="Enter Challenge Title"
                              labelclass="mainLabel"
                              inputclass="mainInput"
                              value={values.challengeTitle}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={
                                touched.challengeTitle && errors.challengeTitle
                              }
                            />
                          </Col>
                          <Col xs={12} className="mb-4">
                            <div className="select-inner-wrapper">
                              <Select
                                className="mainInput selectInput w-100"
                                id="challengeType"
                                name="challengeType"
                                value={values?.challengeType}
                                onChange={(e) =>
                                  setFieldValue("challengeType", e)
                                }
                                label="Challenge Type"
                                labelclass="mainLabel"
                                onBlur={handleBlur}
                                isInputNeeded={false}
                                error={
                                  touched.challengeType && errors.challengeType
                                }
                              >
                                {challengeTypes}
                              </Select>
                            </div>
                          </Col>
                          <Col xs={12} className="mb-3">
                            <TextInput
                              label="Challenge Description"
                              id="challengeDescription"
                              name="challengeDescription"
                              type="textarea"
                              required
                              rows={5}
                              placeholder="Enter Challenge Description"
                              labelclass="mainLabel"
                              inputclass="mainInput"
                              value={values.challengeDescription}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={
                                touched.challengeDescription &&
                                errors.challengeDescription
                              }
                            />
                          </Col>
                          <Col xs={12} className="mb-4">
                            <label className="mainLabel d-block mb-2">
                              Timing<span className="text-danger">*</span>
                            </label>
                            <div className="d-flex align-items-baseline gap-2">
                              <span className="me-2">Between</span>
                              <TextInput
                                id="startTime"
                                name="startTime"
                                type="time"
                                label=""
                                inputclass="mainInput"
                                value={values.startTime}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.startTime && errors.startTime}
                                style={{ width: "150px" }}
                              />
                              <span className="mx-2">And</span>
                              <TextInput
                                id="endTime"
                                name="endTime"
                                type="time"
                                label=""
                                inputclass="mainInput"
                                value={values.endTime}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.endTime && errors.endTime}
                                style={{ width: "150px" }}
                              />
                            </div>
                          </Col>

                          <Col xs={12} className="mb-4">
                            <div className="select-inner-wrapper">
                              <Select
                                className="mainInput selectInput w-100"
                                id="badgeType"
                                name="badgeType"
                                value={values?.badgeType}
                                onChange={(e) => setFieldValue("badgeType", e)}
                                label="Badge Type to give reward"
                                labelclass="mainLabel"
                                onBlur={handleBlur}
                                isInputNeeded={false}
                                error={touched.badgeType && errors.badgeType}
                              >
                                {badgeType}
                              </Select>
                            </div>
                          </Col>
                          <Col xs={12} className="mb-4">
                            <div className="select-inner-wrapper">
                              <Select
                                className="mainInput selectInput w-100"
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
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="mb-4">
                    <CustomButton
                      variant="site-btn primary-btn"
                      text="Add"
                      pendingText="Adding..."
                      isPending={isSubmitting}
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-success"
                    />
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

export default withModal(AddNewChallenge);
