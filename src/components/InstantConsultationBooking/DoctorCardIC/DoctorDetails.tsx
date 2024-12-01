import { IDoctor } from "../../../types";
import DocPlaceholderImg from "../../../assets/doc-placeholder.png";

import "./detailsStyles.css";

const DoctorDetails = ({
  profilePic,
  experience,
  name,
  speciality,
  ratings,
}: IDoctor) => {
  return (
    <div className="doctor-card-details-container">
      <div className="doctor-card-profile-image-container">
        <img src={profilePic || DocPlaceholderImg} alt={name} />
      </div>
      <div className="doctor-card-details">
        <div className="doctor-card-detail-name">{name}</div>
        <div className="doctor-card-detail-speciality">{speciality}</div>
        <div className="doctor-card-detail-experience">
          {experience} years experience
        </div>
        <div className="doctor-card-detail-consultationfees">
          Ratings: {ratings}
        </div>
      </div>
    </div>
  );
};

export default DoctorDetails;
