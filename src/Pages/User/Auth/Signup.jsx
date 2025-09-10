import { Formik, Form } from "formik";

import "react-phone-number-input/style.css";
import { Link, useNavigate } from "react-router-dom";

import { UserAuthLayout } from "../../../Components/Layouts/UserLayout/AuthLayout/index.jsx";

import { showToast } from "../../../Components/Toast/index.jsx";
import { signupUserValidationSchema } from "../../../Config/Validations.jsx";
import { useFormStatus } from "../../../Hooks/useFormStatus.jsx";
import { post } from "../../../Services/Api";
import { usePageTitle } from "../../../Utils/helper.jsx";
import "./style.css";
import TextInput from "../../../Components/Common/FormElements/TextInput/index.jsx";
import PhoneInput from "../../../Components/Common/FormElements/PhoneInput/index.jsx";
import CustomButton from "../../../Components/Common/CustomButton/index.jsx";
import PasswordStrength from "../../../Components/Common/PasswordStrength/index.jsx";
import ValidationSummary from "../../../Components/Common/ValidationSummary/index.jsx";
import { FormCheck } from "react-bootstrap";
import Feedback from "react-bootstrap/esm/Feedback.js";

// const { isSubmitting, startSubmitting, stopSubmitting } = useFormStatus(); // use your custom hook

const UserSignup = () => {
  usePageTitle("Admin Login");

  const { isSubmitting, startSubmitting, stopSubmitting } = useFormStatus(); // use your custom hook
  const navigate = useNavigate();

  const handleSubmit = async (values, { resetForm }) => {
    startSubmitting();

    console.log(values);

    const updatedValues = {
      type: "user",
      first_name: values.first_name,
      last_name: values.last_name,
      phone: values.mobile_number,
      language: values.language,
      relation: values.relation_patient,
      email: values.email,
      password: values.password,
      password_confirmation: values.confirm_password,
      refer_code: values.refer_code,
      photo: values.profile_image,
    };

    try {
      // setFieldValue("profile_image", []);
      // setUploadKey(Date.now());
      const response = await post("/user/signup", updatedValues);
      console.log(response, "formmmmmmmmmmmmmmmmmmmm");

      if (response && response?.status == 1) {
        showToast("Signup Successfully!", "success");
        resetForm();

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        showToast(response?.message, "error");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
    stopSubmitting();
  };

  return (
    <>
      <UserAuthLayout authTitle="Sign up" loginUser={true}>
        <Formik
          initialValues={{
            user_name: "",
            email: "",
            mobile_number: "",
            password: "",
            confirm_password: "",
            agreeTerms: false,
          }}
          validationSchema={signupUserValidationSchema}
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
            setFieldError,
            setFieldTouched,
          }) => (
            <Form className="mt-3" onSubmit={handleSubmit}>
              {/* <ValidationSummary errors={errors} touched={touched} /> */}
              <div className="mb-4">
                <TextInput
                  id="user_name"
                  name="user_name"
                  type="text"
                  required
                  placeholder="Enter Username"
                  value={values.user_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.user_name && errors.user_name}
                  touched={touched.user_name && errors.user_name}
                />
              </div>
              <div className="mb-4">
                <TextInput
                  id="email"
                  type="email"
                  required
                  placeholder="Enter Email Address"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email && errors.email}
                />
              </div>
              <div className="mb-4">
               <TextInput
                  id="mobile_number"
                  type="tel"
                  required
                  placeholder="Enter Mobile Number"
                  value={values.mobile_number}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.mobile_number && errors.mobile_number}
                />
              </div>
              <div className="mb-4">
                <TextInput
                  id="password"
                  type="password"
                  required
                  placeholder="Enter password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.password && errors.password}
                />
              </div>
              <div className="mb-4">
                <TextInput
                  id="confirm_password"
                  type="password"
                  required
                  placeholder="Confirm Password"
                  value={values.confirm_password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.confirm_password && errors.confirm_password}
                />
              </div>
              <div className="mb-4">
                <FormCheck>
                  <FormCheck.Input
                    type="checkbox"
                    id="agreeTerms"
                    name="agreeTerms"
                    checked={values.agreeTerms}
                    onChange={handleChange}
                    isInvalid={touched.agreeTerms && errors.agreeTerms}
                  />
                  <FormCheck.Label for="agreeTerms">
                    I agree with{" "}
                    <Link to="/privacy-policy">Privacy Policy</Link> and{" "}
                    <Link to="/terms-of-use">Terms of Use</Link>
                  </FormCheck.Label>
                  {touched.agreeTerms && errors.agreeTerms && (
                    <Feedback type="invalid">{errors.agreeTerms}</Feedback>
                  )}
                </FormCheck>
              </div>
              <div className="mb-4">
                <CustomButton
                  type="submit"
                  variant="primary"
                  className="w-100"
                  text="Sign up"
                  loadingText="Submitting..."
                  loading={isSubmitting}
                  disabled={isSubmitting}
                />
              </div>
            </Form>
          )}
        </Formik>
      </UserAuthLayout>
    </>
  );
};

export default UserSignup;
