import { Form, Formik } from "formik";
import { DashboardLayout } from "../../../Components/Layouts/AdminLayout/DashboardLayout";
import BackButton from "../../../Components/Common/BackButton";
import CustomButton from "../../../Components/Common/CustomButton";
import FormikField from "../../../Components/FormikField";
import { Select } from "../../../Components/Common/FormElements/SelectInput";
import { subcriptionType } from "../../../Config/TableStatus";
import { addNewPlaneSchema } from "../../../Config/Validations";
import withModal from "../../../HOC/withModal";
import { useFormStatus } from "../../../Hooks/useFormStatus";
import TextInput from "../../../Components/Common/FormElements/TextInput";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { subscriptionManagementData } from "../../../Config/data";

const EditPlane = ({ showModal }) => {
  const { id } = useParams();
  let navigate = useNavigate();
  const [subscription, setSubscription] = useState(null);
  const { startSubmitting, stopSubmitting } = useFormStatus();

  useEffect(() => {
    // Find the plan by ID
    const planData = subscriptionManagementData.detail.data.find(
      (e) => e.id == id
    );
    setSubscription(planData);
  }, [id]);

  const handleSubmit = async (values, { resetForm }) => {
    console.log(values);
    startSubmitting();
    // try {
    //   const response = await post("/admin-api/push-notifications", values);
    //   if (response.status) {
    // showModal("add category", "Notification Pushed Successfully", null, true);
    showModal(
      "Successful",
      `The plan has been updated successfully`,
      () => {
        navigate(-1);
      },
      true
    );
    resetForm();

    //   }
    // } catch (error) {
    //   console.error("Error pushing notification:", error);
    // }
    stopSubmitting();
  };

  return (
    <DashboardLayout pageTitle="Edit subscription">
      <div className="row my-3">
        <div className="col-12">
          <h2 className="mainTitle">
            <BackButton />
            Edit subscription
          </h2>
        </div>
      </div>
      <div className="dashCard mb-4">
        <div className="row mb-3">
          <div className="col-md-7 col-lg-5 col-xxl-4">
            {subscription && (
              <Formik
                initialValues={{
                  subscriptiontitle: subscription.subscription_title || "",
                  subscriptiontype: subscription.subscription_type || "",
                  amount: subscription.total_amount.replace("$", "") || "",
                  description: subscription.description || "",
                }}
                validationSchema={addNewPlaneSchema}
                onSubmit={handleSubmit}
              >
                {({
                  isSubmitting,
                  values,
                  errors,
                  touched,
                  handleBlur,
                  handleSubmit,
                  setFieldValue,
                  handleChange,
                }) => (
                  <Form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-12 my-3">
                        <FormikField
                          name="subscriptiontitle"
                          required
                          label="Subscription title"
                          labelClass="mainLabel"
                          placeholder="Enter Subscription title"
                          className="mainInput"
                        />
                      </div>
                      <div className="col-12">
                        <Select
                          className="mainInput"
                          required
                          id="subscriptiontype"
                          name="subscriptiontype"
                          wrapperClass="mb-3"
                          value={values.subscriptiontype}
                          onChange={(e) => {
                            setFieldValue("subscriptiontype", e);
                          }}
                          label="Subscription type"
                          labelclass="secondaryLabel mainLabel "
                          onBlur={handleBlur}
                          error={
                            touched.subscriptiontype && errors.subscriptiontype
                          }
                        >
                          {subcriptionType}
                        </Select>
                      </div>
                      <div className="col-12 my-3">
                        <FormikField
                          name="amount"
                          required
                          righticon
                          label="Amount"
                          labelClass="mainLabel"
                          placeholder="Enter Amount"
                          className="mainInput"
                        />
                      </div>
                      <div className="col-12 mb-3">
                        <TextInput
                          inputclass="mainInput"
                          label="Description"
                          labelclass="mainLabel"
                          type="textarea"
                          wrapperClass="mb-3"
                          required
                          placeholder="Write description"
                          rows="5"
                          value={values.description}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          id="description"
                          error={touched.description && errors.description}
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-12">
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
                  </Form>
                )}
              </Formik>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default withModal(EditPlane);
