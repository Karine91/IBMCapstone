import AuthRoot from "./layouts/authRoot";
import MainRoot from "./layouts/MainRoot";
import Home from "./components/Home/Home";
import SignUp from "./components/SignUp/SignUp";
import Login from "./components/Login/Login";
import InstantConsultation from "./components/InstantConsultationBooking/InstantConsultation";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    element: <AuthRoot />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
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
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
