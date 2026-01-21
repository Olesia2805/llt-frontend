import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { ROUTER } from "../../app/routes.jsx";
import Loader from "../Loader/Loader.jsx";

const ProtectedRoute = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isRefreshing = useSelector((state) => state.auth.isRefreshing);

  if (isRefreshing) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTER.HOME} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
