import { useEffect, useState } from "react";
import { User } from "../types";

export function useAuth() {
  const [userData, setUserData] = useState<User | null>(null);
  useEffect(() => {
    const userData = sessionStorage.getItem("userData");
    setUserData(userData ? JSON.parse(userData) : null);
  }, []);

  const logout = () => {
    sessionStorage.removeItem("userData");
    setUserData(null);
  };

  const login = (data: User) => {
    sessionStorage.setItem("userData", JSON.stringify(data));
    setUserData(data);
  };

  return {
    user: userData,
    logout,
    login,
  };
}
