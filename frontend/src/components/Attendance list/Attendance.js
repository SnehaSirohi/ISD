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
const Attendance = ({UnmeshShukla,NitishaAgg,MKDas,SunilKumar,Sanjeev,Manish}) => {
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
  const sem = params.semester ;
  const semparam=sem.slice(0,3) + sem.slice(4,5)
  console.log(semparam)
  const fetchdata = async () => {
    const response = await fetch("https://isd-production.up.railway.app/attendance", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        'x-access-token': localStorage.getItem('token'), //

      },
    });
    const json = await response.json();
    let data1 = json.data.filter((data) => data.semester == "Sem-1");
    setstudents(data1);
  };


  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      const user = jwt.decode(token)
      console.log(user)
      if (!user) {
        localStorage.removeItem('token')
        navigate("/Teacherdashboard");
      } else {
        fetchdata()
      }
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

  }, []);

  async function Submit(e) {
  
    if(subject) {
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
          <div className="table-1">
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
          </div>
          <div className="button-1">
            <button type="button" class="btn btn-primary" data-toggle="button" aria-pressed="false" autocomplete="off" onClick={Submit}>Save</button>
          </div>
        </div>
        {success && <div className="container-fluid blacky">
          <div className="success">
            <div classNam="wrappertick"> <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"> <circle className="checkmark__circle" cx={26} cy={26} r={25} fill="none" /> <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
            </svg>
            </div>
            <h4>Attendance Saved</h4>
          </div>
        </div>}
      </div>
    </>
  );
};

export default Attendance;
