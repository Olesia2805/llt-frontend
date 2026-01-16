import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { logout as logoutApi, refreshTokens } from "../app/auth.api";
import { getCurrentUser } from "../app/user.api";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        setIsRefreshing(false);
        return;
      }

      try {
        await refreshTokens();

        const userData = await getCurrentUser();
        setUser(userData);
        setIsAuthenticated(true);
      } catch (err) {
        console.error("Auth init failed:", err);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setIsRefreshing(false);
      }
    };

    initAuth();
  }, []);

  const login = (userData, tokens) => {
    setUser(userData);
    setIsAuthenticated(true);

    localStorage.setItem("accessToken", tokens.access);
    localStorage.setItem("refreshToken", tokens.refresh);
  };

  const logout = async () => {
    await logoutApi();
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isRefreshing,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
