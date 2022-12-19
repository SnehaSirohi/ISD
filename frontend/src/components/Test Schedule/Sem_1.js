import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./testschedule.css";
import Navbar from "../Teacher_dashboard/Navbar";
import { useEffect, useState } from "react";
import jwt from 'jsonwebtoken'
import * as FaIcons from 'react-icons/fa';
import { useNavigate } from "react-router-dom"
const Sem_1 = () => {
  //
  const navigate = useNavigate();
  const [subject, setsubject] = useState("");
  const [date, setdate] = useState("");
  const [time, settime] = useState("");
  const [message, setmessage] = useState("");
  const [warning, setwarning] = useState(false)
  const [UnmeshShukla, setUnmeshShukla] = useState(false)
  const [NitishaAgg, setNitishaAgg] = useState(false)
  const [MKDas, setMKDas] = useState(false)
  const [SunilKumar, setSunilKumar] = useState(false)
  const [teacher, setTeacher] = useState("")
   const[success,setsuccess] = useState(false)
  const sem = "Sem-1";

  //-----------
  async function populate(e) {
    const req = await fetch('https://isd-production.up.railway.app/scheduletest', {
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
    if (data.name == "Sunil Kumar") {
      setSunilKumar(true)
    }
  }


  async function schedule(e) {
    e.preventDefault();
    if(subject && time && date)
    {
  
      const response = await fetch("https://isd-production.up.railway.app/scheduletest", {
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
        setwarning(data.warning)
        setsuccess(data.success)
      });
    }
    else {
      e.preventDefault()
       if(!date)
       {
        document.getElementById("date").style.color="red"
        document.getElementById("date-1").style.borderColor="red"
        document.getElementById("date-1").style.backgroundColor = "pink"
        document.getElementById("date-1").classList.add("shaking")
        document.getElementById("date").classList.add("shaking")
        setTimeout(() => {
          document.getElementById("date-1").classList.remove("shaking")
          document.getElementById("date").classList.remove("shaking")
        }, 1000); 
      }
      else
      {
        document.getElementById("date").style.color="black"
        document.getElementById("date-1").style.borderColor="black"
        document.getElementById("date-1").style.backgroundColor= "white"
      }
      
       if(!time)
       {
        document.getElementById("time").style.color="red"
        document.getElementById("time-1").style.borderColor="red"
        document.getElementById("time-1").style.backgroundColor="pink"
        document.getElementById("time-1").classList.add("shaking")
        document.getElementById("time").classList.add("shaking")
        setTimeout(() => {
          document.getElementById("time-1").classList.remove("shaking")
          document.getElementById("time").classList.remove("shaking")
        }, 1000); 
      }
       else
      {
        document.getElementById("time").style.color="black"
        document.getElementById("time-1").style.borderColor="black"
        document.getElementById("time-1").style.backgroundColor= "white"
      }
       
      if (!subject )
       {
  
        document.getElementById("subject").style.borderColor="red"
        document.getElementById("subject").style.backgroundColor = "pink"
        document.getElementById("subject").classList.add("shaking")
        setTimeout(() => {
          document.getElementById("subject").classList.remove("shaking")
        }, 1000);
       }
       else
      {
        document.getElementById("subject").style.color="black"
        document.getElementById("subject").style.borderColor="black"
        document.getElementById("subject").style.backgroundColor= "white"
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
  if(success)
  {
    setTimeout(() => {
      setsuccess(false)
      navigate("/Teacherdashboard");
    }, 2500);
  }
  return (
    <>
    <div className='height100vh'>
      <Navbar />
      <form onSubmit={schedule}>
        <div className=" mb-3 scheduledcontainer">
          <h1 className="class-1">Test Schedule</h1>
          <div className=" mb-3">
            {UnmeshShukla && <div className="selectsubjectcontainer">

              <select
                type="text"
                className="form-control shadow-none"
                id="subject"
                name="subject"
                value={subject}
                
                
                onChange={(e) => setsubject(e.target.value)}>
                <option value= "">Select Subject</option>
                <option value="Algorithms And Data Structure">
                  Algorithms and Data Structure
                </option>
              </select></div>}
            {NitishaAgg && <div className="selectsubjectcontainer">
              <select
                type="text"
                className="form-control shadow-none"
                id="subject"
                name="subject"
                value={subject}
              
                onChange={(e) => setsubject(e.target.value)}>
                <option value= "">Select Subject</option>
                <option value="Software Design & Programming">
                  Software Design & Programming
                </option>
              </select></div>}
            {MKDas && <div className="selectsubjectcontainer">
              <select
                type="text"
                className="form-control shadow-none"
                id="subject"
                name="subject"
                value={subject}
               
                onChange={(e) => setsubject(e.target.value)}>
                <option value= "">Select Subject</option>
                <option value="Mathematical Foundation Of Computing">
                  Mathematical Foundation of Computing
                </option>
              </select></div>}
            {SunilKumar && <div className="selectsubjectcontainer">
              <select
                type="text"
                className="form-control shadow-none"
                id="subject"
                name="subject"
                value={subject}
              
                onChange={(e) => setsubject(e.target.value)}>
                <option value= "">Select Subject</option>
                <option value="Computer System Architecture">
                  Computer System Architecture
                </option>
              </select></div>}

         
              </div>
          <div className="abc-1">
            <div className="class-div">
              <label htmlFor="date" id="date" className="class-form-label">
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
              <label htmlFor="time" id="time" className="time-form-label">
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
          <div class="messagecontent">
            <label for="exampleFormControlTextarea1" class="form-label">
              Message:
            </label>
            <textarea type="text" class="class-form-control-1" id="exampleFormControlTextarea1"
              rows="3"
              placeholder="Optional"
              value={message}
              onChange={(e) => setmessage(e.target.value)}></textarea>
          </div>
          <div className="btn-class">
            <button type="submit" className="btn btn-primary">
              Schedule Test
            </button>
          </div>

        </div>
      </form>
      {success &&  <div className="container-fluid blacky">
    <div className="success">
   <div classNam="wrappertick"> <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"> <circle className="checkmark__circle" cx={26} cy={26} r={25} fill="none"/> <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
</svg>
</div>
<h4>Test scheduled successfully</h4>
</div>
      </div>}
      {warning && <><div className="container-fluid blacky">
 </div>
 <div className="warningmain" >

 <div className="warning">
    
        <FaIcons.FaExclamationTriangle size={70}  color='red'  />

    <p>{warning}</p>
    <button className="okay" onClick={()=>setwarning(false)} >Okay</button>
  </div>
 </div></>}
 </div>
    </>
  );
};


export default Sem_1;
