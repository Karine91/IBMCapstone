import { Appointment } from "../types";

const AppointmentsList = ({
  appointments,
  handleCancel,
}: {
  appointments: Appointment[];
  handleCancel: (id: string) => void;
}) => {
  return (
    <div className="appointment-booked">
      <h3 style={{ textAlign: "center" }}>Appointment Booked!</h3>
      {appointments.map((appointment) => (
        <div className="bookedInfo" key={appointment.id}>
          <p>
            <span>Name:</span> {appointment.name}
          </p>
          <p>
            <span>Phone Number:</span> {appointment.phoneNumber}
          </p>
          <p>
            <span>Date of Appointment:</span> {appointment.date}
          </p>
          <p>
            <span>Time Slot:</span> {appointment.time.label}
          </p>
          <button
            className="cancel-appointment-btn"
            onClick={() => handleCancel(appointment.id)}
          >
            Cancel Appointment
          </button>
        </div>
      ))}
    </div>
  );
};

export default AppointmentsList;
