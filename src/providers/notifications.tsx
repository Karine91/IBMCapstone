import React from "react";
import { Appointment } from "../types";

const NotificationsContext = React.createContext<NotificationsContextValue>(
  {} as NotificationsContextValue
);
NotificationsContext.displayName = "NotificationsContext";

type NotificationsContextValue = {
  notifications: Appointment[];
  setNotifications: React.Dispatch<React.SetStateAction<Appointment[]>>;
};

export const NotificationsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [notifications, setNotifications] = React.useState<Appointment[]>([]);

  const value: NotificationsContextValue = {
    notifications,
    setNotifications,
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
