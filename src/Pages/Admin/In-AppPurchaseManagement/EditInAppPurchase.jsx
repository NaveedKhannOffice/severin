import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DashboardLayout } from "../../../Components/Layouts/AdminLayout/DashboardLayout";
import BackButton from "../../../Components/Common/BackButton";
import CustomButton from "../../../Components/Common/CustomButton";
import TextInput from "../../../Components/Common/FormElements/TextInput";
import UploadAndDisplayFiles from "../../../Components/UploadAndDisplayFiles/UploadAndDisplayFiles";
import { inAppPurchaseManagementData } from "../../../Config/data";
import {
  addInAppProductSchema,
  updateInAppProductSchema,
} from "../../../Config/Validations";
import withModal from "../../../HOC/withModal";
import { useFormStatus } from "../../../Hooks/useFormStatus";
import { isNullOrEmpty } from "../../../Utils/helper";
import { FaDollarSign } from "react-icons/fa";
import { getDetails, post } from "../../../Services/Api";

const EditInAppPurchase = ({ showModal }) => {
  const { id } = useParams();
  const { isSubmitting, startSubmitting, stopSubmitting } = useFormStatus();
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const getInAppPurchase = async () => {
    const response = await getDetails(`/admin/inapppurchases/${id}`);
    if (response.status) {
      setData(response?.data);
    }
  };
  useEffect(() => {
    getInAppPurchase();
  }, [id]);
  const handleSubmit = async (values) => {
    startSubmitting();
    if (
      values.file !== "" &&
      values.file !== "undefined" &&
      values.file.length > 0
    ) {
      values.file = values.file[0];
    }
    const response = await post(`/admin/inapppurchases/${id}`, values);
    if (response.status) {
      showModal(
        "Successful",
        `product has been updated successfully!`,
        () => navigate(-1),
        true
      );
      stopSubmitting();
    }
  };
  if (isNullOrEmpty(data)) {
    return (
      <DashboardLayout>
        <p>loading...</p>
      </DashboardLayout>
    );
  }
  return (
    <DashboardLayout pageTitle="Edit Product">
      <div className="container-fluid">
        <div className="row my-3">
          <div className="col-12">
            <h2 className="mainTitle">
              <BackButton />
              Edit Product
            </h2>
          </div>
        </div>
        <div className=" mb-4">
          <div className="row mb-3">
            <div className="col-12">
              <Formik
                initialValues={{
                  title: data?.title || "",
                  amount: data?.amount || "",
                  description: data?.description || "",
                  file: "",
                }}
                validationSchema={updateInAppProductSchema}
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
                          // files={[values.file]}
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
                            text="Update"
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

export default withModal(EditInAppPurchase);
