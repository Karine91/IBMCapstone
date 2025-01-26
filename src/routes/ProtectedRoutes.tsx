import { Outlet, useNavigate } from "react-router-dom";
import { useUser } from "../providers/auth";
import { useEffect } from "react";

const ProtectedRoutes = () => {
  const { isLoggedIn } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, []);

  return <Outlet />;
};

export default ProtectedRoutes;
