import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DashboardLayout } from "../../../Components/Layouts/AdminLayout/DashboardLayout";
import BackButton from "../../../Components/Common/BackButton";
import moment from 'moment';
import { Card, Descriptions, Table, Tag } from 'antd';
import { productPost } from "../../../Services/Api";

const ViewOrder = () => {
    const { id } = useParams();
    const [orderData, setOrderData] = useState(null);

    const getOrderDetails = async () => {
        const response = await productPost(`/user/aliexpress/get-order`, { order_id: id });
        if (response) {
            setOrderData(response);
        }
    };

    useEffect(() => {
        getOrderDetails();
    }, [id]);

    const columns = [
        {
            title: 'Product ID',
            dataIndex: 'product_id',
            key: 'product_id',
        },
        {
            title: 'SKU',
            dataIndex: 'sku_attr',
            key: 'sku_attr',
        },
        {
            title: 'Quantity',
            dataIndex: 'product_count',
            key: 'product_count',
        },
        {
            title: 'Logistics Service',
            dataIndex: 'logistics_service_name',
            key: 'logistics_service_name',
        },
        {
            title: 'Order Memo',
            dataIndex: 'order_memo',
            key: 'order_memo',
        }
    ];

    const getStatusColor = (status) => {
        const statusColors = {
            submitted: 'blue',
            processing: 'orange',
            completed: 'green',
            cancelled: 'red'
        };
        return statusColors[status?.toLowerCase()] || 'default';
    };

    //   // Handle status change
    //   const handleStatusChange = (e, userId) => {
    //     const newStatusValue = e;
    //     // Open the modal for confirmation
    //     showModal(
    //       `${newStatusValue === "1" ? "Active" : "Inactive"} Category`,
    //       `Are you sure you want to change this Category to ${
    //         newStatusValue === "1" ? "Active" : "Inactive"
    //       }?`,
    //       () => onConfirmStatusChange(userId, newStatusValue)
    //     );
    //   };
    //   // Confirm status change and update the state
    //   const onConfirmStatusChange = async (userId, newStatusValue) => {
    //     // Update the status in the appointmentLogs state
    //     setData({ ...data, status: newStatusValue });
    //     showModal(
    //       "Successful",
    //       `Category status has been changed to ${
    //         newStatusValue === "1" ? "Active" : "Inactive"
    //       } successfully.`,
    //       null,
    //       true
    //     );
    //   };
    //   // Handle status change
    //   const handleStatusChangeTwo = (e, userId) => {
    //     const newStatusValue = e;
    //     // Open the modal for confirmation
    //     showModal(
    //       `Mark as ${newStatusValue === "1" ? "Active" : "Inactive"}`,
    //       `Are you sure you want to change this product status to ${
    //         newStatusValue === "1" ? "Active" : "Inactive"
    //       }?`,
    //       () => onConfirmStatusChangeTwo(userId, newStatusValue)
    //     );
    //   };

    //   // Confirm status change and update the state
    //   const onConfirmStatusChangeTwo = async (userId, newStatusValue) => {
    //     const response = await post(`/admin/categories/${id}/status`);
    //     if (response.status) {
    //       getProductCategoryDetail();
    //       showModal(
    //         "Successful",
    //         `Product status has been changed to ${
    //           newStatusValue === "1" ? "Active" : "Inactive"
    //         } successfully.`,
    //         null,
    //         true
    //       );
    //     }
    //   };
    const data = orderData?.data;

    return (
        <DashboardLayout pageTitle="Order Details">
            <div className="row my-3">
                <div className="col-12">
                    <div className="d-flex justify-content-between align-items-center my-3 my-md-0 flex-wrap">
                        <div className="flex-grow-1 d-flex my-3">
                            <BackButton />
                            <h2 className="mainTitle mb-0">View Order Details</h2>
                        </div>
                    </div>
                </div>
            </div>

            {data ? (
                <div className="view-order-container">
                    <Card className="mb-4">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                            <h3>Order Information</h3>
                            <Tag color={getStatusColor(data.status)} style={{ textTransform: 'uppercase' }}>
                                {data.status}
                            </Tag>
                        </div>
                        <Descriptions column={2}>
                            <Descriptions.Item label="Order ID">{data.order_id}</Descriptions.Item>
                            <Descriptions.Item label="Submitted Date">
                                {moment(data.submitted_at).format('MMMM DD, YYYY HH:mm:ss')}
                            </Descriptions.Item>
                            {data.message && (
                                <Descriptions.Item label="Message">{data.message}</Descriptions.Item>
                            )}
                        </Descriptions>
                    </Card>

                    <Card className="mb-4">
                        <h3>Shipping Information</h3>
                        <Descriptions column={2}>
                            <Descriptions.Item label="Full Name">{data.logistics_address.full_name}</Descriptions.Item>
                            <Descriptions.Item label="Contact Person">{data.logistics_address.contact_person}</Descriptions.Item>
                            <Descriptions.Item label="Phone">
                                {data.logistics_address.phone_country} {data.logistics_address.mobile_no}
                            </Descriptions.Item>
                            <Descriptions.Item label="Country">{data.logistics_address.country}</Descriptions.Item>
                            <Descriptions.Item label="Address">
                                {data.logistics_address.address}
                                {data.logistics_address.address2 && `, ${data.logistics_address.address2}`}
                            </Descriptions.Item>
                            <Descriptions.Item label="City/Province">
                                {`${data.logistics_address.city}, ${data.logistics_address.province}`}
                            </Descriptions.Item>
                            <Descriptions.Item label="ZIP Code">{data.logistics_address.zip}</Descriptions.Item>
                            <Descriptions.Item label="Locale">{data.logistics_address.locale}</Descriptions.Item>
                        </Descriptions>
                    </Card>

                    <Card>
                        <h3>Order Items</h3>
                        <Table
                            columns={columns}
                            dataSource={data.items}
                            rowKey="product_id"
                            pagination={false}
                        />
                    </Card>
                </div>
            ) : (
                <div className="text-center py-5">Loading order details...</div>
            )}
        </DashboardLayout>
    );
};
export default ViewOrder;
