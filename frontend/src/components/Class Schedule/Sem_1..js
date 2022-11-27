import React from "react";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./classschedule.css";
import Navbar from "../Student_dashboard/Navbar.js";
import jwt from 'jsonwebtoken'
import { useNavigate } from "react-router-dom"
const Sem_1 = () => {
  //
  const navigate = useNavigate();
  const [name, setName] = useState([])
  //
  const [subject, setsubject] = useState("");
  const [date, setdate] = useState("");
  const [time, settime] = useState("");
  const [message, setmessage] = useState("");
  const sem = "Sem-1";

  //-----------
  async function populate(e) {
    const req = await fetch('http://localhost:4000/scheduleclass', {
      headers: {
        'x-access-token': localStorage.getItem('token'), //
      },
    })
    const data = await req.json();

    console.log(data)
    //added
    if (data.status === 'ok') {
      setName(data.name)
      // setEmail(data.email)
    }
  }

  async function populateinfo(e) {
    const req = await fetch('http://localhost:4000/scheduleclass', {
      method: "POST",//
      headers: {
        Accept: "application/json",//
        "Content-Type": "application/json", //
        'x-access-token': localStorage.getItem('token'), //
      },
      body: JSON.stringify({
        name,
        subject,
        sem,
        date,
        time,
      }),
    }).then(async (response) => {
      let dataa = await response.json();
      console.log(dataa);
    });
  }

  async function schedule(e) {
    e.preventDefault();

    const response = await fetch("http://localhost:4000/scheduleclass", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subject,
        sem,
        date,
        time,
        message,
      }),
    });

    const data = await response.json();
    populateinfo()

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
      <Navbar/>
      <form onSubmit={schedule}>
        <div className=" mb-3">
          <h1 className="class-1">Class Schedule</h1>
          <select
            type="text"
            className="form-control"
            id="subject"
            name="subject"
            value={subject}
            required
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

      <div className="abc-1">
        <div className="mb-3">
          <label htmlFor="date" className="class-form-label">Date:</label>
          <input
            type="date"
            className="class-form-control"
            id="date"
            aria-describedby="date"
            value={date}
            required
            onChange={(e) => setdate(e.target.value)}
          />
        </div >
        <div className="mb-3">
          <label htmlFor="time" className="time-form-label">
            Time:
          </label>
          <input
            type="time"
            className="class-form-control"
            id="time"
            value={time}
            required
            onChange={(e) => settime(e.target.value)}
          />
        </div>
      </div>
        <div class="mb-3">
        <div class="msg-1">
          <label for="exampleFormControlTextarea1" class="form-label">
            Message:
          </label>
        </div>
          <textarea
            type="text"
            class="class-form-control-1"
            id="exampleFormControlTextarea1"
            rows="3"
            placeholder="Optional"
            value={message}
            onChange={(e) => setmessage(e.target.value)}></textarea>
        </div>
        <div className="btn-class">

        <button type="submit" className="btn btn-primary" >
          Schedule Class
        </button>
      
        </div>
      </form>
    </>
  );
};

export default Sem_1;
