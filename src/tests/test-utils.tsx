import { NotificationsProvider } from "../providers/notifications";
import { AppointmentsProvider } from "../providers/appointments";
import { AuthProvider } from "../providers/auth";
import React, { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <AppointmentsProvider>
        <NotificationsProvider>{children}</NotificationsProvider>
      </AppointmentsProvider>
    </AuthProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
