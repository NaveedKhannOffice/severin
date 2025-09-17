import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { DashboardLayout } from "../../../Components/Layouts/AdminLayout/DashboardLayout";
import BackButton from "../../../Components/Common/BackButton";
import CustomTable from "../../../Components/CustomTable";
import { Select } from "../../../Components/Common/FormElements/SelectInput";
import { shopDetailsData } from "../../../Config/data";
import { shopProductsHeaders } from "../../../Config/TableHeaders";
import {
  categoryStatus,
  normalStatus,
  statusOptions,
} from "../../../Config/TableStatus";
import withFilters from "../../../HOC/withFilters";
import withModal from "../../../HOC/withModal";
import { useFormStatus } from "../../../Hooks/useFormStatus";
import { dateFormat, serialNum } from "../../../Utils/helper";
import { getAll, post } from "../../../Services/Api";

const ShopDetails = ({
  showModal,
  filters,
  setFilters,
  pagination,
  updatePagination,
}) => {
  const { id } = useParams();
  const [shopDetails, setShopDetails] = useState({});
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const { isSubmitting, startSubmitting, stopSubmitting } = useFormStatus();

  const fetchShopProducts = async () => {
    try {
      startSubmitting(true);
      const url = `/admin/providers/${id}/shop`;
      const response = await getAll(url, filters);
      if (response.status) {
        setShopDetails(response?.data?.shop);
        const { total, per_page, current_page, to } =
          response.data.products.meta;
        setProducts(response.data.products.data);

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
    fetchShopProducts();
  }, [filters]);
  const getCategoriesDetails = async () => {
    const url = `/admin/categories/product`;
    const response = await getAll(url);
    if (response.status) {
      const formatted = [
        { value: "", text: "Select" },
        ...response.data.map((item) => ({
          value: String(item.id),
          text: item.category_title,
        })),
      ];
      setCategories(formatted);
    }
  };
  useEffect(() => {
    getCategoriesDetails();
  }, []);

  // Handle status change
  const handleStatusChange = (e, id) => {
    const newStatusValue = e;
    // Open the modal for confirmation
    showModal(
      `${newStatusValue === "1" ? "Active" : "Inactive"} Product`,
      `Are you sure you want to ${
        newStatusValue === "1" ? "Activate" : "Inactivate"
      } this Product?`,
      () => onConfirmStatusChange(id, newStatusValue)
    );
  };

  // Confirm status change and update the state
  const onConfirmStatusChange = async (row, newStatusValue) => {
    // Update the status in the appointmentLogs state
    const response = await post(
      `/admin/providers/product/${row}/toggle-status`
    );
    if (response.status) {
      fetchShopProducts();
      showModal(
        "Successful",
        `This Product has been ${
          newStatusValue === "1" ? "Activated" : "Inactivated"
        } successfully!`,
        null,
        true
      );
    }
  };
  return (
    <DashboardLayout pageTitle="Product Details">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 ">
            <div className="row my-4">
              <div className="col-12 d-flex">
                <BackButton />
                <h2 className="mainTitle mb-0">Shop's Details</h2>
              </div>
            </div>
            <div className="dashCard ">
              <div className="row ">
                <div className="col-12">
                  <div className="row">
                    <div className="col-md-10 ">
                      <div className="row my-4">
                        {shopDetails ? (
                          [
                            { label: "Shop Name", value: shopDetails?.name },
                            {
                              label: "Delivery Fee",
                              value: "$" + shopDetails?.delivery_fees,
                            },
                          ].map(({ label, value }) => (
                            <div className="col-lg-4 col-md-6 mb-3" key={label}>
                              <h4 className="secondaryLabel">{label}</h4>
                              <p className="secondaryText wrapText mb-0">
                                {value}
                              </p>
                            </div>
                          ))
                        ) : (
                          <div className="col-12 text-muted">
                            No Shop available
                          </div>
                        )}
                      </div>
                    </div>
                    {shopDetails?.media?.media_path && (
                      <div className="col-12">
                        <h4 className="secondaryLabel">Banner Image</h4>
                        <img
                          className="img-fluid rounded"
                          src={shopDetails?.media?.media_path}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="dashCard mt-4">
              <div className="row mb-3">
                <div className="col-12">
                  <h2 className="mainTitle">Product Logs</h2>
                </div>
                <div className="col-12">
                  <CustomTable
                    filters={filters}
                    setFilters={setFilters}
                    loading={isSubmitting}
                    headers={shopProductsHeaders}
                    pagination={pagination}
                    // if you want multiple date filters
                    dateFilters={[
                      {
                        title: "Added On",
                        from: "date_from",
                        to: "date_to",
                      },
                    ]}
                    selectOptions={[
                      {
                        title: "Status",
                        key: "status",
                        options: normalStatus,
                      },
                      {
                        title: "Category",
                        key: "category_id",
                        options: categories,
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
                          <td>{item?.title}</td>
                          <td>{dateFormat(item?.created_at)}</td>
                          <td>{item?.category?.category_title}</td>
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
                              {statusOptions}
                            </Select>
                          </td>
                          <td>
                            <div className="d-flex cp gap-3 tableAction align-items-center justify-content-center">
                              <span
                                className="tooltip-toggle"
                                aria-label="View"
                              >
                                <Link
                                  to={`/admin/service-provider-management/products/${item.id}`}
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
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default withModal(withFilters(ShopDetails));
