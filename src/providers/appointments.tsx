import React from "react";
import { Appointment } from "../types";

const AppointmentsContext = React.createContext({} as AppointmentsContextValue);
AppointmentsContext.displayName = "AppointmentsContext";

type AppointmentsContextValue = {
  cancelAppointment: (id: string) => void;
  addAppointment: (appointment: Appointment) => void;
  getAppointments: (doc: string) => Appointment[];
};

export const AppointmentsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [appointments, setAppointments] = React.useState<Appointment[]>([]);

  const addAppointment = (newAppointment: Appointment) => {
    setAppointments((state) => [...state, newAppointment]);
  };

  const cancelAppointment = (appointmentId: string) => {
    setAppointments((state) =>
      state.filter((appointment) => appointment.id !== appointmentId)
    );
  };

  const getAppointments = (doctor: string) => {
    return appointments.filter((item) => item.doctor.name === doctor);
  };

  const value: AppointmentsContextValue = {
    cancelAppointment,
    addAppointment,
    getAppointments,
  };

  return (
    <AppointmentsContext.Provider value={value}>
      {children}
    </AppointmentsContext.Provider>
  );
};

export function useAppointments() {
  const context =
    React.useContext<AppointmentsContextValue>(AppointmentsContext);
  if (context === undefined) {
    throw new Error(
      `useAppointments must be used within a AppointmentsContext`
    );
  }
  return context;
}
