import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth";

export default function PreventProvider() {
  const { role, token } = useAuth();

  if (token && role === "service_provider") {
    return <Navigate to="/provider" />;
  } else {
    return <Outlet />;
  }
}
