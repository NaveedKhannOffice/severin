import { useEffect, useState } from "react";
import { DashboardLayout } from "../../../Components/Layouts/AdminLayout/DashboardLayout";
import CustomButton from "../../../Components/Common/CustomButton";
import ArticlesTable from "./ContentManagementTables/ArticlesTable";
import BlogsTable from "./ContentManagementTables/BlogsTable";
import EBooksTable from "./ContentManagementTables/EBooksTable";
import VideosTable from "./ContentManagementTables/VideosTable";
import { useSearchParams } from "react-router-dom";

const ContentManagement = () => {
  const [activeTab, setActiveTab] = useState("blogs");
  const [searchParams] = useSearchParams();
  useEffect(() => {
    let tab = searchParams.get("tab");
    if (tab) setActiveTab(tab);
  }, []);

  const renderTab = () => {
    switch (activeTab) {
      case "blogs":
        return (
          <>
            <BlogsTable />
            <ArticlesTable />
          </>
        );
      case "videos":
        return <VideosTable />;
      case "eBook":
        return <EBooksTable />;
      default:
        return (
          <>
            <BlogsTable />
            <ArticlesTable />
          </>
        );
    }
  };
  return (
    <DashboardLayout pageTitle="Content Management">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 mb-5">
            <div className="row my-4">
              <div className="col-12">
                <h2 className="mainTitle mb-0">Content Management</h2>
              </div>
            </div>
            <div className="mt-5 d-flex justify-content-center">
              <CustomButton
                className={`site-btn tab-btn ${
                  activeTab === "blogs" && "tab-selected"
                } text-decoratio-none leftBordersRounded`}
                text="Blogs & Articles"
                onClick={() => setActiveTab("blogs")}
              />
              <CustomButton
                className={`site-btn tab-btn ${
                  activeTab === "videos" && "tab-selected"
                } text-decoration-none notRoundedBorders `}
                text="Videos"
                onClick={() => setActiveTab("videos")}
              />
              <CustomButton
                className={`site-btn tab-btn ${
                  activeTab === "eBook" && "tab-selected"
                } text-decoration-none rightBordersRounded`}
                text="E-Book"
                onClick={() => setActiveTab("eBook")}
              />
            </div>
            {renderTab()}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ContentManagement;
