import AuthRoot from "./routes/authRoot";
import Home from "./components/Home/Home";
import SignUp from "./components/SignUp/SignUp";
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
        element: <Home />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
