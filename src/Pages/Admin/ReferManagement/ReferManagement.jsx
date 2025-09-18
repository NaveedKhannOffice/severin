// import { useEffect, useState } from "react";
// import { FaEdit, FaEye } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import CustomTable from "../../../Components/CustomTable";
// import { DashboardLayout } from "../../../Components/Layouts/AdminLayout/DashboardLayout";
// import { Select } from "../../../Components/Common/FormElements/SelectInput";
// import { referData } from "../../../Config/data";
// import { referTableHeaders } from "../../../Config/TableHeaders";
// import { statusOptions } from "../../../Config/TableStatus";
// import withFilters from "../../../HOC/withFilters ";
// import withModal from "../../../HOC/withModal";
// import { useFormStatus } from "../../../Hooks/useFormStatus";
// import { dateFormat, serialNum } from "../../../Utils/helper";

// const ReferManagement = ({ filters, setFilters, pagination, updatePagination, showModal }) => {
//   const { isSubmitting } = useFormStatus();
//   const [referTableData, setReferTableData] = useState([]);

//   const fetchReferdata = () => {
//     try {
//       const response = referData;
//       if (response.status) {
//         const { total, per_page, current_page, to } = response?.detail?.data;
//         // Map the data to include status_detail based on status
//         const mappedData = response?.detail?.data.map((item) => ({
//           ...item,
//           status_detail: item.status === 1 ? "Active" : "Inactive",
//         }));
//         setReferTableData(mappedData);
//         updatePagination({
//           showData: to,
//           currentPage: current_page,
//           totalRecords: total,
//           totalPages: Math.ceil(total / per_page),
//         });
//       }
//     } catch (error) {
//       console.error("Error fetching refer data:", error);
//     }
//   };

//   // Handle status change
//   const handleStatusChange = (e, userId) => {
//     const newStatusValue = e;
//     console.log("Status change triggered:", newStatusValue, userId);

//     // Open the modal for confirmation
//     showModal(
//       `Mark as ${newStatusValue === "1" ? "Active" : "Inactive"}`,
//       `Are you sure you want to change this refer reward's status to ${newStatusValue === "1" ? "Active" : "Inactive"}?`,
//       () => onConfirmStatusChange(userId, newStatusValue)
//     );
//   };

//   // Confirm status change and update the state
//   const onConfirmStatusChange = async (userId, newStatusValue) => {
//     try {
//       console.log("Confirming status change:", userId, newStatusValue);

//       // Simulate API call since we're using mock data
//       // In a real application, you would make an actual API call
//       // const response = await post(`/admin/refer/${userId}/status`);

//       // Update the status in the referTableData state
//       setReferTableData((prevData) =>
//         prevData.map((item) =>
//           item.id === userId
//             ? {
//                 ...item,
//                 status: newStatusValue,
//                 status_detail: newStatusValue === "1" ? "Active" : "Inactive",
//               }
//             : item
//         )
//       );

//       // Show success message
//       showModal("Successful", `Refer status has been changed to ${newStatusValue === "1" ? "Active" : "Inactive"} successfully.`, null, true);
//     } catch (error) {
//       console.error("Error updating status:", error);
//     }
//   };
//   useEffect(() => {
//     fetchReferdata();
//   }, [filters]);

//   return (
//     <DashboardLayout pageTitle="Refer Management">
//       <div className="container-fluid">
//         <div className="row">
//           <div className="col-12 ">
//             <div className="my-4 d-flex flex-wrap gap-3 gap-md-0 align-items-center justify-content-between">
//               <h2 className="mainTitle mb-0">Refer Management</h2>
//               <div className=" d-flex justify-content-center  align-items-center gap-2">
//                 <Link to="/admin/refer-management/add-refer-rewards" className="site-btn primary-btn text-decoration-none">
//                   Add New Refer Rewards
//                 </Link>
//                 <Link to="/admin/refer-management/refer-logs" className="site-btn primary-btn text-decoration-none">
//                   Refer Logs
//                 </Link>
//               </div>
//             </div>

//             <div className="dashCard">
//               <div className="row mb-3">
//                 <div className="col-12">
//                   <CustomTable
//                     filters={filters}
//                     setFilters={setFilters}
//                     loading={isSubmitting}
//                     headers={referTableHeaders}
//                     pagination={pagination}
//                     dateFilters={[
//                       {
//                         title: "Date",
//                         from: "from",
//                         to: "to",
//                       },
//                     ]}
//                     selectOptions={[
//                       {
//                         title: "Status",
//                         key: "status",
//                         options: statusOptions,
//                       },
//                     ]}
//                   >
//                     <tbody>
//                       {referTableData.map((item, index) => (
//                         <tr key={item?.id}>
//                           <td>{serialNum((filters.page - 1) * filters.per_page + index + 1)}</td>
//                           <td>{item?.rewards}</td>
//                           <td>{item?.refer_condition}</td>
//                           <td>{dateFormat(item?.date)}</td>
//                           {/* Status column with Select dropdown */}
//                           <td>
//                             <Select
//                               className={`tabel-select status${item?.status}`}
//                               required
//                               id={`status${item?.id}`}
//                               name="status"
//                               value={item?.status}
//                               onChange={(value) => {
//                                 console.log("Select onChange triggered with value:", value);
//                                 if (value !== item?.status) {
//                                   handleStatusChange(value, item?.id);
//                                 }
//                               }}
//                               isInputNeeded={false}
//                             >
//                               {statusOptions}
//                             </Select>
//                           </td>
//                           <td>
//                             <div className="d-flex cp gap-3 tableAction align-items-center justify-content-center">
//                               <span className="tooltip-toggle" aria-label="View">
//                                 <Link to={`/admin/refer-management/${item.id}`}>
//                                   <FaEye size={20} color="#1819ff" />
//                                 </Link>
//                               </span>
//                               <span className="tooltip-toggle" aria-label="Edit">
//                                 <Link to={`/admin/refer-management/${item.id}/edit`}>
//                                   <FaEdit size={20} color="#1819ff" />
//                                 </Link>
//                               </span>
//                             </div>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </CustomTable>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </DashboardLayout>
//   );
// };

// export default withModal(withFilters(ReferManagement));

import { useEffect, useState } from "react";
import { FaEye, FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { DashboardLayout } from "../../../Components/Layouts/AdminLayout/DashboardLayout";
import CustomTable from "../../../Components/CustomTable";
import SelectInput from "../../../Components/Common/FormElements/SelectInput";
import { statusOptions } from "../../../Config/TableStatus";
import withFilters from "../../../HOC/withFilters";
import withModal from "../../../HOC/withModal";
import { useFormStatus } from "../../../Hooks/useFormStatus";
import { dateFormat, serialNum } from "../../../Utils/helper";
import { getAll, post } from "../../../Services/Api";

const ReferManagement = ({
  showModal,
  filters,
  setFilters,
  pagination,
  updatePagination,
}) => {
  const [referTableData, setReferTableData] = useState([]);
  const { isSubmitting, startSubmitting, stopSubmitting } = useFormStatus();

  const fetchReferData = async () => {
    try {
      startSubmitting(true);
      const response = await getAll("/admin/refer-rewards", filters);

      if (response.status) {
        const { data, meta } = response;
        const mappedData = data.map((item) => ({
          id: item.id,
          rewards:
            `${
              item.vouchers?.length
                ? `Total Gain Vouchers    ${String(
                    item.vouchers.length
                  ).padStart(2, "0")}`
                : ""
            }${
              item.in_app_gifts?.length
                ? ` / Total Gain In App Purchase Gifts  ${String(
                    item.in_app_gifts.length
                  ).padStart(2, "0")}`
                : ""
            }`.trim() || "No Reward",
          refer_condition: `on ${item.required_referrals} new users`,
          date: item.created_at,
          status: item.status,
          status_detail: item.status == 1 ? "Active" : "Inactive",
          rawData: item, // Preserve original data for detail views
        }));

        setReferTableData(mappedData);
        updatePagination({
          showData: meta.to,
          currentPage: meta.current_page,
          totalRecords: meta.total,
          totalPages: meta.last_page,
        });
      }
    } catch (error) {
      console.error("Error fetching refer data:", error);
      showModal("Error", "Failed to fetch refer rewards.", null, true);
    } finally {
      stopSubmitting(false);
    }
  };

  const handleStatusChange = (newStatus, rewardId) => {
    showModal(
      `Mark as ${newStatus == 1 ? "Active" : "Inactive"}`,
      `Change status to ${newStatus == 1 ? "Active" : "Inactive"}?`,
      () => updateStatus(rewardId, newStatus)
    );
  };

  const updateStatus = async (rewardId, newStatus) => {
    try {
      const response = await post(`/admin/refer-rewards/${rewardId}/status`, {
        status: newStatus,
      });

      if (response.status) {
        fetchReferData();
        showModal("Success", "Status updated successfully!", null, true);
      }
    } catch (error) {
      console.error("Status update failed:", error);
      showModal("Error", "Failed to update status.", null, true);
    }
  };

  useEffect(() => {
    fetchReferData();
  }, [filters]);

  return (
    <DashboardLayout pageTitle="Refer Management">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="row my-4">
              <div className="col-12">
                <div className="d-flex flex-wrap gap-3 gap-md-0 align-items-center justify-content-between">
                  <h2 className="mainTitle mb-0">Refer Management</h2>
                  <div className="d-flex gap-2">
                    <Link
                      to="add-refer-rewards"
                      className="site-btn primary-btn text-decoration-none"
                    >
                      Add New Reward
                    </Link>
                    <Link
                      to="refer-logs"
                      className="site-btn primary-btn text-decoration-none"
                    >
                      Refer Logs
                    </Link>
                  </div>
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
                    headers={[
                      { title: "S.No", key: "sno" },
                      { title: "Rewards", key: "rewards" },
                      { title: "Refer", key: "refer_condition" },
                      { title: "Date", key: "date" },
                      { title: "Status", key: "status" },
                      { title: "Actions", key: "actions" },
                    ]}
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
                    searchOptions={{
                      placeholder: "Search rewards...",
                      key: "search",
                    }}
                  >
                    <tbody>
                      {referTableData.map((item, index) => (
                        <tr key={item.id}>
                          <td>
                            {serialNum(
                              (filters.page - 1) * filters.per_page + index + 1
                            )}
                          </td>
                          <td>{item.rewards}</td>
                          <td>{item.refer_condition}</td>
                          <td>{dateFormat(item.date)}</td>
                          <td>
                            <SelectInput
                              className={`tabel-select status${item.status}`}
                              value={item.status}
                              onChange={(value) =>
                                handleStatusChange(value, item.id)
                              }
                              isInputNeeded={false}
                            >
                              {statusOptions}
                            </SelectInput>
                          </td>
                          <td>
                            <div className="d-flex gap-3 justify-content-center">
                              <Link
                                to={`${item.id}`}
                                state={{ rewardData: item.rawData }}
                              >
                                <FaEye size={20} color="#1819ff" />
                              </Link>
                              {/* <Link to={`${item.id}/edit`} state={{ rewardData: item.rawData }}>
                                                <FaEdit size={20} color="#1819ff" />
                                             </Link> */}
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

export default withModal(withFilters(ReferManagement));
