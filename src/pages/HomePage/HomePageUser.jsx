import { useAuth } from "../../context/AuthContext";

const HomePageUser = () => {
  const { user, isRefreshing } = useAuth();

  if (isRefreshing) return <h1>Welcome Back</h1>;

  return <h1>Welcome Back, {user?.name || "Guest"}!</h1>;
};

export default HomePageUser;
