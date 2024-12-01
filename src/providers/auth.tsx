import React from "react";
import { User, Appointment } from "../types";

const getUserData = () => {
  const userData = sessionStorage.getItem("userData");

  return userData ? JSON.parse(userData) : null;
};

const AuthContext = React.createContext({} as AuthContextValue);
AuthContext.displayName = "AuthContext";

type AuthContextValue = {
  logout: () => void;
  login: (data: User) => void;
  user: User | null;

  cancelAppointment: (id: string) => void;
  addAppointment: (appointment: Appointment) => void;
  appointments: Appointment[];
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUserData] = React.useState<User | null>(getUserData);

  const [appointments, setAppointments] = React.useState<Appointment[]>([]);

  const logout = () => {
    sessionStorage.removeItem("userData");
    setUserData(null);
  };

  const login = (data: User) => {
    sessionStorage.setItem("userData", JSON.stringify(data));
    setUserData(data);
  };

  const addAppointment = (newAppointment: Appointment) => {
    setAppointments((state) => [...state, newAppointment]);
  };

  const cancelAppointment = (appointmentId: string) => {
    setAppointments((state) =>
      state.filter((appointment) => appointment.id !== appointmentId)
    );
  };

  const value: AuthContextValue = {
    logout,
    login,
    user,

    cancelAppointment,
    addAppointment,
    appointments,
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
