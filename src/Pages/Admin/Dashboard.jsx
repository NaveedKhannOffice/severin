import React from "react";
import PageHeader from "../../../Components/Common/PageHeader";
import Breadcrumbs from "../../../Components/Common/Breadcrumbs";

const AdminDashboard = () => {
  // Define breadcrumb paths directly
  const breadcrumbPaths = [["Home", "/"], ["Admin", "/admin"], ["Dashboard"]];

  // Define icon directly for this page
  const breadcrumbIcon = "👨‍💼";

  return (
    <>
      <PageHeader pageHeading="Admin Dashboard" />
      <Breadcrumbs
        paths={breadcrumbPaths}
        icon={breadcrumbIcon}
        separator="|" // Pipe separator
        className="mt-2"
      />
      <div className="container mt-4">
        <h2>Admin Dashboard</h2>
        <p>Welcome to the admin panel!</p>
      </div>
    </>
  );
};

export default AdminDashboard;
