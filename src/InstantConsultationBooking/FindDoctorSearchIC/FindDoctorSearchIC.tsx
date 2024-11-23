import { useState } from "react";
import "./FindDoctorSearchIC.scss";
import { useNavigate } from "react-router-dom";
import findDocImg from "../../assets/find-doc-bg.png";
import { FaSearch } from "react-icons/fa";

const initSpeciality = [
  "Dentist",
  "Gynecologist/obstetrician",
  "General Physician",
  "Dermatologist",
  "Ear-nose-throat (ent) Specialist",
  "Homeopath",
  "Ayurveda",
];

const FindDoctorSearchIC = ({
  speciality: searchDoctor,
  onSearch,
}: {
  speciality: string;
  onSearch: (str: string) => void;
}) => {
  const [doctorResultHidden, setDoctorResultHidden] = useState(true);
  const [search, setSearch] = useState(searchDoctor);
  const [specialities] = useState(initSpeciality);
  const navigate = useNavigate();

  const handleDoctorSelect = (speciality: string) => {
    setDoctorResultHidden(true);
    navigate(`/instant-consultation?speciality=${speciality}`);
  };

  return (
    <div className="finddoctor">
      <center>
        <h1>Find a doctor and Consult instantly</h1>
        <div hidden={!!searchDoctor} className="find-doc-img-wrapper">
          <img className="find-doc-img" src={findDocImg} alt="Find a doctor" />
        </div>
        <div className="home-search-container">
          <div className="doctor-search-box">
            <div className="search-bar">
              <input
                type="text"
                className="search-doctor-input"
                placeholder="Search doctors by speciality..."
                onFocus={() => setDoctorResultHidden(false)}
                onBlur={() => setDoctorResultHidden(true)}
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  onSearch(e.target.value);
                }}
              />
              <FaSearch size={19} className="search-icon" />
            </div>

            <div
              className="search-doctor-input-results"
              hidden={doctorResultHidden}
            >
              <div className="results-content">
                {specialities.map((speciality) => (
                  <div
                    className="search-doctor-result-item"
                    key={speciality}
                    onMouseDown={() => handleDoctorSelect(speciality)}
                  >
                    <span className="speciality">{speciality}</span>
                    <span className="description">SPECIALITY</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </center>
    </div>
  );
};

export default FindDoctorSearchIC;
