import React from "react";
import { Appointment } from "../types";

const NotificationsContext = React.createContext<NotificationsContextValue>(
  {} as NotificationsContextValue
);
NotificationsContext.displayName = "NotificationsContext";

type NotificationsContextValue = {
  notifications: Appointment[];
  setNotifications: (val: Appointment) => void;
  removeNotification: (id: string) => void;
};

export const NotificationsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [notifications, setNotifications] = React.useState<Appointment[]>([]);

  const onSetNotification = (newAppointment: Appointment) => {
    setNotifications((state) => [...state, newAppointment]);
  };

  const removeNotification = (appointmentId: string) => {
    setNotifications((state) =>
      state.filter((item) => item.id !== appointmentId)
    );
  };

  const value: NotificationsContextValue = {
    notifications,
    setNotifications: onSetNotification,
    removeNotification,
  };

  return (
    <NotificationsContext.Provider value={value}>
      {children}
    </NotificationsContext.Provider>
  );
};

export function useNotifications() {
  const context =
    React.useContext<NotificationsContextValue>(NotificationsContext);
  if (context === undefined) {
    throw new Error(
      `useNotifications must be used within a NotificationsContext`
    );
  }
  return context;
}
