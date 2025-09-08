import { Formik } from "formik";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useNavigate } from "react-router-dom";
import { images } from "../../../Assets";
import CustomButton from "../../../Components/CustomButton/index.jsx";
import CustomInput from "../../../Components/CustomInput/index.jsx";
import { UserAuthLayout } from "../../../Components/Layouts/UserLayout/AuthLayout/index.jsx";
import { Select } from "../../../Components/Select/index.jsx";
import { showToast } from "../../../Components/Toast/index.jsx";
import { language, relationOptions } from "../../../Config/TableStatus.jsx";
import { signupUserValidationSchema } from "../../../Config/Validations.jsx";
import { useFormStatus } from "../../../Hooks/useFormStatus.jsx";
import { post } from "../../../Services/Api";
import { usePageTitle } from "../../../Utils/helper.jsx";
import "./style.css";

// const { isSubmitting, startSubmitting, stopSubmitting } = useFormStatus(); // use your custom hook
const handleImageChange = (event, setFieldValue, setFieldError) => {
  const file = event.target.files[0];
  if (file) {
    if (!file.type.startsWith("image/")) {
      setFieldError("profile_image", "Only image files are allowed");
      return;
    }
    console.log(file, "filee");
    setFieldValue("profile_image", file);
  }
};

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
      <UserAuthLayout authTitle="Sign up" authMain authPara="Create your account" authLeftText="find support system in a community that understands">
        <Formik
          initialValues={{
            profile_image: null,
            first_name: "",
            last_name: "",
            language: "",
            refer_code: "",
            relation_patient: "",
            mobile_number: "",
            email: "",
            password: "",
            confirm_password: "",
          }}
          validationSchema={signupUserValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue, setFieldError, setFieldTouched }) => (
            <form className="mt-3" onSubmit={handleSubmit}>
              {/* <Toast /> */}
              <div className="signup-profile-image mx-auto mb-4">
                <img src={values.profile_image instanceof File ? URL.createObjectURL(values.profile_image) : images.placeholder} alt="User" />

                <input
                  type="file"
                  accept="image/*"
                  className="d-none"
                  id="profileImage"
                  onChange={(event) => handleImageChange(event, setFieldValue, setFieldError)}
                />
                <label htmlFor="profileImage" className="upload-btn">
                  <images.CameraIconOutline />
                </label>
              </div>
              {errors.profile_image && <div className="errorText red-text text-center">{errors.profile_image}</div>}

              <CustomInput
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
              <CustomInput
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
              <Select
                className="mainInput selectInput w-100"
                label="Language"
                labelclass="mainLabel"
                required
                id="language"
                name="language"
                wrapperClass="d-block mb-3"
                mainLabel="Select Language"
                value={values.language}
                onChange={(value) => handleChange({ target: { name: "language", value } })} // Adapting to Formik
                onBlur={handleBlur}
                error={touched.language && errors.language}
              >
                {language}
              </Select>
       
              <div className="inputWrapper position-relative">
                <label htmlFor="phoneInput" className="mainLabel">
                  {" "}
                  Mobile Number<span className="text-danger">*</span>
                </label>
                <PhoneInput
                  defaultCountry="US"
                  placeholder="Enter phone number"
                  value={values.mobile_number}
                  onChange={(mobile_number) => setFieldValue("mobile_number", mobile_number)}
                  onBlur={() => setFieldTouched("mobile_number", true)}
                  className="mainInput"
                />
                {touched.mobile_number && errors.mobile_number ? <div className="text-danger">{errors.mobile_number}</div> : null}
              </div>
              <CustomInput
                label="Email"
                id="email"
                type="email"
                required
                placeholder="Enter your Email"
                labelclass="mainLabel"
                inputclass="mainInput"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && errors.email}
              />
              
              <CustomInput
                label="password"
                id="password"
                type="password"
                required
                placeholder="Enter password"
                labelclass="mainLabel"
                inputclass="mainInput"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && errors.password}
              />
              <CustomInput
                label="Confirm Password"
                id="confirm_password"
                type="password"
                required
                placeholder="Confirm Password"
                labelclass="mainLabel"
                inputclass="mainInput"
                value={values.confirm_password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.confirm_password && errors.confirm_password}
              />
       <CustomInput
                label="Referral Code (Optional)"
                id="refer_code"
                type="text"
                placeholder="Enter referral code"
                labelclass="mainLabel"
                inputclass="mainInput"
                value={values.refer_code}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Select
                className="mainInput selectInput w-100"
                label="Relation With Patient (Optional)"
                labelclass="mainLabel"
                id="relation_patient"
                name="relation_patient"
                wrapperClass="d-block mb-3"
                value={values.relation_patient}
                onChange={(value) => handleChange({ target: { name: "relation_patient", value } })} // Adapting to Formik
              >
                {relationOptions}
              </Select>
              <div className="mt-5 text-center">
                <CustomButton
                  variant="site-btn primary-btn"
                  className="px-5 w-100"
                  text="Sign up"
                  pendingText="Loading..."
                  // isPending={isSubmitting}
                  type="submit"
                />
              </div>
            </form>
          )}
        </Formik>
      </UserAuthLayout>
    </>
  );
};

export default UserSignup;
