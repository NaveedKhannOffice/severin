import { useEffect, useMemo, useState } from "react";
import moment from "moment";
import { Container, Form, Spinner } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { getAll } from "../../../Services/Api";
import { DashboardLayout } from "../../../Components/Layouts/AdminLayout/DashboardLayout";
import { isNullOrEmpty } from "../../../Utils/helper";
import "./style.css";

const cardsInfo = {
   earning: {
      id: 1,
      text: "total earning",
      graphText: "Total Earning",
      graphType: "bar",
      apiPath: "/admin/dashboard/chartEarningStats",
      dataKey: "monthly_earnings",
      totalKey: "total_earnings",
   },
   booking: {
      id: 2,
      text: "new bookings",
      graphText: "New Bookings Received",
      graphType: "line",
      apiPath: "/admin/dashboard/chartBookingStats",
      dataKey: "monthly_bookings",
      totalKey: "total_bookings",
   },
   users: {
      id: 3,
      text: "new users",
      graphText: "New Users Registered",
      graphType: "bar",
      apiPath: "/admin/dashboard/stats",
      dataKey: "monthly_users",
      totalKey: "total_users",
   },
   providers: {
      id: 4,
      text: "new service provider",
      graphText: "New Service Providers Registered",
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
         number,
         text: info.text,
         total_post: "Since last week",
         key,
      };
   });

   const summaryCards = cardsToRender.filter(Boolean);

   const metricSections = useMemo(
      () =>
         Object.entries(cardsInfo).reduce((acc, [key, info]) => {
            const dataSource = dataToUse[key];
            const metricList = dataSource?.[info.dataKey];
            if (!Array.isArray(metricList) || metricList.length === 0) {
               return acc;
            }

            acc.push({
               key,
               info,
               items: metricList,
            });
            return acc;
         }, []),
      [dataToUse]
   );

   const hasCustomRange = Boolean(dateRange[0] && dateRange[1]);
   const selectedRangeLabel = hasCustomRange
      ? `${moment(dateRange[0]).format("DD MMM YYYY")} - ${moment(dateRange[1]).format("DD MMM YYYY")}`
      : "Performance overview";

   const isAllDataEmpty =
      isNullOrEmpty(defaultData.earning) &&
      isNullOrEmpty(defaultData.booking) &&
      isNullOrEmpty(defaultData.users) &&
      isNullOrEmpty(defaultData.providers);

   const showEmptyState = !loading && summaryCards.length === 0 && metricSections.length === 0 && isAllDataEmpty;

   return (
      <DashboardLayout pageTitle="Dashboard">
         <div className="admin-dashboard">
            <Container fluid className="admin-dashboard__container">
               <div className="admin-dashboard__toolbar">
                  <Form.Group className="dashboard-date-filter__group">
                     <Form.Label className="dashboard-date-filter__label mb-0">Select Date Range</Form.Label>
                     <DatePicker
                        selectsRange
                        startDate={dateRange[0]}
                        endDate={dateRange[1]}
                        onChange={(update) => setDateRange(update)}
                        isClearable
                        placeholderText="Choose a date range"
                        disabled={loading}
                        dateFormat="yyyy-MM-dd"
                        className="mainInput statdate-picker dashboard-date-filter__picker"
                     />
                  </Form.Group>
                  <span className="dashboard-date-filter__range">{selectedRangeLabel}</span>
               </div>

               {loading && (
                  <div className="admin-dashboard__loader">
                     <Spinner animation="border" role="status" />
                     <span className="ms-2">Fetching the latest metrics...</span>
                  </div>
               )}

               {!loading && summaryCards.length > 0 && (
                  <div className="dashboard-summary-grid">
                     {summaryCards.map((card) => (
                        <article key={card.id} className="dashCard dashboard-summary-card">
                           <span className="dashboard-summary-card__label text-capitalize">{card.text}</span>
                           <span className="dashboard-summary-card__value">{card.number}</span>
                           <span className="dashboard-summary-card__meta">
                              {hasCustomRange ? "Within selected range" : card.total_post}
                           </span>
                        </article>
                     ))}
                  </div>
               )}

               {!loading && metricSections.length > 0 && (
                  <div className="dashboard-metric-grid">
                     {metricSections.map(({ key, info, items }) => (
                        <section key={key} className="dashCard dashboard-metric-card">
                           <header className="dashboard-metric-card__header">
                              <h5>{info.graphText}</h5>
                              <span>{selectedRangeLabel}</span>
                           </header>
                           <div className="dashboard-metric-card__body">
                              {items.map((item, idx) => (
                                 <div key={`${key}-${idx}`} className="dashboard-metric-pill">
                                    <span className="dashboard-metric-pill__label">
                                       {item?.month || item?.label || `Entry ${idx + 1}`}
                                    </span>
                                    <span className="dashboard-metric-pill__value">
                                       {item?.count ?? item?.value ?? item}
                                    </span>
                                 </div>
                              ))}
                           </div>
                        </section>
                     ))}
                  </div>
               )}

               {showEmptyState && (
                  <div className="admin-dashboard__empty">
                     <h4>No insights to display just yet</h4>
                     <p>
                        As soon as your shop begins collecting activity, this dashboard will surface trends and highlights automatically.
                     </p>
                  </div>
               )}
            </Container>
         </div>
      </DashboardLayout>
   );
};

export { Dashboard };
export default Dashboard;
