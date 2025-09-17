import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { DashboardLayout } from "../../../Components/Layouts/AdminLayout/DashboardLayout";
import BackButton from "../../../Components/Common/BackButton";
import CustomButton from "../../../Components/Common/CustomButton";
import { reportsManagementBookingData } from "../../../Config/data";
import {
  getCountryFlag,
  isNullOrEmpty,
  statusClassMap,
} from "../../../Utils/helper";
import withModal from "../../../HOC/withModal";
import { getDetails, post } from "../../../Services/Api";

const ViewReport = ({ showModal }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [reportDetails, setReportDetails] = useState({});
  const getReportDetails = async () => {
    const response = await getDetails(`/admin/report/${id}`);
    if (response?.status) {
      setReportDetails(response?.data);
    }
  };
  useEffect(() => {
    getReportDetails();
  }, [id]);
  // Handle status change
  const handleStatusChange = () => {
    showModal(
      `Mark as Resolved`,
      `Are you sure you want to mark this report as resolved?`,
      () => onConfirmStatusChange()
    );
  };

  // Confirm status change and update the state
  const onConfirmStatusChange = async () => {
    // setReportDetails({ ...reportDetails, status: "Resolved" });

    const response = await post(`/admin/report/${id}/status`);
    if (response.status) {
      getReportDetails();
      showModal(
        "Successful",
        `Report has been resolved successfully!`,
        () => navigate("/admin/reports-management?tab=booking"),
        true
      );
    }
  };
  if (isNullOrEmpty(reportDetails)) {
    return (
      <DashboardLayout pageTitle="View Report">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 ">
              <div className="row my-4">
                <div className="col-12 d-flex">
                  <BackButton url="/admin/reports-management?tab=booking" />
                  <h2 className="mainTitle mb-0">View Report</h2>
                </div>
              </div>
            </div>
          </div>
          <div className="dashCard">loading...</div>
        </div>
      </DashboardLayout>
    );
  }
  return (
    <DashboardLayout pageTitle="View Report">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 ">
            <div className="row my-4">
              <div className="col-12 d-flex">
                <BackButton url="/admin/reports-management?tab=booking" />
                <h2 className="mainTitle mb-0">View Report</h2>
              </div>
            </div>
            <div className="dashCard">
              <div className="row ">
                <div className="col-12">
                  <div className="d-flex flex-column flex-sm-row mb-2 gap-3">
                    <div className="flex-grow-1 ">
                      <div className="row">
                        <div className="order-2 order-md-1 col-md-8 col-lg-8">
                          <h2 className="fw-semibold fs-3 mb-4">
                            {reportDetails?.reportable?.service?.service_name}
                          </h2>
                          <div className="row">
                            <div className="col-lg-6 mb-3">
                              <h4 className="secondaryLabel">
                                Service Category:
                              </h4>
                              <p className="secondaryText wrapText mb-0">
                                {
                                  reportDetails?.reportable?.service?.category
                                    ?.category_title
                                }
                              </p>
                            </div>
                            <div className="col-lg-6 mb-3">
                              <h4 className="secondaryLabel">
                                Service charges:
                              </h4>
                              <p className="secondaryText wrapText mb-0">
                                $
                                {reportDetails?.reportable?.service
                                  ?.service_mode == "online"
                                  ? reportDetails?.reportable?.service
                                      ?.final_online_charges
                                  : reportDetails?.reportable?.service
                                      ?.final_onsite_charges}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="order-1 order-md-2 col-md-4 col-lg-4 mb-4 mb-md-0">
                          <div className="d-flex flex-column align-items-start align-items-md-end justify-content-end justify-content-sm-start gap-3">
                            <div>
                              <label className="fw-semibold">Status</label>
                              <span
                                className={`ms-3 fw-semibold ${
                                  statusClassMap[
                                    reportDetails?.status === "resolved"
                                      ? "approved"
                                      : reportDetails?.status
                                  ]
                                }`}
                              >
                                {reportDetails?.status.toUpperCase()}
                              </span>
                            </div>
                            {reportDetails?.status === "pending" ? (
                              <div>
                                <CustomButton
                                  onClick={handleStatusChange}
                                  variant="site-btn primary-btn"
                                  text="Mark As Resolved"
                                />
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-10 col-lg-8">
                      <h2 className="fw-semibold fs-3 mb-4 pt-3">
                        Booking Details
                      </h2>
                      <div className="row my-2">
                        {[
                          {
                            label: "Booking ID:",
                            value: reportDetails?.reportable?.booking_id,
                          },
                          {
                            label: "Booking Date:",
                            value:
                              reportDetails?.reportable?.bookingDetail
                                ?.booking_date,
                          },
                          {
                            label: "User Name:",
                            value:
                              reportDetails?.reportable?.user?.first_name +
                              " " +
                              reportDetails?.reportable?.user?.last_name,
                          },
                          {
                            label: "Email Address:",
                            value: reportDetails?.reportable?.user?.email,
                          },
                          {
                            label: "Phone No:",
                            value: reportDetails?.reportable?.user?.phone,
                          },
                          {
                            label: "Service Date:",
                            value: reportDetails.serviceDate,
                          },
                          {
                            label: "Service Time:",
                            value: reportDetails.serviceTime,
                          },
                        ].map(({ label, value }) => (
                          <div className="col-lg-6 mb-3" key={label}>
                            <h4 className="secondaryLabel">{label}</h4>
                            <p className="secondaryText wrapText mb-0">
                              {label === "Phone No:" && (
                                <span>{getCountryFlag(value)}</span>
                              )}{" "}
                              {value}
                            </p>
                          </div>
                        ))}
                      </div>
                      {reportDetails?.reportable?.bookingDetail?.address && (
                        <div className="mb-4">
                          <h4 className="secondaryLabel">Address</h4>
                          <p className="secondaryText mb-0">
                            {reportDetails?.reportable?.bookingDetail?.address}
                          </p>
                        </div>
                      )}
                      <div className="mb-4">
                        <h2 className="fw-semibold fs-3 mb-4 pt-3">
                          Report Details
                        </h2>
                        <div className="col-lg-6 mb-3">
                          <h4 className="secondaryLabel">Report Date:</h4>
                          <p className="secondaryText wrapText mb-0">
                            {reportDetails?.created_at}
                          </p>
                        </div>
                        <div className="mb-3">
                          <h4 className="secondaryLabel">Message:</h4>
                          <p className=" secondaryText mb-0">
                            {reportDetails?.reason}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row my-4">
              <div className="col-12 col-md-6">
                <div className="dashCard">
                  <div className="d-flex justify-content-between">
                    <h2
                      style={{ fontSize: 18 }}
                      className="secondaryTitle mb-0"
                    >
                      User Detail
                    </h2>
                    <Link
                      style={{ fontSize: 14 }}
                      to={`/admin/reports-management/user-management/${reportDetails?.user?.id}`}
                    >
                      View Details
                    </Link>
                  </div>
                  <div className="d-flex gap-3 mt-3 align-items-center">
                    <img
                      className="roundedBorders smallProfileImage"
                      src={reportDetails?.user?.photo}
                      alt="user photo"
                    />
                    <h4 style={{ fontSize: 18 }} className="mb-0">
                      {reportDetails?.user?.first_name +
                        " " +
                        reportDetails?.user?.last_name}
                    </h4>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="dashCard">
                  <div className="d-flex justify-content-between">
                    <h2
                      style={{ fontSize: 18 }}
                      className="secondaryTitle mb-0"
                    >
                      Service Provider Detail
                    </h2>
                    <Link
                      style={{ fontSize: 14 }}
                      to={`/admin/reports-management/service-provider-management/${reportDetails?.reportable?.service?.user?.id}`}
                    >
                      View Details
                    </Link>
                  </div>
                  <div className="d-flex gap-3 mt-3 align-items-center">
                    <img
                      className="roundedBorders smallProfileImage"
                      src={reportDetails?.reportable?.service?.user?.photo}
                      alt="service provider photo"
                    />
                    <h4 style={{ fontSize: 18 }} className="mb-0">
                      {reportDetails?.reportable?.service?.user?.first_name +
                        " " +
                        reportDetails?.reportable?.service?.user?.last_name}
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

export default withModal(ViewReport);
