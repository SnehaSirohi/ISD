import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./attendance.css";
import jwt from 'jsonwebtoken' //
import List from "./List";
import Navbar from "../Teacher_dashboard/Navbar.js";
import { useNavigate,useParams } from "react-router-dom"
import Sem1Subjects from '../Subjects/Sem1Subjects';
import Sem2Subjects from '../Subjects/Sem2Subjects';
import Sem3Subjects from '../Subjects/Sem3Subjects';
import Sem4Subjects from '../Subjects/Sem4Subjects';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
const Attendance = ({}) => {
  const params=useParams()
  console.log(params)
  const navigate = useNavigate();
  const [students, setstudents] = useState([]);
  const [status, setstatus] = useState({});
  const [subject, setsubject] = useState("");
   const[Sem1,setSem1]=useState(false)
  const[Sem2,setSem2]=useState(false)
  const[Sem3,setSem3]=useState(false)
  const[Sem4,setSem4]=useState(false)
  const [success, setsuccess] = useState(false)
  const [visible, setVisible] = useState(false)
  const sem = params.semester ;
  const semparam=sem.slice(0,3) + sem.slice(4,5)
  const [loader,setloader]=useState(false)
    
  const [UnmeshShukla, setUnmeshShukla] = useState(false)
  const [NitishaAgg, setNitishaAgg] = useState(false)
  const [MKDas, setMKDas] = useState(false)
  const [SunilKumar, setSunilKumar] = useState(false)
  const [Sanjeev,setSanjeev]=useState(false)
  const [Manish,setManish]=useState(false)
  const [studentsattend, setStudentsattend] = useState([])
  const [teacher,setTeacher]=useState("")
  
  console.log("app.js")
   async function fetchdata(e) {
    console.log("function called")
    const req = await fetch(`https://isd-production.up.railway.app/teacherverify`, {
      headers: {
        'x-access-token': localStorage.getItem('token'), //
      },
    })
    const data = await req.json();
    if (data.status === 'ok') {
      setStudentsattend(data.data)
      setVisible(true)
  }
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
    if (data.name == "Sajeev") {
      setSanjeev(true)
    }
    if (data.name == "Manish") {
      setManish(true)
    }
  }
  
  useEffect(() => {
    setstudents(studentsattend.filter((data) => data.semester == sem));
  })
  

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (token) {
      const user = jwt.decode(token)
      console.log(user)
      if (!user) {
        localStorage.removeItem('token')
        
      } else {
        fetchdata()

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
    }

  }, [])


  async function Submit(e) {
  
    if(subject) {
      setloader(true)
      e.preventDefault()
      const response = await fetch(`https://isd-production.up.railway.app/attendance/${semparam}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          'x-access-token': localStorage.getItem('token'), //
        },
        body: JSON.stringify({
          subject,
          status,
        }),
      }).then(async (response) => {
        let dataa = await response.json();
        setsuccess(dataa.success)
      });
      setTimeout(() => {
        setsuccess(false)
        navigate("/Teacherdashboard");
      }, 2500);
    }
    else{
  
        document.getElementById("subject").style.borderColor = "red"
        document.getElementById("subject").style.backgroundColor = "pink"
        document.getElementById("subject").classList.add("shaking")
        setTimeout(() => {
          document.getElementById("subject").classList.remove("shaking")
        }, 1000);
    }

  }
  useEffect(()=>{
    setloader(false)
    },[success])
  return (
    <>
      <div className='height100vh'>
        <div className="attendencebody">
          <Navbar />
          <h1 className="atte1">{sem} Attendance</h1>
          {Sem1 &&  <Sem1Subjects NitishaAgg={NitishaAgg} UnmeshShukla={UnmeshShukla} MKDas={MKDas} SunilKumar={SunilKumar} subject={subject} setsubject={setsubject} />}
           {Sem2 &&  <Sem2Subjects NitishaAgg={NitishaAgg} UnmeshShukla={UnmeshShukla} MKDas={MKDas} Sanjeev={Sanjeev} subject={subject} setsubject={setsubject} />}
           {Sem3 &&  <Sem3Subjects NitishaAgg={NitishaAgg} UnmeshShukla={UnmeshShukla} MKDas={MKDas} Manish={Manish} subject={subject} setsubject={setsubject} />}
           {Sem4 &&  <Sem4Subjects NitishaAgg={NitishaAgg} UnmeshShukla={UnmeshShukla} MKDas={MKDas} Sanjeev={Sanjeev} subject={subject} setsubject={setsubject} />}
          {visible ? <div className="table-1">
            <table className="table table-striped">
              <thead className="heading-1">
                <tr>
                  <th>Student</th>
                  <th>Present</th>
                </tr>
              </thead>
              <tbody>
                <List students={students} status={status} setstatus={setstatus} />
              </tbody>
            </table>
          </div> : <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open
        // onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop> }
          {visible && <div className="button-1">
            <button type="button" class="btn btn-primary" data-toggle="button" aria-pressed="false" autocomplete="off" onClick={Submit}>Save</button>
          </div>}
        </div>
        {success && <div className="container-fluid blacky">
          <div className="success">
            <div classNam="wrappertick"> <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"> <circle className="checkmark__circle" cx={26} cy={26} r={25} fill="none" /> <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
            </svg>
            </div>
            <h4>Attendance Saved</h4>
          </div>
        </div>}
        {loader&&<Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open
        // onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>}
      </div>
    </>
  );
};

export default Attendance;
