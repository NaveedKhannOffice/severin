import { useEffect, useState } from "react";
import { FaEdit, FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import CustomTable from "../../../Components/CustomTable";
import { DashboardLayout } from "../../../Components/Layouts/AdminLayout/DashboardLayout";
import { Select } from "../../../Components/Common/FormElements/SelectInput";
import { challengeData } from "../../../Config/data";
import { challengeTableHeaders } from "../../../Config/TableHeaders";
import { statusOptions } from "../../../Config/TableStatus";
import withFilters from "../../../HOC/withFilters";
import withModal from "../../../HOC/withModal";
import { useFormStatus } from "../../../Hooks/useFormStatus";
import { dateFormat, serialNum } from "../../../Utils/helper";
import { getAll, getDetails, post } from "../../../Services/Api";

const ChallengeManagement = ({
  filters,
  setFilters,
  pagination,
  updatePagination,
  showModal,
}) => {
  const { isSubmitting } = useFormStatus();
  const [challengeTableData, setChallengeTableData] = useState([]);

  const fetchChallengeData = async () => {
    try {
      const response = await getAll("/admin/challenges", filters);

      if (response.status) {
        const { total, per_page, current_page, to } = response?.meta;
        const mappedData = response?.data.map((item) => ({
          ...item,
          status_detail: item.status === 1 ? "Active" : "Inactive",
        }));
        setChallengeTableData(mappedData);
        updatePagination({
          showData: to,
          currentPage: current_page,
          totalRecords: total,
          totalPages: Math.ceil(total / per_page),
        });
      }
    } catch (error) {
      console.error("Error fetching challenge data:", error);
    }
  };

  const handleStatusChange = (e, userId) => {
    const newStatusValue = e;
    showModal(
      `Mark as ${newStatusValue === "1" ? "Active" : "Inactive"}`,
      `Are you sure you want to change this challenge's status to ${
        newStatusValue === "1" ? "Active" : "Inactive"
      }?`,
      () => onConfirmStatusChange(userId, newStatusValue)
    );
  };

  const onConfirmStatusChange = async (userId, newStatusValue) => {
    try {
      // Call the toggle status API endpoint
      const response = await getDetails(`/admin/challenges/${userId}/status`, {
        status: newStatusValue,
      });

      if (response.status) {
        // Update the status in the challengeTableData state
        setChallengeTableData((prevData) =>
          prevData.map((item) =>
            item.id === userId
              ? {
                  ...item,
                  status: newStatusValue,
                  status_detail: newStatusValue === "1" ? "Active" : "Inactive",
                }
              : item
          )
        );

        showModal(
          "Successful",
          `Challenge status has been changed to ${
            newStatusValue === "1" ? "Active" : "Inactive"
          } successfully.`,
          null,
          true
        );
      }
    } catch (error) {
      console.error("Error updating status:", error);
      showModal(
        "Error",
        "Failed to update challenge status. Please try again.",
        null,
        true
      );
    }
  };

  useEffect(() => {
    fetchChallengeData();
  }, [filters]);

  return (
    <DashboardLayout pageTitle="Challenge Management">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 ">
            <div className="my-4 d-flex flex-wrap gap-3 gap-md-0 align-items-center justify-content-between">
              <h2 className="mainTitle mb-0">Challenge Management</h2>
              <div>
                <Link
                  to="/admin/challenge-management/add-challenge"
                  className="site-btn primary-btn text-decoration-none"
                >
                  Add New Challenge
                </Link>
              </div>
            </div>

            <div className="dashCard">
              <div className="row mb-3">
                <div className="col-12">
                  <CustomTable
                    filters={filters}
                    setFilters={setFilters}
                    loading={isSubmitting}
                    headers={challengeTableHeaders}
                    pagination={pagination}
                    dateFilters={[
                      {
                        title: "Date",
                        from: "from",
                        to: "to",
                      },
                    ]}
                    selectOptions={[
                      {
                        title: "Status",
                        key: "status",
                        options: statusOptions,
                      },
                    ]}
                  >
                    <tbody>
                      {challengeTableData.map((item, index) => (
                        <tr key={item?.id}>
                          <td>
                            {serialNum(
                              (filters.page - 1) * filters.per_page + index + 1
                            )}
                          </td>
                          <td>{item?.title}</td>
                          <td>{item?.type}</td>
                          <td>{dateFormat(item?.created_at)}</td>
                          <td>
                            <Select
                              className={`tabel-select status${item?.status}`}
                              required
                              id={`status${item?.id}`}
                              name="status"
                              value={item?.status}
                              onChange={(value) => {
                                if (value !== item?.status) {
                                  handleStatusChange(value, item?.id);
                                }
                              }}
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
                                <Link
                                  to={`/admin/challenge-management/${item.id}`}
                                >
                                  <FaEye size={20} color="#1819ff" />
                                </Link>
                              </span>
                              {/* <span className="tooltip-toggle" aria-label="Edit">
                                                <Link to={`/admin/challenge-management/${item.id}/edit`}>
                                                   <FaEdit size={20} color="#1819ff" />
                                                </Link>
                                             </span> */}
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

export default withModal(withFilters(ChallengeManagement));
