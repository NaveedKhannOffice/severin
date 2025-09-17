import { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { Formik } from "formik";
import { DashboardLayout } from "../../../Components/Layouts/AdminLayout/DashboardLayout";
import TextInput from "../../../Components/Common/FormElements/TextInput";
import { Select } from "../../../Components/Common/FormElements/SelectInput";
import { newUsers, statusOptions } from "../../../Config/TableStatus";
import { referRewardValidationSchema } from "../../../Config/Validations";
import withModal from "../../../HOC/withModal";
import BackButton from "../../../Components/Common/BackButton";
import CustomButton from "../../../Components/Common/CustomButton";
import UploadAndDisplayFiles from "../../../Components/UploadAndDisplayFiles/UploadAndDisplayFiles";
import UploadAndDisplayImages from "../../../Components/UploadAndDisplayImage/UploadAndDisplayImage";
import { post } from "../../../Services/Api";
import { Navigate, useNavigate } from "react-router-dom";

const AddReferReward = ({ showModal }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const initialValues = {
    newUsers: "",
    status: 1,
    appGiftDocument: null,
    productTitle: "",
    productDescription: "",
    //  voucherDocument: null,
    voucherTitle: "",
    voucherDescription: "",
    voucherImage: null,
  };

  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    console.log("Form Values:", values);

    // Show confirmation modal
    showModal(
      "Add Reward",
      "Are you sure you want to add this reward?",
      async () => {
        try {
          const requestData = {
            required_referrals: values.newUsers,
            status: values.status,
            product_title: values.productTitle,
            gift_description: values.productDescription,
            voucher_title: values.voucherTitle,
            voucher_description: values.voucherDescription,
            // Files will be automatically handled by your post() function
            ...(values.appGiftDocument?.[0] && {
              "gift_document[]": values.appGiftDocument[0],
            }),
            ...(values.voucherImage?.[0] && {
              "voucher_image[]": values.voucherImage[0],
            }),
          };

          console.log("Request Data:", requestData);

          const response = await post(
            `/admin/create-refer-reward`,
            requestData
          );

          if (response.status) {
            showModal(
              "Success",
              "Reward has been added successfully!",
              () => navigate(-1),
              true
            );
          } else {
            showModal("Error", response.message || "Failed to add reward");
          }
        } catch (error) {
          console.error("Submission Error:", error);
          showModal("Error", "An unexpected error occurred");
        } finally {
          setIsSubmitting(false);
        }
      }
    );
  };

  return (
    <DashboardLayout pageTitle="Add Refer Reward">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="my-4 d-flex">
              <BackButton />
              <h2 className="mainTitle mb-0">Add Refer Reward</h2>
            </div>

            <Formik
              initialValues={initialValues}
              validationSchema={referRewardValidationSchema}
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
                <Form onSubmit={handleSubmit}>
                  {/* First Card - Basic Info */}
                  <div className="dashCard mb-4">
                    <div className="row mb-3">
                      <div className="col-md-8 col-lg-7 col-xl-5">
                        <Row>
                          <Col xs={12} className="mb-3">
                            <div className="select-inner-wrapper">
                              {/* <Select
                                                className="mainInput selectInput w-100"
                                                required
                                                id="newUsers"
                                                name="newUsers"
                                                value={values?.newUsers}
                                                onChange={(e) => setFieldValue("newUsers", e)}
                                                label="Choose New Users"
                                                labelclass="mainLabel"
                                                onBlur={handleBlur}
                                                isInputNeeded={false}
                                                error={touched.newUsers && errors.newUsers}
                                             >
                                                {newUsers}
                                             </Select> */}
                              <TextInput
                                label="Choose New Users"
                                inputclass="mainInput"
                                labelclass="mainLabel"
                                type="text"
                                className="mainInput w-100"
                                required
                                id="newUsers"
                                name="newUsers"
                                value={values?.newUsers || ""}
                                onChange={(e) =>
                                  setFieldValue("newUsers", e.target.value)
                                }
                                onBlur={handleBlur}
                                placeholder="Enter New Users"
                                error={touched.newUsers && errors.newUsers}
                              />
                            </div>
                          </Col>
                          <Col xs={12} className="mb-3">
                            <div className="select-inner-wrapper">
                              <Select
                                className="mainInput selectInput w-100"
                                // required
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
                                {statusOptions}
                              </Select>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </div>

                  {/* Second Card - In App Gift */}
                  <div className="dashCard mb-4">
                    <div className="row mb-3">
                      <div className="col-md-8 col-lg-7 col-xl-5">
                        <h3 className="mb-4">Add In App Gift</h3>

                        {/* Document Upload */}
                        <UploadAndDisplayFiles
                          label={"Upload Document"}
                          showNumberOfFilesText={true}
                          id="1" // Unique ID for the first uploader
                          required
                          // onChange={(files) => {
                          //    if (files && files.length > 0) {
                          //       setFieldValue("appGiftDocument", files[0]);
                          //    }
                          // }}
                          onChange={(files) =>
                            setFieldValue("appGiftDocument", files)
                          }
                          numberOfFiles={1}
                          errorFromParent={
                            touched.appGiftDocument && errors.appGiftDocument
                          }
                        />

                        <Row>
                          <Col xs={12} className="mb-3">
                            <TextInput
                              label="Product Title*"
                              id="productTitle"
                              name="productTitle"
                              type="text"
                              placeholder="Enter Product Title"
                              labelclass="mainLabel"
                              inputclass="mainInput"
                              value={values.productTitle}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={
                                touched.productTitle && errors.productTitle
                              }
                            />
                          </Col>
                          <Col xs={12} className="mb-3">
                            <TextInput
                              label="Description*"
                              id="productDescription"
                              name="productDescription"
                              type="textarea"
                              rows={5}
                              placeholder="Enter Description"
                              labelclass="mainLabel"
                              inputclass="mainInput"
                              value={values.productDescription}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={
                                touched.productDescription &&
                                errors.productDescription
                              }
                            />
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </div>

                  {/* Third Card - Add Voucher */}
                  <div className="dashCard mb-4">
                    <div className="row mb-3">
                      <div className="col-md-8 col-lg-7 col-xl-5">
                        <h3 className="mb-4">Add Voucher</h3>

                        {/* Voucher Upload */}
                        {/* Voucher Upload */}
                        <UploadAndDisplayImages
                          id="2" // Unique ID for the second uploader
                          onChange={(image) => {
                            setFieldValue("voucherImage", image);
                          }}
                          numberOfFiles={1}
                          errorFromParent={
                            touched.voucherImage && errors.voucherImage
                          }
                        />

                        <Row>
                          <Col xs={12} className="mb-3">
                            <TextInput
                              label="Voucher Title*"
                              id="voucherTitle"
                              name="voucherTitle"
                              type="text"
                              placeholder="Enter Voucher Title"
                              labelclass="mainLabel"
                              inputclass="mainInput"
                              value={values.voucherTitle}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={
                                touched.voucherTitle && errors.voucherTitle
                              }
                            />
                          </Col>
                          <Col xs={12} className="mb-3">
                            <TextInput
                              label="Description*"
                              id="voucherDescription"
                              name="voucherDescription"
                              type="textarea"
                              rows={5}
                              placeholder="Enter Description"
                              labelclass="mainLabel"
                              inputclass="mainInput"
                              value={values.voucherDescription}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={
                                touched.voucherDescription &&
                                errors.voucherDescription
                              }
                            />
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="mb-4">
                    <CustomButton
                      variant="site-btn primary-btn"
                      text="Add Reward"
                      pendingText="Adding..."
                      isPending={isSubmitting}
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-success"
                    />
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default withModal(AddReferReward);
