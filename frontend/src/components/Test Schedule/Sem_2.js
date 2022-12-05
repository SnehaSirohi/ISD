import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import jwt from 'jsonwebtoken'
import { useNavigate } from "react-router-dom"
import Navbar from "../Teacher_dashboard/Navbar";
import "./testschedule.css";
import './TS.css'

const Sem_2 = () => {
  //
  const navigate = useNavigate();
  const [subject, setsubject] = useState("");
  const [date, setdate] = useState("");
  const [time, settime] = useState("");
  const [message, setmessage] = useState("");
  const [warning, setwarning] = useState("");
  const [UnmeshShukla, setUnmeshShukla] = useState(false)
  const [NitishaAgg, setNitishaAgg] = useState(false)
  const [MKDas, setMKDas] = useState(false)
  const [Sanjeev, setSanjeev] = useState(false)
  const [teacher, setTeacher] = useState("")
  const sem = "Sem-2";
  //-----------
  async function populate(e) {
    const req = await fetch('http://localhost:4000/scheduletest', {
      headers: {
        'x-access-token': localStorage.getItem('token'), //
      },
    })
    const data = await req.json();
    setTeacher(data.name)
    console.log(data)
    if (data.name == "Unmesh Shukla") {
      setUnmeshShukla(true)
    }
    if (data.name == "Nitisha Aggarwal") {
      setNitishaAgg(true)
    }
    if (data.name == "M.K Das") {
      setMKDas(true)
    }
    if (data.name == "Sanjeev") {
      setSanjeev(false)
    }
  }

  async function schedule(e) {
    e.preventDefault();
    if(subject && time && date)
    {
  
      const response = await fetch("http://localhost:4000/scheduletest", {
        method: "POST",
        headers: {
          Accept: "application/json",//
          "Content-Type": "application/json", //
          'x-access-token': localStorage.getItem('token'),
        },
        body: JSON.stringify({
          subject,
          sem,
          date,
          time,
          message,
          teacher
        }),
      }).then(async (response) => {
        let data = await response.json();
        console.log(data);
        setwarning(data.warning)
      });
    }
    else
    {
      alert("Please fill all the neccessary fields!")
    }

  }

  //--------------------
  useEffect(() => {
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
  }, [])

  return (
    <>
    <Navbar />
      <form onSubmit={schedule}>
        <div className=" mb-3">
          <h1 className="test-1">Test Schedule</h1>
          <div className=" mb-3">
            {NitishaAgg && <div className="selectsubjectcontainer">

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

            {UnmeshShukla && <div className="selectsubjectcontainer">

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

            {MKDas && <div className="selectsubjectcontainer">

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

            {Sanjeev && <div className="selectsubjectcontainer">

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

          </div>
          <div className="abc-1">
        <div className="mb-3 text-center">
          <label htmlFor="date" className="test-form-label">
            Date
          </label>
          <input
            type="date"
            className="test-form-label"
            id="date"
            aria-describedby="date"
            value={date}
            onChange={(e) => setdate(e.target.value)}
          />
        </div>
        <div className="mb-3 text-center">
          <label htmlFor="time"  className="test-form-label">
            time
          </label>
          <input
            type="time"
            className="test-form-label"
            id="time"
            value={time}
            onChange={(e) => settime(e.target.value)}
          />
        </div>
        </div>
        <div class="mb-3">
        <div class="test-msg">
          <label for="exampleFormControlTextarea1" class="test-form-label-1">
            Message
          </label>
        </div>
          <textarea
            type="text"
            class="test-form-control-3"
            id="exampleFormControlTextarea1"
            rows="3"
            placeholder="Optional"
            value={message}
            onChange={(e) => setmessage(e.target.value)}></textarea>
        </div>
        <div className="btn-test">
        <button type="submit" className="btn btn-primary">
          Schedule Test
        </button>
        </div>
        
        {warning && <div className="container warning">
          <h3>{warning}</h3>
          <button onClick={(e) => setwarning(false)}>Ok</button>
        </div>}
        </div>
      </form>
    </>
  );
};

export default Sem_2;
