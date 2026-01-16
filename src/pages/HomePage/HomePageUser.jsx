import { useEffect, useState } from "react";
import { getCurrentUser } from "../../app/user.api";
// import styles from "./HomePageUser.module.css";

const HomePageUser = () => {
  const [userName, setUserName] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getCurrentUser();
        setUserName(data.name || data.user?.name || "User");
      } catch (error) {
        console.error(error);
        setUserName("Guest");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  return <h1>Welcome Back{isLoading ? "" : `, ${userName}!`}</h1>;
};

export default HomePageUser;
