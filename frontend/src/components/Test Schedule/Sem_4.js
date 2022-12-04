import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import jwt from 'jsonwebtoken'
import { useNavigate } from "react-router-dom"
const Sem_4 = () => {
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
  const sem = "Sem-4";

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
      setSanjeev(true)
    }
  }

  async function schedule(e) {
    e.preventDefault();

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
      <form onSubmit={schedule}>
        <div className=" mb-3">
          <h1>Test Schedule</h1>
          {NitishaAgg && <div>
            
            <select
              type="text"
              className="form-control"
              id="subject"
              name="subject"
              value={subject}
              onChange={(e) => setsubject(e.target.value)}>
              <option>Select Subject</option>
              <option value="Internet of Things Systems, Security and Cloud">
                Internet of Things Systems, Security and Cloud
              </option>
            </select>
          </div>}
          {UnmeshShukla && <div>
            
            <select
              type="text"
              className="form-control"
              id="subject"
              name="subject"
              value={subject}
              onChange={(e) => setsubject(e.target.value)}>
              <option>Select Subject</option>
              <option value="Health Informatics">Health Informatics</option>
            </select>
          </div>}
          {Sanjeev && <div>
            
            <select
              type="text"
              className="form-control"
              id="subject"
              name="subject"
              value={subject}
              onChange={(e) => setsubject(e.target.value)}>
              <option>Select Subject</option>
              <option value="Dissertation Project">Dissertation Project</option>
            </select>
          </div>}
          {MKDas && <div>
            
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
            </select>
          </div>}

        </div>
        <div className="mb-3 text-center">
          <label htmlFor="date" className="form-label">
            Date
          </label>
          <input
            type="date"
            className="form-control"
            id="date"
            aria-describedby="date"
            value={date}
            onChange={(e) => setdate(e.target.value)}
          />
        </div>
        <div className="mb-3 text-center">
          <label htmlFor="time" className="form-label">
            time
          </label>
          <input
            type="time"
            className="form-control"
            id="time"
            value={time}
            onChange={(e) => settime(e.target.value)}
          />
        </div>
        <div class="mb-3">
          <label for="exampleFormControlTextarea1" class="form-label">
            Message
          </label>
          <textarea
            type="text"
            class="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            placeholder="Optional"
            value={message}
            onChange={(e) => setmessage(e.target.value)}></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Schedule Test
        </button>
        {warning &&
          <div className="container warning">
            <h3>{warning}</h3>
            <button onClick={(e) => setwarning(false)}>Ok</button>
          </div>}
      </form>
    </>
  );
};

export default Sem_4;
