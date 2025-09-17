import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { DashboardLayout } from "../../../Components/Layouts/AdminLayout/DashboardLayout";
import CustomTable from "../../../Components/CustomTable";
import { queriesManagementData } from "../../../Config/data";
import { queriesManagementHeader } from "../../../Config/TableHeaders";
import { queriesType } from "../../../Config/TableStatus";
import withFilters from "../../../HOC/withFilters";
import { useFormStatus } from "../../../Hooks/useFormStatus";
import { dateFormat, serialNum } from "../../../Utils/helper";
import { getAll } from "../../../Services/Api";

const QueriesManagement = ({ filters, setFilters, pagination, updatePagination }) => {
  const [queryData, setQueryData] = useState([]);
  const { isSubmitting, startSubmitting, stopSubmitting } = useFormStatus();

  const fetchUsers = async () => {
    try {
      startSubmitting(true);
      const url = `/admin/feedbacks`;
      const response = await getAll(url, filters);
      if (response.status) {
        const { total, per_page, current_page, to } = response.meta;
        setQueryData(response?.data);
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
    fetchUsers();
  }, [filters]);

  return (
    <DashboardLayout pageTitle="Queries Management">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="row my-4">
              <div className="col-12">
                <h2 className="mainTitle mb-0">Queries Management</h2>
              </div>
            </div>
            <div className="dashCard">
              <div className="row mb-3">
                <div className="col-12">
                  <CustomTable
                    filters={filters}
                    setFilters={setFilters}
                    loading={isSubmitting}
                    headers={queriesManagementHeader}
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
                        title: "user type",
                        key: "type",
                        options: queriesType
                      }
                    ]}
                  >
                    <tbody>
                      {queryData?.map((item, index) => (
                        <tr key={item?.id}>
                          <td>{serialNum((filters.page - 1) * filters.per_page + index + 1)}</td>
                          <td>{item?.name}</td>
                          <td>{item?.email}</td>
                          <td>
                            {item?.user?.type === "user"
                              ? "User"
                              : item?.user?.type === "service_provider"
                                ? "Service Provider"
                                : "Guest"}
                          </td>
                          <td>{dateFormat(item?.created_at)}</td>
                          <td>
                            <div className="d-flex cp gap-3 tableAction align-items-center justify-content-center">
                              <span className="tooltip-toggle" aria-label="View">
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


export default withFilters(QueriesManagement);
