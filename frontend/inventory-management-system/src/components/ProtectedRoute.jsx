import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../store/auth-context";
const ProtectedRoute = ({ element, requiredRole }) => {
  const { isAuthenticated, user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) return <div>Loading...</div>;

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  console.log("Rendering protected component:", element);
  return element;
};

export default ProtectedRoute;
