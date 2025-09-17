import React, { useEffect, useState } from "react";
import { FaEdit, FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { DashboardLayout } from "../../../Components/Layouts/AdminLayout/DashboardLayout";
import CustomTable from "../../../Components/CustomTable";
import { Select } from "../../../Components/Common/FormElements/SelectInput";
import { bannerAdsManagementData } from "../../../Config/data";
import { bannerAdsManagementHeaders } from "../../../Config/TableHeaders";
import {
  enableDisableOptions,
  enableDisableStatus,
  statusOptions,
} from "../../../Config/TableStatus";
import withFilters from "../../../HOC/withFilters";
import withModal from "../../../HOC/withModal";
import { useFormStatus } from "../../../Hooks/useFormStatus";
import { dateFormat, serialNum } from "../../../Utils/helper";
import { getAll, post } from "../../../Services/Api";

const BannerAdsManagement = ({
  showModal,
  filters,
  setFilters,
  pagination,
  updatePagination,
}) => {
  const { isSubmitting, startSubmitting, stopSubmitting } = useFormStatus();
  const [bannerAds, setBannerAds] = useState([]);

  const fetchBannerAds = async () => {
    try {
      startSubmitting(true);
      const url = `/admin/banners`;
      const response = await getAll(url, filters);
      if (response.status) {
        const { total, per_page, current_page, to } = response.meta;
        setBannerAds(response?.data);
        updatePagination({
          showData: to,
          currentPage: current_page,
          totalRecords: total,
          totalPages: Math.ceil(total / per_page),
        });
      }
    } catch (error) {
      console.error("Error fetching Service Ctageories:", error);
    } finally {
      stopSubmitting(false);
    }
  };

  // Handle status change
  const handleStatusChange = (e, userId) => {
    const newStatusValue = e;
    console.log("userId", userId);

    // Open the modal for confirmation
    showModal(
      `${newStatusValue === "1" ? "Enable" : "Disable"} Banner`,
      `Are you sure you want to ${
        newStatusValue === "1" ? "Enable" : "Disable"
      } this Banner?`,
      () => onConfirmStatusChange(userId, newStatusValue)
    );
  };
  const onConfirmStatusChange = async (bannerId, newStatusValue) => {
    const response = await post(`/admin/banners/${bannerId}/status`);
    if (response.status) {
      fetchBannerAds();
      showModal(
        "Successful",
        `This Banner has been ${
          newStatusValue === "1" ? "Enabled" : "Disabled"
        } successfully!`,
        null,
        true
      );
    }
  };

  useEffect(() => {
    fetchBannerAds();
  }, [filters]);

  return (
    <DashboardLayout pageTitle="Banner Ads Management">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 ">
            <div className="my-4 d-flex flex-wrap gap-3 gap-md-0 align-items-center justify-content-between">
              <h2 className="mainTitle mb-0">Banner Ads Management</h2>
              <Link
                to={"add"}
                className="site-btn primary-btn text-decoration-none"
              >
                Add New Banner
              </Link>
            </div>
            <div className="dashCard">
              <div className="row mb-3">
                <div className="col-12">
                  <CustomTable
                    filters={filters}
                    setFilters={setFilters}
                    loading={isSubmitting}
                    headers={bannerAdsManagementHeaders}
                    pagination={pagination}
                    dateFilters={[
                      {
                        title: "Posted Date",
                        from: "from",
                        to: "to",
                      },
                      {
                        title: "Expiry Date",
                        from: "expiry_from",
                        to: "expiry_to",
                      },
                    ]}
                    selectOptions={[
                      {
                        title: "Status",
                        key: "status",
                        options: enableDisableStatus,
                      },
                    ]}
                  >
                    <tbody>
                      {bannerAds?.map((item, index) => (
                        <tr key={item?.id}>
                          <td>
                            {serialNum(
                              (filters.page - 1) * filters.per_page + index + 1
                            )}
                          </td>
                          <td>{item?.name}</td>
                          <td>{item?.email}</td>
                          <td>{dateFormat(item?.updated_at)}</td>
                          <td>{dateFormat(item?.created_at)}</td>
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
                              {enableDisableOptions}
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
                                aria-label="View"
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

export default withModal(withFilters(BannerAdsManagement));
