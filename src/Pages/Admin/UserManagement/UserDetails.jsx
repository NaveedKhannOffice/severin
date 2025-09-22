import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import BackButton from "../../../Components/Common/BackButton";
import { DashboardLayout } from "../../../Components/Layouts/AdminLayout/DashboardLayout";
// import { getDetails } from "../../../Services/Api";
// import MedicalImage from "../../../Assets/images/medical-health.png";
import { FaEye } from "react-icons/fa";
import { images } from "../../../Assets";
import CustomTable from "../../../Components/Common/CustomTable";
import SelectInput from "../../../Components/Common/FormElements/SelectInput";
import { orderLogsHeader } from "../../../Config/TableHeaders";
import { orderStatus, statusOptions } from "../../../Config/TableStatus";
import withFilters from "../../../HOC/withFilters";
import withModal from "../../../HOC/withModal";
import { useFormStatus } from "../../../Hooks/useFormStatus";
import { getAll, getDetails, post } from "../../../Services/Api";
import {
  dateFormat,
  getCountryFlag,
  serialNum,
  statusClassMap2,
} from "../../../Utils/helper";
import ImageGallery from "../../../Components/ImageGallery/ImageGallery";

const UserDetails = ({
  showModal,
  filters,
  setFilters,
  pagination,
  updatePagination,
}) => {
  const { id } = useParams();
  const [profileData, setProfileData] = useState({});

  const [appointmentLogs, setAppointmentLogs] = useState([]);
  const [orderLogs, setOrderLogs] = useState([]);
  const { isSubmitting, startSubmitting, stopSubmitting } = useFormStatus();

  const fetchUsers = async () => {
    try {
      startSubmitting(true);
      const url = `/admin/bookings/user/${id}`;
      const response = await getAll(url, filters);

      if (response.status) {
        const { data, total, per_page, current_page, to } = response.detail;
        setAppointmentLogs(data);
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
      const url = `/admin/orders/user/${id}`;
      const response = await getAll(url, filters);
      // const response = userOrderLogsData;
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
  const getUser = async () => {
    const response = await getDetails(`/admin/user/${id}`);
    if (response) {
      setProfileData(response?.data);
    }
  };
  useEffect(() => {
    getUser();
  }, [id]);
  useEffect(() => {
    fetchUsers();
    fetchOrders();
  }, [filters]);

  // Handle status change
  const handleStatusChange = (e, userId) => {
    const newStatusValue = e;
    // Open the modal for confirmation
    showModal(
      `Mark as ${newStatusValue === "1" ? "Active" : "Inactive"}`,
      `Are you sure you want to change this user's status to ${
        newStatusValue === "1" ? "Active" : "Inactive"
      }?`,
      () => onConfirmStatusChange(userId, newStatusValue)
    );
  };

  // Confirm status change and update the state
  const onConfirmStatusChange = async (userId, newStatusValue) => {
    const response = await post(`/admin/user/${userId}/status`);
    if (response.status) {
      getUser();

      // setUserData((prevData) => prevData.map((user) => (user.id === userId ? { ...user, status_detail: newStatusValue } : user)));
      showModal(
        "Successful",
        `User status has been changed to ${
          newStatusValue === "1" ? "Active" : "Inactive"
        } successfully.`,
        null,
        true
      );
    }
    // Update the status in the appointmentLogs state
  };

  const {
    email,
    phone,
    dialing_code,
    first_name,
    last_name,
    relation,
    language,
  } = profileData;
  return (
    <DashboardLayout pageTitle="User Details">
      <div className="row my-3">
        <div className="col-12">
          <div className="d-flex">
            <BackButton />
            <h2 className="mainTitle mb-0">User Details</h2>
          </div>
        </div>
      </div>
      <div className="dashCard ">
        <div className="row ">
          <div className="col-12">
            <div className="d-flex flex-column flex-sm-row mb-4  gap-3">
              <div className="profileImage">
                <img
                  src={profileData?.photo ?? images.placeholder}
                  alt="User"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-10">
                <div className="row my-4">
                  {[
                    // { label: "User Name", value: first_name + " " + last_name },
                    {
                      label: "User Name",
                      value: first_name + " " + (last_name ?? ""),
                    },
                    { label: "Email Address", value: email },
                    {
                      label: "Phone Number",
                      value:
                        dialing_code + phone !== 0
                          ? dialing_code + phone
                          : "N/A",
                    },
                  ].map(({ label, value }) => (
                    <div className="col-lg-4 col-md-6 mb-3" key={label}>
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
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="dashCard mt-4">
        <div className="row mb-3">
          <div className="col-12">
            <h2 className="mainTitle">orders Logs</h2>
          </div>
          <div className="col-12">
            <CustomTable
              filters={filters}
              setFilters={setFilters}
              loading={isSubmitting}
              headers={orderLogsHeader}
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
                    <td>{dateFormat(item?.created_at)}</td>
                    <td>${item?.total}</td>
                    <td className={statusClassMap2[item?.status]}>
                      {item?.status}
                    </td>
                    <td>
                      <div className="d-flex cp gap-3 tableAction align-items-center justify-content-center">
                        <span className="tooltip-toggle" aria-label="View">
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
      </div> */}
    </DashboardLayout>
  );
};
//Additional Filters
const additionalFilters = {
  type: "",
  expiryfrom: "",
  expiryto: "",
};
export default withModal(withFilters(UserDetails, additionalFilters));
