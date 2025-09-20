import { useEffect, useState } from "react";
import { FaEdit, FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { DashboardLayout } from "../../../Components/Layouts/AdminLayout/DashboardLayout";
import CustomTable from "../../../Components/Common/CustomTable";
import  SelectInput  from "../../../Components/Common/FormElements/SelectInput";
import { productCategoryManagementData } from "../../../Config/data";
import { productCategoryManagementHeaders } from "../../../Config/TableHeaders";
import { normalStatus, statusOptions } from "../../../Config/TableStatus";
import withFilters from "../../../HOC/withFilters";
import withModal from "../../../HOC/withModal";
import { useFormStatus } from "../../../Hooks/useFormStatus";
import { dateFormat, serialNum } from "../../../Utils/helper";
import { getAll, post } from "../../../Services/Api";

const ProductsManagement = ({
  filters,
  setFilters,
  pagination,
  updatePagination,
  showModal,
}) => {
  const [productCategory, setProductCategory] = useState([]);
  const { isSubmitting, startSubmitting, stopSubmitting } = useFormStatus();

  const fetchProductCategory = async () => {
    try {
      startSubmitting(true);
      const url = `/admin/categories/product`;
      const response = await getAll(url, filters);
      if (response.status) {
        const { total, per_page, current_page, to } = response.meta;
        setProductCategory(response.data);
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

  // Handle status change
  const handleStatusChange = (e, userId) => {
    const newStatusValue = e;
    // Open the modal for confirmation
    showModal(
      `Mark as ${newStatusValue === "1" ? "Active" : "Inactive"}`,
      `Are you sure you want to change this Category status to ${
        newStatusValue === "1" ? "Active" : "Inactive"
      }?`,
      () => onConfirmStatusChange(userId, newStatusValue)
    );
  };

  // Confirm status change and update the state
  const onConfirmStatusChange = async (userId, newStatusValue) => {
    // Update the status in the productCategory state
    const response = await post(`/admin/categories/${userId}/status`);
    if (response.status) {
      fetchProductCategory();
      showModal(
        "Successful",
        `Category status has been changed to ${
          newStatusValue === "1" ? "Active" : "Inactive"
        } successfully.`,
        null,
        true
      );
    }
  };

  useEffect(() => {
    fetchProductCategory();
  }, [filters]);

  return (
    <DashboardLayout pageTitle="Product Category Management">
      <div className="container-fluid">
        <>
          <div className="my-4 d-flex flex-wrap gap-3 gap-md-0 align-items-center justify-content-between">
            <h2 className="mainTitle mb-0">Product Management</h2>
            <Link
              to={"/admin/products-management/add-product"}
              className="btn btn-primary text-decoration-none"
            >
              add Product
            </Link>
          </div>
          <div className="dashCard">
            <div className="row mb-3">
              <div className="col-12">
                <CustomTable
                  filters={filters}
                  setFilters={setFilters}
                  loading={isSubmitting}
                  headers={productCategoryManagementHeaders}
                  pagination={pagination}
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
                      key: "status",
                      options: normalStatus,
                    },
                  ]}
                >
                  <tbody>
                    {productCategory?.map((item, index) => (
                      <tr key={item?.id}>
                        <td>
                          {serialNum(
                            (filters.page - 1) * filters.per_page + index + 1
                          )}
                        </td>
                        <td>{item?.category_title}</td>
                        <td>{dateFormat(item?.created_at)}</td>
                        <td>{item?.total_products}</td>
                        <td>
                          <SelectInput
                            className={`tabel-select status${item?.status}`}
                            required
                            id={`status${item?.id}`}
                            name="status"
                            value={item?.status}
                            onChange={(e) => handleStatusChange(e, item?.id)}
                            isInputNeeded={false}
                          >
                            {statusOptions}
                          </SelectInput>
                        </td>
                        <td>
                          <div className="d-flex cp gap-3 tableAction align-items-center justify-content-center">
                            <span className="tooltip-toggle" aria-label="View">
                              <Link to={`${item.id}`}>
                                <FaEye size={20} color="#1819ff" />
                              </Link>
                            </span>
                            <span className="tooltip-toggle" aria-label="Edit">
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
        </>
      </div>
    </DashboardLayout>
  );
};

export default withModal(withFilters(ProductsManagement));
