import Navbar from "../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import "./authRoot.css";

export default function AuthRoot() {
  return (
    <div className="root-wrapper">
      <Navbar />
      <div className="main">
        <Outlet />
      </div>
    </div>
  );
}
