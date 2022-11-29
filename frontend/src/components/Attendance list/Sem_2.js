import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./attendance.css";
import jwt from 'jsonwebtoken' //
import List from "./List";
import { useNavigate } from "react-router-dom"
const Sem_2 = () => {

  //
  const navigate = useNavigate();
  const [students, setstudents] = useState([]);
  const [status, setstatus] = useState({});
  const [subject, setsubject] = useState("");
  const [UnmeshShukla,setUnmeshShukla]=useState(false)
  const [NitishaAgg,setNitishaAgg]=useState(false)
  const [MKDas,setMKDas]=useState(false)
  const [Sanjeev,setSanjeev]=useState(false)


  const fetchdata = async () => {
    const response = await fetch("http://localhost:4000/attendance", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        'x-access-token': localStorage.getItem('token'), //
      },
    });
    const json = await response.json();
    console.log(json)
    console.log(json.name)
    if(json.name=="Unmesh Shukla")
    {
      setUnmeshShukla(true)
    }
    if(json.name=="Nitisha Aggarwal")
    {
      setNitishaAgg(true)
    }
    if(json.name=="M.K Das")
    {
      setMKDas(true)
    }
    if(json.name=="Sanjeev")
    {
      setSanjeev(false)
    }

    let data1 = json.data.filter((data) => data.semester == "Sem-2");
    setstudents(data1);
  };

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      const user = jwt.decode(token)
      console.log(user)
      if (!user) {
        localStorage.removeItem('token')
        navigate("/Teacherdashboard");
      } else {
        fetchdata();
      }
    }
  }, []);

  async function Submit(e) {
    e.preventDefault();
    const response = await fetch("http://localhost:4000/attendance/sem2", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        'x-access-token': localStorage.getItem('token'), //
      },
      body: JSON.stringify({
        subject,
        status,
      }),
    }).then(async (response) => {
      let dataa = await response.json();
      console.log(dataa);
    });

  }

  

  return (
    <>
      <div className="main">
        <h1>Sem 2 attendance</h1>
        {NitishaAgg && <div className="mb-3">
          <label className="form-label">Select Subject</label>
          <select
            type="text"
            className="form-control"
            id="subject"
            name="subject"
            value={subject}
            onChange={(e) => setsubject(e.target.value)}>
            <option>Select Subject</option>
            <option value="Computer Communication and Networks">
              Computer Communication and Networks
            </option>
            <option value="Operating Systems">Operating Systems</option>
          </select></div>}
          
        {UnmeshShukla && <div className="mb-3">
          <label className="form-label">Select Subject</label>
          <select
            type="text"
            className="form-control"
            id="subject"
            name="subject"
            value={subject}
            onChange={(e) => setsubject(e.target.value)}>
            <option>Select Subject</option>
            <option value="Database Systems">Database Systems</option>
          </select></div>}
          
        {MKDas && <div className="mb-3">
          <label className="form-label">Select Subject</label>
          <select
            type="text"
            className="form-control"
            id="subject"
            name="subject"
            value={subject}
            onChange={(e) => setsubject(e.target.value)}>
            <option>Select Subject</option> 
            <option value="Applied Machine Learning">
              Applied Machine Learning
            </option>
          </select></div>}
          
        {Sanjeev && <div className="mb-3">
          <label className="form-label">Select Subject</label>
          <select
            type="text"
            className="form-control"
            id="subject"
            name="subject"
            value={subject}
            onChange={(e) => setsubject(e.target.value)}>
            <option>Select Subject</option>
            <option value="Open Elective-1">Open Elective-1</option>
          </select></div>}
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

export default Sem_2;
