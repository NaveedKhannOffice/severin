import "./style.css";
// import ConsolidatedNotifications from "../../../Components/ConsolidatedNotifications";
import { DashboardLayout } from "../../../Components/Layouts/AdminLayout/DashboardLayout";
import { useAuth } from "../../../Hooks/useAuth";

const Notifications = () => {

  var { role } = useAuth();
  role = role == 'provider' ? "service-provider" : role;

  const apiEndpoint = `/admin/notification/all/list`;
  return (

    <DashboardLayout pageTitle="Notifications">
      <div className="row my-4">
        <div className="col-12">
          <h2 className="mainTitle">Notifications</h2>
        </div>
      </div>
      <div className="dashCard container-fluid">
        {/* <ConsolidatedNotifications apiEndpoint={apiEndpoint} role={role} /> */}
        {/* <CustomPagination pagination={pagination} setFilters={setFilters} /> */}
      </div>
    </DashboardLayout>
  )
};

export default Notifications;
