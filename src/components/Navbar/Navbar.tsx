import "./Navbar.scss";
import { RiHeartPulseLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useUser } from "../../providers/auth";
import UserMenu from "../userMenu/UserMenu";

const Navbar = ({ variant = "dark" }: { variant?: "dark" | "light" }) => {
  const { user, logout } = useUser();

  return (
    <nav data-variant={variant} className="navbar">
      <a href="/" className="logo">
        StayHealthy
        <RiHeartPulseLine className="logo-icon" size={20} />
      </a>
      <div className="navigation">
        <ul className="nav-links">
          <li className="nav-link">
            <Link to="/">Home</Link>
          </li>
          <li className="nav-link">
            <Link to="/instant-consultation">Appointments</Link>
          </li>
          <li className="nav-link">
            <Link to="#">Health Blog</Link>
          </li>
          <li className="nav-link">
            <Link to="/reviews">Reviews</Link>
          </li>
        </ul>
        {user ? (
          <>
            <UserMenu />
            <button onClick={logout} className="btn">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/signup">
              <button className="btn">Sign Up</button>
            </Link>
            <Link to="/login">
              <button className="btn">Login</button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
