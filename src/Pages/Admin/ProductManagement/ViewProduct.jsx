import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { DashboardLayout } from "../../../Components/Layouts/AdminLayout/DashboardLayout";
import BackButton from "../../../Components/Common/BackButton";
// import { getDetails } from "../../../Services/Api";
import { FaEdit, FaEye } from "react-icons/fa";
import CustomTable from "../../../Components/Common/CustomTable";
import  SelectInput  from "../../../Components/Common/FormElements/SelectInput";
import { productCategoryManagementData } from "../../../Config/data";
import { ProductsCategoryDetailHeader } from "../../../Config/TableHeaders";
import { normalStatus, statusOptions } from "../../../Config/TableStatus";
import withFilters from "../../../HOC/withFilters";
import withModal from "../../../HOC/withModal";
import { useFormStatus } from "../../../Hooks/useFormStatus";
import { dateFormat, serialNum, statusClassMap } from "../../../Utils/helper";
import { getAll, getDetails, post } from "../../../Services/Api";

const ViewProduct = ({
  showModal,
  filters,
  setFilters,
  pagination,
  updatePagination,
}) => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [products, setProducts] = useState([]);

  const { isSubmitting, startSubmitting, stopSubmitting } = useFormStatus();

  const fetchProductDetailTableData = async () => {
    try {
      startSubmitting(true);
      const url = `/admin/categories/${id}/products`;
      const response = await getAll(url, filters);
      if (response.status) {
        console.log("api res", response?.data);

        const { total, per_page, current_page, to } = response.meta;
        setProducts(response.data);
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
  const getProductCategoryDetail = async () => {
    const response = await getDetails(`/admin/categories/${id}`);
    if (response) {
      setData(response?.data);
    }
  };
  useEffect(() => {
    getProductCategoryDetail();
  }, [id]);
  useEffect(() => {
    fetchProductDetailTableData();
  }, [filters]);

  // Handle status change
  const handleStatusChange = (e, userId) => {
    const newStatusValue = e;
    // Open the modal for confirmation
    showModal(
      `${newStatusValue === "1" ? "Active" : "Inactive"} Category`,
      `Are you sure you want to change this Category to ${
        newStatusValue === "1" ? "Active" : "Inactive"
      }?`,
      () => onConfirmStatusChange(userId, newStatusValue)
    );
  };
  // Confirm status change and update the state
  const onConfirmStatusChange = async (userId, newStatusValue) => {
    // Update the status in the appointmentLogs state
    setData({ ...data, status: newStatusValue });
    showModal(
      "Successful",
      `Category status has been changed to ${
        newStatusValue === "1" ? "Active" : "Inactive"
      } successfully.`,
      null,
      true
    );
  };
  // Handle status change
  const handleStatusChangeTwo = (e, userId) => {
    const newStatusValue = e;
    // Open the modal for confirmation
    showModal(
      `Mark as ${newStatusValue === "1" ? "Active" : "Inactive"}`,
      `Are you sure you want to change this product status to ${
        newStatusValue === "1" ? "Active" : "Inactive"
      }?`,
      () => onConfirmStatusChangeTwo(userId, newStatusValue)
    );
  };

  // Confirm status change and update the state
  const onConfirmStatusChangeTwo = async (userId, newStatusValue) => {
    const response = await post(`/admin/categories/${id}/status`);
    if (response.status) {
      getProductCategoryDetail();
      showModal(
        "Successful",
        `Product status has been changed to ${
          newStatusValue === "1" ? "Active" : "Inactive"
        } successfully.`,
        null,
        true
      );
    }
  };
  const { category_title } = data;
  return (
    <DashboardLayout pageTitle="Product Category Detail">
      <div className="row my-3">
        <div className="col-12 ">
          <div className="d-flex justify-content-between align-items-center my-3 my-md-0 flex-wrap">
            <div className="flex-grow-1 d-flex my-3">
              <BackButton />
              <h2 className="mainTitle mb-0">View Product Category Detail</h2>
            </div>
            <div className="flex-shrink-0 ms-sm-0 ms-2">
              <Link to={`edit`} className="site-btn primary-btn">
                Edit category
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="dashCard ">
        <div className="row ">
          <div className="col-12">
            <div className="profile-status d-flex justify-content-between flex-wrap gap-3">
              <div>
                <h4 className="secondaryLabel">category title</h4>
                <p className="secondaryText wrapText mb-0">{category_title}</p>
              </div>
              <div className="status-action">
                <SelectInput
                  className={`tabel-select status${data?.status}`}
                  id={`status${data?.id}`}
                  name="status"
                  label="Status:"
                  value={data?.status}
                  onChange={(e) => handleStatusChange(e, data?.id)}
                  isInputNeeded={false}
                >
                  {statusOptions}
                </SelectInput>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="dashCard mt-4">
        <div className="row mb-3">
          <div className="col-12">
            <h2 className="mainTitle">Products</h2>
          </div>
          <div className="col-12">
            <CustomTable
              filters={filters}
              setFilters={setFilters}
              loading={isSubmitting}
              headers={ProductsCategoryDetailHeader}
              pagination={pagination}
              // if you want multiple date filters
              dateFilters={[
                {
                  title: "date",
                  from: "from",
                  to: "to",
                },
              ]}
              selectOptions={[
                {
                  title: "status",
                  key: "status",
                  options: normalStatus,
                },
              ]}
            >
              <tbody>
                {products?.map((item, index) => (
                  <tr key={item?.id}>
                    <td>
                      {serialNum(
                        (filters.page - 1) * filters.per_page + index + 1
                      )}
                    </td>
                    <td>{item?.shop?.name}</td>
                    <td>{item?.title}</td>
                    <td>{dateFormat(item?.created_at)}</td>
                    <td>
                      <Select
                        className={`tabel-select status${item?.status}`}
                        required
                        id={`status${item?.id}`}
                        name="status"
                        value={item?.status}
                        onChange={(e) => handleStatusChangeTwo(e, item?.id)}
                        isInputNeeded={false}
                      >
                        {statusOptions}
                      </Select>
                    </td>
                    <td>
                      <div className="d-flex cp gap-3 tableAction align-items-center justify-content-center">
                        <span className="tooltip-toggle" aria-label="View">
                          <Link
                            to={`/admin/product-category-management/products/${item.id}`}
                          >
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
    </DashboardLayout>
  );
};
export default withModal(withFilters(ViewProduct));
