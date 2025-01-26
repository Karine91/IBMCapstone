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
              {columns.map((item, ind) => (
                <th key={ind}>{item}</th>
              ))}
            </thead>
            <tbody>
              {doctors.map((doctor, ind) => {
                return (
                  <tr>
                    <td>{ind + 1}</td>
                    <td>{doctor.name}</td>
                    <td>{doctor.speciality}</td>
                    <td align="right">
                      <button className="btn">View Report</button>
                    </td>
                    <td align="right">
                      <button className="btn">Download Report</button>
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
