import { Formik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "../../../Components/Layouts/AdminLayout/DashboardLayout";
import BackButton from "../../../Components/Common/BackButton";
import CustomButton from "../../../Components/Common/CustomButton";
import TextInput from "../../../Components/Common/FormElements/TextInput";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import withModal from "../../../HOC/withModal";
import { useFormStatus } from "../../../Hooks/useFormStatus";
import { addEmergencyContactSchema } from "../../../Config/Validations";
// import IntlTelInput from "react-intl-tel-input";
// import "react-intl-tel-input/dist/main.css";
import { post } from "../../../Services/Api";
const AddEmergencyContacts = ({ showModal }) => {
  const { isSubmitting, startSubmitting, stopSubmitting } = useFormStatus();
  const navigate = useNavigate();

  // Function to handle adding the emergency contact
  const handleAddContact = async (values) => {
    const response = await post(`/admin/emergencynumbers`, values);
    if (response.status) {
      showModal(
        "Successful",
        "Emergency contact has been added successfully!",
        () => navigate(-1),
        true
      );
      stopSubmitting();
    }
    // Logic for adding the contact goes here (e.g., API call)
    // You can implement this logic according to your API setup
    // For example: await api.addEmergencyContact(values);
  };

  // Handle the submit event
  const handleSubmit = (values) => {
    startSubmitting();

    showModal(
      "Add Emergency Contact",
      `Are you sure you want to add this emergency contact?`,
      async () => {
        try {
          await handleAddContact(values);
        } catch (error) {
          showModal(
            "Error",
            "There was an error adding the emergency contact. Please try again.",
            null,
            true
          );
        }
        stopSubmitting();
      }
    );

    stopSubmitting();
  };

  return (
    <DashboardLayout pageTitle="Add Emergency Number">
      <div className="container-fluid">
        <div className="row my-3">
          <div className="col-12">
            <h2 className="mainTitle">
              <BackButton />
              Add Emergency Number
            </h2>
          </div>
        </div>
        <div className="mb-4">
          <div className="row mb-3">
            <div className="col-12">
              <Formik
                initialValues={{
                  title: "",
                  phone: "",
                  dial_code: "",
                  country_code: "",
                }}
                validationSchema={addEmergencyContactSchema}
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
                  setFieldTouched,
                }) => (
                  <form
                    onSubmit={handleSubmit}
                    className="emergencyContact-wrap"
                  >
                    <div className="dashCard">
                      <div className="row">
                        <div className="col-md-8 col-lg-7 col-xl-6 col-xxl-4">
                          <div className="row">
                            <div className="col-12 my-2">
                              <TextInput
                                label="Title"
                                labelclass="mainLabel"
                                type="text"
                                required
                                placeholder="Add Title"
                                inputclass="mainInput"
                                id="title"
                                value={values.title}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.title && errors.title}
                              />
                            </div>
                            <div className="col-12">
                              <label htmlFor="phoneInput" className="mainLabel">
                                Phone number
                                <span className="text-danger">*</span>
                              </label>
                              {/* <PhoneInput
                                defaultCountry="US"
                                placeholder="Enter phone number"
                                value={values.phone}
                                onChange={(phone) => {
                                  console.log("phone", phone);

                                  setFieldValue("phone", phone)
                                  if (phone) {
                                    const phoneNumber = parsePhoneNumberFromString(phone);
                                    console.log("phoneNumber", phoneNumber);
                                  }


                                }}
                                onBlur={() => setFieldTouched("phone", true)}
                                className="mainInput"
                              /> */}
                              
                            </div>
                            <div className="col-12 mt-4">
                              <CustomButton
                                variant="site-btn primary-btn"
                                className="px-5"
                                text="Add"
                                pendingText="Submitting..."
                                isPending={isSubmitting}
                                type="submit"
                                disabled={isSubmitting}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default withModal(AddEmergencyContacts);
