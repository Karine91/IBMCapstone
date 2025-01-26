import { useState } from "react";
import "./InstantConsultation.css";
import { useSearchParams } from "react-router-dom";
import FindDoctorSearchIC from "./FindDoctorSearchIC/FindDoctorSearchIC";
import DoctorCardIC from "./DoctorCardIC/DoctorCardIC";

import { useDoctors } from "../doctors/hooks/useDoctors";

const InstantConsultation = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchText, setSearchText] = useState("");
  const doctors = useDoctors([searchParams]);

  const speciality = searchParams.get("speciality");
  const filteredDoctors =
    speciality || searchText
      ? doctors.filter((doctor) => {
          const specialityFilter = speciality
            ? speciality
                .toLocaleLowerCase()
                .includes(doctor.speciality.toLowerCase())
            : true;
          const searchFilter = searchText
            ? doctor.name.toLowerCase().includes(searchText.toLowerCase())
            : true;
          return specialityFilter && searchFilter;
        })
      : doctors;

  const handleSearch = (searchText: string) => {
    setSearchText(searchText);
  };

  const handleSetSpeciality = (speciality: string) => {
    setSearchParams({ speciality });
  };

  return (
    <center>
      <div className="searchpage-container">
        <FindDoctorSearchIC
          speciality={searchParams.get("speciality") || ""}
          setSpeciality={handleSetSpeciality}
          onSearch={handleSearch}
        />
        <div data-testid="search-results" className="search-results-container">
          {searchText || speciality ? (
            <div className="search-results">
              <h2>{filteredDoctors.length} doctors are available </h2>
              <h3>
                Book appointments with minimum wait-time & verified doctor
                details
              </h3>

              {filteredDoctors.length > 0 ? (
                <div className="doctor-results-container">
                  {filteredDoctors.map((doctor) => (
                    <DoctorCardIC
                      className="doctorcard"
                      {...doctor}
                      key={doctor.name}
                    />
                  ))}
                </div>
              ) : (
                <p>No doctors found.</p>
              )}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </center>
  );
};

export default InstantConsultation;
