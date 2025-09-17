import { Formik } from "formik";
import { FaDollarSign } from "react-icons/fa";
import { useNavigate } from "react-router";
import { DashboardLayout } from "../../../Components/Layouts/AdminLayout/DashboardLayout";
import BackButton from "../../../Components/Common/BackButton";
import CustomButton from "../../../Components/Common/CustomButton";
import TextInput from "../../../Components/Common/FormElements/TextInput";
import { Select } from "../../../Components/Common/FormElements/SelectInput";
import { subscriptionDuration } from "../../../Config/TableStatus";
import { addNewSubscriptionPlanUserScheme } from "../../../Config/Validations";
import withModal from "../../../HOC/withModal";
import { useFormStatus } from "../../../Hooks/useFormStatus";

const AddNewPlanUser = ({ showModal }) => {
  const navigate = useNavigate();
  const { isSubmitting, startSubmitting, stopSubmitting } = useFormStatus();

  const handleSubmit = async (values, { resetForm }) => {
    console.log(values);
    startSubmitting();
    showModal(
      "Successful",
      `New Plan has been created successfully!`,
      () => navigate(-1),
      true
    );
    stopSubmitting();
    resetForm();
  };

  return (
    <DashboardLayout pageTitle="Add Plan">
      <div className="container-fluid">
        <div className="row mb-5">
          <div className="col-12 my-4 d-flex">
            <BackButton />
            <h2 className="mainTitle mb-0">Add uesr Plan</h2>
          </div>
          <div className="col-12">
            <div className="dashCard mb-4">
              <div className="row mb-3">
                <div className="col-xl-4 col-lg-6 col-md-8">
                  <Formik
                    initialValues={{
                      subscriptionTitle: "",
                      duration: "1",
                      price: "",
                      description: "",
                    }}
                    validationSchema={addNewSubscriptionPlanUserScheme}
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
                            <TextInput
                              label="subscription Plan Title"
                              labelclass="mainLabel"
                              type="text"
                              required
                              placeholder="Enter Subscription Plan Title"
                              inputclass="mainInput"
                              id="subscriptionTitle"
                              value={values.subscriptionTitle}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={
                                touched.subscriptionTitle &&
                                errors.subscriptionTitle
                              }
                            />
                          </div>
                          <div className="col-12 mb-2">
                            <div className="select-inner-wrapper">
                              <Select
                                className="mainInput selectInput w-100"
                                required
                                id="duration"
                                name="duration"
                                value={values?.duration}
                                onChange={(e) => setFieldValue("duration", e)}
                                label="Duration"
                                labelclass="mainLabel"
                                onBlur={handleBlur}
                                isInputNeeded={false}
                                error={touched.duration && errors.duration}
                              >
                                {subscriptionDuration}
                              </Select>
                            </div>
                          </div>
                          <div className="col-12 my-2">
                            <TextInput
                              label="Price"
                              labelclass="mainLabel"
                              wrapperClass="mb-0 flex-grow-1 position-relative"
                              type="number"
                              required
                              placeholder="Enter Price"
                              inputclass="mainInput"
                              id="price"
                              rightIcon={FaDollarSign}
                              value={values.price}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={touched.price && errors.price}
                            />
                          </div>
                          <div className="col-12 my-2">
                            <TextInput
                              label="Description"
                              labelclass="mainLabel"
                              type="textarea"
                              rows={4}
                              required
                              placeholder="Enter Description"
                              inputclass="mainInput"
                              id="description"
                              value={values.description}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={touched.description && errors.description}
                            />
                          </div>
                        </div>
                        <div className="row ">
                          <div className="col-12 mt-3">
                            <CustomButton
                              variant="site-btn primary-btn"
                              className="px-5"
                              text="Create"
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default withModal(AddNewPlanUser);
