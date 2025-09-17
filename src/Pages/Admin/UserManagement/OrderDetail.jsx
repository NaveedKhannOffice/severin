import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DashboardLayout } from "../../../Components/Layouts/AdminLayout/DashboardLayout";
import BackButton from "../../../Components/Common/BackButton";
// import { getDetails } from "../../../Services/Api";
import { userOrderLogsData } from "../../../Config/data";
import {
  dateFormat,
  getCountryFlag,
  isNullOrEmpty,
  statusClassMap2,
} from "../../../Utils/helper";
import "./style.css";
import { getDetails } from "../../../Services/Api";

const UserOrderDetails = () => {
  const { orderid } = useParams();
  const [userOrderData, setUserOrderData] = useState({});
  const getOrder = async () => {
    const response = await getDetails(`/admin/orders/${orderid}`);
    if (response) {
      setUserOrderData(response?.data);
    }
  };
  useEffect(() => {
    getOrder();
  }, [orderid]);

  // const {
  //   shop_name,
  //   order_iD,
  //   date,
  //   status,
  //   cancellation_reason,
  //   productlogs = [],
  //   customerInfo,
  //   sub_total,
  //   delivery_charges,
  //   shippingAddress,
  //   billingAddress
  // } = userOrderData;

  return (
    <DashboardLayout pageTitle="Order Details">
      <div className="row my-3">
        <div className="col-12">
          <h2 className="mainTitle">
            <BackButton />
            Order Details
          </h2>
        </div>
      </div>
      <div className="dashCard">
        <div className="row">
          <div className="col-12">
            <div className="col-12 d-flex flex-column flex-sm-row mb-4 col-12 gap-3">
              <div className="flex-grow-1 d-flex justify-content-start justify-content-sm-end">
                <div className="profile-status d-flex align-items-end flex-column gap-3">
                  <div className="status-action">
                    <div className="status-primary">
                      <label className="blackColor font-medium">
                        Status :{" "}
                      </label>
                      <span
                        className={`ms-1 fw-bold ${
                          statusClassMap2[userOrderData?.status]
                        }`}
                      >
                        {userOrderData?.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-10 col-lg-8">
                <div className="row">
                  {[
                    { label: "Shop Name", value: userOrderData?.shop?.name },
                    { label: "Order ID", value: "#" + userOrderData?.order_id },
                    {
                      label: "Order Date",
                      value: dateFormat(userOrderData?.created_at),
                    },
                  ].map(({ label, value }) => (
                    <div className="col-lg-6 col-xl-4 mb-3" key={label}>
                      <h4 className="secondaryLabel">{label}</h4>
                      <p className="secondaryText wrapText mb-0">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="table-responsive my-2 customTable position-relative">
              <table className="p-0">
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {userOrderData?.details?.length > 0 ? (
                    userOrderData?.details?.map((item) => (
                      <tr key={item?.product.id}>
                        <td>{item?.product.id}</td>
                        <td>
                          <div className="d-flex align-items-center gap-2 over-flow-x">
                            <div className="productThumbnail flex-shrink-0">
                              <img
                                src={item?.product?.medias[0]?.media_path}
                                alt={item?.product?.title}
                              />
                            </div>
                            <div className="tableProductWidth flex-grow-1">
                              <h6 className="blackColor mb-0">
                                {item?.product?.title}
                              </h6>
                              <p className="mb-0 grayColor">
                                {item?.product?.description}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td>${item?.price}</td>
                        <td>{item?.quantity}</td>
                        <td>${item?.total}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="text-center">
                        No Products available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="dashCard my-3">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-5">
            <div className="order-summmery-card">
              <div className="card-body text-center p-4">
                <h4 className="card-title fw-bold mb-4">Order Summary</h4>
                <div className="d-flex justify-content-between my-2">
                  <h6 className="text-start blackColor">Sub Total</h6>
                  <div className="text-end blackColor fw-medium">
                    ${userOrderData?.sub_total}
                  </div>
                </div>
                <div className="d-flex justify-content-between  my-2">
                  <h6 className="text-start blackColor">Delivery Charges</h6>
                  <div className="text-end blackColor fw-medium ">
                    ${userOrderData?.delivery_charges}
                  </div>
                </div>
                <hr />
                <div className="d-flex justify-content-between my-2">
                  <h6 className="text-start fw-medium blackColor">Total</h6>
                  <div className="text-end fw-medium ">
                    ${userOrderData?.total}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="dashCard my-3">
        <div className="row">
          <div className="col-md-10 col-xl-11 col-xxl-8">
            <div className="my-3">
              <h4 className="secondaryTitle">Contact Information </h4>
            </div>
            <div className="row">
              {[
                {
                  label: "User Name",
                  value:
                    userOrderData?.user?.first_name +
                    " " +
                    userOrderData?.user?.last_name,
                },
                { label: "Email Address", value: userOrderData?.user?.email },
                { label: "Phone no", value: userOrderData?.user?.phone },
              ].map(({ label, value }) => (
                <div className="col-lg-6 col-xl-4 mb-3" key={label}>
                  <h4 className="secondaryLabel">{label}</h4>
                  <p className="secondaryText wrapText mb-0">{value}</p>
                </div>
              ))}
            </div>

            <div className="my-3">
              <h4 className="secondaryTitle">Shipping Address</h4>
            </div>
            {userOrderData?.addresses?.map(
              ({
                order_id,
                type,
                first_name,
                last_name,
                country,
                state,
                city,
                zip_code,
                address,
                phone,
              }) => (
                <div key={order_id} className="my-3">
                  {console.log(order_id)} {/* Logs the 'address' field */}
                  {type == "shipping_address" && (
                    <>
                      <div className={`col-lg-6 col-xl-4 mb-3 `}>
                        <h4 className="secondaryLabel">User Name</h4>
                        <p className="secondaryText wrapText mb-0">
                          {first_name + " " + last_name}
                        </p>
                      </div>
                      <div className={`col-lg-6 col-xl-4 mb-3 `}>
                        <h4 className="secondaryLabel">Phone No</h4>
                        <p className="secondaryText wrapText mb-0">{phone}</p>
                      </div>
                      <div className={`col-lg-6 col-xl-4 mb-3 `}>
                        <h4 className="secondaryLabel">Country</h4>
                        <p className="secondaryText wrapText mb-0">{country}</p>
                      </div>
                      <div className={`col-lg-6 col-xl-4 mb-3 `}>
                        <h4 className="secondaryLabel">state</h4>
                        <p className="secondaryText wrapText mb-0">{state}</p>
                      </div>
                      <div className={`col-lg-6 col-xl-4 mb-3 `}>
                        <h4 className="secondaryLabel">city</h4>
                        <p className="secondaryText wrapText mb-0">{city}</p>
                      </div>
                      <div className={`col-lg-6 col-xl-4 mb-3 `}>
                        <h4 className="secondaryLabel">zipCode</h4>
                        <p className="secondaryText wrapText mb-0">
                          {zip_code}
                        </p>
                      </div>
                      <div className={`col-lg-6 col-xl-4 mb-3 `}>
                        <h4 className="secondaryLabel">Address</h4>
                        <p className="secondaryText wrapText mb-0">{address}</p>
                      </div>
                    </>
                  )}
                </div>
              )
            )}
            <div className="my-3">
              <h4 className="secondaryTitle">billing Address</h4>
            </div>
            {userOrderData?.addresses?.map(
              ({
                order_id,
                type,
                first_name,
                last_name,
                country,
                state,
                city,
                zip_code,
                address,
                phone,
              }) => (
                <div key={order_id} className="my-3">
                  {console.log(order_id)} {/* Logs the 'address' field */}
                  {type == "billing_address" && (
                    <>
                      <div className={`col-lg-6 col-xl-4 mb-3 `}>
                        <h4 className="secondaryLabel">User Name</h4>
                        <p className="secondaryText wrapText mb-0">
                          {first_name + " " + last_name}
                        </p>
                      </div>
                      <div className={`col-lg-6 col-xl-4 mb-3 `}>
                        <h4 className="secondaryLabel">Phone No</h4>
                        <p className="secondaryText wrapText mb-0">{phone}</p>
                      </div>
                      <div className={`col-lg-6 col-xl-4 mb-3 `}>
                        <h4 className="secondaryLabel">Country</h4>
                        <p className="secondaryText wrapText mb-0">{country}</p>
                      </div>
                      <div className={`col-lg-6 col-xl-4 mb-3 `}>
                        <h4 className="secondaryLabel">state</h4>
                        <p className="secondaryText wrapText mb-0">{state}</p>
                      </div>
                      <div className={`col-lg-6 col-xl-4 mb-3 `}>
                        <h4 className="secondaryLabel">city</h4>
                        <p className="secondaryText wrapText mb-0">{city}</p>
                      </div>
                      <div className={`col-lg-6 col-xl-4 mb-3 `}>
                        <h4 className="secondaryLabel">zipCode</h4>
                        <p className="secondaryText wrapText mb-0">
                          {zip_code}
                        </p>
                      </div>
                      <div className={`col-lg-6 col-xl-4 mb-3 `}>
                        <h4 className="secondaryLabel">Address</h4>
                        <p className="secondaryText wrapText mb-0">{address}</p>
                      </div>
                    </>
                  )}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserOrderDetails;
