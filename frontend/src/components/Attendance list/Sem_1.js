import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./attendance.css";
import List from "./List";
const Sem_1 = () => {
  const [students, setstudents] = useState([]);
  const [status, setstatus] = useState({});
  const unmesh=false
  const nitisha = true
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
    let data1 = json.data.filter((data) => data.semester == "Sem-1");
    setstudents(data1);
  };
  useEffect(() => {
    fetchdata();
  }, []);

  async function Submit(e) {
    e.preventDefault();
    const response = await fetch("http://localhost:4000/attendance/sem1", {
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
      <h1>Sem 1 attendance</h1>
      {unmesh && <div className=" mb-3">
        <label className="form-label">Select Subject</label>
        <select
          type="text"
          className="form-control"
          id="subject"
          name="subject"
          value={subject}
          onChange={(e) => setsubject(e.target.value)}>
          <option required>Select Subject</option>
       
          {/* <option value="Software Design & Programming">
            Software Design & Programming
          </option> */}
          <option value="Algorithms And Data Structure">
            Algorithms and Data Structure
          </option>
          {/* <option value="Computer System Architecture">
            Computer System Architecture
          </option>
          <option value="Mathematical Foundation Of Computing">
            Mathematical Foundation of Computing
          </option> */}
        </select>
      </div>}
      {nitisha && <div className=" mb-3">
        <label className="form-label">Select Subject</label>
        <select
          type="text"
          className="form-control"
          id="subject"
          name="subject"
          value={subject}
          onChange={(e) => setsubject(e.target.value)}>
          <option required>Select Subject</option>
       
          <option value="Software Design & Programming">
            Software Design & Programming
          </option>
          {/* <option value="Algorithms And Data Structure">
            Algorithms and Data Structure
          </option> */}
          {/* <option value="Computer System Architecture">
            Computer System Architecture
          </option>
          <option value="Mathematical Foundation Of Computing">
            Mathematical Foundation of Computing
          </option> */}
        </select>
      </div>}
      
      <div className="main">
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

export default Sem_1;
