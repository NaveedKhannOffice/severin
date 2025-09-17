import React, { useEffect, useState } from "react";
import CustomTable from "../../../Components/CustomTable";
import withFilters from "../../../HOC/withFilters";
import { useFormStatus } from "../../../Hooks/useFormStatus";
import { dateFormat, serialNum } from "../../../Utils/helper";
import { paymentLogsInAppData } from "../../../Config/data";
import { paymentLogInAppHeaders } from "../../../Config/TableHeaders";
import { isNullOrEmpty } from "../../../Utils/helper";
import { getAll } from "../../../Services/Api";

const InAppPurchasesTable = ({ filters, setFilters, pagination, updatePagination }) => {
  const [inAppPurchasesLogs, setInAppPurchasesLogs] = useState([]);
  const [totalEarning, setTotalEarning] = useState([]);
  const { isSubmitting, startSubmitting, stopSubmitting } = useFormStatus();

  const fetchInAppPurchasesLogs = async () => {
    try {
      startSubmitting(true);
      const url = `/admin/paymentlogs/inApp`
      const response = await getAll(url, filters);
      console.log(response?.payment_logs?.data.meta);

      if (response?.payment_logs) {
        setTotalEarning(response?.payment_logs?.total_earnings)
        const { total, per_page, current_page, to } = response.payment_logs.data.meta;
        setInAppPurchasesLogs(response.payment_logs.data.data);
        updatePagination({
          showData: to,
          currentPage: current_page,
          totalRecords: total,
          totalPages: Math.ceil(total / per_page),
        });
      }
    } catch (error) {
      console.error("Error fetching In App Purchases:", error);
    } finally {
      stopSubmitting(false);
    }
  };

  useEffect(() => {
    fetchInAppPurchasesLogs();
  }, [filters]);

  if (isNullOrEmpty(inAppPurchasesLogs)) {
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
              headers={paymentLogInAppHeaders}
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
                {inAppPurchasesLogs?.map((item, index) => (
                  <tr key={item?.id}>
                    <td>{serialNum((filters.page - 1) * filters.per_page + index + 1)}</td>
                    <td>#{item?.inAppPurchase?.id}</td>
                    <td>{item?.user?.first_name + " " + item?.user?.last_name}</td>
                    <td>{dateFormat(item?.payment_date)}</td>
                    <td>${item?.inAppPurchase?.amount}</td>
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

export default withFilters(InAppPurchasesTable);
