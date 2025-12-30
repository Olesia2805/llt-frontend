import { useAuth } from "../../context/AuthContext";
import HomePageGuest from "./HomePageGuest";
import HomePageUser from "./HomePageUser";

const HomePage = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <HomePageUser /> : <HomePageGuest />;
};

export default HomePage;
