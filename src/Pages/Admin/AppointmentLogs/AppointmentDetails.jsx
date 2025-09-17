import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

import { DashboardLayout } from "../../../Components/Layouts/AdminLayout/DashboardLayout";
// import { DashboardLayout } from "../../../Components/AdminLayout/DashboardLayout";
import { FaRegStar, FaStar } from "react-icons/fa";
import Rating from "react-rating";
import BackButton from "../../../Components/Common/BackButton";
import { getDetails } from "../../../Services/Api";
import { dateFormat, getCountryFlag, isNullOrEmpty, statusClassMap } from "../../../Utils/helper";

const AppointmentDetails = () => {
   const { id } = useParams();
   const location = useLocation();
   const status = location.search.split("=")[1];
   console.log("status", status);
   const [appointmentDetails, setAppointmentDetails] = useState();

   useEffect(() => {
      const getAppointmentDetails = async () => {
         // const response = allAppointmentLogsData.detail.data.find((app) => app.id === id);

         const response = await getDetails(`/admin/bookings/${id}`);
         if (response?.status) {
            // setServiceProvider(response.detail);
            setAppointmentDetails(response?.data);
         }
      };
      getAppointmentDetails();
   }, [id]);
   console.log(appointmentDetails);
   
   if (isNullOrEmpty(appointmentDetails)) {
      return (
         <DashboardLayout pageTitle="Appointment Details">
            <div className="container-fluid">
               <div className="row">
                  <div className="col-12 ">
                     <div className="row my-4">
                        <div className="col-12 d-flex">
                           <BackButton url={`/admin/appointment-logs?status=${status}`} />
                           <h2 className="mainTitle mb-0">Appointment Details</h2>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="dashCard">...</div>
            </div>
         </DashboardLayout>
      );
   }
   return (
      <DashboardLayout pageTitle="Appointment Details">
         <div className="container-fluid">
            <div className="row">
               <div className="col-12 ">
                  <div className="row my-4">
                     <div className="col-12 d-flex">
                        <BackButton />
                        <h2 className="mainTitle mb-0">Appointment Details</h2>
                     </div>
                  </div>
                  <div className="dashCard">
                     <div className="row ">
                        <div className="col-12">
                           <div className="d-flex flex-column flex-sm-row mb-2 gap-3">
                              <div>
                                 <h2 className="fw-semibold fs-3">{appointmentDetails?.service?.service_name}</h2>
                              </div>
                              <div className="flex-grow-1 d-flex flex-column align-items-start align-items-sm-end justify-content-end justify-content-sm-start gap-3">
                                 <div className="">
                                    <label className="fw-semibold">Status</label>
                                    <span className={`ms-3 fw-semibold ${statusClassMap[appointmentDetails?.status]}`}>{appointmentDetails?.status}</span>
                                 </div>
                                 <div>
                                    <label className={`fw-semibold cap d-inline`}>Appointment Type</label>
                                    <p className="appointmentTypeText secondaryText text-info ms-3 mb-0">{appointmentDetails?.service_mode}</p>
                                 </div>
                              </div>
                           </div>
                           <div className="row">
                              <div className="col-md-10 col-lg-8">
                                 <div className="row my-2">
                                    {appointmentDetails?.booking_type === "additional_service" && (
                                       <div className="col-lg-6 mb-3">
                                          <h4 className="secondaryLabel">Addtional Request Service</h4>
                                          <p className="secondaryText wrapText mb-0">{appointmentDetails.addtionalRequestService}</p>
                                       </div>
                                    )}
                                    {appointmentDetails?.booking_type === "additional_service" && (
                                       <div className="col-lg-6 mb-3">
                                          <h4 className="secondaryLabel">Addtional Request Charges</h4>
                                          <p className="secondaryText wrapText mb-0">{appointmentDetails?.amount}</p>
                                       </div>
                                    )}
                                    {[
                                       { label: "Service Category:", value: appointmentDetails?.service?.category?.category_title },
                                       { label: "Service charges:", value: appointmentDetails?.amount },
                                       { label: "Appointment ID:", value: appointmentDetails?.booking_id },
                                       { label: "Appointment Date:", value: dateFormat(appointmentDetails?.created_at) },
                                       { label: "User Name:", value: appointmentDetails?.user?.first_name +' '+appointmentDetails?.user?.last_name },
                                       { label: "Email Address:", value: appointmentDetails?.user?.email },
                                       { label: "Phone No:", value: appointmentDetails?.user?.phone },
                                       { label: "service Date:", value: dateFormat(appointmentDetails?.booking_date) },
                                    ].map(({ label, value }) => (
                                       <div className="col-lg-6 mb-3" key={label}>
                                          <h4 className="secondaryLabel">{label}</h4>
                                          <p className="secondaryText wrapText mb-0">
                                             {label === "Phone No:" && <span>{getCountryFlag(value)}</span>} {value}
                                          </p>
                                       </div>
                                    ))}
                                    {/* {appointmentDetails.requestedDate && (
                                       <>
                                          <div className="col-lg-6 mb-3">
                                             <h4 className="secondaryLabel">Requested Date</h4>
                                             <p className="secondaryText wrapText mb-0">{appointmentDetails.requestedDate}</p>
                                          </div>
                                          <div className="col-lg-6 mb-3">
                                             <h4 className="secondaryLabel">Requested Time</h4>
                                             <p className="secondaryText wrapText mb-0">{appointmentDetails.requestedTime}</p>
                                          </div>
                                       </>
                                    )} */}
                                 </div>
                                 {appointmentDetails?.service_mode === "onsite" && appointmentDetails?.bookingDetail && (
                                    <div className="mb-4">
                                       <h4 className="secondaryLabel">Address</h4>
                                       <p className="secondaryText mb-0">{appointmentDetails?.bookingDetail?.address ?? appointmentDetails?.service?.address}</p>
                                    </div>
                                 )}
                                 {appointmentDetails?.user_rating && (
                                    <div className="mb-4">
                                       <h2 style={{ fontSize: 18 }} className="secondaryTitle mb-0">
                                          Rating
                                       </h2>
                                       <Rating
                                          className="mt-3"
                                          emptySymbol={<FaRegStar color="#FFC83D" size={36} />}
                                          fullSymbol={<FaStar size={36} color="#FFC83D" />}
                                          initialRating={appointmentDetails?.user_rating?.rating}
                                          readonly
                                       />
                                    </div>
                                 )}
                                 {appointmentDetails?.user_rating && (
                                    <div className="mb-4">
                                       <h4 className="secondaryLabel">Review</h4>
                                       <p className="secondaryText mb-0">{appointmentDetails.user_rating?.review}</p>
                                    </div>
                                 )}
                                 {appointmentDetails?.reject_reason && (
                                    <div className="mb-4">
                                       <h4 className="secondaryLabel">Rejection Reason</h4>
                                       <p className="secondaryText mb-0">{appointmentDetails?.reject_reason}</p>
                                    </div>
                                 )}
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="row my-4">
                     <div className="col-12 col-md-6">
                        <div className="dashCard">
                           <div className="d-flex justify-content-between">
                              <h2 style={{ fontSize: 18 }} className="secondaryTitle mb-0">
                                 User Detail
                              </h2>
                              <Link style={{ fontSize: 14 }} to={`/admin/user-management/${appointmentDetails?.user?.id}`}>
                                 View Details
                              </Link>
                           </div>
                           <div className="d-flex gap-3 mt-3 align-items-center">
                              <img className="roundedBorders smallProfileImage" src={appointmentDetails?.user?.photo} alt="user photo" />
                              <h4 style={{ fontSize: 18 }} className="mb-0">
                                 {appointmentDetails?.user?.first_name} {appointmentDetails?.user?.last_name}
                              </h4>
                           </div>
                        </div>
                     </div>
                     <div className="col-12 col-md-6">
                        <div className="dashCard">
                           <div className="d-flex justify-content-between">
                              <h2 style={{ fontSize: 18 }} className="secondaryTitle mb-0">
                                 Service Provider Detail
                              </h2>
                              <Link style={{ fontSize: 14 }} to={`/admin/service-provider-management/${appointmentDetails?.service?.user?.id}`}>
                                 View Details
                              </Link>
                           </div>
                           <div className="d-flex gap-3 mt-3 align-items-center">
                              <img className="roundedBorders smallProfileImage" src={appointmentDetails?.service?.user?.photo} alt="user photo" />
                              <h4 style={{ fontSize: 18 }} className="mb-0">
                                 {appointmentDetails?.service?.user?.first_name + " " + appointmentDetails?.service?.user?.last_name}
                              </h4>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </DashboardLayout>
   );
};

export default AppointmentDetails;
