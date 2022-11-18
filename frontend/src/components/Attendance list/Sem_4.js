import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./attendance.css";
import List from "./List";
const Sem_4 = () => {
  const [students, setstudents] = useState([]);
  const [status, setstatus] = useState({});
  const [subject, setsubject] = useState("");
  const fetchdata = async () => {
    const response = await fetch("http://localhost:4000/attendance", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    let data1 = json.data.filter((data) => data.semester == "Sem-4");
    setstudents(data1);
  };
  useEffect(() => {
    fetchdata();
  }, []);

  async function Submit(e) {
    e.preventDefault();
    const response = await fetch("http://localhost:4000/attendance/sem4", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subject,
        status,
      }),
    });
  }

  return (
    <>
      <div className="main">
        <h1>Sem 4 attendance</h1>
        <div className=" mb-3">
          <label className="form-label">Select Subject</label>
          <select
            type="text"
            className="form-control"
            id="subject"
            name="subject"
            value={subject}
            onChange={(e) => setsubject(e.target.value)}>
            <option>Select Subject</option>
            <option value="Research Methods in Informatics">
              Research Methods in Informatics
            </option>
            <option value="Internet of Things Systems, Security and Cloud">
              Internet of Things Systems, Security and Cloud
            </option>
            <option value="Dissertation Project">Dissertation Project</option>
            <option value="Health Informatics">Health Informatics</option>
          </select>
        </div>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Student</th>
              <th>Present</th>
            </tr>
          </thead>
          <tbody>
            <List students={students} status={status} setstatus={setstatus} />
          </tbody>
        </table>
      </div>
      <button onClick={Submit}>Submit</button>
    </>
  );
};

export default Sem_4;
