import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../Teacher_dashboard/Navbar";
import jwt from 'jsonwebtoken'
import { useNavigate } from "react-router-dom"
import * as FaIcons from 'react-icons/fa';
import Sem1Subjects from '../Subjects/Sem1Subjects';
import Sem2Subjects from '../Subjects/Sem2Subjects';
import Sem3Subjects from '../Subjects/Sem3Subjects';
import Sem4Subjects from '../Subjects/Sem4Subjects';
import "./classschedule.css"
const Schedule = ({UnmeshShukla,NitishaAgg,MKDas,SunilKumar,Sanjeev,Manish}) => {
  const params=useParams()
 console.log(params)
  const navigate = useNavigate();
  const[classschedule,setClasschedule]=useState(false)
  const [subject, setsubject] = useState("");
  const [date, setdate] = useState("");
  const [time, settime] = useState("");
  const [message, setmessage] = useState("");
  const [warning, setwarning] = useState("");
//   const [UnmeshShukla, setUnmeshShukla] = useState(false)
//   const [NitishaAgg, setNitishaAgg] = useState(false)
//   const [MKDas, setMKDas] = useState(false)
//   const [SunilKumar, setSunilKumar] = useState(false)
//   const[Sanjeev,setSanjeev]=useState(false)
//   const [Manish,setManish]=useState(false)
  const [teacher, setTeacher] = useState("")
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [isdot, setIsdotVisible] = useState(false);
  const[success,setsuccess] = useState(false)
  const [empty,setempty]=useState(false)
  const[Sem1,setSem1]=useState(false)
  const[Sem2,setSem2]=useState(false)
  const[Sem3,setSem3]=useState(false)
  const[Sem4,setSem4]=useState(false)
  const sem = params.semester ;

  //-----------
  async function schedule(e) { 
    if (subject && time && date) {
      e.preventDefault() 
      const req = await fetch(`https://isd-production.up.railway.app/${params.schparam}`, {
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
        document.getElementById("date-1").classList.add("shaking")
        document.getElementById("date").classList.add("shaking")
        setTimeout(() => {
          document.getElementById("date-1").classList.remove("shaking")
          document.getElementById("date").classList.remove("shaking")
        }, 1000);


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
        document.getElementById("time-1").classList.add("shaking")
        document.getElementById("time").classList.add("shaking")
        setTimeout(() => {
          document.getElementById("time-1").classList.remove("shaking")
          document.getElementById("time").classList.remove("shaking")
        }, 1000);

      }

      else {
        document.getElementById("time").style.color = "black"
        document.getElementById("time-1").style.borderColor = "black"
        document.getElementById("time-1").style.backgroundColor = "white"
      }


      if (!subject) {

        document.getElementById("subject").style.borderColor = "red"
        document.getElementById("subject").style.backgroundColor = "pink"
        document.getElementById("subject").classList.add("shaking")
        setTimeout(() => {
          document.getElementById("subject").classList.remove("shaking")
        }, 1000);

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
 if(params.schparam=="scheduleclass")
  {
    setClasschedule(true)
  }
    switch(sem)
  {
    case "Sem-1":
        setSem1(true)
        break;
    case "Sem-2":
        setSem2(true)
        break;
    case "Sem-3":
        setSem3(true)
        break
    case "Sem-4":
        setSem4(true)
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
        <div className="mb-3 scheduledcontainer" style={{ filter: isAlertVisible || isdot ? "blur(3px)" : "none", background: isAlertVisible ? "#f1ebeb" : "none" }} >
         <div className=" mb-3">
            {classschedule ? <h1 className="class-1 mb-1">Class Schedule</h1> : <h1 className="class-1 mb-1">Test Schedule</h1>}


           {Sem1 &&  <Sem1Subjects NitishaAgg={NitishaAgg} UnmeshShukla={UnmeshShukla} MKDas={MKDas} SunilKumar={SunilKumar} subject={subject} setsubject={setsubject} />}
           {Sem2 &&  <Sem2Subjects NitishaAgg={NitishaAgg} UnmeshShukla={UnmeshShukla} MKDas={MKDas} Sanjeev={Sanjeev} subject={subject} setsubject={setsubject} />}
           {Sem3 &&  <Sem3Subjects NitishaAgg={NitishaAgg} UnmeshShukla={UnmeshShukla} MKDas={MKDas} Manish={Manish} subject={subject} setsubject={setsubject} />}
           {Sem4 &&  <Sem4Subjects NitishaAgg={NitishaAgg} UnmeshShukla={UnmeshShukla} MKDas={MKDas} Sanjeev={Sanjeev} subject={subject} setsubject={setsubject} />}
          </div>

          <div className="abc-1">
            <div className="class-div">
              <label htmlFor="date" className="class-form-label" id="date">Date:</label>
              <input
                type="date"
                className="class-form-control"
                id="date-1"
                aria-describedby="date"
                value={date}

                onChange={(e) => setdate(e.target.value)}
              />
            </div >
            <br />
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
            {classschedule ? <button type="submit" className="btn btn-primary submit-btn"  >
              Schedule Class
            </button>:<button type="submit" className="btn btn-primary submit-btn"  >
              Schedule Test
            </button>}
          </div>
         
        </div>
      </form>

  {success &&  <div className="container-fluid blacky">
    <div className="success">
   <div classNam="wrappertick"> <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"> <circle className="checkmark__circle" cx={26} cy={26} r={25} fill="none"/> <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
</svg>
</div>
{classschedule ?<h4>Class scheduled successfully</h4> : <h4>Test scheduled successfully</h4>}
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
  )
}

export default Schedule
