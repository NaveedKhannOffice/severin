import { Formik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { images } from "../../../Assets";
import { DashboardLayout } from "../../../Components/Layouts/AdminLayout/DashboardLayout";
import BackButton from "../../../Components/Common/BackButton";
import CustomButton from "../../../Components/Common/CustomButton";
import TextInput from "../../../Components/Common/FormElements/TextInput";
import CustomModal from "../../../Components/CustomModal";
import { Select } from "../../../Components/Common/FormElements/SelectInput";
import { accountTypeOptions } from "../../../Config/TableStatus";
import { addBankDetailSchema, addOtpSchema } from "../../../Config/Validations";
import withModal from "../../../HOC/withModal";
import { useFormStatus } from "../../../Hooks/useFormStatus";

const AddBankDetail = ({ showModal }) => {
  const { isSubmitting, startSubmitting, stopSubmitting } = useFormStatus();
  const navigate = useNavigate();
  const [otpModalShow, setOtpModalShow] = useState(false);
  const [formData, setFormData] = useState({});

  const handleFormSubmit = async (values) => {
    setFormData(values);
    setOtpModalShow(true);
  };

  const handleOtpSubmit = async (values) => {
    startSubmitting();
    console.log("OTP Submitted:", values.otp);
    setOtpModalShow(false);
    showModal(
      "Successful",
      `Bank Details Has Been added Successfully!`,
      () => navigate("/admin/mybank-detail", { state: formData }),
      true
    );
    stopSubmitting();
  };

  return (
    <>
      <DashboardLayout pageTitle="Add Bank Details">
        <div className="container-fluid">
          <div className="row my-3">
            <div className="col-12">
              <h2 className="mainTitle">
                <BackButton />
                Add Bank Details
              </h2>
            </div>
          </div>
          <div className=" mb-4">
            <div className="row mb-3">
              <div className="col-12">
                <Formik
                  initialValues={{
                    accountHolderName: "",
                    accountType: "",
                    bankName: "",
                    routingNumber: "",
                    accountNumber: "",
                  }}
                  validationSchema={addBankDetailSchema}
                  onSubmit={handleFormSubmit}
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
                    <form onSubmit={handleSubmit}>
                      <div className="dashCard">
                        <div className="row">
                          <div className="col-md-8 col-lg-6 col-xl-5 col-xxl-4">
                            <div className="row">
                              <div className="col-12 mb-2">
                                <TextInput
                                  label="Account holder Name"
                                  labelclass="mainLabel"
                                  type="text"
                                  required
                                  placeholder="Enter Account holder Name"
                                  inputclass="mainInput"
                                  id="accountHolderName"
                                  value={values.accountHolderName}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  error={
                                    touched.accountHolderName &&
                                    errors.accountHolderName
                                  }
                                />
                              </div>
                              <div className="col-12 mb-4">
                                <div className="select-inner-wrapper">
                                  <Select
                                    className="mainInput selectInput w-100"
                                    required
                                    id="accountType"
                                    name="accountType"
                                    value={values?.accountType}
                                    onChange={(e) =>
                                      setFieldValue("accountType", e)
                                    }
                                    label="Account Type"
                                    labelclass="mainLabel"
                                    onBlur={handleBlur}
                                    isInputNeeded={false}
                                    error={
                                      touched.accountType && errors.accountType
                                    }
                                  >
                                    {accountTypeOptions}
                                  </Select>
                                </div>
                              </div>
                              <div className="col-12 mb-2">
                                <TextInput
                                  label="Bank Name"
                                  labelclass="mainLabel"
                                  type="text"
                                  required
                                  placeholder="Enter Bank Name"
                                  inputclass="mainInput"
                                  id="bankName"
                                  value={values.bankName}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  error={touched.bankName && errors.bankName}
                                />
                              </div>
                              <div className="col-12 mb-2">
                                <TextInput
                                  label="Routing Number"
                                  labelclass="mainLabel"
                                  type="text"
                                  required
                                  placeholder="Enter Routing Number"
                                  inputclass="mainInput"
                                  id="routingNumber"
                                  value={values.routingNumber}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  error={
                                    touched.routingNumber &&
                                    errors.routingNumber
                                  }
                                />
                              </div>
                              <div className="col-12 mb-2">
                                <TextInput
                                  label="Account Number"
                                  labelclass="mainLabel"
                                  type="text"
                                  required
                                  placeholder="Enter Account Number"
                                  inputclass="mainInput"
                                  id="accountNumber"
                                  value={values.accountNumber}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  error={
                                    touched.accountNumber &&
                                    errors.accountNumber
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12">
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
                    </form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>

      {/* OTP Modal */}
      <CustomModal
        show={otpModalShow}
        hideClose={false}
        close={() => {
          setOtpModalShow(false);
        }}
        background="gray"
      >
        <div className="text-center px-5">
          <Formik
            initialValues={{ otp: "" }}
            validationSchema={addOtpSchema}
            onSubmit={handleOtpSubmit}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
            }) => (
              <form onSubmit={handleSubmit}>
                <div className="otp_wrapper">
                  <img
                    src={images.Question}
                    alt="Question"
                    className="modalImage"
                  />
                  <h2 className="modalHeading">
                    otp<span className="text-danger">*</span>
                  </h2>
                  <div className="my-3">
                    <TextInput
                      labelclass="mainLabel"
                      type="text"
                      required
                      placeholder="Enter Otp"
                      inputclass="mainInput"
                      id="otp"
                      value={values.otp}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.otp && errors.otp}
                    />
                  </div>
                  <div className="my-4">
                    <CustomButton
                      variant="site-btn primary-btn"
                      className="px-5"
                      text="Submit"
                      pendingText="Submitting..."
                      isPending={isSubmitting}
                      type="submit"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </CustomModal>
    </>
  );
};

export default withModal(AddBankDetail);
