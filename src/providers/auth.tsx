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
  saveToken: (token: string) => void;
  user: User | null;
  token: string | null;
  isLoggedIn: boolean;
  setProfile: (user: User | null) => void;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUserData] = React.useState<User | null>(getUserData);
  const [token, setToken] = React.useState<string | null>(
    sessionStorage.getItem("authToken")
  );

  const logout = () => {
    sessionStorage.removeItem("userData");
    sessionStorage.removeItem("authToken");
    setToken(null);
    setUserData(null);
  };

  const saveToken = (token: string) => {
    sessionStorage.setItem("authToken", token);
    setToken(token);
  };

  const setProfile = (user: User | null) => {
    sessionStorage.setItem("userData", JSON.stringify(user));
    setUserData(user);
  };

  const value: AuthContextValue = {
    logout,
    saveToken,
    user,
    token,
    isLoggedIn: Boolean(token),
    setProfile,
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
