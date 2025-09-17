import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import CustomTable from "../../../Components/CustomTable";
import { reportsManagementBookingHeader } from "../../../Config/TableHeaders";
import { reportsStatus } from "../../../Config/TableStatus";
import { reportsManagementBookingData } from "../../../Config/data";
import withFilters from "../../../HOC/withFilters";
import { useFormStatus } from "../../../Hooks/useFormStatus";
import { dateFormat, isNullOrEmpty, serialNum, statusClassMap } from "../../../Utils/helper";
import { getAll } from "../../../Services/Api";

const BookingTable = ({ filters, setFilters, pagination, updatePagination }) => {
  const [reports, setReports] = useState([]);
  const { isSubmitting, startSubmitting, stopSubmitting } = useFormStatus();

  const fetchReports = async () => {
    try {
      startSubmitting(true);
      const url = `/admin/report/reports/bookings`;
      const response = await getAll(url, filters);
      if (response.status) {
        const { total, per_page, current_page, to } = response.meta;
        setReports(response.data);
        updatePagination({
          showData: to,
          currentPage: current_page,
          totalRecords: total,
          totalPages: Math.ceil(total / per_page),
        });
      }
    } catch (error) {
      console.error("Error fetching reports:", error);
    } finally {
      stopSubmitting(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, [filters]);

  // if (isNullOrEmpty(reports)) {
  //   return (
  //     <div className="dashCard mt-4">
  //       <div className="row mb-3">
  //         <div className="col-12">not found</div>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="row mb-3">
      <div className="col-12">
        <CustomTable
          filters={filters}
          setFilters={setFilters}
          loading={isSubmitting}
          headers={reportsManagementBookingHeader}
          pagination={pagination}
          dateFilters={[
            {
              title: "Reported Date",
              from: "fromDate",
              to: "toDate",
            },
            {
              title: "Booking Date",
              from: "from",
              to: "to",
            },
          ]}
          selectOptions={[
            {
              title: "Status",
              key: "status",
              options: reportsStatus,
            },
          ]}
        >
          <tbody>
            {reports.map((item, index) => (
              <tr key={item?.id}>
                <td>{serialNum((filters.page - 1) * filters.per_page + index + 1)}</td>
                <td>{item?.reportable?.booking_id}</td>
                <td>{item?.user?.first_name + " " + item?.user?.last_name}</td>
                <td>{dateFormat(item?.reportable?.bookingDetail?.booking_date)}</td>
                <td>{dateFormat(item?.created_at)}</td>
                <td>${item?.reportable?.amount}</td>
                <td className={`${statusClassMap[item.status === "resolved" ? "approved" : item.status]}`}>{item?.status.toUpperCase()}</td>
                <td>
                  <div className="d-flex cp gap-3 tableAction align-items-center justify-content-center">
                    <span className="tooltip-toggle" aria-label="View">
                      <Link to={`view-report/${item.id}`}>
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
  );
};

export default withFilters(BookingTable);
