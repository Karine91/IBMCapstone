import { useUser } from "../../providers/auth";
import Popup from "reactjs-popup";
import { useRef, useEffect, RefObject } from "react";
import "./styles.scss";
import { PopupActions } from "reactjs-popup/dist/types";
import { useNotifications } from "../../providers/notifications";
import PubSub from "pubsub-js";
import { ADD_APPOINTMENT } from "../../providers/appointments";
import { Link } from "react-router-dom";

const UserMenu = () => {
  const { user } = useUser();
  const { notifications } = useNotifications();
  const ref = useRef<any>() as RefObject<PopupActions>;
  const timeRef = useRef<NodeJS.Timeout>();

  const showNotifications = () => {
    ref.current?.open();
    timeRef.current = setTimeout(() => {
      ref.current?.close();
    }, 3000);
  };

  useEffect(() => {
    const token = PubSub.subscribe(ADD_APPOINTMENT, showNotifications);

    return () => {
      clearTimeout(timeRef.current);
      PubSub.unsubscribe(token);
    };
  }, []);

  if (!user) return;

  return (
    <div className="user-menu" data-testid="userMenu">
      <Popup
        className="user-menu-popup"
        ref={ref}
        trigger={
          <button
            className="user-welcome-btn"
            onClick={() => ref.current?.toggle()}
          >
            Welcome, {user.name || user.email}
            {notifications.length ? (
              <div className="notifications-count">{notifications.length}</div>
            ) : null}
          </button>
        }
        position="bottom center"
      >
        <div className="popup-content-wrapper">
          <Link
            to="/profile"
            className="link"
            onClick={() => ref.current?.close()}
          >
            My Profile
          </Link>
          {notifications.length ? <hr /> : null}
          <div className="notifications" data-testid="userMenuPopup">
            {notifications.reverse().map((item, ind) => (
              <div className="notification" key={ind}>
                <div>
                  <span>Doctor:</span> {item.doctor.name}
                </div>
                <div>
                  <span>Speciality:</span> {item.doctor.speciality}
                </div>
                <div>
                  <span>Name:</span> {item.name}
                </div>
                <div>
                  <span>Date of Appointment:</span> {item.date}
                </div>
                <div>
                  <span>Time Slot:</span> {item.time.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Popup>
    </div>
  );
};

export default UserMenu;
