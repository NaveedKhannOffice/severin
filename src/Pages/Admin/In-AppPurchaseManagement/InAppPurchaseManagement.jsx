import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { DashboardLayout } from "../../../Components/Layouts/AdminLayout/DashboardLayout";
import CustomTable from "../../../Components/CustomTable";
import { Select } from "../../../Components/Common/FormElements/SelectInput";
import { inAppPurchaseManagementData } from "../../../Config/data";
import { appPurchaseManagementHeaders } from "../../../Config/TableHeaders";
import { normalStatus, statusOptions } from "../../../Config/TableStatus";
import withFilters from "../../../HOC/withFilters";
import withModal from "../../../HOC/withModal";
import { useFormStatus } from "../../../Hooks/useFormStatus";
import { dateFormat, serialNum } from "../../../Utils/helper";
import { getAll, post } from "../../../Services/Api";

const InAppPurchaseManagement = ({
  showModal,
  filters,
  setFilters,
  pagination,
  updatePagination,
}) => {
  const [data, setData] = useState([]);
  const { isSubmitting, startSubmitting, stopSubmitting } = useFormStatus();

  const fetchUsers = async () => {
    try {
      startSubmitting(true);
      const url = `/admin/inapppurchases`;
      const response = await getAll(url, filters);
      if (response.status) {
        const { total, per_page, current_page, to } = response.meta;
        setData(response?.data);
        updatePagination({
          showData: to,
          currentPage: current_page,
          totalRecords: total,
          totalPages: Math.ceil(total / per_page),
        });
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      stopSubmitting(false);
    }
  };

  // Handle status change
  const handleStatusChange = (e, userId) => {
    const newStatusValue = e;
    // Open the modal for confirmation
    showModal(
      `${newStatusValue === "1" ? "Active" : "Inactive"} Product`,
      `Are you sure you want to change this Product status to ${
        newStatusValue === "1" ? "Active" : "Inactive"
      }?`,
      () => onConfirmStatusChange(userId, newStatusValue)
    );
  };

  // Confirm status change and update the state
  const onConfirmStatusChange = async (userId, newStatusValue) => {
    // Update the status in the data state
    const response = await post(`/admin/inapppurchases/${userId}/status`);
    if (response.status) {
      fetchUsers();
      showModal(
        "Successful",
        `Product status has been changed to ${
          newStatusValue === "1" ? "Active" : "Inactive"
        } successfully.`,
        null,
        true
      );
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [filters]);

  return (
    <DashboardLayout pageTitle="In-App Purchase Management">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="row my-4">
              <div className="col-12">
                <div className="d-flex flex-wrap gap-3 gap-md-0 align-items-center justify-content-between">
                  <h2 className="mainTitle mb-0">In-App Purchase Management</h2>
                  <Link
                    to={"add-product"}
                    className="site-btn primary-btn text-decoration-none"
                  >
                    Create new Product
                  </Link>
                </div>
              </div>
            </div>
            <div className="dashCard">
              <div className="row mb-3">
                <div className="col-12">
                  <CustomTable
                    filters={filters}
                    setFilters={setFilters}
                    loading={isSubmitting}
                    headers={appPurchaseManagementHeaders}
                    pagination={pagination}
                    dateFilters={[
                      {
                        title: "Added On Date",
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
                      {data?.map((item, index) => (
                        <tr key={item?.id}>
                          <td>
                            {serialNum(
                              (filters.page - 1) * filters.per_page + index + 1
                            )}
                          </td>
                          <td>{item?.title}</td>
                          <td>{dateFormat(item?.created_at)}</td>
                          <td>${item?.amount}</td>
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

export default withModal(withFilters(InAppPurchaseManagement));
