import React from "react";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import jwt from 'jsonwebtoken'
import Navbar from "../Teacher_dashboard/Navbar";
import { useNavigate } from "react-router-dom"
import './CS.css'
import "./classschedule.css";

const Sem_3 = () => {
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
  const [Manish, setManish] = useState(false)
  const [teacher, setTeacher] = useState("")
   const[success,setsuccess] = useState(false)
  const sem = "Sem-3";

  //-----------
  async function populate(e) {
    const req = await fetch('http://localhost:4000/scheduleclass', {
      headers: {
        'x-access-token': localStorage.getItem('token'), //
      },
    })
    const data = await req.json();
    setTeacher(data.name)
    if (data.name == "Unmesh Shukla") {
      setUnmeshShukla(true)
    }
    if (data.name == "Nitisha Aggarwal") {
      setNitishaAgg(true)
    }
    if (data.name == "M.K Das") {
      setMKDas(true)
    }
    if (data.name == "Manish") {
      setManish(true)
    }
  }

  async function schedule(e) {


    if (subject && time && date) {

      const req = await fetch("http://localhost:4000/scheduleclass", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
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
        setwarning(data.warning)
        setsuccess(data.success)
      });

    }
    else {
      e.preventDefault()
      if (!date) {
        document.getElementById("date").style.color = "red"
        document.getElementById("date-1").style.borderColor = "red"
        document.getElementById("date-1").style.backgroundColor = "pink"


      }
      else {
        document.getElementById("date").style.color = "black"
        document.getElementById("date-1").style.borderColor = "black"
        document.getElementById("date-1").style.backgroundColor = "white"
      }

      if (!time) {
        document.getElementById("time").style.color = "red"
        document.getElementById("time-1").style.borderColor = "red"
        document.getElementById("time-1").style.backgroundColor = "pink"
      }
      else {
        document.getElementById("time").style.color = "black"
        document.getElementById("time-1").style.borderColor = "black"
        document.getElementById("time-1").style.backgroundColor = "white"
      }

      if (!subject) {

        document.getElementById("subject").style.borderColor = "red"
        document.getElementById("subject").style.backgroundColor = "pink"

      }
      else {
        // document.getElementById("subject").style.color="black"
        document.getElementById("subject").style.borderColor = "black"
        document.getElementById("subject").style.backgroundColor = "white"
      }



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
        <div className=" mb-3 scheduledcontainer">
          <div className=" mb-3">
            <h1 className="class-1">Class Schedule</h1>
            {NitishaAgg && <div className="selectsubjectcontainer">

              <select
                type="text"
                className="form-control shadow-none"
                id="subject"
                name="subject"
                value={subject}
                onChange={(e) => setsubject(e.target.value)}>
                <option value="">Select Subject</option>
                <option value="Information System Design">
                  Information System Design
                </option>
              </select>
            </div>}
            {UnmeshShukla && <div className="selectsubjectcontainer">

              <select
                type="text"
                className="form-control shadow-none"
                id="subject"
                name="subject"
                value={subject}
                onChange={(e) => setsubject(e.target.value)}>
                <option value="">Select Subject</option>
                <option value="Cloud Computing">Cloud Computing</option>
              </select>
            </div>}
            {MKDas && <div className="selectsubjectcontainer">

              <select
                type="text"
                className="form-control shadow-none"
                id="subject"
                name="subject"
                value={subject}
                onChange={(e) => setsubject(e.target.value)}>
                <option>Select Subject</option>
                <option value="Software Engineering">Software Engineering</option>
              </select>
            </div>}
            {Manish && <div className="selectsubjectcontainer">

              <select
                type="text"
                className="form-control shadow-none"
                id="subject"
                name="subject"
                value={subject}
                onChange={(e) => setsubject(e.target.value)}>
                <option value="">Select Subject</option>
                <option value="IT Planning and Management">
                  IT Planning and Management
                </option>
              </select>
            </div>}

          </div>
          <div className="abc-1">
            <div className="class-div">
              <label htmlFor="date" className="class-form-label" id = "time">
                Date:
              </label>
              <input
                type="date"
                className="class-form-control"
                id="date-1"
                aria-describedby="date"
                value={date}
                onChange={(e) => setdate(e.target.value)}
              />
            </div>
            <div className="time-div">
              <label htmlFor="time" className="time-form-label" id = "time">
                Time:
              </label>
              <input
                type="time-1"
                className="class-form-control"
                id="time"
                value={time}
                onChange={(e) => settime(e.target.value)}
              />
            </div>
          </div>
          <div class="messagecontent">
            <label for="exampleFormControlTextarea1" class="form-label">
              Message:
            </label>
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
            <button type="submit" className="btn btn-primary">
              Schedule Class
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

export default Sem_3;
