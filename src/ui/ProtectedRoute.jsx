import { Navigate, Outlet, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function ProtectedRoute({ allowedRole }) {
  const token = localStorage.getItem("token");
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  try {
    const decoded = jwtDecode(token);
    const roleFromToken = decoded?.role?.toLowerCase();

    if (roleFromToken !== allowedRole.toLowerCase()) {
      return <Navigate to={`/${roleFromToken}`} replace />;
    }

    return <Outlet />;
  } catch (err) {
    localStorage.removeItem("token");
    return <Navigate to="/login" replace />;
  }
}

export default ProtectedRoute;
