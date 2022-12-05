import React from "react";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./classschedule.css";
import Navbar from "../Teacher_dashboard/Navbar";
import jwt from 'jsonwebtoken'
import { useNavigate } from "react-router-dom"
import './CS.css'
import * as AiIcons from 'react-icons/ai';

const Sem_1 = () => {
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
  const [SunilKumar, setSunilKumar] = useState(false)
  const [teacher, setTeacher] = useState("")
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [isdot, setIsdotVisible] = useState(false);

  const handleButtonClick = () => {
    setIsdotVisible(true);
    setTimeout(() => {
      setIsdotVisible(false);
      setIsAlertVisible(true);
    }, 2000);
  }

  const sem = "Sem-1";

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
    if (data.name == "Sunil Kumar") {
      setSunilKumar(true)
    }
  }

  async function schedule(e) {
    
    e.preventDefault();
   if(subject && time && date)
   { 
   
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
    console.log(data);
    setwarning(data.warning)
  });
       
}
else
{ 

  alert("Please fill all the neccessary fields")
    
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

      <div>
        {isdot && <div class="loader"  >
          <div class="pair p1">
            <div class="dot dot-1 ">


            </div>
            <div class="dot dot-2">

            </div>
          </div>
          <div class="pair p2">
            <div class="dot dot-1">

            </div>
            <div class="dot dot-2">

            </div>
          </div>
        </div>}
      </div>
      <Navbar />
      <form onSubmit={schedule}>
        <div>
          {/* popup */}
          {isAlertVisible && <div className="popup center">
            <div class="icon">
              <i class="fa fa-check"></i>
            </div>
            <div class="title">
              Success!!
            </div>
            <div class="description">
              class is scheduled successfully
            </div>
            <div class="dismiss-btn">
              <button id="dismiss-popup-btn" onClick={() => setIsAlertVisible(false)}>
                Dismiss
              </button>
            </div>
          </div>}
        </div>

        {/* loading */}



        <div className="mb-3" style={{ filter: isAlertVisible || isdot ? "blur(3px)" : "none", background: isAlertVisible ? "#f1ebeb" : "none" }} >


          <div className=" mb-3">

            <h1 className="class-1 mt-3 mb-3">Class Schedule</h1>
            {UnmeshShukla && <div className="selectsubjectcontainer">

              <select
                type="text"
                className="form-control"
                id="subject"
                name="subject"
                value={subject}
               
                onChange={(e) => setsubject(e.target.value)}>
                <option>Select Subject</option>
                <option value="Algorithms And Data Structure">
                  Algorithms and Data Structure
                </option>
              </select></div>}
            {NitishaAgg && <div className="selectsubjectcontainer">
              
              <select
                type="text"
                className="form-control"
                id="subject"
                name="subject"
                value={subject}
               
                onChange={(e) => setsubject(e.target.value)}>
                <option>Select Subject</option>
                <option value="Software Design & Programming">
                  Software Design & Programming
                </option>
              </select></div>}
            {MKDas && <div className="selectsubjectcontainer">
              <select
                type="text"
                className="form-control mt-2"
                id="subject"
                name="subject"
                value={subject}
               
                onChange={(e) => setsubject(e.target.value)}>
                <option>Select Subject</option>
                <option value="Mathematical Foundation Of Computing">
                  Mathematical Foundation of Computing
                </option>
              </select></div>}
            {SunilKumar && <div className="selectsubjectcontainer">
              <select
                type="text"
                className="form-control mt-2"
                id="subject"
                name="subject"
                value={subject}
               
                onChange={(e) => setsubject(e.target.value)}>
                <option>Select Subject</option>
                <option value="Computer System Architecture">
                  Computer System Architecture
                </option>
              </select></div>}

          </div>

          <div className="abc-1">
            <div className="class-div">
              <label htmlFor="date" className="class-form-label" id="date-1">Date:</label>
              <input
                type="date"
                className="class-form-control"
                id="date"
                aria-describedby="date"
                value={date}
               
                onChange={(e) => setdate(e.target.value)}
              />
            </div >
            <br/>
            <div className="time-div">
              <label htmlFor="time" className="time-form-label " id="time">
                Time:  
              </label>
              <input
                type="time"
                className="class-form-control"
                id="time-1"
                value={time}
               
                onChange={(e) => settime(e.target.value)}
              />
            </div>
          </div>
          <div className="messagecontent">
            <label for="exampleFormControlTextarea1" class="form-label">
              Message:
            </label><br />
            <textarea type="text" class="class-form-control-1" id="exampleFormControlTextarea1"
              rows="3"
              placeholder="Optional"
              value={message}
              onChange={(e) => setmessage(e.target.value)}></textarea>
          </div>

          <div className="btn-class">
            <button type="submit" className="btn btn-primary submit-btn" onClick={handleButtonClick} >
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
  )
};

export default Sem_1;
