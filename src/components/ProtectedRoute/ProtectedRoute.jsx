import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { ROUTER } from "../../app/routes.jsx";

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={ROUTER.HOME} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
