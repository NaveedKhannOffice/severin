import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useNavigate, useParams } from "react-router-dom";
import { DashboardLayout } from "../../../Components/Layouts/AdminLayout/DashboardLayout";
import BackButton from "../../../Components/Common/BackButton";
import CustomButton from "../../../Components/Common/CustomButton";
import TextInput from "../../../Components/Common/FormElements/TextInput";
import { contactsData } from "../../../Config/data";
import { addEmergencyContactSchema } from "../../../Config/Validations";
import withModal from "../../../HOC/withModal";
import { useFormStatus } from "../../../Hooks/useFormStatus";
import { isNullOrEmpty } from "../../../Utils/helper";
import { getDetails, post } from "../../../Services/Api";

const EditEmergencyContacts = ({ showModal }) => {
  const { id } = useParams();

  const [emergencyContacts, setEmergencyContacts] = useState({});
  const { isSubmitting, startSubmitting, stopSubmitting } = useFormStatus();
  const navigate = useNavigate();
  const getEmergencyContact = async () => {
    const response = await getDetails(`/admin/emergencynumbers/${id}`);
    if (response.status) {
      setEmergencyContacts(response?.data);
    }
  };
  useEffect(() => {
    getEmergencyContact();
  }, [id]);
  // Function to handle adding the emergency contact
  const handleAddContact = async (values) => {
    const response = await post(`/admin/emergencynumbers/${id}`, values);
    if (response.status) {
      showModal(
        "Successful",
        "Emergency Contact has been Updated successfully!",
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
      "update Emergency Contact",
      `Are you sure you want to Update this emergency Contact?`,
      async () => {
        try {
          await handleAddContact(values);
        } catch (error) {
          showModal(
            "Error",
            "There was an error Updating the emergency contact. Please try again.",
            null,
            true
          );
        }
        stopSubmitting();
      }
    );

    stopSubmitting();
  };
  if (isNullOrEmpty(emergencyContacts)) {
    return (
      <DashboardLayout>
        <p>loading...</p>
      </DashboardLayout>
    );
  }
  return (
    <DashboardLayout pageTitle="Edit Emergency Number">
      <div className="container-fluid">
        <div className="row my-3">
          <div className="col-12">
            <h2 className="mainTitle">
              <BackButton />
              Edit Emergency Number
            </h2>
          </div>
        </div>
        <div className="mb-4">
          <div className="row mb-3">
            <div className="col-12">
              <Formik
                initialValues={{
                  title: emergencyContacts.title || "",
                  phone: emergencyContacts.phone || "",
                  dial_code: emergencyContacts.dial_code || "",
                  country_code: emergencyContacts.country_code || "",
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
                              
                             
                            </div>
                            <div className="col-12 mt-4">
                              <CustomButton
                                variant="site-btn primary-btn"
                                className="px-5"
                                text="Edit"
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

export default withModal(EditEmergencyContacts);
