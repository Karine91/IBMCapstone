import AuthRoot from "./layouts/authRoot";
import MainRoot from "./layouts/MainRoot";
import Home from "./components/Home/Home";
import SignUp from "./components/SignUp/SignUp";
import Login from "./components/Login/Login";
import ReviewsList from "./components/reviews/ReviewsList";
import InstantConsultation from "./components/InstantConsultationBooking/InstantConsultation";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./providers/auth";
import { AppointmentsProvider } from "./providers/appointments";
import { NotificationsProvider } from "./providers/notifications";

const router = createBrowserRouter([
  {
    element: <AuthRoot />,
    path: "/",
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
    ],
  },
  {
    element: <MainRoot />,
    children: [
      {
        path: "/instant-consultation",
        element: <InstantConsultation />,
      },
      {
        path: "/reviews",
        element: <ReviewsList />,
      },
    ],
  },
]);

function App() {
  return (
    <AuthProvider>
      <AppointmentsProvider>
        <NotificationsProvider>
          <RouterProvider router={router} />
        </NotificationsProvider>
      </AppointmentsProvider>
    </AuthProvider>
  );
}

export default App;
