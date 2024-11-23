import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import "./mainRoot.scss";

const MainRoot = () => {
  return (
    <div className="main-root">
      <Navbar variant="light" />
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
};

export default MainRoot;
