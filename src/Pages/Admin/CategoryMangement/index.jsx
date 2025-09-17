import { useState, useEffect } from "react";
import { DashboardLayout } from "../../../Components/Layouts/AdminLayout/DashboardLayout";
import CustomTable from "../../../Components/CustomTable";
import {
  dateFormat,
  getStatus,
  serialNum,
  usePageTitle,
} from "../../../Utils/helper";
import { categoryHeader } from "../../../Config/TableHeaders"; // Table Headers
import { normalStatus } from "../../../Config/TableStatus"; // Filter Status
import { getAll, post } from "../../../Services/Api"; //Api Service
import TableDropdown from "../../../Components/TableDropdown";
import { useFormStatus } from "../../../Hooks/useFormStatus";
import withFilters from "../../../HOC/withFilters ";
import withModal from "../../../HOC/withModal";
import { categoryManagementData } from "../../../Config/data";
import CustomButtonLink from "../../../Components/Common/CustomButtonLink";

const CategoryManagement = ({
  showModal,
  filters,
  setFilters,
  pagination,
  updatePagination,
}) => {
  const [category, setCategoryData] = useState([]);
  const { isSubmitting, startSubmitting, stopSubmitting } = useFormStatus();
  const fetchUsers = async () => {
    try {
      startSubmitting(true);
      // const url = `/admin-api/users`;
      // const response = await getAll(url, filters);
      const response = categoryManagementData;
      if (response.status) {
        const { data, total, per_page, current_page, to } = response.detail;
        setCategoryData(data);
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

  const confirmPopup = (id, status) => {
    showModal(
      `${status === "Active" ? "Inactive" : "Active"} category`,
      `Are you sure you want to ${
        status === "Active" ? "Inactivate" : "Activate"
      } this category?`,
      () => onConfirm(id, status)
    );
  };

  const onConfirm = async (id, status) => {
    // try {
    //   const response = await post(`/admin-api/users/${id}`);
    //   if (response.status) {
    //     await fetchUsers();
    showModal(
      ` ${status === "Active" ? "inactivated" : "activated"} category`,
      `category ${
        status === "Active" ? "inactivated" : "activated"
      } successfully`, //heading
      null, //action
      true //sucess
    );
  };
  //   } catch (error) {
  //     console.error("Error updating category status:", error);
  //   }
  // };

  useEffect(() => {
    fetchUsers();
  }, [filters]);

  return (
    <DashboardLayout pageTitle="category Management">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="row my-4">
              <div className="col-12">
                <div className="d-flex gap-3 justify-content-between flex-wrap ">
                  <h2 className="mainTitle mb-0 flex-grow-1">
                    Category Management
                  </h2>
                  <CustomButtonLink
                    linkPath="/admin/category-management/add"
                    className="flex-shrink-0 site-btn primary-btn text-capitalize"
                    text="add category"
                  />
                </div>
              </div>
            </div>
            <div className="dashCard">
              <div className="row mb-3">
                <div className="col-12">
                  <CustomTable
                    filters={filters}
                    setFilters={setFilters}
                    loading={isSubmitting}
                    headers={categoryHeader}
                    pagination={pagination}
                    // if you want multiple date filters
                    dateFilters={[
                      {
                        title: "Creation Date",
                        from: "from",
                        to: "to",
                      },
                    ]}
                    selectOptions={[
                      {
                        title: "Status",
                        options: normalStatus,
                      },
                    ]}
                  >
                    <tbody>
                      {category?.map((item, index) => (
                        <tr key={item?.id}>
                          <td>
                            {serialNum(
                              (filters.page - 1) * filters.per_page + index + 1
                            )}
                          </td>
                          <td>{item?.category_name}</td>
                          <td>{dateFormat(item?.created_at)}</td>
                          <td
                            className={getStatus(item?.status_detail).className}
                          >
                            {getStatus(item?.status_detail).text}
                          </td>
                          <td>
                            <TableDropdown
                              view
                              itemId={item?.id}
                              linkPath="/admin/category-management"
                              handleStatusChange={confirmPopup}
                              statusDetail={item?.status_detail}
                            />
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

//Additional Filters
const additionalFilters = {
  type: "",
  expiryfrom: "",
  expiryto: "",
};

export default withModal(withFilters(CategoryManagement, additionalFilters));
// Bind with HOC
// withModal is for Pop Up
// withFilters is for Pagination and default filters
// withPagination, if you want only pagination not filters
// additionalFilters, if you want extra filters on specific pages
