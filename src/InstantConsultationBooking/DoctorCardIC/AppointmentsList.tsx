import { Appointment } from "../types";

const AppointmentsList = ({
  appointments,
  handleCancel,
}: {
  appointments: Appointment[];
  handleCancel: (id: string) => void;
}) => {
  return (
    <>
      <h3 style={{ textAlign: "center" }}>Appointment Booked!</h3>
      {appointments.map((appointment) => (
        <div className="bookedInfo" key={appointment.id}>
          <p>Name: {appointment.name}</p>
          <p>Phone Number: {appointment.phoneNumber}</p>
          <button onClick={() => handleCancel(appointment.id)}>
            Cancel Appointment
          </button>
        </div>
      ))}
    </>
  );
};

export default AppointmentsList;
