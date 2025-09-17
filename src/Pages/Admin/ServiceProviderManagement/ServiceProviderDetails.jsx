import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { images } from "../../../Assets";
import { DashboardLayout } from "../../../Components/Layouts/AdminLayout/DashboardLayout";
import BackButton from "../../../Components/Common/BackButton";
import CustomTable from "../../../Components/CustomTable";
import { Select } from "../../../Components/Common/FormElements/SelectInput";
import {
  serviceProviderAppointmentLogsData,
  serviceProviderOrderLogsData,
  serviceProvidersData,
} from "../../../Config/data";
import {
  serviceProviderappointmentHeader,
  serviceProviderorderLogsHeader,
} from "../../../Config/TableHeaders";
import {
  appointmentStatus,
  AppointmentType,
  orderStatus,
  statusOptions,
} from "../../../Config/TableStatus";
import withFilters from "../../../HOC/withFilters";
import withModal from "../../../HOC/withModal";
import { useFormStatus } from "../../../Hooks/useFormStatus";
import {
  dateFormat,
  getCountryFlag,
  serialNum,
  statusClassMap,
  statusClassMap2,
} from "../../../Utils/helper";
import ImageGallery from "../../../Components/ImageGallery/ImageGallery";
import { getAll, getDetails, post } from "../../../Services/Api";

const ServiceProviderDetails = ({
  showModal,
  filters,
  setFilters,
  pagination,
  updatePagination,
}) => {
  const { id } = useParams();
  const [serviceProvider, setServiceProvider] = useState({});

  const [appointmentLogs, setAppointmentLogs] = useState([]);
  const [orderLogs, setOrderLogs] = useState([]);
  const { isSubmitting, startSubmitting, stopSubmitting } = useFormStatus();

  const fetchAppointmentLogs = async () => {
    try {
      startSubmitting(true);
      const url = `/admin/bookings/user/${id}`;
      const response = await getAll(url, filters);
      if (response.status) {
        const { total, per_page, current_page, to } = response.meta;
        console.log(response, "kkkkkkkkkk");
        setAppointmentLogs(response.data);
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
  const fetchOrders = async () => {
    try {
      startSubmitting(true);
      const url = `/admin/orders/provider/${id}`;
      const response = await getAll(url, filters);
      if (response.status) {
        const { total, per_page, current_page, to } = response.meta;
        setOrderLogs(response?.data);
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
  const getServiceProvider = async () => {
    const response = await getDetails(`/admin/providers/${id}`);
    if (response) {
      setServiceProvider(response?.data);
    }
  };
  useEffect(() => {
    getServiceProvider();
  }, [id]);
  useEffect(() => {
    fetchAppointmentLogs();
    fetchOrders();
  }, [filters]);

  // Handle status change
  const handleStatusChange = (e, id) => {
    const newStatusValue = e;
    // Open the modal for confirmation
    showModal(
      `${newStatusValue === "1" ? "Active" : "Inactive"} Service Provider`,
      `Are you sure you want to ${
        newStatusValue === "1" ? "Activate" : "Inactivate"
      } this Service Provider?`,
      () => onConfirmStatusChange(id, newStatusValue)
    );
  };

  // Confirm status change and update the state
  const onConfirmStatusChange = async (row, newStatusValue) => {
    const response = await post(`/admin/providers/${row}/status`);
    if (response.status) {
      getServiceProvider();
      showModal(
        "Successful",
        `This Service Provider has been ${
          newStatusValue === "1" ? "Activated" : "Inactivated"
        } successfully!`,
        null,
        true
      );
    }
    // Update the status in the appointmentLogs state
  };

  return (
    <DashboardLayout pageTitle="Service Provider Details">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 ">
            <div className="row my-4">
              <div className="col-12 d-flex">
                <BackButton />
                <h2 className="mainTitle mb-0">Service Provider Details</h2>
              </div>
            </div>
            <div className="dashCard ">
              <div className="row ">
                <div className="col-12">
                  <div className="col-12 d-flex flex-column flex-sm-row mb-4 col-12  gap-3">
                    <div className="profileImage">
                      <img
                        src={serviceProvider?.photo ?? images.placeholder}
                        alt="User"
                      />
                    </div>
                    <div className="flex-grow-1 d-flex flex-column align-items-start align-items-sm-end justify-content-end justify-content-sm-start gap-3">
                      <div className="profile-status d-flex  align-items-end flex-column gap-3">
                        <div className="status-action">
                          <Select
                            className={`tabel-select status${serviceProvider?.status}`}
                            id={`status${serviceProvider?.id}`}
                            name="status"
                            label="Status:"
                            value={serviceProvider?.status}
                            onChange={(e) =>
                              handleStatusChange(e, serviceProvider?.id)
                            }
                            isInputNeeded={false}
                          >
                            {statusOptions}
                          </Select>
                        </div>
                      </div>
                      <div>
                        <Link
                          className="site-btn primary-btn text-decoration-none"
                          to={"services"}
                        >
                          View Services
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-10 col-xl-11 col-xxl-8">
                      <div className="row my-4">
                        {[
                          {
                            label: "User Name",
                            value:
                              serviceProvider.first_name +
                              " " +
                              serviceProvider?.last_name,
                          },
                          { label: "Gender", value: serviceProvider.gender },
                          {
                            label: "Phone Number",
                            value:
                              serviceProvider.dialing_code +
                              serviceProvider.phone,
                          },
                          {
                            label: "Email Address",
                            value: serviceProvider.email,
                          },
                          {
                            label: "State",
                            value: serviceProvider?.state?.name,
                          },
                          { label: "City", value: serviceProvider?.city?.name },
                        ].map(({ label, value }) => (
                          <div className="col-lg-6 col-xl-4 mb-4" key={label}>
                            <h4 className="secondaryLabel">{label}</h4>
                            <p className="secondaryText wrapText mb-0">
                              {label === "Phone Number" && (
                                <span>{getCountryFlag(value)}</span>
                              )}{" "}
                              {value}
                            </p>
                          </div>
                        ))}
                      </div>
                      <div className="mb-4">
                        <h4 className="secondaryLabel">Bio</h4>
                        <p className="secondaryText mb-0">
                          {serviceProvider.bio}
                        </p>
                      </div>

                      <div className="d-flex gap-3 flex-wrap my-5">
                        <Link
                          className="site-btn primary-btn text-decoration-none px-md-5"
                          to={`/admin/posts/${id}`}
                        >
                          View Posts
                        </Link>
                        <Link
                          className="site-btn secondary-btn text-decoration-none px-md-5"
                          to={"shop"}
                        >
                          View Shop
                        </Link>
                      </div>
                      <div className="mt-5 mb-4">
                        <h4 className="secondaryTitle">Certification Detail</h4>
                      </div>
                      {/* <div className="row my-4">
                        {[
                          { label: "Institute Name", value: serviceProvider.additional_information?.institute_name },
                          { label: "Certificate Title", value: serviceProvider.additional_information?.certificate_title },
                        ].map(({ label, value }) => (
                          <div className="col-lg-6 col-xl-4 mb-3" key={label}>
                            <h4 className="secondaryLabel">{label}</h4>
                            <p className="secondaryText  mb-0">{value}</p>
                          </div>
                        ))}
                      </div>
                      <div className="row my-4">
                        <div className="col-12  col-sm-6 col-lg-4 col-xl-3 mb-3">
                          <ImageGallery images={[serviceProvider?.additional_information?.certificate_img]} maxWidth={200} />
                        </div>
                      </div> */}
                      <div className="row my-4">
                        {/* Loop through each certificate in additional_information */}
                        {serviceProvider?.additional_information?.map(
                          (certificate, index) => (
                            <React.Fragment key={index}>
                              {/* Institute Name & Certificate Title */}
                              <div className="col-lg-6 col-xl-4 mb-3">
                                <h4 className="secondaryLabel">
                                  Business Name
                                </h4>
                                <p className="secondaryText mb-0">
                                  {certificate.institute_name || "N/A"}
                                </p>
                              </div>
                              <div className="col-lg-6 col-xl-4 mb-3">
                                <h4 className="secondaryLabel">
                                  Tell us about you, what you do and any
                                  certifications we should know about
                                </h4>
                                <p className="secondaryText mb-0">
                                  {certificate.certificate_title || "N/A"}
                                </p>
                              </div>

                              {/* Certificate Image (with ImageGallery) */}
                              <div className="col-12 col-sm-6 col-lg-4 col-xl-3 mb-3">
                                <h4 className="secondaryLabel">Certificate</h4>
                                {certificate.certificate_img ? (
                                  <ImageGallery
                                    images={[certificate.certificate_img]}
                                    maxWidth={200}
                                  />
                                ) : (
                                  <p className="secondaryText mb-0">N/A</p>
                                )}
                              </div>
                            </React.Fragment>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="dashCard mt-4">
              <div className="row mb-3">
                <div className="col-12">
                  <h2 className="mainTitle">Appointment Logs</h2>
                </div>
                <div className="col-12">
                  <CustomTable
                    filters={filters}
                    setFilters={setFilters}
                    loading={isSubmitting}
                    headers={serviceProviderappointmentHeader}
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
                        title: "appointment type",
                        key: "booking_type",
                        options: AppointmentType,
                      },
                      {
                        title: "status",
                        key: "status",
                        options: appointmentStatus,
                      },
                    ]}
                  >
                    <tbody>
                      {appointmentLogs?.map((item, index) => (
                        <tr key={item?.id}>
                          <td>
                            {serialNum(
                              (filters.page - 1) * filters.per_page + index + 1
                            )}
                          </td>
                          <td>{item?.booking_id}</td>
                          <td>{item?.service?.service_mode}</td>
                          <td>{item?.service?.service_mode}</td>
                          <td>{dateFormat(item?.created_at)}</td>
                          <td>
                            $
                            {item?.service?.service_mode == "online"
                              ? item?.service?.final_online_charges
                              : item?.service?.final_onsite_charges}
                          </td>
                          <td className={statusClassMap[item?.status]}>
                            {item?.status}
                          </td>
                          <td>
                            <div className="d-flex cp gap-3 tableAction align-items-center justify-content-center">
                              <span
                                className="tooltip-toggle"
                                aria-label="View"
                              >
                                <Link to={`/admin/appointments/${item.id}`}>
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
            <div className="dashCard mt-4">
              <div className="row mb-3">
                <div className="col-12">
                  <h2 className="mainTitle">orders Logs</h2>
                </div>
                <div className="col-12">
                  <CustomTable
                    filters={filters}
                    setFilters={setFilters}
                    loading={isSubmitting}
                    headers={serviceProviderorderLogsHeader}
                    pagination={pagination}
                    // if you want multiple date filters
                    dateFilters={[
                      {
                        title: "order date",
                        from: "from",
                        to: "to",
                      },
                    ]}
                    selectOptions={[
                      {
                        title: "status",
                        key: "status",
                        options: orderStatus,
                      },
                    ]}
                  >
                    <tbody>
                      {orderLogs?.map((item, index) => (
                        <tr key={item?.id}>
                          <td>
                            {serialNum(
                              (filters.page - 1) * filters.per_page + index + 1
                            )}
                          </td>
                          <td>#{item?.order_id}</td>
                          <td>
                            {item?.user?.first_name +
                              " " +
                              item?.user?.last_name}
                          </td>
                          <td>{dateFormat(item?.created_at)}</td>
                          <td>${item?.total}</td>
                          <td className={statusClassMap2[item?.status]}>
                            {item?.status}
                          </td>
                          <td>
                            <div className="d-flex cp gap-3 tableAction align-items-center justify-content-center">
                              <span
                                className="tooltip-toggle"
                                aria-label="View"
                              >
                                <Link to={`/admin/order/${item.id}`}>
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

export default withModal(withFilters(ServiceProviderDetails));
