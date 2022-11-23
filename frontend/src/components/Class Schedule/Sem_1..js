import React from "react";
import {useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
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
  async function populate(e){
    const req = await fetch('http://localhost:4000/scheduleclass',{
      headers: {
        'x-access-token': localStorage.getItem('token'), //
      },
    })
    const data = await req.json();

    console.log(data)
    //added
    if(data.status === 'ok'){
      setName(data.name)
      // setEmail(data.email)
  }
  }

  async function populateinfo(e){
    const req = await fetch('http://localhost:4000/scheduleclass',{
      method: "POST",//
      headers: {
        Accept: "application/json",//
        "Content-Type": "application/json", //
        'x-access-token': localStorage.getItem('token'), //
      },
      body: JSON.stringify({
        name,
        subject,
        date,
      }),
    }).then(async(response) => {
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
  useEffect(() =>{
    const token = localStorage.getItem('token')
    if (token){
        const user = jwt.decode(token)
        console.log(user)
        if(!user){
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
      </form>
    </>
  );
};

export default Sem_1;
