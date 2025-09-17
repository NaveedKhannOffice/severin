import { Formik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "../../../Components/Layouts/AdminLayout/DashboardLayout";
import BackButton from "../../../Components/Common/BackButton";
import CustomButton from "../../../Components/Common/CustomButton";
import TextInput from "../../../Components/Common/FormElements/TextInput";
import UploadAndDisplayFiles from "../../../Components/UploadAndDisplayFiles/UploadAndDisplayFiles";
import withModal from "../../../HOC/withModal";
import { useFormStatus } from "../../../Hooks/useFormStatus";
import { addInAppProductSchema } from "../../../Config/Validations";
import { FaDollarSign } from "react-icons/fa";
import { post } from "../../../Services/Api";

const AddInAppPurchase = ({ showModal }) => {
  const { isSubmitting, startSubmitting, stopSubmitting } = useFormStatus();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    startSubmitting();
    if (
      values.file !== "" &&
      values.file !== "undefined" &&
      values.file.length > 0
    ) {
      values.file = values.file[0];
    }
    const response = await post(`/admin/inapppurchases`, values);
    if (response.status) {
      showModal(
        "Successful",
        `Product has been added successfully!`,
        () => navigate(-1),
        true
      );
      stopSubmitting();
    }
  };

  return (
    <DashboardLayout pageTitle="Add Product">
      <div className="container-fluid">
        <div className="row my-3">
          <div className="col-12">
            <h2 className="mainTitle">
              <BackButton />
              Add Product
            </h2>
          </div>
        </div>
        <div className=" mb-4">
          <div className="row mb-3">
            <div className="col-12">
              <Formik
                initialValues={{
                  title: "",
                  amount: "",
                  description: "",
                  file: "",
                }}
                validationSchema={addInAppProductSchema}
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
                  <form onSubmit={handleSubmit} className="category-wrap">
                    <div className="row">
                      <div className="col-12">
                        <UploadAndDisplayFiles
                          //   files={values.file}
                          label={"Upload File"}
                          required
                          onChange={(files) => setFieldValue("file", files)}
                          numberOfFiles={1}
                          errorFromParent={touched.file && errors.file}
                        />
                      </div>
                    </div>

                    <div className=" dashCard">
                      <div className="row">
                        <div className="col-md-8 col-lg-6 col-xl-5 col-xxl-4">
                          <div className="row">
                            <div className="col-12">
                              <TextInput
                                label="product Title"
                                labelclass="mainLabel"
                                type="text"
                                required
                                placeholder="Enter product Title"
                                inputclass="mainInput"
                                id="title"
                                value={values.title}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.title && errors.title}
                              />
                            </div>
                            <div className="col-12 ">
                              <TextInput
                                label="amount"
                                labelclass="mainLabel"
                                wrapperClass=" flex-grow-1 position-relative"
                                type="number"
                                required
                                placeholder="Enter amount"
                                inputclass="mainInput"
                                id="amount"
                                rightIcon={FaDollarSign}
                                value={values.amount}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.amount && errors.amount}
                              />
                            </div>
                            <div className="col-12">
                              <TextInput
                                label="description"
                                labelclass="mainLabel"
                                type="textarea"
                                rows={4}
                                required
                                placeholder="Enter description"
                                inputclass="mainInput"
                                id="description"
                                value={values.description}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={
                                  touched.description && errors.description
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
  );
};

export default withModal(AddInAppPurchase);
