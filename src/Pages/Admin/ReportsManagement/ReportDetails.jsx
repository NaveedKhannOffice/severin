import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { DashboardLayout } from "../../../Components/Layouts/AdminLayout/DashboardLayout";
import BackButton from "../../../Components/Common/BackButton";
import CustomButton from "../../../Components/Common/CustomButton";
import { reportsManagementNewsfeedData } from "../../../Config/data";
import withModal from "../../../HOC/withModal";
import {
  getCountryFlag,
  isNullOrEmpty,
  statusClassMap,
} from "../../../Utils/helper";
import { getDetails, post } from "../../../Services/Api";

const ReportDetails = ({ showModal }) => {
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
  const onConfirmStatusChange = async () => {
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
      <DashboardLayout pageTitle="Report Details">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 ">
              <div className="row my-4">
                <div className="col-12 d-flex">
                  <BackButton />
                  <h2 className="mainTitle mb-0">Report Details</h2>
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
    <DashboardLayout pageTitle="Report Details">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 ">
            <div className="row my-4">
              <div className="col-12 d-flex">
                <BackButton url="/admin/reports-management?tab=newsfeed" />
                <h2 className="mainTitle mb-0">Report Details</h2>
              </div>
            </div>
            <div className="dashCard">
              <div className="row ">
                <div className="col-12">
                  <div className="d-flex flex-column flex-sm-row mb-2 gap-3">
                    <div className="flex-grow-1 ">
                      <div className="row">
                        <div className="order-2 order-md-1 col-md-9">
                          <h2 className="fw-semibold fs-3 mb-4">
                            User Details
                          </h2>
                          <div className="row">
                            <div className="col-md-6 col-lg-4 mb-3">
                              <h4 className="secondaryLabel">User Name:</h4>
                              <p className="secondaryText wrapText mb-0">
                                {reportDetails?.user?.first_name +
                                  " " +
                                  reportDetails?.user?.last_name}
                              </p>
                            </div>
                            <div className="col-md-6 col-lg-4 mb-3">
                              <h4 className="secondaryLabel">Email Address:</h4>
                              <p className="secondaryText wrapText mb-0">
                                {reportDetails?.user?.email}
                              </p>
                            </div>
                            <div className="col-md-6 col-lg-4 mb-3">
                              <h4 className="secondaryLabel">Phone No:</h4>
                              <p className="secondaryText wrapText mb-0">
                                <span>
                                  {getCountryFlag(reportDetails?.user?.phone)}
                                </span>
                                {reportDetails?.user?.phone}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="order-1 order-md-2 col-md-3 mb-4 mb-md-0">
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
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-10 col-lg-8">
                      <div className="mb-4">
                        <h2 className="fw-semibold fs-3 mb-4 pt-3">Report</h2>
                        <div className="mb-3">
                          <h4 className="secondaryLabel">Reason:</h4>
                          <p className=" secondaryText mb-0">
                            {reportDetails.reason}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {reportDetails?.status === "pending" && (
                    <div className="mt-4 mb-5 d-flex gap-3">
                      <Link
                        className="site-btn primary-btn text-decoration-none"
                        to={`/admin/reports-management/report/${reportDetails?.reportable?.id}/post`}
                      >
                        View Post
                      </Link>
                      <CustomButton
                        className="site-btn secondary-btn"
                        onClick={handleStatusChange}
                      >
                        Mark as Resolved
                      </CustomButton>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default withModal(ReportDetails);
