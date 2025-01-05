import React from "react";
import { Appointment } from "../types";

const AppointmentsContext = React.createContext({} as AppointmentsContextValue);
AppointmentsContext.displayName = "AppointmentsContext";
import PubSub from "pubsub-js";

type AppointmentsContextValue = {
  cancelAppointment: (id: string) => void;
  addAppointment: (appointment: Appointment) => void;
  getAppointment: (doc: string) => Appointment | undefined;
};

export const ADD_APPOINTMENT = "ADD_APPOINTMENT";

export const AppointmentsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [appointments, setAppointments] = React.useState<Appointment[]>([]);

  const addAppointment = (newAppointment: Appointment) => {
    setAppointments((state) => [...state, newAppointment]);
    PubSub.publish(ADD_APPOINTMENT);
  };

  const cancelAppointment = (appointmentId: string) => {
    setAppointments((state) =>
      state.filter((appointment) => appointment.id !== appointmentId)
    );
  };

  const getAppointment = (doctor: string) => {
    return appointments.find((item) => item.doctor.name === doctor);
  };

  const value: AppointmentsContextValue = {
    cancelAppointment,
    addAppointment,
    getAppointment,
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
