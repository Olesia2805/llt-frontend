import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { ROUTER } from "../../app/routes.jsx";
import Loader from "../Loader/Loader.jsx";

const ProtectedRoute = () => {
  const { isAuthenticated, isRefreshing } = useSelector(
    (state) => state.userData,
  );

  if (isRefreshing) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTER.HOME} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
