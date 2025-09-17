import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { images } from "../../../Assets";
import { DashboardLayout } from "../../../Components/Layouts/AdminLayout/DashboardLayout";
import BackButton from "../../../Components/Common/BackButton";
import CustomButton from "../../../Components/Common/CustomButton";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import TextInput from "../../../Components/Common/FormElements/TextInput";
import { adminProfileValidation } from "../../../Config/Validations";
import withModal from "../../../HOC/withModal";
import { useAuth } from "../../../Hooks/useAuth";
import { useFormStatus } from "../../../Hooks/useFormStatus";
import { validateImage } from "../../../Utils/helper";
import "./style.css";
import { post } from "../../../Services/Api";
import { setData } from "../../../Store/actions";
import { useDispatch } from "react-redux";

const EditProfile = ({ showModal }) => {
  const navigate = useNavigate();
  const [imageObject, setImageObject] = useState({});
  const [profileData, setProfileData] = useState({});
  const [profilePic, setProfilePic] = useState();
  const { isSubmitting, startSubmitting, stopSubmitting } = useFormStatus();
  const { user } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    setProfileData(user);
    setProfilePic(user?.photo);
  }, []);

  const handleImageChange = (e, setFieldValue, setFieldError) => {
    const file = e.target.files[0];
    if (validateImage(file)) {
      setFieldError("image", validateImage(file));
    } else {
      setFieldError("image", "");
      setProfilePic(URL.createObjectURL(file));
      setImageObject(file);
    }
  };

  const handleSubmit = async (values) => {
    startSubmitting();
    values.photo = imageObject;
    // showModal(
    //   "Succesful",
    //   `Profile updated successfully`,
    //   // null,
    //   () => navigate(`/admin/profile`),
    //   true
    // );
    let response = await post("/admin/profile/update", values);
    if (response.status) {
      showModal(
        "Succesful",
        `Profile updated successfully`,
        // null,
        () => navigate(`/admin/profile`),
        true
      );
      dispatch(setData(response.data));
    } else {
      console.log("error");
    }
    stopSubmitting();
  };

  return (
    <>
      <DashboardLayout pageTitle="Edit Profile">
        <div className="row mt-3">
          <div className="col-12">
            <h2 className="mainTitle">
              <BackButton />
              Edit Profile
            </h2>
          </div>
        </div>
        <div className="dashCard my-4">
          <div className="row mb-3">
            {profileData ? (
              <div className="col-lg-8">
                {Object.keys(profileData).length > 0 && (
                  <Formik
                    initialValues={{
                      first_name: profileData.first_name || "",
                      last_name: profileData.last_name || "",
                      phone: profileData.phone || "",
                    }}
                    validationSchema={adminProfileValidation}
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
                    }) => {
                      return (
                        <form onSubmit={handleSubmit}>
                          <div className="row mb-3">
                            <div className="col-lg-4 mb-3">
                              <div className="profileImage">
                                <img
                                  src={profilePic ?? images.userImage}
                                  alt="User"
                                />
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="d-none"
                                  id="profileImage"
                                  onChange={(event) =>
                                    handleImageChange(
                                      event,
                                      setFieldValue,
                                      setFieldError
                                    )
                                  }
                                />
                                <label
                                  htmlFor="profileImage"
                                  className="imageUploadButton"
                                >
                                  <FontAwesomeIcon icon={faCamera} />
                                </label>
                              </div>
                              {errors.image && (
                                <div className="errorText red-text">
                                  {errors.image}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-lg-8">
                              <div className="row mb-3">
                                <div className="col-12 my-1">
                                  <TextInput
                                    label="First Name"
                                    labelclass="mainLabel"
                                    type="text"
                                    required
                                    placeholder="Enter First Name"
                                    inputclass="mainInput"
                                    id="first_name"
                                    value={values.first_name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={
                                      touched.first_name && errors.first_name
                                        ? errors.first_name
                                        : null
                                    }
                                  />
                                </div>
                                <div className="col-12 my-1">
                                  <TextInput
                                    label="Last Name"
                                    labelclass="mainLabel"
                                    type="text"
                                    required
                                    placeholder="Enter Last Name"
                                    inputclass="mainInput"
                                    id="last_name"
                                    value={values.last_name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={
                                      touched.last_name && errors.last_name
                                    }
                                  />
                                </div>
                                <div className="col-12 my-1">
                                  <label
                                    htmlFor="phoneInput"
                                    className="mainLabel"
                                  >
                                    Phone number
                                    <span className="text-danger">*</span>
                                  </label>
                                  <PhoneInput
                                    defaultCountry="US"
                                    placeholder="Enter phone number"
                                    value={values.phone}
                                    onChange={(phone) =>
                                      setFieldValue("phone", phone)
                                    }
                                    onBlur={() =>
                                      setFieldTouched("phone", true)
                                    }
                                    className="mainInput"
                                  />
                                  {touched.phone && errors.phone ? (
                                    <div className="text-danger">
                                      {errors.phone}
                                    </div>
                                  ) : null}
                                </div>
                              </div>

                              <div className="row mt-4">
                                <div className="col-md-4">
                                  <CustomButton
                                    variant="site-btn primary-btn"
                                    className="px-5"
                                    text="Update"
                                    pendingText="Submitting..."
                                    isPending={isSubmitting}
                                    type="submit"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </form>
                      );
                    }}
                  </Formik>
                )}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default withModal(EditProfile);
