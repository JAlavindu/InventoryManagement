import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../store/auth-context";

const ProtectedRoute = ({ element, requiredRole }) => {
  const { isAuthenticated, user, loading } = useContext(AuthContext);
  const location = useLocation();

  console.log(
    "ProtectedRoute - loading:",
    loading,
    "isAuthenticated:",
    isAuthenticated,
    "user id:",
    user?.userId,
    "user:",
    user,
    "requiredRole:",
    requiredRole,
    "location:",
    location.pathname
  );

  if (loading) {
    console.log("Loading state active, showing loading...");
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    console.log("Not authenticated, redirecting to /auth/login");
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    console.log(
      "Role mismatch - user.role:",
      user?.role,
      "required:",
      requiredRole
    );
    return <Navigate to="/unauthorized" replace />;
  }

  console.log("Rendering protected component:", element);
  return element;
};

export default ProtectedRoute;
