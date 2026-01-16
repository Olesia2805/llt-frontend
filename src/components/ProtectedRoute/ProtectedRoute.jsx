import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { ROUTER } from "../../app/routes.jsx";
import Loader from "../Loader/Loader.jsx";

const ProtectedRoute = () => {
  const { isAuthenticated, isRefreshing } = useAuth();

  if (isRefreshing) return <Loader />;

  if (!isAuthenticated) {
    return <Navigate to={ROUTER.HOME} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
