import React from "react";
import { User } from "../types";

const getUserData = () => {
  const userData = sessionStorage.getItem("userData");

  return userData ? JSON.parse(userData) : null;
};

const AuthContext = React.createContext({} as AuthContextValue);
AuthContext.displayName = "AuthContext";

export type AuthContextValue = {
  logout: () => void;
  login: (data: User) => void;
  user: User | null;
  isLoggedIn: boolean;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUserData] = React.useState<User | null>(getUserData);

  const logout = () => {
    sessionStorage.removeItem("userData");
    setUserData(null);
  };

  const login = (data: User) => {
    sessionStorage.setItem("userData", JSON.stringify(data));
    setUserData(data);
  };

  const value: AuthContextValue = {
    logout,
    login,
    user,
    isLoggedIn: Boolean(user),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useUser() {
  const context = React.useContext<AuthContextValue>(AuthContext);
  if (context === undefined) {
    throw new Error(`useUser must be used within a AuthContext`);
  }
  return context;
}
