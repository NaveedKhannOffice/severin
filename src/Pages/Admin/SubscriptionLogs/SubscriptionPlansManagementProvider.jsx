import React, { useEffect, useState } from "react";
import { FaEdit, FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { DashboardLayout } from "../../../Components/Layouts/AdminLayout/DashboardLayout";
import BackButton from "../../../Components/Common/BackButton";
import CustomTable from "../../../Components/CustomTable";
import { Select } from "../../../Components/Common/FormElements/SelectInput";
import { subscriptionPlansManagementData } from "../../../Config/data";
import { subscriptionPlanManagementHeaders } from "../../../Config/TableHeaders";
import {
  generalStatus,
  normalStatus,
  statusOptions,
  subscriptionType,
} from "../../../Config/TableStatus";
import withFilters from "../../../HOC/withFilters";
import withModal from "../../../HOC/withModal";
import { useFormStatus } from "../../../Hooks/useFormStatus";
import { serialNum } from "../../../Utils/helper";
import { getAll, getDetails, post } from "../../../Services/Api";

const SubscriptionPlansManagementProvider = ({
  showModal,
  filters,
  setFilters,
  pagination,
  updatePagination,
}) => {
  const { isSubmitting, startSubmitting, stopSubmitting } = useFormStatus();
  const [subscriptionPlans, setSubscriptionPlans] = useState(
    subscriptionPlansManagementData.detail.data
  );

  const fetchSubscriptionPlans = async () => {
    try {
      startSubmitting(true);
      const url = `/admin/plans`;
      const response = await getAll(url, filters);
      // const response = subscriptionPlansManagementData;
      if (response.status) {
        const { total, per_page, current_page, to } = response.meta;
        setSubscriptionPlans(response?.data);
        updatePagination({
          showData: to,
          currentPage: current_page,
          totalRecords: total,
          totalPages: Math.ceil(total / per_page),
        });
      }
    } catch (error) {
      console.error("Error fetching Subscription Plans:", error);
    } finally {
      stopSubmitting(false);
    }
  };

  // Handle status change
  const handleStatusChange = (e, rowId) => {
    const newStatusValue = e;
    // Open the modal for confirmation
    showModal(
      `${newStatusValue === "1" ? "Active" : "Inactive"} Subscription Plan`,
      `Are you sure you want to ${
        newStatusValue === "1" ? "Activate" : "Inactivate"
      } this Subscription Plan?`,
      () => onConfirmStatusChange(rowId, newStatusValue)
    );
  };

  // Confirm status change and update the state
  const onConfirmStatusChange = async (rowId, newStatusValue) => {
    // Update the status in the categories state
    setSubscriptionPlans((prevData) =>
      prevData.map((row) =>
        row.id === rowId ? { ...row, admin_status: newStatusValue } : row
      )
    );
    const response = await getDetails(`/admin/plans/${rowId}/status`);
    if (response.status) {
      fetchSubscriptionPlans();
      showModal(
        "Successful",
        `This plan has been ${
          newStatusValue === "1" ? "Activated" : "Inactivated"
        } successfully!`,
        null,
        true
      );
    }
  };

  useEffect(() => {
    fetchSubscriptionPlans();
  }, [filters]);

  return (
    <DashboardLayout pageTitle="Subscription Plan Management">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 ">
            <div className="my-4 d-flex flex-wrap gap-3 gap-md-0 align-items-center justify-content-between">
              <h2 className="mainTitle mb-0">
                <BackButton />
                Subscription Plan Management
              </h2>
              <Link
                to={"add-plan"}
                className="site-btn primary-btn text-decoration-none"
              >
                Add Plan
              </Link>
            </div>
            <div className="dashCard">
              <div className="row mb-3">
                <div className="col-12">
                  <CustomTable
                    filters={filters}
                    setFilters={setFilters}
                    loading={isSubmitting}
                    headers={subscriptionPlanManagementHeaders}
                    pagination={pagination}
                    dateFilters={[
                      {
                        title: "Creation Date",
                        from: "from",
                        to: "to",
                      },
                      {
                        title: "Last Modified Date",
                        from: "midified_from",
                        to: "midified_to",
                      },
                    ]}
                    selectOptions={[
                      {
                        title: "Status",
                        key: "status",
                        options: generalStatus,
                      },
                      {
                        title: "Duration",
                        key: "duration",
                        options: subscriptionType,
                      },
                    ]}
                  >
                    <tbody>
                      {subscriptionPlans?.map((item, index) => (
                        <tr key={item?.id}>
                          <td>
                            {serialNum(
                              (filters.page - 1) * filters.per_page + index + 1
                            )}
                          </td>
                          <td>{item?.title}</td>
                          <td>{item?.duration}</td>
                          <td>${item?.price}</td>
                          <td>{item?.created_at}</td>
                          <td>{item?.last_modified_on}</td>
                          <td>
                            <Select
                              className={`tabel-select status${item?.admin_status}`}
                              required
                              id={`status${item?.id}`}
                              name="status"
                              value={item?.admin_status}
                              onChange={(e) => handleStatusChange(e, item?.id)}
                              isInputNeeded={false}
                            >
                              {statusOptions}
                            </Select>
                          </td>
                          <td>
                            <div className="d-flex cp gap-3 tableAction align-items-center justify-content-center">
                              <span
                                className="tooltip-toggle"
                                aria-label="View"
                              >
                                <Link to={`${item.id}`}>
                                  <FaEye size={20} color="#1819ff" />
                                </Link>
                              </span>
                              <span
                                className="tooltip-toggle"
                                aria-label="Edit"
                              >
                                <Link to={`${item.id}/edit`}>
                                  <FaEdit size={20} color="#1819ff" />
                                </Link>
                              </span>
                            </div>
                          </td>
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

export default withModal(withFilters(SubscriptionPlansManagementProvider));
