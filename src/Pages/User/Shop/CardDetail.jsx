import { React, useState, useEffect } from "react";
import { Col, Container, Row, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import "./style.css";
import { usePageTitle } from "../../../Utils/helper";
import PageTitle from "../../../Components/PageTitle";
import CustomButton from "../../../Components/CustomButton";
import CustomInput from "../../../Components/CustomInput";
import { Formik } from "formik";
import {
  paymentCardValidationSchema,
  paymentValidationSchema,
  subsPaymentValidationSchema,
} from "../../../Config/Validations";
import BackButton2 from "../../../Components/BackButton/BackButton2";
import { months, yearOptions } from "../../../Config/TableStatus";
import { Select } from "../../../Components/Select";
import { SubscriptionData } from "../../../Config/data";
import { useFormStatus } from "../../../Hooks/useFormStatus";
import withModal from "../../../HOC/withModal";

const CardDetail = ({ showModal }) => {
  usePageTitle("Subscription Payment", true);

  const { id } = useParams();
  const navigate = useNavigate();
  const { isSubmitting, startSubmitting, stopSubmitting } = useFormStatus(); // use your custom hook

  // Data Table
  const [data, setData] = useState([]);

  useEffect(() => {
    const getUser = async () => {
      const response = SubscriptionData.detail.data.find(
        (e) => e.id === Number(id)
      );
      // const response = await getDetails(`/admin-api/users/${id}`);
      if (response) {
        // setProfileData(response.detail);
        setData(response);
      }
    };
    getUser();
  }, [id]);

  const handleSubmit = async (values, { resetForm }) => {
    startSubmitting();

    showModal(
      "Successful",
      "Order has been placed Successfully. Your Order ID is #1234567",
      () => navigate("/order-logs"),
      true
    );

    console.log("submit Forms Value", values);
    stopSubmitting();
    resetForm();
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   setFormData("")
  //   navigate('/buyer/subscription-logs')
  // }

  return (
    <>
      <PageTitle pageHeading="Card Detail" />
      <section className="page-content subscriptions-payment py-5">
        <Container fluid>
          <Row>
            <Col xs={12} lg={6} xxl={8} className="mx-auto">
              <div className="backLink mb-3">
                <BackButton2 />
              </div>
              <div className="form-card px-5">
                <div className="payment-amount text-center mb-5">
                  <h3 className="fw-semibold mb-4">
                    Amount: <span>$100</span>
                  </h3>
                </div>
                <Formik
                  initialValues={{
                    card_holder_name: "",
                    card_number: "",
                    status_detail: { month: "", year: "" }, // To handle month/year for validity
                    cvv_number: "",
                  }}
                  validationSchema={paymentCardValidationSchema}
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
                      {/* {console.log(errors)} */}
                      <Row>
                        <Col lg={6} className="mb-4">
                          <CustomInput
                            label="Card Holder Name"
                            id="card_holder_name"
                            type="text"
                            required
                            placeholder="Enter Card Holder Name"
                            labelclass="mainLabel"
                            inputclass="mainInput mainInputLogIn"
                            value={values.card_holder_name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              touched.card_holder_name &&
                              errors.card_holder_name
                            }
                          />
                        </Col>
                        <Col lg={6} className="mb-4">
                          <CustomInput
                            label="Credit/Debit Card No."
                            id="card_number"
                            type="text"
                            placeholder="Enter your card number"
                            labelclass="mainLabel"
                            inputclass="mainInput mainInputLogIn"
                            value={values.card_number}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.card_number && errors.card_number}
                            required
                          />
                        </Col>
                        <Col lg={6} className="mb-4">
                          <label className="d-block mainLabel">
                            Validity Date<span className="text-danger">*</span>
                          </label>
                          <div className="d-flex flex-column flex-md-row gap-2 input-card-validity">
                            <div className="w-100">
                              <Select
                                className="mainInput selectInput w-100"
                                required
                                id="status_detail.month"
                                name="status_detail.month"
                                mainLabel="Select Month"
                                value={values.status_detail.month}
                                onChange={(value) =>
                                  handleChange({
                                    target: {
                                      name: "status_detail.month",
                                      value,
                                    },
                                  })
                                } // Adapting to Formik
                                onBlur={handleBlur}
                                error={
                                  touched.status_detail?.month &&
                                  errors.status_detail?.month
                                }
                              >
                                {months}
                              </Select>
                            </div>
                            <div className="w-100">
                              <Select
                                className="mainInput selectInput w-100"
                                required
                                id="status_detail.year"
                                name="status_detail.year"
                                mainLabel="Select Year"
                                value={values.status_detail.year}
                                onChange={(value) =>
                                  handleChange({
                                    target: {
                                      name: "status_detail.year",
                                      value,
                                    },
                                  })
                                } // Adapting to Formik
                                onBlur={handleBlur}
                                error={
                                  touched.status_detail?.year &&
                                  errors.status_detail?.year
                                }
                              >
                                {yearOptions}
                              </Select>
                            </div>
                            {/*  mainLabel="Select Month"  mainLabel="Select Year" */}
                          </div>
                        </Col>
                        <Col lg={6} className="mb-4">
                          <CustomInput
                            label="CVV Number"
                            id="cvv_number"
                            type="text"
                            placeholder="Enter CVV number"
                            labelclass="mainLabel"
                            inputclass="mainInput mainInputLogIn"
                            value={values.cvv_number}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.cvv_number && errors.cvv_number}
                            required
                          />
                        </Col>
                        <Col lg={12} className="mt-2">
                          <div className="text-center d-flex flex-column align-items-center gap-2">
                            <CustomButton
                              type="submit"
                              className="btn btn-primary"
                            >
                              Pay Now
                            </CustomButton>
                          </div>
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

export default withModal(CardDetail);
