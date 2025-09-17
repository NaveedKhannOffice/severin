import { useEffect, useState } from "react";
import { DashboardLayout } from "../../../Components/Layouts/AdminLayout/DashboardLayout";
import CustomButton from "../../../Components/Common/CustomButton";
import BookingLogsTable from "./BookingLogsTable";
import OrderLogsTable from "./OrderLogsTable";
import InAppPurchasesTable from "./InAppPurchasesTable";

const PaymentLogs = () => {
  const [activeTab, setActiveTab] = useState("bookingLogs");
  const [tabWidth, setTabWidth] = useState(160);
  const [showRounded, setShowRounded] = useState(false);
  const [showAllRounded, setAllRounded] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setTabWidth(window.innerWidth < 768 ? 160 : 180);
      setShowRounded(window.innerWidth < 584 ? true : false);
      setAllRounded(window.innerWidth < 360 ? true : false);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const renderTab = () => {
    switch (activeTab) {
      case "bookingLogs":
        return <BookingLogsTable />;
      case "orderLogs":
        return <OrderLogsTable />;
      case "inApp":
        return <InAppPurchasesTable />;
      default:
        return <BookingLogsTable />;
    }
  };

  return (
    <DashboardLayout pageTitle="Payment Logs">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="row my-4">
              <div className="col-12">
                <h2 className="mainTitle mb-0">Payment Logs</h2>
              </div>
            </div>
            <div className="mt-5 mb-4 d-flex flex-wrap justify-content-center">
              <CustomButton
                style={{ minWidth: tabWidth, marginBottom: "8px" }}
                className={`site-btn tab-btn ${
                  activeTab === "bookingLogs" && "tab-selected"
                } text-decoratio-none ${
                  showAllRounded ? "roundedBorders" : "leftBordersRounded"
                }`}
                text="Booking Logs"
                onClick={() => setActiveTab("bookingLogs")}
              />
              <CustomButton
                style={{ minWidth: tabWidth, marginBottom: "8px" }}
                className={`site-btn tab-btn ${
                  activeTab === "orderLogs" && "tab-selected"
                } text-decoration-none ${
                  showAllRounded
                    ? "roundedBorders"
                    : showRounded
                    ? "rightBordersRounded"
                    : "notRoundedBorders"
                }`}
                text="Order Logs"
                onClick={() => setActiveTab("orderLogs")}
              />
              <CustomButton
                style={{ minWidth: tabWidth, marginBottom: "8px" }}
                className={`site-btn tab-btn ${
                  activeTab === "inApp" && "tab-selected"
                } text-decoration-none  ${
                  showRounded ? "roundedBorders" : "rightBordersRounded"
                }`}
                text="In-App Purchases"
                onClick={() => setActiveTab("inApp")}
              />
            </div>

            {renderTab()}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PaymentLogs;
