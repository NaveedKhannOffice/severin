import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import CustomTable from "../../../Components/CustomTable";
import { DashboardLayout } from "../../../Components/Layouts/AdminLayout/DashboardLayout";
import { referLogsData as referLogsDataMock } from "../../../Config/data";
import withFilters from "../../../HOC/withFilters";
import withModal from "../../../HOC/withModal";
import { useFormStatus } from "../../../Hooks/useFormStatus";
import { dateFormat, serialNum } from "../../../Utils/helper";
import BackButton from "../../../Components/Common/BackButton";
import { referLogsTableHeaders } from "../../../Config/TableHeaders";
import { getAll } from "../../../Services/Api";

const ReferLogs = ({ filters, setFilters, pagination, updatePagination }) => {
  const { isSubmitting } = useFormStatus();
  const [referLogsData, setReferLogsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchReferLogsData = async () => {
    setIsLoading(true);
    try {
      const response = await getAll("/admin/refer-logs", filters);

      // For testing with mock data (comment out in production)
      // const response = {
      //    status: true,
      //    data: referLogsDataMock.slice(
      //       (filters.page - 1) * filters.per_page,
      //       filters.page * filters.per_page
      //    ),
      //    total: referLogsDataMock.length,
      //    per_page: filters.per_page,
      //    current_page: filters.page,
      //    from: (filters.page - 1) * filters.per_page + 1,
      //    to: Math.min(filters.page * filters.per_page, referLogsDataMock.length)
      // };

      if (response.status) {
        const { total, per_page, current_page, from, to } = response;
        setReferLogsData(response?.data || []);

        updatePagination({
          showData: `${from} to ${to}`,
          currentPage: current_page,
          totalRecords: total,
          totalPages: Math.ceil(total / per_page),
          perPage: per_page,
        });
      }
    } catch (error) {
      console.error("Error fetching refer logs data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePerPageChange = (value) => {
    setFilters((prev) => ({
      ...prev,
      per_page: parseInt(value),
      page: 1, // Reset to first page when changing items per page
    }));
  };

  useEffect(() => {
    fetchReferLogsData();
  }, [filters]);

  return (
    <DashboardLayout pageTitle="Refer Logs">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="my-4 d-flex">
              <BackButton />
              <h2 className="mainTitle mb-0">Refer Logs</h2>
            </div>

            <div className="dashCard">
              <div className="row mb-3">
                <div className="col-12">
                  <CustomTable
                    filters={filters}
                    setFilters={setFilters}
                    showFilter={false}
                    loading={isLoading || isSubmitting}
                    headers={referLogsTableHeaders}
                    pagination={pagination}
                    onPerPageChange={handlePerPageChange}
                    perPageOptions={[10, 25, 50, 100]} // Customize as needed
                  >
                    <tbody>
                      {referLogsData.length > 0 ? (
                        referLogsData.map((item, index) => (
                          <tr key={item?.id || index}>
                            <td>
                              {serialNum(
                                (filters.page - 1) * filters.per_page +
                                  index +
                                  1
                              )}
                            </td>
                            <td>
                              {item?.first_name} {item?.last_name}
                            </td>
                            <td>{item?.total_signup}</td>
                            {/* Uncomment if you need view action
                                          <td>
                                             <div className="d-flex cp gap-3 tableAction align-items-center justify-content-center">
                                                <span className="tooltip-toggle" aria-label="View">
                                                   <Link to={`/admin/user-management/${item.id}`}>
                                                      <FaEye size={20} color="#1819ff" />
                                                   </Link>
                                                </span>
                                             </div>
                                          </td>
                                          */}
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan={referLogsTableHeaders.length}
                            className="text-center"
                          >
                            {isLoading ? "Loading..." : "No data found"}
                          </td>
                        </tr>
                      )}
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

export default withModal(withFilters(ReferLogs));
