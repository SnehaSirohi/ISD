import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./attendance.css";
import jwt from 'jsonwebtoken' //
import List from "./List";
import Navbar from "../Student_dashboard/Navbar.js";
import { useNavigate } from "react-router-dom"

const Sem_1 = () => {
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
  const req = await fetch('http://localhost:4000/attendance/sem1', {
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
    let data1 = json.data.filter((data) => data.semester == "Sem-1");
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
    populateinfo()
  }

  return (
    <>
      <Navbar/>
      <h1>Sem 1 Attendance</h1>
<div className=" mb-3">
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
          <option value="Algorithms And Data Structure">
            Algorithms and Data Structure
          </option>
          <option value="Computer System Architecture">
            Computer System Architecture
          </option>
          <option value="Mathematical Foundation Of Computing">
            Mathematical Foundation of Computing
          </option>
        </select>
      </div>
     
      
      <div className="main">
        <table className="table table-striped">
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
