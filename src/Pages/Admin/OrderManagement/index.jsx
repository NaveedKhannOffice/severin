import { useEffect, useState } from "react";
import { FaEdit, FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { DashboardLayout } from "../../../Components/Layouts/AdminLayout/DashboardLayout";
import CustomTable from "../../../Components/Common/CustomTable";
import SelectInput from "../../../Components/Common/FormElements/SelectInput";
import { shopProductsHeaders } from "../../../Config/TableHeaders";
import { normalStatus, statusOptions } from "../../../Config/TableStatus";
import withFilters from "../../../HOC/withFilters";
import withModal from "../../../HOC/withModal";
import { useFormStatus } from "../../../Hooks/useFormStatus";
import { dateFormat, serialNum } from "../../../Utils/helper";
import { getAll, post } from "../../../Services/Api";

const OrdersManagement = ({
    filters,
    setFilters,
    pagination,
    updatePagination,
    showModal,
}) => {
    const [products, setProducts] = useState([]);
    const { isSubmitting, startSubmitting, stopSubmitting } = useFormStatus();

    const fetchProducts = async () => {
        try {
            startSubmitting(true);
            const url = `/user/aliexpress/get-order-list`;
            const response = await getAll(url, filters);
            if (response?.status) {
                const { total, per_page, current_page, to } = response.meta || {};
                setProducts(response.data || []);
                if (typeof total !== "undefined") {
                    updatePagination({
                        showData: to || 0,
                        currentPage: current_page || 1,
                        totalRecords: total || 0,
                        totalPages: Math.ceil((total || 0) / (per_page || filters.per_page || 10)),
                    });
                }
            }
        } catch (error) {
            console.error("Error fetching products:", error);
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
            `Are you sure you want to change this Category status to ${newStatusValue === "1" ? "Active" : "Inactive"
            }?`,
            () => onConfirmStatusChange(userId, newStatusValue)
        );
    };

    // Confirm status change and update the state
    const onConfirmStatusChange = async (productId, newStatusValue) => {
        // Toggle product status
        const response = await post(`/admin/providers/product/${productId}/toggle-status`);
        if (response?.status) {
            fetchProducts();
            showModal(
                "Successful",
                `Order status has been changed to ${newStatusValue === "1" ? "Active" : "Inactive"
                } successfully.`,
                null,
                true
            );
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [filters]);

    return (
        <DashboardLayout pageTitle="Orders Management">
            <div className="container-fluid">
                <>
                    <div className="my-4 d-flex flex-wrap gap-3 gap-md-0 align-items-center justify-content-between">
                        <h2 className="mainTitle mb-0">Order Management</h2>
                    </div>
                    <div className="dashCard">
                        <div className="row mb-3">
                            <div className="col-12">
                                <CustomTable
                                    filters={filters}
                                    setFilters={setFilters}
                                    loading={isSubmitting}
                                    headers={shopProductsHeaders}
                                    pagination={pagination}
                                    dateFilters={[
                                        {
                                            title: "Added On",
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
                                        {products?.map((item, index) => (
                                            <tr key={item?.id}>
                                                <td>
                                                    {serialNum(
                                                        (filters.page - 1) * filters.per_page + index + 1
                                                    )}
                                                </td>
                                                <td>{item?.title || item?.name || `Order ${item?.id}`}</td>
                                                <td>{dateFormat(item?.created_at)}</td>
                                                
                                                <td>
                                                    <div className="d-flex cp gap-3 tableAction align-items-center justify-content-center">
                                                        <span className="tooltip-toggle" aria-label="View">
                                                            <Link to={`/admin/orders/${item.id}`}>
                                                                <FaEye size={20} color="#1819ff" />
                                                            </Link>
                                                        </span>
                                                        <span className="tooltip-toggle" aria-label="Edit">
                                                            <Link to={`/admin/orders-management/${item.id}/edit`}>
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

export default withModal(withFilters(OrdersManagement));
