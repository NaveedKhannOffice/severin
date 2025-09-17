import { Form, Formik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "../../../Components/Layouts/AdminLayout/DashboardLayout";
import BackButton from "../../../Components/Common/BackButton";
import CustomButton from "../../../Components/Common/CustomButton";
import TextInput from "../../../Components/Common/FormElements/TextInput";
import UploadAndDisplayImage from "../../../Components/UploadAndDisplayImage/UploadAndDisplayImage";
import withModal from "../../../HOC/withModal";
import { useFormStatus } from "../../../Hooks/useFormStatus";
import { Select } from "../../../Components/Common/FormElements/SelectInput";
import { enableDisableOptions } from "../../../Config/TableStatus";
import { addBannerSchema } from "../../../Config/Validations";
import { post } from "../../../Services/Api";

const AddBanner = ({ showModal }) => {
  const { isSubmitting, startSubmitting, stopSubmitting } = useFormStatus();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    console.log("Banner data:", values);
    startSubmitting();
    if (
      values.image !== "" &&
      values.image !== "undefined" &&
      values.image.length > 0
    ) {
      values.image = values.image[0];
    }
    const response = await post(`/admin/banners`, values);
    if (response.status) {
      showModal(
        "Successful",
        `This Banner has been added successfully!`,
        () => navigate(-1),
        true
      );
      stopSubmitting();
    }
    stopSubmitting();
    // showModal(`Add Banner`, `Are you sure you want to add this Banner?`, () => onConfirmStatusChange(values));
  };
  //   const onConfirmStatusChange = async (values) => {
  //     showModal("Successful", `This Banner has been added successfully!`, ()=>navigate(-1), true);
  //     stopSubmitting();
  //   };

  return (
    <DashboardLayout pageTitle="Add Banner Details">
      <div className="container-fluid">
        <div className="row my-3">
          <div className="col-12">
            <h2 className="mainTitle">
              <BackButton />
              Add Banner Details
            </h2>
          </div>
        </div>
        <div className="dashCard mb-4">
          <div className="row mb-3">
            <div className="col-12">
              <Formik
                initialValues={{
                  name: "",
                  email: "",
                  url: "",
                  status: "1",
                  expiry_date: "",
                  image: "",
                }}
                validationSchema={addBannerSchema}
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
                          text="Add"
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

export default withModal(AddBanner);
