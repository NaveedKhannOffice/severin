import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { DashboardLayout } from "../../../Components/Layouts/AdminLayout/DashboardLayout";
import BackButton from "../../../Components/Common/BackButton";
import { bannerAdsManagementData } from "../../../Config/data";
import withModal from "../../../HOC/withModal";
import {
  dateFormat,
  isNullOrEmpty,
  statusClassMap,
} from "../../../Utils/helper";
import { enableDisableOptions } from "../../../Config/TableStatus";
import { Select } from "../../../Components/Common/FormElements/SelectInput";
import { getDetails, post } from "../../../Services/Api";

const BannerAdDetails = ({ showModal }) => {
  const { id } = useParams();
  const [bannerAdDetails, setBannerAdDetails] = useState({});
  const getBannerAdDetails = async () => {
    const response = await getDetails(`/admin/banners/${id}`);
    if (response.status) {
      setBannerAdDetails(response?.data);
    }
  };
  useEffect(() => {
    getBannerAdDetails();
  }, [id]);

  // Handle status change
  const handleStatusChange = (e) => {
    const newStatusValue = e;

    showModal(
      `${newStatusValue === "1" ? "Enable" : "Disable"} Banner Ads`,
      `Are you sure you want to ${
        newStatusValue === "1" ? "Enable" : "Disable"
      } this Banner?`,
      () => onConfirmStatusChange(newStatusValue)
    );
  };

  // Confirm status change and update the state
  const onConfirmStatusChange = async (newStatusValue) => {
    const response = await post(`/admin/banners/${id}/status`);
    if (response.status) {
      getBannerAdDetails();
      showModal(
        "Successful",
        `Banner has been ${newStatusValue === "1" ? "Enabled" : "Disabled"}!`,
        null,
        true
      );
    }
  };

  if (isNullOrEmpty(bannerAdDetails)) {
    return (
      <DashboardLayout pageTitle="Banner Ad Details">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 ">
              <div className="row my-4">
                <div className="col-12 d-flex">
                  <BackButton />
                  <h2 className="mainTitle mb-0">View Banner Ad Details</h2>
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
    <DashboardLayout pageTitle="Banner Ad Details">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 ">
            <div className="row my-4">
              <div className="col-12 d-flex">
                <BackButton />
                <h2 className="mainTitle mb-0">View Banner Ad Details</h2>
              </div>
            </div>
            <div className="dashCard mb-5">
              <div className="row ">
                <div className="col-12">
                  <div className="d-flex flex-column flex-sm-row mb-2 gap-3">
                    <div className="flex-grow-1 ">
                      <div className="row mb-2">
                        <div className="order-2 order-md-1 col-md-9">
                          <div className="row">
                            <div className="col-md-6 col-lg-4 mb-4">
                              <h4 className="secondaryLabel">
                                Full Name of Brand::
                              </h4>
                              <p className="secondaryText wrapText mb-0">
                                {bannerAdDetails?.name}
                              </p>
                            </div>
                            <div className="col-md-6 col-lg-4 mb-4">
                              <h4 className="secondaryLabel">
                                Email Of Brand:
                              </h4>
                              <p className="secondaryText wrapText mb-0">
                                {bannerAdDetails?.email}
                              </p>
                            </div>
                            <div className="col-md-6 col-lg-4 mb-4">
                              <h4 className="secondaryLabel">Brand URL:</h4>
                              <p className="secondaryText wrapText mb-0">
                                {bannerAdDetails?.url}
                              </p>
                            </div>
                            <div className="col-md-6 col-lg-4 mb-4">
                              <h4 className="secondaryLabel">Published On:</h4>
                              <p className="secondaryText wrapText mb-0">
                                {dateFormat(bannerAdDetails?.created_at)}
                              </p>
                            </div>
                            <div className="col-md-6 col-lg-4 mb-4">
                              <h4 className="secondaryLabel">Expiry Date:</h4>
                              <p className="secondaryText wrapText mb-0">
                                {dateFormat(bannerAdDetails?.expiry_date)}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="order-1 order-md-2 col-md-3 mb-4 mb-md-0">
                          <div className="d-flex flex-column align-items-start align-items-md-end justify-content-end justify-content-sm-start gap-3">
                            <div>
                              <label className="fw-semibold">Status</label>
                              <Select
                                className={`tabel-select status${bannerAdDetails?.status}`}
                                required
                                id={`status${bannerAdDetails?.id}`}
                                name="status"
                                value={bannerAdDetails?.status}
                                onChange={(e) =>
                                  handleStatusChange(e, bannerAdDetails?.id)
                                }
                                isInputNeeded={false}
                              >
                                {enableDisableOptions}
                              </Select>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {bannerAdDetails?.image && (
                    <>
                      <h4 className="secondaryLabel">Banner Image:</h4>
                      <img
                        className="containedImg roundedBorders"
                        src={bannerAdDetails?.image?.media_path}
                      />
                    </>
                  )}

                  <div className="mt-5 mb-2 d-flex gap-3">
                    <Link
                      style={{ minWidth: 190 }}
                      className="site-btn primary-btn text-decoration-none"
                      to={`edit`}
                    >
                      Edit
                    </Link>
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

export default withModal(BannerAdDetails);
