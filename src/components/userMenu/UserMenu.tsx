import { useUser } from "../../providers/auth";
import Popup from "reactjs-popup";
import { useRef, useEffect, RefObject } from "react";
import "./styles.scss";
import { PopupActions } from "reactjs-popup/dist/types";
import { useNotifications } from "../../providers/notifications";
import PubSub from "pubsub-js";
import { ADD_APPOINTMENT } from "../../providers/appointments";

const UserMenu = () => {
  const { user } = useUser();
  const { notifications } = useNotifications();
  const ref = useRef<any>() as RefObject<PopupActions>;
  const timeRef = useRef<number>();

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
    <div className="user-menu">
      {!notifications.length ? (
        <div className="user-welcome">Welcome, {user.name || user.email}</div>
      ) : (
        <Popup
          className="notification-popup"
          ref={ref}
          trigger={
            <button
              className="user-welcome-btn"
              onClick={() => ref.current?.toggle()}
            >
              Welcome, {user.name || user.email}
              {notifications.length ? (
                <div className="notifications-count">
                  {notifications.length}
                </div>
              ) : null}
            </button>
          }
          position="bottom center"
        >
          <div className="notifications-popup">
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
        </Popup>
      )}
    </div>
  );
};

export default UserMenu;
