import React, { useEffect, useState } from "react";
import { dateFormat, serialNum } from "../../../Utils/helper";
import { paymentLogsBookingData } from "../../../Config/data";
import { isNullOrEmpty } from "../../../Utils/helper";
import { paymentLogBookingHeaders } from "../../../Config/TableHeaders";
import CustomTable from "../../../Components/CustomTable";
import withFilters from "../../../HOC/withFilters";
import { useFormStatus } from "../../../Hooks/useFormStatus";
import { getAll } from "../../../Services/Api";

const BookingLogsTable = ({ filters, setFilters, pagination, updatePagination }) => {
  const [bookingLogs, setBookingLogs] = useState([]);
  const { isSubmitting, startSubmitting, stopSubmitting } = useFormStatus();
  const [totalEarning, setTotalEarning] = useState([]);

  const fetchBookingLogs = async () => {
    try {
      startSubmitting(true);
      const url = `/admin/paymentlogs/booking`
      const response = await getAll(url, filters);
      if (response?.payment_logs) {
        setTotalEarning(response?.payment_logs?.total_earnings)

        const { total, per_page, current_page, to } = response.payment_logs.data.meta;
        setBookingLogs(response.payment_logs.data.data);
        updatePagination({
          showData: to,
          currentPage: current_page,
          totalRecords: total,
          totalPages: Math.ceil(total / per_page),
        });
      }
    } catch (error) {
      console.error("Error fetching Booking Logs:", error);
    } finally {
      stopSubmitting(false);
    }
  };

  useEffect(() => {
    fetchBookingLogs();
  }, [filters]);

  if (isNullOrEmpty(bookingLogs)) {
    return (
      <div className="dashCard mt-4">
        <div className="row mb-3">
          <div className="col-12">loading...</div>
        </div>
      </div>
    );
  }

  return (
    <>
      <h2 className="text-end fs-4 fw-bold">Total Earnings: ${totalEarning}</h2>
      <div className="dashCard mt-4">
        <div className="row mb-3">
          <div className="col-12">
            <CustomTable
              filters={filters}
              setFilters={setFilters}
              loading={isSubmitting}
              headers={paymentLogBookingHeaders}
              pagination={pagination}
              dateFilters={[
                {
                  title: "Booking Date",
                  from: "from",
                  to: "to",
                },
              ]}
            >
              <tbody>
                {bookingLogs?.map((item, index) => (
                  <tr key={item?.id}>
                    <td>{serialNum((filters.page - 1) * filters.per_page + index + 1)}</td>
                    <td>#{item?.booking?.booking_id}</td>
                    <td>${item?.booking?.amount}</td>
                    <td>${item?.booking?.commission}</td>
                    <td>{dateFormat(item?.payment_date)}</td>
                    <td>${item?.payment_amount}</td>
                  </tr>
                ))}
              </tbody>
            </CustomTable>
          </div>
        </div>
      </div>
    </>
  );
};

export default withFilters(BookingLogsTable);
