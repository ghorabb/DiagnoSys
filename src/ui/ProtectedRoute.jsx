import { Navigate, Outlet, useLocation } from "react-router-dom";

function ProtectedRoute({ allowedRole }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (role !== allowedRole) {
    return <Navigate to={`/${role}`} replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
