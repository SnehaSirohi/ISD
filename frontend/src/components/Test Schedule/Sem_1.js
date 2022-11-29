import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./testschedule.css";
import Navbar from "../Student_dashboard/Navbar.js";
import { useEffect, useState } from "react";
import jwt from 'jsonwebtoken'
import './TS.css'
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
  const[warning,setwarning]=useState(false)
  const [UnmeshShukla,setUnmeshShukla]=useState(false)
  const [NitishaAgg,setNitishaAgg]=useState(false)
  const [MKDas,setMKDas]=useState(false)
  const [SunilKumar,setSunilKumar]=useState(false)
  const sem = "Sem-1";

 //-----------
 async function populate(e){
  const req = await fetch('http://localhost:4000/scheduletest',{
    headers: {
      'x-access-token': localStorage.getItem('token'), //
    },
  })
  const data = await req.json();

  console.log(data)
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
    if(data.name=="Sunil Kumar")
    {
      setSunilKumar(true)
    }
  //added
  if(data.status === 'ok'){
    setName(data.name)
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
        name,
        subject,
        sem,
        date,
        time,
        message,
      }),
    }).then(async(response) => {
    let data = await response.json();
    console.log(data);
    setwarning(data.warning)
});
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
      <Navbar/>
      <form onSubmit={schedule}>
        <div className=" mb-3">
          <h1 className="test-1">Test Schedule</h1>
          <div className=" mb-3">
          {UnmeshShukla && <div><label className="form-label">Select Subject</label>

          <select
            type="text"
            className="form-control"
            id="subject"
            name="subject"
            value={subject}
            required
            onChange={(e) => setsubject(e.target.value)}>
            <option required>Select Subject</option>
            <option value="Algorithms And Data Structure">
              Algorithms and Data Structure
            </option>
          </select></div> }
          {NitishaAgg && <div><label className="form-label">Select Subject</label>
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
          </select></div> }
          {MKDas && <div><label className="form-label">Select Subject</label>
          <select
            type="text"
            className="form-control"
            id="subject"
            name="subject"
            value={subject}
            required
            onChange={(e) => setsubject(e.target.value)}>
            <option required>Select Subject</option>
            <option value="Mathematical Foundation Of Computing">
              Mathematical Foundation of Computing
            </option>
          </select></div> }
          {SunilKumar && <div><label className="form-label">Select Subject</label>
          <select
            type="text"
            className="form-control"
            id="subject"
            name="subject"
            value={subject}
            required
            onChange={(e) => setsubject(e.target.value)}>
            <option required>Select Subject</option>
            <option value="Computer System Architecture">
              Computer System Architecture
            </option>
          </select></div> }
          
        </div>
        <div className="mb-3">
          <label htmlFor="date" className="test-form-label">
            Date:
          </label>
          <input
            type="date"
            className="test-form-control"
            id="date"
            aria-describedby="date"
            value={date}
            onChange={(e) => setdate(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="time" className="test-form-label">
            Time:
          </label>
          <input
            type="time"
            className="test-form-control"
            id="time"
            value={time}
            onChange={(e) => settime(e.target.value)}
          />
        </div>
        <div class="mb-3">
        <div class="test-msg">
          <label for="exampleFormControlTextarea1" class="test-form-label-1">
            Message:
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
         {warning &&  <div className="container warning">
            <h3>{warning}</h3>
            <button onClick={(e)=>setwarning(false)}>Ok</button>
      </div>}
        </div>
      </form>
    </>
  );
};

export default Sem_1;
