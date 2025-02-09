import React from "react";
import { useDoctors } from "../doctors/hooks/useDoctors";
import "./style.scss";

const columns = [
  "Serial Number",
  "Doctor Name",
  "Doctor Speciality",
  "View Report",
  "Download Report",
];

const Reports = () => {
  const doctors = useDoctors();

  return (
    <div>
      <h1>Reports</h1>
      <div className="reports">
        {doctors.length ? (
          <table>
            <thead>
              <tr>
                {columns.map((item, ind) => (
                  <th key={ind}>{item}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {doctors.map((doctor, ind) => {
                return (
                  <tr key={ind}>
                    <td>{ind + 1}</td>
                    <td>{doctor.name}</td>
                    <td>{doctor.speciality}</td>
                    <td align="right">
                      <a
                        href="/reports/patient_report.pdf"
                        target="_blank"
                        className="btn"
                      >
                        View Report
                      </a>
                    </td>
                    <td align="right">
                      <a
                        href=""
                        download="/reports/patient_report.pdf"
                        className="btn"
                      >
                        Download Report
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : null}
      </div>
    </div>
  );
};

export default Reports;
