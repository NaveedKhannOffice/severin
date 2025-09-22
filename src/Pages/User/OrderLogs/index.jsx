import { React, useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { dateFormat, serialNum, usePageTitle } from "../../../Utils/helper";
import BackButton2 from "../../../Components/Common/BackButton/BackButton2";
import withFilters from "../../../HOC/withFilters";
import { normalStatus, orderStatus } from "../../../Config/TableStatus";
import CustomTable from "../../../Components/Common/CustomTable";
import { useFormStatus } from "../../../Hooks/useFormStatus";
import { orderLogHeaders } from "../../../Config/TableHeaders";
import { orderLogsData } from "../../../Config/data";
import { Link } from "react-router-dom";
import { getAll } from "../../../Services/Api";

const OrderLogs = ({ filters, setFilters, pagination, updatePagination }) => {
  usePageTitle("Orders Logs", true);

  const [logsData, setLogsData] = useState([]);

  const { isSubmitting, startSubmitting, stopSubmitting } = useFormStatus();

  const fetchUsers = async () => {
    try {
      startSubmitting(true);
      // const response = orderLogsData;
      const response = await getAll("/user/my-orders", filters);

      if (response) {
        const { data } = response.orders;
        const { total, per_page, current_page, to } = response.orders.meta;
        setLogsData(data);
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
    fetchUsers();
  }, [filters]);

  console.log("Data", logsData);

  return (
    <>
      <section className="page-content order-logs">
        <Container fluid>
          <Row>
            <Col xs={12} className="mb-3 mb-lg-4">
              <h2 className="fw-bold mb-0 page-title">
                <BackButton2 className="me-2" />
                My order
              </h2>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <CustomTable
                filters={filters}
                setFilters={setFilters}
                loading={isSubmitting}
                headers={orderLogHeaders}
                pagination={pagination}
                dateFilters={[
                  {
                    title: "Date",
                    toTitle: "To",
                    fromTitle: "From",
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
                  {logsData?.map((item, index) => (
                    <tr key={item?.id}>
                      <td>
                        {serialNum(
                          (filters.page - 1) * filters.per_page + index + 1
                        )}
                      </td>
                      <td>#{item?.order_id}</td>
                      <td>{dateFormat(item?.created_at)}</td>
                      <td>${item?.amount}</td>
                      <td>{item?.shop?.name}</td>
                      <td className="text-capitalize">
                        <span
                          className={`ms-0 status-tag text-capitalize ${
                            item.status?.toLowerCase() == "delivered"
                              ? "text-green"
                              : item.status?.toLowerCase() == "cancelled"
                              ? "text-red"
                              : item.status?.toLowerCase() == "pending"
                              ? "text-yellowGreen"
                              : ""
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td>
                        <Link className="btn btn-link p-0" to={`/order-logs/${item.id}`}>
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </CustomTable>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};
// Additional Filters
// Additional Filters
// const additionalFilters = {
//   expiryfrom: "",
//   expiryto: "",
// };

export default withFilters(OrderLogs);
