import { useEffect, useState } from "react";
import { getAll } from "../../../Services/Api";

// import Stats1 from "../../../Assets/images/stats1.svg?react";
// import Stats2 from "../../../Assets/images/stats2.svg?react";
// import Stats3 from "../../../Assets/images/stats3.svg?react";
// import Stats4 from "../../../Assets/images/stats4.svg?react";

// import { Graph } from "../../../Components/Graph";
import { DashboardLayout } from "../../../Components/Layouts/AdminLayout/DashboardLayout";
// import StatCard from "../../../Components/StatsCard";
// import { chartStatus } from "../../../Config/TableStatus";

import moment from "moment";
import { Col, Container, Form, Row, Spinner } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { isNullOrEmpty } from "../../../Utils/helper";

const cardsInfo = {
   earning: {
      id: 1,
      // image: Stats1,
      text: "total earning",
      graphText: "Total Earning",
      graphType: "bar",
      apiPath: "/admin/dashboard/chartEarningStats",
      dataKey: "monthly_earnings",
      totalKey: "total_earnings",
   },
   booking: {
      id: 2,
      // image: Stats2,
      text: "new bookings",
      graphText: "New Bookings Received",
      graphType: "line",
      apiPath: "/admin/dashboard/chartBookingStats",
      dataKey: "monthly_bookings",
      totalKey: "total_bookings",
   },
   users: {
      id: 3,
      // image: Stats3,
      text: "new users",
      graphText: "New Users Registered",
      graphType: "bar",
      apiPath: "/admin/dashboard/stats",
      dataKey: "monthly_users",
      totalKey: "total_users",
   },
   providers: {
      id: 4,
      // image: Stats4,
      text: "new service provider",
      graphText: "New Service Provider Registered",
      graphType: "bar",
      apiPath: "/admin/dashboard/stats",
      dataKey: "monthsProviders",
      totalKey: "total_consultants",
   },
};

const Dashboard = () => {
   const [dateRange, setDateRange] = useState([null, null]);
   const [defaultData, setDefaultData] = useState({
      earning: null,
      booking: null,
      users: null,
      providers: null,
   });
   const [filteredData, setFilteredData] = useState(null);
   const [loading, setLoading] = useState(false);

   useEffect(() => {
      const fetchDefault = async () => {
         setLoading(true);
         const newDefaultData = {};
         for (const key in cardsInfo) {
            try {
               const res = await getAll(cardsInfo[key].apiPath);
               newDefaultData[key] = res.data;
            } catch (error) {
               console.error("Error fetching default data for", key, error);
               newDefaultData[key] = null;
            }
         }
         setDefaultData(newDefaultData);
         setLoading(false);
      };
      fetchDefault();
   }, []);

   useEffect(() => {
      const fetchFiltered = async () => {
         if (!dateRange[0] || !dateRange[1]) {
            setFilteredData(null);
            return;
         }
         setLoading(true);
         try {
            const startDate = moment(dateRange[0]).format("YYYY-MM-DD");
            const endDate = moment(dateRange[1]).format("YYYY-MM-DD");

            const newFilteredData = {};
            for (const key in cardsInfo) {
               const res = await getAll(`${cardsInfo[key].apiPath}?startDate=${startDate}&endDate=${endDate}`);
               newFilteredData[key] = res.data;
            }
            setFilteredData(newFilteredData);
         } catch (error) {
            console.error("Error fetching filtered data", error);
            setFilteredData(null);
         }
         setLoading(false);
      };
      fetchFiltered();
   }, [dateRange]);

   const dataToUse = filteredData || defaultData;

   const cardsToRender = Object.entries(cardsInfo).map(([key, info]) => {
      const dataSource = dataToUse[key];
      if (!dataSource) return null;

      const number = dataSource[info.totalKey];
      if (number === undefined || number === null) return null;

      return {
         id: info.id,
         image: info.image,
         number,
         text: info.text,
         change: number,
         increase: true,
         arrowIcon: true,
         total_post: "Since last week",
         key,
      };
   });

   const isAllDataEmpty =
      isNullOrEmpty(defaultData.earning) &&
      isNullOrEmpty(defaultData.booking) &&
      isNullOrEmpty(defaultData.users) &&
      isNullOrEmpty(defaultData.providers);

   if (isAllDataEmpty) {
      return (
         <DashboardLayout pageTitle="Dashboard">
            <div className="d-flex justify-content-center align-items-center py-5">
               <Spinner animation="border" />
               <span className="ms-2">Loading dashboard...</span>
            </div>
         </DashboardLayout>
      );
   }

   return (
      <DashboardLayout pageTitle="Dashboard">
         {/* Date Picker */}
         <Container fluid className="mb-3 d-flex align-items-center gap-3 justify-content-end">
            <Form.Group className="d-flex align-items-center gap-2 mb-2 inputWrapper">
               <Form.Label className="mb-0 mainLabel">Select Date Range:</Form.Label>
               <DatePicker
                  selectsRange
                  startDate={dateRange[0]}
                  endDate={dateRange[1]}
                  onChange={(update) => setDateRange(update)}
                  isClearable
                  placeholderText="Select date range"
                  disabled={loading}
                  dateFormat="yyyy-MM-dd"
                  className="mainInput statdate-picker"
               />
            </Form.Group>
         </Container>

         {/* Loader */}
         {loading && (
            <div className="text-center my-4">
               <Spinner animation="border" role="status" />
               <span className="ms-2">Loading data...</span>
            </div>
         )}

         {/* Cards & Graphs */}
         {!loading && (
            <Container fluid>
               <Row>
                  {cardsToRender.map((card) =>
                     card ? (
                        <Col key={card.id} md={6} className="mb-3">
                           {/* <StatCard item={card} /> */}
                        </Col>
                     ) : null
                  )}
               </Row>

               {Object.entries(cardsInfo).map(([key, info]) => {
                  const d = dataToUse[key];
                  if (!d || !Array.isArray(d[info.dataKey])) return null;

                  return (
                     <Row key={key} className="mb-3">
                        <Col xs={12}>
                           {/* <Graph
                              type={info.graphType}
                              item={{
                                 heading: info.graphText,
                                 label: info.graphText,
                                 fill: true,
                                 data: d[info.dataKey],
                              }}
                              options={chartStatus}
                              text={info.graphText}
                              backgroundColor="#1A8C1A"
                              borderColor="#1A8C1A"
                           /> */}
                        </Col>
                     </Row>
                  );
               })}
            </Container>
         )}
      </DashboardLayout>
   );
};

export { Dashboard };
export default Dashboard;
