import { useEffect, useState } from "react";
import "./InstantConsultation.css";
import { useSearchParams } from "react-router-dom";
import FindDoctorSearchIC from "./FindDoctorSearchIC/FindDoctorSearchIC";
import DoctorCardIC from "./DoctorCardIC/DoctorCardIC";
import { IDoctor } from "../../types";

const InstantConsultation = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [doctors, setDoctors] = useState<IDoctor[]>([]);
  const [searchText, setSearchText] = useState("");

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

  const getDoctorsDetails = () => {
    fetch("https://api.npoint.io/9a5543d36f1460da2f63")
      .then((res) => res.json())
      .then((data: IDoctor[]) => {
        setDoctors(data);
      })
      .catch((err) => console.log(err));
  };
  const handleSearch = (searchText: string) => {
    setSearchText(searchText);
  };
  //const navigate = useNavigate();
  useEffect(() => {
    getDoctorsDetails();
    // const authtoken = sessionStorage.getItem("auth-token");
    // if (!authtoken) {
    //     navigate("/login");
    // }
  }, [searchParams]);

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
        <div className="search-results-container">
          {searchText || speciality ? (
            <div className="search-results">
              <h2>
                {filteredDoctors.length} doctors are available{" "}
                {searchParams.get("location")}
              </h2>
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
