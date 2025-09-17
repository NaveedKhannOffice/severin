import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DashboardLayout } from "../../../Components/Layouts/AdminLayout/DashboardLayout";
import BackButton from "../../../Components/Common/BackButton";
import CustomButton from "../../../Components/Common/CustomButton";
import TextInput from "../../../Components/Common/FormElements/TextInput";
import UploadAndDisplayImage from "../../../Components/UploadAndDisplayImage/UploadAndDisplayImage";
import withModal from "../../../HOC/withModal";
import { useFormStatus } from "../../../Hooks/useFormStatus";
import { Select } from "../../../Components/Common/FormElements/SelectInput";
import { enableDisableOptions } from "../../../Config/TableStatus";
import { addBannerSchema, editBannerSchema } from "../../../Config/Validations";
import { bannerAdsManagementData } from "../../../Config/data";
import { isNullOrEmpty } from "../../../Utils/helper";
import { getDetails, post } from "../../../Services/Api";

const EditBanner = ({ showModal }) => {
  const { isSubmitting, startSubmitting, stopSubmitting } = useFormStatus();
  const navigate = useNavigate();

  const { id } = useParams();
  const [bannerAd, setBannerAd] = useState({});
  const getBanner = async () => {
    const response = await getDetails(`/admin/banners/${id}`);
    if (response.status) {
      setBannerAd(response?.data);
    }
  };
  useEffect(() => {
    getBanner();
  }, [id]);

  const handleSubmit = async (values) => {
    console.log("Banner data:", values);
    showModal(
      `Update Banner`,
      `Are you sure you want to update this Banner Ad?`,
      () => onConfirmStatusChange(values)
    );
  };
  const onConfirmStatusChange = async (values) => {
    startSubmitting();
    startSubmitting();
    if (
      values.image !== "" &&
      values.image !== "undefined" &&
      values.image.length > 0
    ) {
      values.image = values.image[0];
    }
    const response = await post(`/admin/banners/${id}`, values);
    if (response.status) {
      showModal(
        "Successful",
        `This Banner Ad has been updated successfully!`,
        () => navigate(-1),
        true
      );
      stopSubmitting();
    }
    stopSubmitting();
  };

  if (isNullOrEmpty(bannerAd)) {
    return (
      <DashboardLayout pageTitle="Edit Banner Ad">
        <div className="container-fluid">
          <div className="row mb-5">
            <div className="col-12 my-4 d-flex">
              <BackButton />
              <h2 className="mainTitle mb-0">Edit Banner Ad</h2>
            </div>
            <div className="col-12">
              <div className="dashCard mb-4">loading...</div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout pageTitle="Edit Banner Details">
      <div className="container-fluid">
        <div className="row my-3">
          <div className="col-12">
            <h2 className="mainTitle">
              <BackButton />
              Edit Banner Details
            </h2>
          </div>
        </div>
        <div className="dashCard mb-4">
          <div className="row mb-3">
            <div className="col-12">
              <Formik
                initialValues={bannerAd}
                validationSchema={editBannerSchema}
                onSubmit={handleSubmit}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  setFieldValue,
                }) => (
                  <Form className="category-wrap">
                    <div className="row mb-2">
                      <div className="col-md-8 col-lg-6 col-xl-5 col-xxl-4">
                        <TextInput
                          label="Full Name of Brand"
                          labelclass="mainLabel"
                          type="text"
                          required
                          placeholder="Enter Full Name of Brand"
                          inputclass="mainInput"
                          id="name"
                          value={values.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.name && errors.name}
                        />
                      </div>
                    </div>
                    <div className="row mb-2">
                      <div className="col-md-8 col-lg-6 col-xl-5 col-xxl-4">
                        <TextInput
                          label="Email of Brand"
                          labelclass="mainLabel"
                          type="text"
                          required
                          placeholder="Enter Email of Brand"
                          inputclass="mainInput"
                          id="email"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.email && errors.email}
                        />
                      </div>
                    </div>
                    <div className="row mb-2">
                      <div className="col-md-8 col-lg-6 col-xl-5 col-xxl-4">
                        <TextInput
                          label="Brand URL"
                          labelclass="mainLabel"
                          type="text"
                          required
                          placeholder="Enter Brand URL"
                          inputclass="mainInput"
                          id="url"
                          value={values.url}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.url && errors.url}
                        />
                      </div>
                    </div>
                    <div className="row mb-2">
                      <div className="col-md-8 col-lg-6 col-xl-5 col-xxl-4">
                        <div className="select-inner-wrapper mb-3">
                          <Select
                            className="mainInput selectInput w-100"
                            required
                            id="status"
                            name="status"
                            value={values?.status}
                            onChange={(e) => setFieldValue("status", e)}
                            label="Status"
                            labelclass="mainLabel"
                            onBlur={handleBlur}
                            isInputNeeded={false}
                            error={touched.status && errors.status}
                          >
                            {enableDisableOptions}
                          </Select>
                        </div>
                      </div>
                    </div>
                    <div className="row mb-2">
                      <div className="col-md-8 col-lg-6 col-xl-5 col-xxl-4">
                        <TextInput
                          label="Expiry Date"
                          labelclass="mainLabel"
                          type="date"
                          required
                          placeholder="Enter Expiry Date"
                          inputclass="mainInput"
                          id="expiry_date"
                          value={values.expiry_date}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.expiry_date && errors.expiry_date}
                        />
                      </div>
                    </div>

                    <UploadAndDisplayImage
                      height="320px"
                      label={"Banner Picture"}
                      images={values.image}
                      required
                      onChange={(files) => setFieldValue("image", files)}
                      numberOfFiles={1}
                      errorFromParent={touched.image && errors.image}
                    />

                    <div className="row ">
                      <div className="col-md-8 col-lg-6 col-xl-5 col-xxl-4 mt-3">
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
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default withModal(EditBanner);
