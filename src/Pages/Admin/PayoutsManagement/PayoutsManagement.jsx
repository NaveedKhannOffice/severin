import { Formik } from "formik";
import { useEffect, useState } from "react";
import { FaPercent } from "react-icons/fa";
import { DashboardLayout } from "../../../Components/Layouts/AdminLayout/DashboardLayout";
import CustomButton from "../../../Components/Common/CustomButton";
import TextInput from "../../../Components/Common/FormElements/TextInput";
import CustomTable from "../../../Components/CustomTable";
import { payoutManagementData } from "../../../Config/data";
import { PayoutManagementHeader } from "../../../Config/TableHeaders";
import { disbursementTime } from "../../../Config/Validations";
import withFilters from "../../../HOC/withFilters";
import { dateFormat, serialNum } from "../../../Utils/helper";
import withModal from "../../../HOC/withModal";
import { getAll, post } from "../../../Services/Api";
import { useFormStatus } from "../../../Hooks/useFormStatus";

const PayoutsManagement = ({
  filters,
  setFilters,
  pagination,
  updatePagination,
  onSubmit,
  isSubmitting,
  showModal,
}) => {
  const [payoutLogs, setPayoutLogs] = useState([]);
  const [showInline, setShowInline] = useState(true);
  const { startSubmitting, stopSubmitting } = useFormStatus();
  const fetchCommission = async () => {
    try {
      let url = `/admin/commissions/payout`;
      const response = await getAll(url, filters);
      if (response.status) {
        const { total, per_page, current_page, to } = response.meta;
        setPayoutLogs(response?.data);
        updatePagination({
          showData: to,
          currentPage: current_page,
          totalRecords: total,
          totalPages: Math.ceil(total / per_page),
        });
      }
    } catch (error) {
      console.error("Error fetching payoutLogs:", error);
    }
  };

  useEffect(() => {
    fetchCommission();
  }, [filters]);

  useEffect(() => {
    const handleResize = () => {
      setShowInline(window.innerWidth > 575);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getCurrentDate = () => {
    const today = new Date();
    return today.toLocaleDateString();
  };

  const handleFormSubmit = async (values, { resetForm }) => {
    startSubmitting();

    values.type = "payout";
    const response = await post(`/admin/commissions`, values);
    if (response.status) {
      showModal(
        `successful`,
        `Disbursement time has been updated successfully!`,
        null,
        true
      );
      stopSubmitting();
      resetForm();
      fetchCommission();
    }
    stopSubmitting();
  };

  return (
    <DashboardLayout pageTitle="Payouts Management">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="row my-4">
              <div className="col-12">
                <h2 className="mainTitle mb-0">Payouts Management</h2>
              </div>
            </div>

            <div className="my-4">
              <Formik
                initialValues={{
                  rate: "",
                }}
                validationSchema={disbursementTime}
                onSubmit={handleFormSubmit}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                }) => (
                  <form onSubmit={handleSubmit} className="payout-wrap">
                    <div className="row mb-3 justify-content-center">
                      <div className="col-md-10 col-lg-11 col-xl-9 col-xxl-7">
                        {/* Flexbox layout with mobile responsiveness */}
                        <div className="d-flex flex-column flex-md-row align-items-start  gap-2">
                          {/* Commission rate input */}
                          <TextInput
                            label="Disbursement Time"
                            showInline={showInline}
                            labelclass="mainLabel flex-shrink-0 mb-0"
                            type="number"
                            wrapperClass="mb-0 flex-grow-1"
                            required
                            placeholder="Enter Disbursement Time"
                            inputclass="mainInput"
                            id="rate"
                            value={values.rate}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            rightText={"Days"}
                            rightTextClass="mb-0 fw-bold font-lg"
                            error={touched.rate && errors.rate}
                          />
                          {/* Update Button */}
                          <div className="mt-3 mt-sm-0">
                            <CustomButton
                              variant="site-btn primary-btn"
                              className="px-5 mt-1half"
                              text="Update"
                              pendingText="Submitting..."
                              isPending={isSubmitting}
                              type="submit"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                )}
              </Formik>
            </div>

            {/* Table Section */}
            <div className="dashCard">
              <div className="row mb-3">
                <div className="col-12">
                  <h4 className="dashTitle">Payout Logs</h4>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-12">
                  <CustomTable
                    filters={filters}
                    setFilters={setFilters}
                    loading={isSubmitting}
                    headers={PayoutManagementHeader}
                    pagination={pagination}
                    dateFilters={[
                      {
                        title: "Updated On Date",
                        from: "from",
                        to: "to",
                      },
                    ]}
                  >
                    <tbody>
                      {payoutLogs.map((item, index) => (
                        <tr key={item?.id}>
                          <td width="33%">
                            {serialNum(
                              (filters.page - 1) * filters.per_page + index + 1
                            )}
                          </td>
                          <td width="34%">{`${item?.rate} Days`}</td>
                          <td width="33%">{dateFormat(item?.created_at)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </CustomTable>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default withModal(withFilters(PayoutsManagement));
