import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { DashboardLayout } from "../../../Components/Layouts/AdminLayout/DashboardLayout";
import BackButton from "../../../Components/Common/BackButton";
import CustomTable from "../../../Components/CustomTable";
import { serviceProvidersRequestsData } from "../../../Config/data";
import { serviceProvidersRequestHeaders } from "../../../Config/TableHeaders";
import { serviceProvidersRequestsStatus } from "../../../Config/TableStatus";
import withFilters from "../../../HOC/withFilters";
import { useFormStatus } from "../../../Hooks/useFormStatus";
import { dateFormat, serialNum, statusClassMap } from "../../../Utils/helper";
import { getAll } from "../../../Services/Api";

const ServiceProviderRequests = ({
  filters,
  setFilters,
  pagination,
  updatePagination,
}) => {
  const { isSubmitting, startSubmitting, stopSubmitting } = useFormStatus();
  const [serviceProvidersRequests, setServiceProvidersRequests] = useState(
    serviceProvidersRequestsData.detail.data
  );

  const fetchServiceProvidersRequets = async () => {
    try {
      startSubmitting(true);
      const url = `/admin/providers/pending`;
      const response = await getAll(url, filters);
      if (response.status) {
        const { total, per_page, current_page, to } = response.meta;
        setServiceProvidersRequests(response.data);
        updatePagination({
          showData: to,
          currentPage: current_page,
          totalRecords: total,
          totalPages: Math.ceil(total / per_page),
        });
      }
    } catch (error) {
      console.error("Error fetching requests:", error);
    } finally {
      stopSubmitting(false);
    }
  };

  useEffect(() => {
    fetchServiceProvidersRequets();
  }, [filters]);

  return (
    <DashboardLayout pageTitle="Service Provider's Requests">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 ">
            <div className="d-flex my-4">
              <BackButton />
              <h2 className="mainTitle mb-0">Service Provider's Requests</h2>
            </div>
            <div className="dashCard">
              <div className="row mb-3">
                <div className="col-12">
                  <CustomTable
                    filters={filters}
                    setFilters={setFilters}
                    loading={isSubmitting}
                    headers={serviceProvidersRequestHeaders}
                    pagination={pagination}
                    dateFilters={[
                      {
                        title: "Requested Date",
                        from: "from",
                        to: "to",
                      },
                    ]}
                    selectOptions={[
                      {
                        title: "Status",
                        key: "status",
                        options: serviceProvidersRequestsStatus,
                      },
                    ]}
                  >
                    <tbody>
                      {serviceProvidersRequests?.map((item, index) => (
                        <tr key={item?.id}>
                          <td>
                            {serialNum(
                              (filters.page - 1) * filters.per_page + index + 1
                            )}
                          </td>
                          <td>{item?.first_name + " " + item?.last_name}</td>
                          <td>{dateFormat(item?.created_at)}</td>
                          <td className={statusClassMap[item?.requets_status]}>
                            {item?.requets_status}
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

export default withFilters(ServiceProviderRequests);
