import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./attendance.css";
import List from "./List";
import jwt from 'jsonwebtoken' //
import { useNavigate } from "react-router-dom"

const Sem_3 = () => {
  //
  const navigate = useNavigate();
  const [teachername, setTeacherName] = useState([])
  const [students, setstudents] = useState([]);
  const [status, setstatus] = useState({});
  const [subject, setsubject] = useState("");

//-----------
async function populate(e) {
  const req = await fetch('http://localhost:4000/attendance', {
    headers: {
      'x-access-token': localStorage.getItem('token'), //
    },
  })
  const data = await req.json();

  console.log(data)
  //added
  if (data.status === 'ok') {
    setTeacherName(data.name)
    // setEmail(data.email)
  }
}

async function populateinfo(e) {
  const req = await fetch('http://localhost:4000/attendance/sem3', {
    method: "POST",//
    headers: {
      Accept: "application/json",//
      "Content-Type": "application/json", //
      'x-access-token': localStorage.getItem('token'), //
    },
    body: JSON.stringify({
      teachername,
      subject,
    }),
  }).then(async (response) => {
    let dataa = await response.json();
    console.log(dataa);
  });
}

  const fetchdata = async () => {
    const response = await fetch("http://localhost:4000/attendance", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    let data1 = json.data.filter((data) => data.semester == "Sem-3");
    setstudents(data1);
  };

  useEffect(() => {
    fetchdata();
    const token = localStorage.getItem('token')
    if (token) {
      const user = jwt.decode(token)
      console.log(user)
      if (!user) {
        localStorage.removeItem('token')
        navigate("/Teacherdashboard");
      } else {
        populate()
      }
    }
  }, []);

  async function Submit(e) {
    e.preventDefault();
    const response = await fetch("http://localhost:4000/attendance/sem3", {
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
    populateinfo()
  }

  return (
    <>
      <div className="main">
        <h1>Sem 3 attendance</h1>
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
            <option value="Software Engineering">Software Engineering</option>
            <option value="Information System Design">
              Information System Design
            </option>
            <option value="IT Planning and Management">
              IT Planning and Management
            </option>
            <option value="Cloud Computing">Cloud Computing</option>
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

export default Sem_3;
