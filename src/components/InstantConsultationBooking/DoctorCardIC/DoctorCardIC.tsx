import React, { useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "./DoctorCardIC.scss";
import AppointmentFormIC, {
  Inputs,
} from "../AppointmentFormIC/AppointmentFormIC";
import { v4 as uuidv4 } from "uuid";
import { IDoctor, Appointment, SelectOptions } from "../../../types";
import DoctorDetails from "../../doctors/DoctorDetails";
import BookedAppointment from "./BookedAppointment";
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
  const { getAppointment, addAppointment, cancelAppointment } =
    useAppointments();
  const appointment = getAppointment(doctorDetails.name);

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
    // close modal first to not see appointment lists while closing
    setTimeout(() => {
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
    });
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
            appointment ? "cancel-appointment" : ""
          }`}
          onClick={handleOpenModal}
        >
          {appointment ? "Cancel Appointment" : "Book Appointment"}
        </button>
        <Popup
          className="appointments-modal"
          open={showModal}
          onClose={handleCloseModal}
        >
          <AppointmentModal
            appointment={appointment}
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
  appointment,
  doctor,
  onSubmit,
  onCancel,
  onClose,
  timeSlots,
}: {
  appointment?: Appointment;
  doctor: IDoctor;
  onSubmit: (appointmentData: Inputs) => void;
  onCancel: (id: string) => void;
  onClose: () => void;
  timeSlots: SelectOptions[];
}) => {
  return (
    <div data-testid="appointment-modal" className="doctorbg">
      <div className="close-modal">
        <button onClick={onClose} className="close-button">
          <MdClose className="close-icon" />
        </button>
      </div>
      <div className="modal-doctor-details">
        <DoctorDetails {...doctor} />
      </div>

      {appointment ? (
        <BookedAppointment appointment={appointment} handleCancel={onCancel} />
      ) : (
        <AppointmentFormIC onSubmit={onSubmit} timeSlots={timeSlots} />
      )}
    </div>
  );
};

export default DoctorCardIC;
