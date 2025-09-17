import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { DashboardLayout } from "../../../Components/Layouts/AdminLayout/DashboardLayout";
import CustomButton from "../../../Components/Common/CustomButton";
import CustomTable from "../../../Components/CustomTable";
import { subscriptionLogsData } from "../../../Config/data";
import { subscriptionLogHeaders } from "../../../Config/TableHeaders";
import {
  subcriptionStatus,
  subscriptionType,
} from "../../../Config/TableStatus";
import withFilters from "../../../HOC/withFilters";
import withModal from "../../../HOC/withModal";
import { useFormStatus } from "../../../Hooks/useFormStatus";
import { dateFormat, serialNum } from "../../../Utils/helper";
import { getAll } from "../../../Services/Api";

const SubscriptionLogs = ({
  filters,
  setFilters,
  pagination,
  updatePagination,
}) => {
  const { isSubmitting, startSubmitting, stopSubmitting } = useFormStatus();
  const [subscriptionLogs, setSubscriptionLogs] = useState(
    subscriptionLogsData.detail.data
  );
  const [tabWidth, setTabWidth] = useState(160);
  const [activeTab, setActiveTab] = useState("provider");
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const handleResize = () => {
      setTabWidth(window.innerWidth < 768 ? 160 : 190);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const fetchSubscriptionLogs = async () => {
    try {
      let url;
      if (activeTab === "user") {
        url = `/admin/subscription-logs/user`;
      } else {
        url = `/admin/subscription-logs/provider`;
      }
      const response = await getAll(url, filters);
      if (response.status) {
        const { total, per_page, current_page, to } = response.meta;
        setSubscriptionLogs(response?.data);
        updatePagination({
          showData: to,
          currentPage: current_page,
          totalRecords: total,
          totalPages: Math.ceil(total / per_page),
        });
      }
    } catch (error) {
      console.error("Error fetching subscription:", error);
    }
  };
  useEffect(() => {
    fetchSubscriptionLogs();
  }, []);
  useEffect(() => {
    fetchSubscriptionLogs();
  }, [filters, activeTab]);

  return (
    <DashboardLayout pageTitle="Subscription Logs">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 ">
            <div className="my-4 d-flex flex-wrap gap-3 gap-md-0 align-items-center justify-content-between">
              <h2 className="mainTitle mb-0">Subscription Logs</h2>
              <Link
                to={`${activeTab}/management`}
                className="site-btn primary-btn text-decoration-none"
              >
                Manage Subscription Plan
              </Link>
            </div>
            <div className="mt-5 d-flex justify-content-center mb-4">
              <CustomButton
                className={`site-btn tab-btn ${
                  activeTab === "provider" && "tab-selected"
                } text-decoratio-none leftBordersRounded`}
                text="Service Provider"
                onClick={() => setActiveTab("provider")}
              />
              <CustomButton
                style={{ minWidth: tabWidth }}
                className={`site-btn tab-btn ${
                  activeTab === "user" && "tab-selected"
                } text-decoration-none rightBordersRounded `}
                text="User"
                onClick={() => setActiveTab("user")}
              />
            </div>
            <div className="dashCard">
              <div className="row mb-3">
                <div className="col-12">
                  <CustomTable
                    filters={filters}
                    setFilters={setFilters}
                    loading={isSubmitting}
                    headers={subscriptionLogHeaders}
                    pagination={pagination}
                    dateFilters={[
                      {
                        title: "Purchase Date",
                        from: "from",
                        to: "to",
                      },
                      {
                        title: "Expiry Date",
                        from: "from",
                        to: "to",
                      },
                    ]}
                    selectOptions={[
                      {
                        title: "Status",
                        key: "status",
                        options: subcriptionStatus,
                      },
                      // {
                      //   title: "Plane Name",
                      //   options: subscriptionType,
                      // },
                    ]}
                  >
                    <tbody>
                      {subscriptionLogs.map((item, index) => (
                        <tr key={item?.id}>
                          <td>
                            {serialNum(
                              (filters.page - 1) * filters.per_page + index + 1
                            )}
                          </td>
                          <td>
                            {item?.user?.first_name +
                              " " +
                              item?.user?.last_name}
                          </td>
                          <td>{item?.user?.email}</td>
                          <td>{item?.subscription_plan?.title}</td>
                          <td
                            className={`${
                              item?.is_active ? "text-success" : "text-danger"
                            }`}
                          >
                            {item?.is_active ? "Active" : "Expired"}
                          </td>
                          <td>{item?.price_paid}</td>
                          <td>{dateFormat(item?.subscribed_on)}</td>
                          <td>{dateFormat(item?.expired_on)}</td>
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

export default withModal(withFilters(SubscriptionLogs));
