import React, { useEffect, useState } from "react";
import CustomTable from "../../../Components/CustomTable";
import withFilters from "../../../HOC/withFilters";
import { useFormStatus } from "../../../Hooks/useFormStatus";
import { dateFormat, serialNum } from "../../../Utils/helper";
import { paymentLogOrderHeaders } from "../../../Config/TableHeaders";
import { paymentLogsOrderData } from "../../../Config/data";
import { isNullOrEmpty } from "../../../Utils/helper";
import { getAll } from "../../../Services/Api";

const OrderLogsTable = ({ filters, setFilters, pagination, updatePagination }) => {
  const [orderLogs, setOrderLogs] = useState([]);
  const { isSubmitting, startSubmitting, stopSubmitting } = useFormStatus();
  const [totalEarning, setTotalEarning] = useState([]);

  const fetchOrders = async () => {
    try {
      startSubmitting(true);
      const url = `/admin/paymentlogs/order`
      const response = await getAll(url, filters);
      if (response?.payment_logs) {
        setTotalEarning(response?.payment_logs?.total_earnings)

        const { total, per_page, current_page, to } = response.payment_logs.data.meta;
        setOrderLogs(response.payment_logs.data.data);
        updatePagination({
          showData: to,
          currentPage: current_page,
          totalRecords: total,
          totalPages: Math.ceil(total / per_page),
        });
      }
    } catch (error) {
      console.error("Error fetching Orders:", error);
    } finally {
      stopSubmitting(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [filters]);

  if (isNullOrEmpty(orderLogs)) {
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
              headers={paymentLogOrderHeaders}
              pagination={pagination}
              dateFilters={[
                {
                  title: "Order Date",
                  from: "from",
                  to: "to",
                },
              ]}
            >
              <tbody>
                {orderLogs?.map((item, index) => (
                  <tr key={item?.id}>
                    <td>{serialNum((filters.page - 1) * filters.per_page + index + 1)}</td>
                    <td>#{item?.order?.order_id}</td>
                    <td>{item?.order?.shop?.name}</td>
                    <td>{item?.user?.first_name + " " + item?.user?.last_name}</td>
                    <td>${item?.order?.commission}</td>
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

export default withFilters(OrderLogsTable);
