import { Formik, Form } from "formik";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Form as BootstrapForm } from "react-bootstrap";
import { userContactValidationSchema } from "../../../Config/Validations";
// import { Form } from 'react-router-dom';
import TextInput from "../../../Components/Common/FormElements/TextInput";
import CustomButton from "../../../Components/Common/CustomButton";
import { useFormStatus } from "../../../Hooks/useFormStatus";
import PageTitle from "../../../Components/PageTitle";
import { usePageTitle } from "../../../Utils/helper";
import { post } from "../../../Services/Api";
import { useAuth } from "../../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";
import withModal from "../../../HOC/withModal";

const ContactUs = ({ showModal }) => {
  usePageTitle("Contact", true);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { isSubmitting, startSubmitting, stopSubmitting } = useFormStatus(); // use your custom hook
  const handleSubmit = async (values, { resetForm }) => {
    startSubmitting();

    try {
      // console.log(user ,"userrrrrrrrrrrr");
      values.user_id = user ? user?.id : null;
      const response = await post("/service-provider/contact-us", values);

      if (response.status) {
        showModal(
          "Successful",
          "Thank you for reaching out! We have received your message and will get back to you shortly.",
          //  null,
          () => navigate(-1),
          true
        );
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }

    console.log("submit Forms Value", values);
    stopSubmitting();
    resetForm();
  };

  return (
    <>
      <PageTitle
        pageHeading="Contact Us"
        pageText="Whether you have a question, need support, or just want someone to listen we’re ready. Reach out to us anytime. At ConnectMio, no message goes unheard, and no concern is too small."
      />
      <section className="page-content contactpage">
        <Container fluid>
          <Row>
            <Col xs={12} lg={6} xxl={6} className="mx-auto">
              <div className="form-card">
                <Formik
                  initialValues={{
                    name: "",
                    email: "",
                    subject: "",
                    message: "",
                  }}
                  validationSchema={userContactValidationSchema}
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
                    <Form>
                      <Row>
                        <Col xs={12} className="mb-2 mb-lg-2 mb-xxl-2">
                          <TextInput
                            label="Full Name"
                            id="name"
                            type="text"
                            required
                            placeholder="Enter Full Name"
                            labelclass="mainLabel"
                            inputclass="mainInput mainInputLogIn"
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.name && errors.name}
                          />
                        </Col>
                        <Col xs={12} className="mb-2 mb-lg-2 mb-xxl-2">
                          <TextInput
                            label="Email/Phone"
                            id="email"
                            type="text"
                            required
                            placeholder="Enter Email or Phone"
                            labelclass="mainLabel"
                            inputclass="mainInput mainInputLogIn"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.email && errors.email}
                          />
                        </Col>
                        <Col xs={12} className="mb-2 mb-lg-2 mb-xxl-2">
                          <TextInput
                            label="Subject"
                            id="subject"
                            type="text"
                            required
                            placeholder="Enter Subject"
                            labelclass="mainLabel"
                            inputclass="mainInput mainInputLogIn"
                            value={values.subject}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.subject && errors.subject}
                          />
                        </Col>
                        <Col xs={12} className="mb-2 mb-lg-2 mb-xxl-2">
                          <TextInput
                            label="Message"
                            id="message"
                            type="textarea"
                            rows="7"
                            required
                            placeholder="Enter Message"
                            labelclass="mainLabel"
                            inputclass="mainInput mainInputLogIn"
                            value={values.message}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.message && errors.message}
                          />
                        </Col>
                        <Col xs={12} className="mt-2 mt-lg-2">
                          <CustomButton
                            variant="site-btn primary-btn"
                            className="px-5 w-100"
                            text="Submit"
                            loadingText="Loading..."
                            // isPending={isSubmitting}
                            type="submit"
                          />
                        </Col>
                      </Row>
                    </Form>
                  )}
                </Formik>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default withModal(ContactUs);
