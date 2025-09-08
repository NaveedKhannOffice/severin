import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth";

const GuestRoutes = (props) => {
  const isAdmin = props.admin;
  const isUser = props.user;
  const isProvider = props.provider;  // Add this line



  const { role, token } = useAuth();

  if (token) {
    if (isAdmin || role === "admin") {
      return <Navigate to="/" />;
      // } else if (isUser || role === "user") {
    } else if (isUser) {
      return <Outlet />;
    } else if (isProvider || role === "service_provider") {
      // return <Navigate to="/provider"/>;
      return <Outlet />;
    } else {
      return <Navigate to="/login" />;
    }
  }
  return <Outlet />;
};

export default GuestRoutes;