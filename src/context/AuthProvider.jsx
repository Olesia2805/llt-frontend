import { useState } from "react";
import { AuthContext } from "./AuthContext";
import { logout as logoutApi } from "../app/auth.api";

const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (tokens) => {
    setAccessToken(tokens.accessToken);
    setRefreshToken(tokens.refreshToken);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    try {
      await logoutApi();
    } catch (err) {
      console.error("Logout failed", err);
    } finally {
      setAccessToken(null);
      setRefreshToken(null);
      setIsAuthenticated(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        refreshToken,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
