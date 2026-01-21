import { useSelector } from "react-redux";

const HomePageUser = () => {
  const user = useSelector((state) => state.auth.user);

  return <h1>Welcome Back, {user?.name || "Guest"}!</h1>;
};

export default HomePageUser;
