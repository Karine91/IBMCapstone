import React, { useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "./DoctorCardIC.scss";
import AppointmentFormIC, {
  Inputs,
} from "../AppointmentFormIC/AppointmentFormIC";
import { v4 as uuidv4 } from "uuid";
import { IDoctor, Appointment, SelectOptions } from "../../../types";
import DoctorDetails from "./DoctorDetails";
import AppointmentsList from "./AppointmentsList";
import { MdClose } from "react-icons/md";
import clsx from "clsx";
import { useNotifications } from "../../../providers/notifications";
import { useAppointments } from "../../../providers/appointments";

interface IProps extends IDoctor {
  className?: string;
}

const DoctorCardIC = ({ className, ...doctorDetails }: IProps) => {
  const [showModal, setShowModal] = useState(false);

  const { setNotifications, removeNotification } = useNotifications();
  const { getAppointments, addAppointment, cancelAppointment } =
    useAppointments();
  const appointments = getAppointments(doctorDetails.name);

  const [timeSlots] = React.useState([
    { value: 9, label: "9:00 - 10:00" },
    { value: 10, label: "10:00 - 11:00" },
    { value: 11, label: "11:00 - 12:00" },
    { value: 12, label: "12:00 - 13:00" },
  ]);

  const handleCancel = (appointmentId: string) => {
    cancelAppointment(appointmentId);
    removeNotification(appointmentId);

    setShowModal(false);
  };

  const handleFormSubmit = ({ time, ...appointmentData }: Inputs) => {
    setShowModal(false);
    const newAppointment: Appointment = {
      id: uuidv4(),
      time: timeSlots.find((item) => item.value === Number(time))!,
      ...appointmentData,
      doctor: {
        name: doctorDetails.name,
        speciality: doctorDetails.speciality,
      },
    };
    setNotifications(newAppointment);
    addAppointment(newAppointment);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  return (
    <div className="doctor-card-container">
      <div className={clsx("doctor-card", className)}>
        <DoctorDetails {...doctorDetails} />
        <button
          className={`book-appointment-btn ${
            appointments.length > 0 ? "cancel-appointment" : ""
          }`}
          onClick={handleOpenModal}
        >
          {appointments.length > 0 ? "Cancel Appointment" : "Book Appointment"}
        </button>
        <Popup
          className="appointments-modal"
          open={showModal}
          onClose={handleCloseModal}
        >
          <AppointmentModal
            appointments={appointments}
            timeSlots={timeSlots}
            doctor={doctorDetails}
            onCancel={handleCancel}
            onSubmit={handleFormSubmit}
            onClose={handleCloseModal}
          />
        </Popup>
      </div>
    </div>
  );
};

const AppointmentModal = ({
  appointments,
  doctor,
  onSubmit,
  onCancel,
  onClose,
  timeSlots,
}: {
  appointments: Appointment[];
  doctor: IDoctor;
  onSubmit: (appointmentData: Inputs) => void;
  onCancel: (id: string) => void;
  onClose: () => void;
  timeSlots: SelectOptions[];
}) => {
  return (
    <div className="doctorbg">
      <div className="close-modal">
        <button onClick={onClose} className="close-button">
          <MdClose className="close-icon" />
        </button>
      </div>
      <div className="modal-doctor-details">
        <DoctorDetails {...doctor} />
      </div>

      {appointments.length > 0 ? (
        <AppointmentsList appointments={appointments} handleCancel={onCancel} />
      ) : (
        <AppointmentFormIC onSubmit={onSubmit} timeSlots={timeSlots} />
      )}
    </div>
  );
};

export default DoctorCardIC;
