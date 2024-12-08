import { useState } from "react";
import "./FindDoctorSearchIC.scss";
import findDocImg from "../../../assets/find-doc-bg.png";
import { IoMdClose } from "react-icons/io";
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
  speciality: specialitiesSelected,
  onSearch,
  setSpeciality,
}: {
  speciality: string;
  onSearch: (str: string) => void;
  setSpeciality: (val: string) => void;
}) => {
  const [doctorResultHidden, setDoctorResultHidden] = useState(true);
  const [search, setSearch] = useState("");
  const [specialities] = useState(initSpeciality);

  const filteredSpeicialities = specialities.filter(
    (item) =>
      !specialitiesSelected.toLocaleLowerCase().includes(item.toLowerCase())
  );

  const specialitiesSelectedList = specialitiesSelected
    ? specialitiesSelected.split(",")
    : [];

  const handleDoctorSelect = (specialityNewValue: string) => {
    setDoctorResultHidden(true);

    setSpeciality([...specialitiesSelectedList, specialityNewValue].join(","));
  };

  const removeSpeciality = (sp: string) => {
    const filtered = specialitiesSelectedList.filter(
      (item) => item.toLowerCase() !== sp.toLowerCase()
    );
    setSpeciality(filtered.join(","));
  };

  return (
    <div className="finddoctor">
      <center>
        <h1>Find a doctor and Consult instantly</h1>
        <div hidden={!!specialitiesSelected} className="find-doc-img-wrapper">
          <img className="find-doc-img" src={findDocImg} alt="Find a doctor" />
        </div>
        <div className="home-search-container">
          <div className="doctor-search-box">
            <div data-testid="search-bar" className="search-bar">
              {specialitiesSelectedList.map((item) => (
                <div
                  key={item}
                  className="specialities-item"
                  onClick={() => removeSpeciality(item)}
                >
                  <span>{item}</span>
                  <IoMdClose className="close-icon" />
                </div>
              ))}

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
              hidden={doctorResultHidden || !filteredSpeicialities.length}
            >
              <div className="results-content">
                {filteredSpeicialities.map((speciality) => (
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
