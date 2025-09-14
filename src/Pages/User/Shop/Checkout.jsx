import React, { useEffect, useState } from "react";
// import { images } from "../../../Assets";
import { Container, Row, Col } from "react-bootstrap";
import { Formik, Form } from "formik";
import { useFormStatus } from "../../../Hooks/useFormStatus";
// import { productData } from "../../../Config/data";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../../Components/Common/CustomButton";
import BackButton from "../../../Components/Common/BackButton";
import { usePageTitle } from "../../../Utils/helper";
import "./style.css";
import TextInput from "../../../Components/Common/FormElements/TextInput";
import { checkoutValidationSchema } from "../../../Config/Validations";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import  SelectInput  from "../../../Components/Common/FormElements/SelectInput";
import {
  // countryOptions,
  // stateOptions,
  // yearOptions,
} from "../../../Config/TableStatus";
import { getAll, post } from "../../../Services/Api";
import { parsePhoneNumber } from "libphonenumber-js";
import { showToast } from "../../../Components/Common/Toast";

const Checkout = () => {
  usePageTitle("Checkout", true);
  const navigate = useNavigate();

  const { isSubmitting, startSubmitting, stopSubmitting } = useFormStatus(); // use your custom hook
  const [cartData, setCartData] = useState();

  const [allCountries, setAllCountries] = useState();

  // const [shippingCountry, setShippingCountry] = useState("");
  const [shippingStates, setShippingStates] = useState([]);
  const [shippingCities, setShippingCities] = useState([]);

  // const [billingCountry, setBillingCountry] = useState("");
  const [billingStates, setBillingStates] = useState([]);
  const [billingCities, setBillingCities] = useState([]);

  const handleSubmit = async (values, { resetForm }) => {
    startSubmitting();

    let contact_dial_code = "";
    let shipping_dial_code = "";
    let billing_dial_code = "";

    const mobile_number = parsePhoneNumber(values?.mobile_number);
    const billing_mobile_number = parsePhoneNumber(
      values?.billing_mobile_number
    );
    const shipping_mobile_number = parsePhoneNumber(
      values?.shipping_mobile_number
    );

    if (mobile_number) {
      contact_dial_code = "+" + mobile_number.countryCallingCode; // e.g., "+1"
    }

    if (shipping_mobile_number) {
      shipping_dial_code = "+" + shipping_mobile_number.countryCallingCode; // e.g., "+1"
    }

    if (billing_mobile_number) {
      billing_dial_code = "+" + billing_mobile_number.countryCallingCode; // e.g., "+1"
    }

    if (!contact_dial_code || !shipping_dial_code || !billing_dial_code) {
      showToast("Please enter valid phone numbers", "error");
      return;
    }

    const updatedData = {
      contact_first_name: values?.first_name,
      contact_last_name: values?.last_name,
      contact_email: values?.email,
      contact_dial_code: contact_dial_code,
      contact_phone: values?.mobile_number,
      shipping_first_name: values?.shipping_first_name,
      shipping_last_name: values?.shipping_last_name,
      shipping_dial_code: shipping_dial_code,
      shipping_phone: values?.shipping_mobile_number,
      shipping_address: values?.shipping_address,
      shipping_country: values?.shipping_country,
      shipping_state: values?.shipping_state,
      shipping_city: values?.shipping_city,
      shipping_zip_code: values?.shipping_zip_code,
      is_billing_same_as_shipping: values?.sameBillingAddress ? 1 : 0,
      billing_first_name: values?.billing_first_name,
      billing_last_name: values?.billing_last_name,
      billing_dial_code: billing_dial_code,
      billing_phone: values?.billing_mobile_number,
      billing_address: values?.billing_address,
      billing_country: values?.billing_country,
      billing_state: values?.billing_state,
      billing_city: values?.billing_city,
      billing_zip_code: values?.billing_zip_code,
      shop_id: cartData?.products?.[0]?.shop_id,
    };

    try {
      const response = await post("/user/cart/create-order", updatedData);

      if (response?.message == "Order placed successfully.") {
        showToast("Order placed successfully", "success");

        resetForm();

        window.location.href = response?.data?.original?.payment_url;

        // setTimeout(() => {
        //     navigate('/order-logs')
        // }, 1500)
      } else {
        showToast("Error in placing order", response);
      }
    } catch (error) {
      console.log("Error in placing order", error);
      showToast("An unexpected error occurred.", "error");
    }

    stopSubmitting();
  };

  const fetchData = async () => {
    startSubmitting();
    try {
      const response = await getAll(`/user/cart/get-cart`);

      if (response?.status) {
        setCartData(response?.data);
      } else {
        console.log("Error fetching cart items: ", response);
      }
    } catch (error) {
      console.log("Error fetching cart items: ", error);
    }
    stopSubmitting();
  };

  const fetchShippingStates = async (country_id) => {
    try {
      const response = await getAll(`/general/states?country_id=${country_id}`);

      if (response?.status) {
        const formattedStates = response.data.map((state) => ({
          value: state.id,
          text: state.name,
        }));

        setShippingStates(formattedStates);
      }
    } catch (error) {
      console.log("Error in fetching states : ", error);
    }
  };

  const fetchBillingStates = async (country_id) => {
    try {
      const response = await getAll(`/general/states?country_id=${country_id}`);

      if (response?.status) {
        const formattedStates = response.data.map((state) => ({
          value: state.id,
          text: state.name,
        }));

        setBillingStates(formattedStates);
      }
    } catch (error) {
      console.log("Error in fetching states : ", error);
    }
  };

  const fetchShippingCities = async (country_id, state_id) => {
    try {
      const response = await getAll(
        `/general/cities?country_id=${country_id}&state_id=${state_id}`
      );

      if (response?.status) {
        const formattedCities = response.data.map((city) => ({
          value: city.id,
          text: city.name,
        }));

        setShippingCities(formattedCities);
      }
    } catch (error) {
      console.log("Error in fetching states : ", error);
    }
  };

  const fetchBillingCities = async (country_id, state_id) => {
    try {
      const response = await getAll(
        `/general/cities?country_id=${country_id}&state_id=${state_id}`
      );

      if (response?.status) {
        const formattedCities = response.data.map((city) => ({
          value: city.id,
          text: city.name,
        }));

        setBillingCities(formattedCities);
      }
    } catch (error) {
      console.log("Error in fetching states : ", error);
    }
  };

  const getCountries = async () => {
    try {
      const response = await getAll(`/general/countries`);

      if (response?.status) {
        const formattedCountries = response.data.map((country) => ({
          value: country.id,
          text: country.name,
        }));

        setAllCountries(formattedCountries);
      }
    } catch (error) {
      console.log("Error in fetching countries", error);
    }
  };

  useEffect(() => {
    fetchData();
    getCountries();
  }, []);

  return (
    <section className="page-content product-view">
      <Container fluid>
        <Row>
          <Col sm={12} className="d-flex align-items-center mb-4 mb-xxl-5">
            <BackButton className="me-2" />
            <h2 className="page-title fw-bold mb-0">Checkout</h2>
          </Col>
        </Row>
        <Row>
          <Col lg={8}>
            <Formik
              initialValues={{
                first_name: "",
                last_name: "",
                email: "",
                mobile_number: "",
                shipping_first_name: "",
                shipping_last_name: "",
                shipping_mobile_number: "",
                shipping_address: "",
                shipping_country: "",
                shipping_state: "",
                shipping_zip_code: "",
                shipping_city: "",
                sameBillingAddress: false,
                billing_first_name: "",
                billing_last_name: "",
                billing_mobile_number: "",
                billing_address: "",
                billing_country: "",
                billing_state: "",
                billing_zip_code: "",
                billing_city: "",
              }}
              validationSchema={checkoutValidationSchema}
              onSubmit={handleSubmit}
              enableReinitialize
            >
              {({
                values,
                errors,
                touched,
                fieldValue,
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldValue,
                setFieldTouched,
              }) => {
                const handleSameBillingAddressChange = (event) => {
                  const isChecked = event.target.checked;

                  // If checked, copy values from shipping to billing
                  if (isChecked) {
                    setFieldValue(
                      "billing_first_name",
                      values.shipping_first_name
                    );
                    setFieldValue(
                      "billing_last_name",
                      values.shipping_last_name
                    );
                    setFieldValue(
                      "billing_mobile_number",
                      values.shipping_mobile_number
                    );
                    setFieldValue("billing_address", values.shipping_address);
                    setFieldValue("billing_country", values.shipping_country);
                    setFieldValue("billing_city", values.shipping_city);
                    setFieldValue("billing_state", values.shipping_state);
                    setFieldValue("billing_zip_code", values.shipping_zip_code);
                    // Add any other billing fields to be copied
                  } else {
                    // If unchecked, clear billing fields
                    setFieldValue("billing_first_name", "");
                    setFieldValue("billing_last_name", "");
                    setFieldValue("billing_mobile_number", "");
                    setFieldValue("billing_address", "");
                    setFieldValue("billing_country", "");
                    setFieldValue("billing_city", "");
                    setFieldValue("billing_state", "");
                    setFieldValue("billing_zip_code", "");
                    // Clear other billing fields
                  }

                  // Update the sameBillingAddress value
                  setFieldValue("sameBillingAddress", isChecked);
                };

                return (
                  <Form>
                    {/* {console.log(errors)} */}
                    <Row>
                      <Col xs={12}>
                        <h4 className="fw-bold mb-4 text-black">
                          Contact Information
                        </h4>
                      </Col>
                      <Col xs={12} lg={6} className="mb-1 mb-lg-2">
                        <TextInput
                          label="First Name"
                          id="first_name"
                          type="text"
                          required
                          placeholder="Enter First Name"
                          labelclass="mainLabel"
                          inputclass="mainInput"
                          value={values.first_name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.first_name && errors.first_name}
                        />
                      </Col>
                      <Col xs={12} lg={6} className="mb-1 mb-lg-2">
                        <TextInput
                          label="Last Name"
                          id="last_name"
                          type="text"
                          required
                          placeholder="Enter Last Name"
                          labelclass="mainLabel"
                          inputclass="mainInput"
                          value={values.last_name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.last_name && errors.last_name}
                        />
                      </Col>
                      <Col xs={12} lg={6} className="mb-1 mb-lg-2">
                        <TextInput
                          label="Email"
                          id="email"
                          type="email"
                          required
                          placeholder="Enter Email"
                          labelclass="mainLabel"
                          inputclass="mainInput"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.email && errors.email}
                        />
                      </Col>
                      <Col xs={12} lg={6} className="mb-1 mb-lg-2">
                        <label htmlFor="mobile_number" className="mainLabel">
                          Mobile Number<span className="text-danger">*</span>
                        </label>
                        <PhoneInput
                          id="mobile_number"
                          defaultCountry="US"
                          placeholder="Enter Mobile Number"
                          value={values.mobile_number}
                          onChange={(mobile_number) =>
                            setFieldValue("mobile_number", mobile_number)
                          }
                          onBlur={() => setFieldTouched("mobile_number", true)}
                          className="mainInput"
                        />
                        {touched.mobile_number && errors.mobile_number ? (
                          <div className="text-danger">
                            {errors.mobile_number}
                          </div>
                        ) : null}
                      </Col>
                      <Col xs={12}>
                        <h4 className="fw-bold mb-4 text-black mt-2">
                          Shipping Address
                        </h4>
                      </Col>
                      <Col xs={12} lg={6} className="mb-1 mb-lg-2">
                        <TextInput
                          label="First Name"
                          id="shipping_first_name"
                          type="text"
                          required
                          placeholder="Enter First Name"
                          labelclass="mainLabel"
                          inputclass="mainInput"
                          value={values.shipping_first_name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={
                            touched.shipping_first_name &&
                            errors.shipping_first_name
                          }
                        />
                      </Col>
                      <Col xs={12} lg={6} className="mb-1 mb-lg-2">
                        <TextInput
                          label="Last Name"
                          id="shipping_last_name"
                          type="text"
                          required
                          placeholder="Enter Last Name"
                          labelclass="mainLabel"
                          inputclass="mainInput"
                          value={values.shipping_last_name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={
                            touched.shipping_last_name &&
                            errors.shipping_last_name
                          }
                        />
                      </Col>
                      <Col xs={12} lg={6} className="mb-1 mb-lg-2">
                        <label htmlFor="mobile_number" className="mainLabel">
                          Mobile Number<span className="text-danger">*</span>
                        </label>
                        <PhoneInput
                          id="mobile_number"
                          defaultCountry="US"
                          placeholder="Enter Mobile Number"
                          value={values.shipping_mobile_number}
                          onChange={(shipping_mobile_number) =>
                            setFieldValue(
                              "shipping_mobile_number",
                              shipping_mobile_number
                            )
                          }
                          onBlur={() =>
                            setFieldTouched("shipping_mobile_number", true)
                          }
                          className="mainInput"
                        />
                        {touched.shipping_mobile_number &&
                        errors.shipping_mobile_number ? (
                          <div className="text-danger">
                            {errors.shipping_mobile_number}
                          </div>
                        ) : null}
                      </Col>
                      <Col xs={12} lg={6} className="mb-1 mb-lg-2">
                        <TextInput
                          label="Residential Address"
                          id="shipping_address"
                          type="text"
                          required
                          placeholder="Enter residential address"
                          labelclass="mainLabel"
                          inputclass="mainInput"
                          value={values.shipping_address}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={
                            touched.shipping_address && errors.shipping_address
                          }
                        />
                      </Col>
                      <Col xs={12} lg={6} className="mb-1 mb-lg-2">
                        <SelectInput
                          className="mainInput selectInput w-100"
                          label="Country"
                          labelclass="mainLabel"
                          required
                          id="shipping_country"
                          name="shipping_country"
                          wrapperClass="d-block mb-3"
                          mainLabel="Select Country"
                          value={values.shipping_country}
                          onChange={(value) => {
                            handleChange({
                              target: { name: "shipping_country", value },
                            });
                            fetchShippingStates(value);
                          }}
                          onBlur={handleBlur}
                          error={
                            touched.shipping_country && errors.shipping_country
                          }
                        >
                          {allCountries}
                        </SelectInput>
                        {/* <TextInput
                                                    label="Country"
                                                    id="shipping_country"
                                                    type="text"
                                                    required
                                                    placeholder="Enter Country"
                                                    labelclass="mainLabel"
                                                    inputclass="mainInput"
                                                    value={values.shipping_country}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={touched.shipping_country && errors.shipping_country}
                                                    name="shipping_country"
                                                /> */}
                      </Col>
                      <Col xs={12} lg={6} className="mb-1 mb-lg-2">
                        <SelectInput
                          className="mainInput selectInput w-100"
                          label="State"
                          labelclass="mainLabel"
                          required
                          id="shipping_state"
                          name="shipping_state"
                          wrapperClass="d-block mb-3"
                          mainLabel="Select State"
                          value={values.shipping_state}
                          // onChange={(value) =>
                          //     handleChange({ target: { name: "shipping_state", value } })
                          // } // Adapting to Formik
                          onChange={(value) => {
                            handleChange({
                              target: { name: "shipping_state", value },
                            });
                            fetchShippingCities(values.shipping_country, value);
                          }}
                          onBlur={handleBlur}
                          error={
                            touched.shipping_state && errors.shipping_state
                          }
                        >
                          {shippingStates}
                        </SelectInput>
                        {/* <TextInput
                                                    label="State"
                                                    id="shipping_state"
                                                    type="text"
                                                    required
                                                    placeholder="Enter State"
                                                    labelclass="mainLabel"
                                                    inputclass="mainInput"
                                                    value={values.shipping_state}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={touched.shipping_state && errors.shipping_state}
                                                    name="shipping_state"
                                                /> */}
                      </Col>
                      <Col xs={12} lg={6} className="mb-1 mb-lg-2">
                        <TextInput
                          label="Zip Code"
                          id="shipping_zip_code"
                          type="text"
                          required
                          placeholder="Enter Zip code"
                          labelclass="mainLabel"
                          inputclass="mainInput"
                          value={values.shipping_zip_code}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={
                            touched.shipping_zip_code &&
                            errors.shipping_zip_code
                          }
                        />
                      </Col>
                      <Col xs={12} lg={6} className="mb-1 mb-lg-2">
                        {/* <TextInput
                                                    label="City"
                                                    id="shipping_city"
                                                    type="text"
                                                    required
                                                    placeholder="Enter City"
                                                    labelclass="mainLabel"
                                                    inputclass="mainInput"
                                                    value={values.shipping_city}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={touched.shipping_city && errors.shipping_city}
                                                /> */}
                        <SelectInput
                          className="mainInput selectInput w-100"
                          label="City"
                          labelclass="mainLabel"
                          required
                          id="shipping_city"
                          name="shipping_city"
                          wrapperClass="d-block mb-3"
                          mainLabel="Select City"
                          value={values.shipping_city}
                          onChange={(value) =>
                            handleChange({
                              target: { name: "shipping_city", value },
                            })
                          } // Adapting to Formik
                          onBlur={handleBlur}
                          error={touched.shipping_city && errors.shipping_city}
                        >
                          {shippingCities}
                        </SelectInput>
                      </Col>
                      <Col xs={12} className="mb-3 mb-lg-4">
                        <div className="radio-checkbox-wrapper gap-3 gap-sm-5">
                          <label className="radio-checkbox-container">
                            <input
                              type="checkbox"
                              name="sameBillingAddress"
                              checked={values.sameBillingAddress}
                              // onChange={(event) => {
                              //   setFieldValue("sameBillingAddress", event.target.checked); // Update Formik value
                              // }}
                              onChange={handleSameBillingAddressChange} // Handle checkbox change
                            />
                            <span className="custom-checkbox"></span>
                            Is Billing Address same as Shipping Address?
                          </label>
                        </div>
                      </Col>

                      <Col xs={12}>
                        <h4 className="fw-bold mb-4 text-black">
                          Billing Address
                        </h4>
                      </Col>
                      <Col xs={12} lg={6} className="mb-1 mb-lg-2">
                        <TextInput
                          label="First Name"
                          id="billing_first_name"
                          type="text"
                          required
                          placeholder="Enter First Name"
                          labelclass="mainLabel"
                          inputclass="mainInput"
                          value={values.billing_first_name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={
                            touched.billing_first_name &&
                            errors.billing_first_name
                          }
                        />
                      </Col>
                      <Col xs={12} lg={6} className="mb-1 mb-lg-2">
                        <TextInput
                          label="Last Name"
                          id="billing_last_name"
                          type="text"
                          required
                          placeholder="Enter Last Name"
                          labelclass="mainLabel"
                          inputclass="mainInput"
                          value={values.billing_last_name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={
                            touched.billing_last_name &&
                            errors.billing_last_name
                          }
                        />
                      </Col>
                      <Col xs={12} lg={6} className="mb-1 mb-lg-2">
                        <label
                          htmlFor="billing_mobile_number"
                          className="mainLabel"
                        >
                          Billing Mobile Number{" "}
                          <span className="text-danger">*</span>
                        </label>
                        <PhoneInput
                          id="billing_mobile_number"
                          defaultCountry="US"
                          placeholder="Enter Mobile Number"
                          value={values.billing_mobile_number}
                          onChange={(billing_mobile_number) =>
                            setFieldValue(
                              "billing_mobile_number",
                              billing_mobile_number
                            )
                          }
                          onBlur={() =>
                            setFieldTouched("billing_mobile_number", true)
                          }
                          className="mainInput"
                        />
                        {touched.billing_mobile_number &&
                          errors.billing_mobile_number && (
                            <div className="text-danger">
                              {errors.billing_mobile_number}
                            </div>
                          )}
                      </Col>
                      <Col xs={12} lg={6} className="mb-1 mb-lg-2">
                        <TextInput
                          label="Residential Address"
                          id="billing_address"
                          type="text"
                          required
                          placeholder="Enter residential address"
                          labelclass="mainLabel"
                          inputclass="mainInput"
                          value={values.billing_address}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={
                            touched.billing_address && errors.billing_address
                          }
                        />
                      </Col>
                      <Col xs={12} lg={6} className="mb-1 mb-lg-2">
                        <SelectInput
                          className="mainInput selectInput w-100"
                          label="Country"
                          labelclass="mainLabel"
                          required
                          id="billing_country"
                          name="billing_country"
                          wrapperClass="d-block mb-3"
                          mainLabel="Select Country"
                          value={values.billing_country}
                          onChange={(value) => {
                            handleChange({
                              target: { name: "billing_country", value },
                            });
                            fetchBillingStates(value);
                          }} // Adapting to Formik
                          onBlur={handleBlur}
                          error={
                            touched.billing_country && errors.billing_country
                          }
                        >
                          {allCountries}
                        </SelectInput>
                        {/* <TextInput
                                                    label="Country"
                                                    id="billing_country"
                                                    type="text"
                                                    required
                                                    placeholder="Enter Country"
                                                    labelclass="mainLabel"
                                                    inputclass="mainInput"
                                                    value={values.billing_country}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={touched.billing_country && errors.billing_country}
                                                    name="billing_country"
                                                /> */}
                      </Col>
                      <Col xs={12} lg={6} className="mb-1 mb-lg-2">
                        <SelectInput
                          className="mainInput selectInput w-100"
                          label="State"
                          labelclass="mainLabel"
                          required
                          id="billing_state"
                          name="billing_state"
                          wrapperClass="d-block mb-3"
                          mainLabel="Select State"
                          value={values.billing_state}
                          onChange={(value) => {
                            handleChange({
                              target: { name: "billing_state", value },
                            });
                            fetchBillingCities(values.billing_country, value);
                          }} // Adapting to Formik
                          onBlur={handleBlur}
                          error={touched.billing_state && errors.billing_state}
                        >
                          {billingStates}
                        </SelectInput>
                        {/* <TextInput
                                                    label="State"
                                                    id="billing_state"
                                                    type="text"
                                                    required
                                                    placeholder="Enter State"
                                                    labelclass="mainLabel"
                                                    inputclass="mainInput"
                                                    value={values.billing_state}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={touched.billing_state && errors.billing_state}
                                                    name="billing_state"
                                                /> */}
                      </Col>
                      <Col xs={12} lg={6} className="mb-1 mb-lg-2">
                        <TextInput
                          label="Zip Code"
                          id="billing_zip_code"
                          type="text"
                          required
                          placeholder="Enter Zip code"
                          labelclass="mainLabel"
                          inputclass="mainInput"
                          value={values.billing_zip_code}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={
                            touched.billing_zip_code && errors.billing_zip_code
                          }
                        />
                      </Col>
                      <Col xs={12} lg={6} className="mb-1 mb-lg-2">
                        {/* <TextInput
                                                    label="City"
                                                    id="billing_city"
                                                    type="text"
                                                    required
                                                    placeholder="Enter City"
                                                    labelclass="mainLabel"
                                                    inputclass="mainInput"
                                                    value={values.billing_city}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={touched.billing_city && errors.billing_city}
                                                /> */}
                        <SelectInput
                          className="mainInput selectInput w-100"
                          label="City"
                          labelclass="mainLabel"
                          required
                          id="billing_city"
                          name="billing_city"
                          wrapperClass="d-block mb-3"
                          mainLabel="Select City"
                          value={values.billing_city}
                          onChange={(value) =>
                            handleChange({
                              target: { name: "billing_city", value },
                            })
                          } // Adapting to Formik
                          onBlur={handleBlur}
                          error={touched.billing_city && errors.billing_city}
                        >
                          {billingCities}
                        </SelectInput>
                      </Col>
                      <Col xs={12} lg={6} className="mb-1 mb-lg-2">
                        <CustomButton
                          variant="btn-primary"
                          className="btn px-5"
                          text="Place Order"
                          loadingText="Loading..."
                          // isPending={isSubmitting}
                          type="submit"
                        />
                      </Col>
                    </Row>
                  </Form>
                );
              }}
            </Formik>
          </Col>

          <Col lg={4}>
            <div className="cart-checkout">
              <div className="checkout-item sub-total">
                <h3 className="item-title">Subtotal</h3>
                <span className="item-value">${cartData?.subtotal}</span>
              </div>
              <div className="checkout-item delivery-charges">
                <h3 className="item-title">Delivery Charges</h3>
                <span className="item-value">
                  ${cartData?.delivery_charges}
                </span>
              </div>
              <div className="checkout-item cart-total">
                <h3 className="item-title">Total</h3>
                <span className="item-value">${cartData?.total}</span>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Checkout;
