import React, { createContext, useEffect, useMemo, useState } from "react";
import { api } from "../api/api";

const AuthContext = createContext({
  userToken: null,
  isLoggedIn: false,
  login: (token, userData) => {},
  logout: () => {},
});

export const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("app_authLogin") || false
  );
  const token = localStorage.getItem("app_authUserToken");

  const [userToken, setUserToken] = useState(token);
  useEffect(() => {
    if (userToken) {
      api.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;
    }
  }, [userToken]);

  const loginHandler = (token, role, status, totalStamps, usedStamps) => {
    localStorage.setItem("app_authLogin", "true");
    localStorage.setItem("app_authUserToken", token);
    setIsLoggedIn(true);
    setUserToken(token);
  };
  const logoutHandler = () => {
    localStorage.removeItem("app_authLogin");
    localStorage.removeItem("app_authUserToken");
    setIsLoggedIn(false);
    setUserToken(null);
  };

  const value = useMemo(
    () => ({
      userToken: userToken,
      isLoggedIn: isLoggedIn,
      login: loginHandler,
      logout: logoutHandler,
    }),
    //eslint-disable-next-line
    [userToken, isLoggedIn]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
