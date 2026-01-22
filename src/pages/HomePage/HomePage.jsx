import HomePageGuest from "./HomePageGuest";
import HomePageUser from "./HomePageUser";
import { useSelector } from "react-redux";

const HomePage = () => {
  const isAuthenticated = useSelector(
    (state) => state.userData.isAuthenticated,
  );

  return isAuthenticated ? <HomePageUser /> : <HomePageGuest />;
};

export default HomePage;
