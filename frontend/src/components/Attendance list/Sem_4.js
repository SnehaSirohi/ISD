import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./attendance.css";
import List from "./List";
import jwt from 'jsonwebtoken' //
import { useNavigate } from "react-router-dom"
import Navbar from "../Teacher_dashboard/Navbar";

const Sem_4 = () => {
  //
  const navigate = useNavigate();
  const [students, setstudents] = useState([]);
  const [status, setstatus] = useState({});
  const [subject, setsubject] = useState("");
  const [UnmeshShukla,setUnmeshShukla]=useState(false)
  const [NitishaAgg,setNitishaAgg]=useState(false)
  const [MKDas,setMKDas]=useState(false)
  const [Sanjeev,setSanjeev]=useState(false)
  const[success,setsuccess]= useState(false)
  const fetchdata = async () => {
    const response = await fetch("http://localhost:4000/attendance", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        'x-access-token': localStorage.getItem('token'), //
      },
    });
    const json = await response.json();
    console.log(json)
    console.log(json.name)

    if(json.name == "Unmesh Shukla")
    {
      setUnmeshShukla(true)
    }
    if(json.name=="Nitisha Aggarwal")
    {
      setNitishaAgg(true)
    }
    if(json.name=="M.K Das")
    {
      setMKDas(true)
    }
    if(json.name=="Sanjeev")
    {
      setSanjeev(true)
    }

    let data1 = json.data.filter((data) => data.semester == "Sem-4");
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
        fetchdata();
      }
    }
  }, []);

  async function Submit(e) {
    if (!subject) {
      alert("Please select the subject ")
    }
    else {
      e.preventDefault()
      const response = await fetch("http://localhost:4000/attendance/sem4", {
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

  }


  return (
    <>
     <div className='height100vh'>
      <div className="attendencebody">
        <Navbar/>
        <h1 className="atte1">Sem 4 attendance</h1>
        {NitishaAgg && <div className="mb-3 selectsubjectcontainer ">
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
        {UnmeshShukla && <div className="mb-3 selectsubjectcontainer ">
            
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
        {Sanjeev && <div className="mb-3 selectsubjectcontainer ">
            
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
        {MKDas && <div className="mb-3 selectsubjectcontainer">
            
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
        <button type="button" class="btn btn-primary" data-toggle="button" aria-pressed="false" autocomplete="off" onClick={Submit}>Submit</button>
      </div> 
    </div>
    {success && <div className="container-fluid blacky">
    <div className="success">
   <div classNam="wrappertick"> <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"> <circle className="checkmark__circle" cx={26} cy={26} r={25} fill="none"/> <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
</svg>
</div>
<h4>Attendance Saved</h4>
</div>
      </div>}
      </div>
    </>
  );
};

export default Sem_4;
