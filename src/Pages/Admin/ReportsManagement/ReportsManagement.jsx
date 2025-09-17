import { useEffect, useState } from "react";
import { DashboardLayout } from "../../../Components/Layouts/AdminLayout/DashboardLayout";
import CustomButton from "../../../Components/Common/CustomButton";
import BookingTable from "./BookingTable";
import NewsfeedTable from "./NewsfeedTable";
import { useSearchParams } from "react-router-dom";

const ReportsManagement = () => {
  const [activeTab, setActiveTab] = useState("booking");
  const [tabWidth, setTabWidth] = useState(160);
  const [searchParams] = useSearchParams();
  useEffect(() => {
    let tab = searchParams.get("tab");
    if (tab) setActiveTab(tab);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setTabWidth(window.innerWidth < 768 ? 160 : 180);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const renderTab = () => {
    switch (activeTab) {
      case "booking":
        return <BookingTable />;
      case "newsfeed":
        return <NewsfeedTable />;
      default:
        return <BookingTable />;
    }
  };

  return (
    <DashboardLayout pageTitle="Reports Management">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="row my-4">
              <div className="col-12">
                <h2 className="mainTitle mb-0">Reports Management</h2>
              </div>
            </div>
            <div className="mt-5 mb-4 d-flex justify-content-center">
              <CustomButton
                style={{ minWidth: tabWidth, marginBottom: "8px" }}
                className={`site-btn tab-btn ${
                  activeTab === "booking" && "tab-selected"
                } text-decoratio-none leftBordersRounded`}
                text="Booking"
                onClick={() => setActiveTab("booking")}
              />

              <CustomButton
                style={{ minWidth: tabWidth, marginBottom: "8px" }}
                className={`site-btn tab-btn ${
                  activeTab === "newsfeed" && "tab-selected"
                } text-decoration-none rightBordersRounded`}
                text="Newsfeed"
                onClick={() => setActiveTab("newsfeed")}
              />
            </div>
            <div className="dashCard mt-4">{renderTab()}</div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ReportsManagement;
