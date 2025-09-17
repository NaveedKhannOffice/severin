import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { DashboardLayout } from "../../../Components/Layouts/AdminLayout/DashboardLayout";
import BackButton from "../../../Components/Common/BackButton";
import CustomTable from "../../../Components/CustomTable";
import { Select } from "../../../Components/Common/FormElements/SelectInput";
import { serviceDetailsData } from "../../../Config/data";
import { serviceProviderappointmentHeader } from "../../../Config/TableHeaders";
import {
  appointmentStatus,
  AppointmentType,
  statusOptions,
} from "../../../Config/TableStatus";
import withFilters from "../../../HOC/withFilters";
import withModal from "../../../HOC/withModal";
import { useFormStatus } from "../../../Hooks/useFormStatus";
import {
  dateFormat,
  isNullOrEmpty,
  serialNum,
  statusClassMap,
} from "../../../Utils/helper";
import { getAll, getDetails } from "../../../Services/Api";

const ServiceDetails = ({
  showModal,
  filters,
  setFilters,
  pagination,
  updatePagination,
}) => {
  const { serviceId } = useParams();
  const [serviceDetails, setServiceDetails] = useState(null);

  const [appointmentLogs, setAppointmentLogs] = useState([]);
  const { isSubmitting, startSubmitting, stopSubmitting } = useFormStatus();
  const getServiceDetails = async () => {
    const response = await getDetails(`/admin/providers/services/${serviceId}`);
    if (response) {
      setServiceDetails(response?.data);
    }
  };
  useEffect(() => {
    getServiceDetails();
  }, [serviceId]);

  // Handle status change
  const handleStatusChange = (e, id) => {
    const newStatusValue = e;
    // Open the modal for confirmation
    showModal(
      `${newStatusValue === "1" ? "Active" : "Inactive"} Service`,
      `Are you sure you want to ${
        newStatusValue === "1" ? "Activate" : "Inactivate"
      } this Service?`,
      () => onConfirmStatusChange(id, newStatusValue)
    );
  };
  const fetchAppointmentLogs = async () => {
    try {
      startSubmitting(true);
      const url = `/admin/bookings/service/${serviceId}`;
      const response = await getAll(url, filters);
      if (response.status) {
        const { total, per_page, current_page, to } = response.meta;
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
  useEffect(() => {
    fetchAppointmentLogs();
  }, [filters]);
  // Confirm status change and update the state
  const onConfirmStatusChange = async (row, newStatusValue) => {
    // Update the status in the appointmentLogs state
    const response = await getDetails(
      `/admin/providers/services/${row}/status`
    );
    if (response.status) {
      getServiceDetails();
      showModal(
        "Successful",
        `This Service has been ${
          newStatusValue === "1" ? "Activated" : "Inactivated"
        } successfully!`,
        null,
        true
      );
    }
  };

  if (isNullOrEmpty(serviceDetails)) {
    return (
      <DashboardLayout pageTitle="Service Details">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 ">
              <div className="row my-4">
                <div className="col-12 d-flex">
                  <BackButton />
                  <h2 className="mainTitle mb-0">Service Details</h2>
                </div>
              </div>
              <div className="dashCard ">
                <div className="row ">
                  <div className="col-12">Loading...</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }
  return (
    <DashboardLayout pageTitle="Service Details">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 ">
            <div className="row my-4">
              <div className="col-12 d-flex">
                <BackButton />
                <h2 className="mainTitle mb-0">Service Details</h2>
              </div>
            </div>
            <div className="dashCard ">
              <div className="row ">
                <div className="col-12">
                  <div className="col-12 d-flex flex-column flex-sm-row mb-4 col-12  gap-3">
                    <h4 className="secondaryTitle">
                      {serviceDetails?.service_name}
                    </h4>
                    <div className="flex-grow-1 d-flex flex-column align-items-start align-items-sm-end justify-content-end justify-content-sm-start gap-3">
                      <div className="profile-status d-flex  align-items-end flex-column gap-3">
                        <div className="status-action">
                          <Select
                            className={`tabel-select status${serviceDetails?.status}`}
                            id={`status${serviceDetails?.id}`}
                            name="status"
                            label="Status:"
                            value={serviceDetails?.status}
                            onChange={(e) =>
                              handleStatusChange(e, serviceDetails?.id)
                            }
                            isInputNeeded={false}
                          >
                            {statusOptions}
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <img className="img-fluid" src={serviceDetails?.photo} />
                    </div>
                    <div className="col-md-10 mt-2">
                      <div className="my-4">
                        <h4 className="secondaryLabel">Description</h4>
                        <p className="secondaryText mb-0">
                          {serviceDetails.description}
                        </p>
                      </div>
                      <div className="row my-4">
                        {[
                          {
                            label: "Service Category",
                            value: serviceDetails?.category?.category_title,
                          },
                          {
                            label: "Service Charges",
                            value: (
                              <td>
                                $
                                {serviceDetails?.service_mode == "online"
                                  ? serviceDetails?.final_online_charges
                                  : serviceDetails?.final_onsite_charges}
                              </td>
                            ),
                          },
                        ].map(({ label, value }) => (
                          <div className="col-lg-4 col-md-6 mb-3" key={label}>
                            <h4 className="secondaryLabel">{label}</h4>
                            <p className="secondaryText wrapText mb-0">
                              {value}
                            </p>
                          </div>
                        ))}
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
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default withModal(withFilters(ServiceDetails));
