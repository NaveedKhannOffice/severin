import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CustomButton from "../../../Components/Common/CustomButton";
import CustomTable from "../../../Components/CustomTable";
import { DashboardLayout } from "../../../Components/Layouts/AdminLayout/DashboardLayout";
import { appointmentLogsHeaders } from "../../../Config/TableHeaders";
import { appointmentTypeOptions } from "../../../Config/TableStatus";
import withFilters from "../../../HOC/withFilters";
import { useFormStatus } from "../../../Hooks/useFormStatus";
import { getAll } from "../../../Services/Api";
import { dateFormat, serialNum } from "../../../Utils/helper";

const AppointmentLogs = ({ filters, setFilters, pagination, updatePagination }) => {
   const location = useLocation();
   const navigate = useNavigate();
   const searchParams = new URLSearchParams(location.search);
   const status = searchParams.get("status") || "Approved";
   const [appointmentLogs, setAppointmentLogs] = useState([]);
   const { isSubmitting, startSubmitting, stopSubmitting } = useFormStatus();
   
   const handleTabChange = (tab) => {
      searchParams.set("status", tab);
      navigate(`?${searchParams.toString()}`);
   };

   const fetchAppointmentLogs = async () => {
      try {
         startSubmitting(true);
         const url = `/admin/bookings`;
         const updatedFilters = {
            ...filters,
            status: status
         };

         const response = await getAll(url, updatedFilters);
         if (response.status) {
            const { total, per_page, current_page, to } = response.meta;
            setAppointmentLogs(response?.data);
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

   useEffect(() => {
      fetchAppointmentLogs();
   }, [filters, status]);

   return (
      <DashboardLayout pageTitle="Appointment Logs">
         <div className="container-fluid">
            <div className="row">
               <div className="col-12">
                  <div className="row my-4">
                     <div className="col-12">
                        <h2 className="mainTitle mb-0">Appointment Logs</h2>
                     </div>
                  </div>
                  <div className="mt-md-5 mb-4 d-flex flex-wrap justify-content-center">
                     <CustomButton
                        className={`site-btn mb-2 tab-btn ${status === "Approved" && "tab-selected"} text-decoratio-none leftBordersRounded`}
                        text="Approved"
                        onClick={() => handleTabChange("Approved")}
                     />
                     <CustomButton
                        className={`site-btn mb-2 tab-btn ${status === "Requested" && "tab-selected"} text-decoration-none notRoundedBorders`}
                        text="Requested"
                        onClick={() => handleTabChange("Requested")}
                     />
                     <CustomButton
                        className={`site-btn mb-2 tab-btn ${status === "Completed" && "tab-selected"} text-decoration-none notRoundedBorders`}
                        text="Completed"
                        onClick={() => handleTabChange("Completed")}
                     />
                     <CustomButton
                        className={`site-btn mb-2 tab-btn ${status === "Rejected" && "tab-selected"} text-decoration-none rightBordersRounded`}
                        text="Rejected"
                        onClick={() => handleTabChange("Rejected")}
                     />
                  </div>
                  <div className="dashCard">
                     <div className="row mb-3">
                        <div className="col-12">
                           <CustomTable
                              filters={filters}
                              setFilters={setFilters}
                              loading={isSubmitting}
                              headers={appointmentLogsHeaders}
                              pagination={pagination}
                              dateFilters={[
                                 {
                                    title: "Appointment Date",
                                    from: "from",
                                    to: "to",
                                 },
                              ]}
                              selectOptions={[ 
                                 {
                                    title: "Booking Type",
                                    key: "booking_type",
                                    options: appointmentTypeOptions,
                                 },
                              ]}
                           >
                              <tbody>
                                 {appointmentLogs?.map((item, index) => (
                                    <tr key={item?.id}>
                                       <td>{serialNum((filters.page - 1) * filters.per_page + index + 1)}</td>
                                       <td>{item?.booking_id}</td>
                                       <td>{item?.user?.first_name + " " + item?.user?.last_name}</td>
                                       <td>{item?.service?.user?.first_name + " " + item?.service?.user?.last_name}</td>
                                       <td>{dateFormat(item?.created_at)}</td>
                                       <td>${item?.service?.service_mode == "online" ? item?.service?.final_online_charges : item?.service?.final_onsite_charges}</td>
                                       <td>{item?.service_mode}</td>
                                       <td>
                                          <div className="d-flex cp gap-3 tableAction align-items-center justify-content-center">
                                             <span className="tooltip-toggle" aria-label="View">
                                                <Link to={`${item.id}?status=${status}`}>
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

export default withFilters(AppointmentLogs);
