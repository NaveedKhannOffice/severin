import { Formik } from "formik";
import { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import BackButton from "../../../Components/Common/BackButton";
import CustomButton from "../../../Components/Common/CustomButton";
import TextInput from "../../../Components/Common/FormElements/TextInput";
import { DashboardLayout } from "../../../Components/Layouts/AdminLayout/DashboardLayout";
import { Select } from "../../../Components/Common/FormElements/SelectInput";
import { challengeData } from "../../../Config/data";
import {
  badgeType,
  challengeTypes,
  statusOptions,
} from "../../../Config/TableStatus";
import { addChallengeSchema } from "../../../Config/Validations";
import withModal from "../../../HOC/withModal";

const EditChallenge = ({ showModal }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { id } = useParams();
  const [challenge, setChallenge] = useState(null);
  const [initialValues, setInitialValues] = useState({
    challengeTitle: "",
    challengeDescription: "",
    badgeType: "",
    status: "",
    startTime: "",
    endTime: "",
    challengeType: "",
  });

  useEffect(() => {
    const challenge = challengeData.detail.data.find((item) => item.id == id);
    if (challenge) {
      setChallenge(challenge);
      // Format time values to HH:mm format
      const formatTime = (timeString) => {
        if (!timeString) return "";
        // If time is in HH:mm:ss format, take only HH:mm
        return timeString.split(":").slice(0, 2).join(":");
      };

      setInitialValues({
        challengeTitle: challenge.challenge_title || "",
        challengeDescription: challenge.challenge_description || "",
        badgeType: challenge.badge_type || "",
        status: challenge.status || "",
        startTime: formatTime(challenge.start_time) || "",
        endTime: formatTime(challenge.end_time) || "",
        challengeType: challenge.challenge_type || "",
      });
    }
  }, [id]);

  const handleSubmit = (values) => {
    setIsSubmitting(true);

    // Show confirmation modal
    showModal(
      "Update Challenge",
      "Are you sure you want to update this challenge?",
      () => {
        // On confirm, log the form data and simulate API call
        console.log("Form Data:", values);

        // Simulate API call success
        setTimeout(() => {
          setIsSubmitting(false);

          // Show success message
          showModal(
            "Success",
            "Challenge has been updated successfully!",
            null,
            true
          );
        }, 1000);
      }
    );
  };

  if (!challenge) {
    return <div>Loading...</div>;
  }
  return (
    <DashboardLayout pageTitle="Edit Challenge">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="my-4 d-flex">
              <BackButton />
              <h2 className="mainTitle mb-0">Edit Challenge</h2>
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
                              placeholder="Enter Challenge Title"
                              labelclass="mainLabel"
                              inputclass="mainInput"
                              value={
                                values.challengeTitle ||
                                challenge?.challenge_title
                              }
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
                                required
                                id="challengeType"
                                name="challengeType"
                                value={
                                  values.challengeType ||
                                  challenge?.challenge_type
                                }
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
                              rows={5}
                              placeholder="Enter Challenge Description"
                              labelclass="mainLabel"
                              inputclass="mainInput"
                              value={
                                values.challengeDescription ||
                                challenge?.challenge_description
                              }
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
                                value={
                                  values.startTime || challenge?.start_time
                                }
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
                                value={values.endTime || challenge?.end_time}
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
                                required
                                id="badgeType"
                                name="badgeType"
                                value={
                                  values.badgeType || challenge?.badge_type
                                }
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
                                required
                                id="status"
                                name="status"
                                value={values.status || challenge?.status}
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
                      text="Update"
                      pendingText="Updating..."
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

export default withModal(EditChallenge);
