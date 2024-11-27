import React, { ReactNode, useEffect, useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "./DoctorCardIC.scss";
import AppointmentFormIC from "../AppointmentFormIC/AppointmentFormIC";
import { v4 as uuidv4 } from "uuid";
import { IDoctor, Appointment } from "../types";
import DoctorDetails from "./DoctorDetails";
import AppointmentsList from "./AppointmentsList";
import { MdClose } from "react-icons/md";
import clsx from "clsx";

interface IProps extends IDoctor {
  className?: string;
}

const DoctorCardIC = ({ className, ...doctorDetails }: IProps) => {
  const [showModal, setShowModal] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const handleBooking = () => {
    setShowModal(true);
  };

  const handleCancel = (appointmentId: string) => {
    const updatedAppointments = appointments.filter(
      (appointment) => appointment.id !== appointmentId
    );
    setAppointments(updatedAppointments);
  };

  const handleFormSubmit = (appointmentData: Omit<Appointment, "id">) => {
    const newAppointment: Appointment = {
      id: uuidv4(),
      ...appointmentData,
    };
    const updatedAppointments = [...appointments, newAppointment];
    setAppointments(updatedAppointments);
    setShowModal(false);
  };

  return (
    <div className="doctor-card-container">
      <div className={clsx("doctor-card", className)}>
        <DoctorDetails {...doctorDetails} />

        <Popup
          trigger={
            <button
              className={`book-appointment-btn ${
                appointments.length > 0 ? "cancel-appointment" : ""
              }`}
            >
              {appointments.length > 0 ? (
                <div>Cancel Appointment</div>
              ) : (
                <div>Book Appointment</div>
              )}
            </button>
          }
          modal
          open={showModal}
          onClose={() => setShowModal(false)}
        >
          {(close) => {
            return (
              <AppointmentModal
                appointments={appointments}
                doctor={doctorDetails}
                onCancel={handleCancel}
                onSubmit={handleFormSubmit}
                onClose={close}
              />
            );
          }}
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
}: {
  appointments: Appointment[];
  doctor: IDoctor;
  onSubmit: (appointmentData: Omit<Appointment, "id">) => void;
  onCancel: (id: string) => void;
  onClose: () => void;
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
        <AppointmentFormIC
          doctorName={doctor.name}
          doctorSpeciality={doctor.speciality}
          onSubmit={onSubmit}
        />
      )}
    </div>
  );
};

export default DoctorCardIC;
