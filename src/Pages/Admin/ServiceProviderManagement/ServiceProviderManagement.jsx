import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { DashboardLayout } from "../../../Components/Layouts/AdminLayout/DashboardLayout";
import CustomTable from "../../../Components/CustomTable";
import { Select } from "../../../Components/Common/FormElements/SelectInput";
import { serviceProvidersData } from "../../../Config/data";
import { serviceProviderHeaders } from "../../../Config/TableHeaders";
import { normalStatus, statusOptions } from "../../../Config/TableStatus";
import withFilters from "../../../HOC/withFilters";
import withModal from "../../../HOC/withModal";
import { useFormStatus } from "../../../Hooks/useFormStatus";
import { dateFormat, serialNum } from "../../../Utils/helper";
import { getAll, post } from "../../../Services/Api";

const ServiceProviderManagement = ({
  showModal,
  filters,
  setFilters,
  pagination,
  updatePagination,
}) => {
  const { isSubmitting, startSubmitting, stopSubmitting } = useFormStatus();
  const [userData, setUserData] = useState([]);

  const fetchServiceProviders = async () => {
    try {
      startSubmitting(true);
      const url = `/admin/providers/approved`;
      const response = await getAll(url, filters);
      if (response.status) {
        const { total, per_page, current_page, to } = response.meta;
        setUserData(response.data);
        updatePagination({
          showData: to,
          currentPage: current_page,
          totalRecords: total,
          totalPages: Math.ceil(total / per_page),
        });
      }
    } catch (error) {
      console.error("Error fetching Service Providers:", error);
    } finally {
      stopSubmitting(false);
    }
  };

  // Handle status change
  const handleStatusChange = (e, userId) => {
    const newStatusValue = e;
    // Open the modal for confirmation
    showModal(
      `${newStatusValue === "1" ? "Active" : "Inactive"} Service Provider`,
      `Are you sure you want to ${
        newStatusValue === "1" ? "Activate" : "Inactivate"
      } this Service Provider?`,
      () => onConfirmStatusChange(userId, newStatusValue)
    );
  };

  // Confirm status change and update the state
  const onConfirmStatusChange = async (userId, newStatusValue) => {
    // Update the status in the userData state
    const response = await post(`/admin/providers/${userId}/status`);
    if (response.status) {
      console.log("response", response?.data?.status);

      fetchServiceProviders();
      showModal(
        "Successful",
        `This Service Provider has been ${
          response?.data?.status == "1" ? "Activated" : "Inactivated"
        } successfully!`,
        null,
        true
      );
    }
  };

  useEffect(() => {
    fetchServiceProviders();
  }, [filters]);

  return (
    <DashboardLayout pageTitle="Service Provider Management">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 ">
            <div className="my-4 d-flex flex-wrap gap-3 gap-md-0 align-items-center justify-content-between">
              <h2 className="mainTitle mb-0">Service Provider Management</h2>
              <Link
                to={"requests"}
                className="site-btn primary-btn text-decoration-none"
              >
                New Requests
              </Link>
            </div>
            <div className="dashCard">
              <div className="row mb-3">
                <div className="col-12">
                  <CustomTable
                    filters={filters}
                    setFilters={setFilters}
                    loading={isSubmitting}
                    headers={serviceProviderHeaders}
                    pagination={pagination}
                    dateFilters={[
                      {
                        title: "Registration Date",
                        from: "from",
                        to: "to",
                      },
                    ]}
                    selectOptions={[
                      {
                        title: "Status",
                        key: "status",
                        options: normalStatus,
                      },
                    ]}
                  >
                    <tbody>
                      {userData?.map((item, index) => (
                        <tr key={item?.id}>
                          <td>
                            {serialNum(
                              (filters.page - 1) * filters.per_page + index + 1
                            )}
                          </td>
                          <td>{item?.first_name + " " + item?.last_name}</td>
                          <td>{item?.email}</td>
                          <td>{dateFormat(item?.created_at)}</td>
                          {/* Status column with Select dropdown */}
                          <td>
                            <Select
                              className={`tabel-select status${item?.status}`}
                              required
                              id={`status${item?.id}`}
                              name="status"
                              value={item?.status}
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

export default withModal(withFilters(ServiceProviderManagement));
