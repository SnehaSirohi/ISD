import React from "react";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import jwt from 'jsonwebtoken'
import { useNavigate } from "react-router-dom"
const Sem_3 = () => {
  //
  const navigate = useNavigate();
  const [subject, setsubject] = useState("");
  const [date, setdate] = useState("");
  const [time, settime] = useState("");
  const [message, setmessage] = useState("");
  const [warning, setwarning] = useState("");
  const [UnmeshShukla,setUnmeshShukla]=useState(false)
  const [NitishaAgg,setNitishaAgg]=useState(false)
  const [MKDas,setMKDas]=useState(false)
  const [Manish,setManish]=useState(false)
   const [teacher,setTeacher] = useState("")
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
     if(data.name=="Unmesh Shukla")
    {
      setUnmeshShukla(true)
    }
    if(data.name=="Nitisha Aggarwal")
    {
      setNitishaAgg(true)
    }
    if(data.name=="M.K Das")
    {
      setMKDas(true)
    }
    if(data.name=="Manish")
    {
      setManish(true)
    }
  }


  async function schedule(e) {
    e.preventDefault();

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
        <h1>Class Schedule</h1>
        {NitishaAgg && <div>
          <label className="form-label">Select Subject</label>
          <select
            type="text"
            className="form-control"
            id="subject"
            name="subject"
            value={subject}
            onChange={(e) => setsubject(e.target.value)}>
            <option>Select Subject</option>
            <option value="Information System Design">
              Information System Design
            </option>
          </select>
          </div>}
        {UnmeshShukla && <div>
          <label className="form-label">Select Subject</label>
          <select
            type="text"
            className="form-control"
            id="subject"
            name="subject"
            value={subject}
            onChange={(e) => setsubject(e.target.value)}>
            <option>Select Subject</option>
            <option value="Cloud Computing">Cloud Computing</option>
          </select>
          </div>}
        {MKDas && <div>
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
          </select>
          </div>}
        {Manish && <div>
          <label className="form-label">Select Subject</label>
          <select
            type="text"
            className="form-control"
            id="subject"
            name="subject"
            value={subject}
            onChange={(e) => setsubject(e.target.value)}>
            <option>Select Subject</option>
            <option value="IT Planning and Management">
              IT Planning and Management
            </option>
          </select>
          </div>}
          
        </div>
        <div className="mb-3">
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
        <div className="mb-3">
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
          Schedule Class
        </button>
         {warning &&  <div className="container warning">
            <h3>{warning}</h3>
            <button onClick={(e)=>setwarning(false)}>Ok</button>
      </div>}
      </form>
    </>
  );
};

export default Sem_3;
