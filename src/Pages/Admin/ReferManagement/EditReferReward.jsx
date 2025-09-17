import { useEffect, useState } from "react";
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
import { useParams } from "react-router-dom";
import { referData } from "../../../Config/data";
import UploadAndDisplayImages from "../../../Components/UploadAndDisplayImage/UploadAndDisplayImage";

const EditReferReward = ({ showModal }) => {
  const { id } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rewardData, setRewardData] = useState(null);
  const [initialValues, setInitialValues] = useState({
    newUsers: "",
    status: "",
    appGiftDocument: null,
    productTitle: "",
    productDescription: "",
    voucherDocument: null,
    voucherTitle: "",
    voucherDescription: "",
  });

  useEffect(() => {
    // Find the reward data from referData
    const reward = referData.detail.data.find((item) => item.id == id);
    if (reward) {
      setRewardData(reward);
      // Set initial values once we have the data
      setInitialValues({
        newUsers: reward.choose_new_user || "",
        status: reward.status_detail || "",
        appGiftDocument: reward.in_app_gift?.icon_name || null,
        productTitle: reward.in_app_gift?.product_title || "",
        productDescription: reward.in_app_gift?.description || "",
        voucherDocument: reward.voucher?.icon_name || null,
        voucherTitle: reward.voucher?.voucher_title || "",
        voucherDescription: reward.voucher?.description || "",
        voucherImage: reward.voucher?.voucher_image || null,
      });
    }
  }, [id]);

  if (!rewardData) {
    return <div>Loading...</div>;
  }

  const handleSubmit = (values) => {
    setIsSubmitting(true);
    showModal(
      "Add Reward",
      "Are you sure you want to Update this reward?",
      () => {
        console.log("Form Data:", values);
        setTimeout(() => {
          setIsSubmitting(false);
          showModal(
            "Success",
            "Reward has been Updated successfully!",
            null,
            true
          );
        }, 1000);
      }
    );
  };

  return (
    <DashboardLayout pageTitle="Edit Refer Reward">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="my-4 d-flex">
              <BackButton />
              <h2 className="mainTitle mb-0">Edit Refer Reward</h2>
            </div>

            <Formik
              enableReinitialize
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
                              <Select
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
                              </Select>
                            </div>
                          </Col>
                          <Col xs={12} className="mb-3">
                            <div className="select-inner-wrapper">
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
                          onChange={(files) => {
                            if (files && files.length > 0) {
                              setFieldValue("appGiftDocument", files[0]);
                            }
                          }}
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
                        <h3 className="mb-4">Voucher</h3>

                        {/* Voucher Upload */}
                        <UploadAndDisplayImages
                          id="2" // Unique ID for the second uploader
                          onChange={(image) => {
                            setFieldValue("voucherImage", image);
                          }}
                          images={values.voucherImage}
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

export default withModal(EditReferReward);
