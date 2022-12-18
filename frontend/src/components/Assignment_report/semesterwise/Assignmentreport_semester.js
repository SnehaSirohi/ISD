import React from 'react'
import { useState, useEffect, useRef, useReactToPrint } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import jwt from 'jsonwebtoken'
import { useNavigate } from "react-router-dom"
import "../../Scheduled_Class_List/Scheduledcommon.css";
import List from './list';
import Navbar from "../../Student_dashboard/Navbar";

var XLSX = require("xlsx");
let user;
const Assignmentreport = () => {
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState([]);
  const [subject, setSubject] = useState("")
  const [sem1, setSem1] = useState(false)
  const [sem2, setSem2] = useState(false)
  const [sem3, setSem3] = useState(false)
  const [sem4, setSem4] = useState(false)
  const [report, setReport] = useState({})
  const [visible, setVisible] = useState(false)
  const [string, setString] = useState("")
  const [success,setsuccess]=useState(false)
  const newdate = new Date()
  const monthval = newdate.getMonth() + 1;
  const day = newdate.getDate()
  const year = newdate.getFullYear()
  const [files, setfile] = useState({_id: "", name: ""})
  const [removefileid, setremovefileid] = useState("")
  const [temp, setTemp] = React.useState({id: "", name: ""})
  const [assignment_id,setassignment_id]=useState("")
  const [check,setcheck]=useState([])
  // console.log("check value : ",check)
  const fetchdata = async () => {

    const response1 = await fetch("http://localhost:4000/assignmentreportstudent", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        'x-access-token': localStorage.getItem('token'), //
      }
    })
    const json1 = await response1.json()
    console.log("json 1 : ",json1.data)
    setReport(json1)
      fetchd()
    

  }

  

    const fetchd = async()=>{
 const response2 = await fetch("http://localhost:4000/assignmentsubmited", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        'x-access-token': localStorage.getItem('token'), //
      }
    })
     const json2 = await response2.json()
     setcheck(json2.data)
    }
    console.log("check data",check)
    if(check)
    {
       check.map((x)=> {
       if(document.getElementById(x.assignment_id))
       {
                document.getElementById(x.assignment_id).innerHTML="Submitted✅" 
              document.getElementById(x.assignment_id).style.backgroundColor="#abffab"
         
       }
      }
       )
            
    }



  async function subjectupdate(e) {
    setVisible(false)
    setString("")
    e.preventDefault();

    let data = report.data.filter((data) => {
      if (((data.deadline.slice(8, 10) >= day && data.deadline.slice(5, 7) == monthval) || data.deadline.slice(5, 7) > monthval || data.deadline.slice(0, 5) > year) && (data.subject == subject)) {
        return data
      }

    })

    setAssignments(data.reverse())
    if (data.length != 0) {
      setVisible(true)
    }
    else {
      setString("No Assignments Posted !")

    }

  }

  useEffect(() => {
    if (report.sem == 'Sem-1') {
      setSem1(true)

    }

    else if (report.sem == "Sem-2") {
      setSem2(true)
    }
    else if (report.sem == "Sem-3") {
      setSem3(true)
    }

    else if (report.sem == "Sem-4") {
      setSem4(true)
    }

  }, [report])

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      user = jwt.decode(token)
      if (!user) {
        localStorage.removeItem('token')
        navigate("/dashboard");
      } else {
        fetchdata()
      }
    }
  }, [])
  const AssignmentSubmit = async (e, _id) => {
    e.preventDefault()
    console.log("this is user", user);
    const response = await fetch("http://localhost:4000/assignmentsubmit", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        assignment_id,
        files: localStorage.getItem(_id),
        enrollNum: user.enrollNum,
        subject
      })
    })
     const data = await response.json();
     if(data.success)
     {
      fetchd()
      document.getElementById(_id).innerHTML="Submitted✅";
      document.getElementById(_id).style.backgroundColor="#81ffc487";
      localStorage.removeItem(_id)
      setremovefileid(_id)
      setTemp("")
     }
      setsuccess(data.success)
      setTimeout(() => {
        setsuccess(false)
      }, 2500);
  }

  return (
    <>
      <div className='height100vh'>
        <Navbar />
        {<h1 className='text-center-1'>Assignments Posted </h1>}
        {sem1 && <div className='classrepcontainer'>
          <form className='repform1' onSubmit={subjectupdate}>
            <select
              type="text"
              className="form-control shadow-none"
              id="subject"
              name="subject"
              value={subject}
              required
              // onClick={()=>fetchd()}
              onChange={(e) => setSubject(e.target.value)}>
              <option required>Select Subject</option>
              <option value="Algorithms And Data Structure">
                Algorithms and Data Structure
              </option>
              <option value="Software Design & Programming">
                Software Design & Programming
              </option>
              <option value="Mathematical Foundation Of Computing">
                Mathematical Foundation of Computing
              </option>
              <option value="Computer System Architecture">
                Computer System Architecture
              </option>
            </select>
            <button type="submit" className="btn btn-primary submit-btn" id='btn-12'>
              Search
            </button>
          </form>
        </div>}
        {sem2 && <div className='classrepcontainer'>
          <form className='repform1' onSubmit={subjectupdate}>
            <select
              type="text"
              className="form-control shadow-none"
              id="subject"
              name="subject"
              // onClick={()=>fetchd()}
              value={subject}
              required
              onChange={(e) => setSubject(e.target.value)}>
              <option required>Select Subject</option>
              <option value="Computer Communication and Networks">Computer Communication and Networks</option>
              <option value="Operating Systems">Operating Systems</option>
              <option value="Database Systems">Database Systems</option>
              <option value="Applied Machine Learning">Applied Machine Learning</option>
              <option value="Open Elective-1">Open Elective-1</option>
            </select>
            <button type="submit" className="btn btn-primary submit-btn" id='btn-12'>
              Search
            </button>
          </form>
        </div>}
        {sem3 && <div className='classrepcontainer'>
          <form className='repform1' onSubmit={subjectupdate}>
            <select
              type="text"
              className="form-control shadow-none"
              id="subject"
              name="subject"
              value={subject}
              required
              onChange={(e) => setSubject(e.target.value)}>
              <option required>Select Subject</option>
              <option value="Information System Design">Information System Design</option>
              <option value="Cloud Computing">Cloud Computing</option>
              <option value="Software Engineering">Software Engineering</option>
              <option value="IT Planning and Management">IT Planning and Management</option>
            </select>
            <button type="submit" className="btn btn-primary submit-btn" id='btn-12' >
              Search
            </button>
          </form>
        </div>}
        {sem4 && <div className='classrepcontainer'>
          <form className='repform1' onSubmit={subjectupdate}>
            <select
              type="text"
              className="form-control shadow-none"
              id="subject"
              name="subject"
              value={subject}
              required
              onChange={(e) => setSubject(e.target.value)}>
              <option required>Select Subject</option>
              <option value="Internet of Things Systems, Security and Cloud">Internet of Things Systems, Security and Cloud</option>
              <option value="Health Informatics">Health Informatics</option>
              <option value="Research Methods in Informatics">Research Methods in Informatics</option>
            </select>
            <button type="submit" className="btn btn-primary submit-btn" id='btn-12'>
              Search
            </button>
          </form>
        </div>}
        <div className='nothing_block'>{string}</div>
        {visible && <div classname="main" id="mytableblock-1">
          <table className='table table-striped' id='mytable-1'>
            <thead className='heading_1'>
              <tr>
                <th>Date</th>
                <th>Professor</th>
                <th>Subject</th>
                <th>Deadline</th>
                <th>Assignment</th>
                <th>Upload</th>
              </tr>
            </thead>
            <tbody>
              <List key={assignments.id} assignments={assignments} files={files} setfile={setfile} AssignmentSubmit={AssignmentSubmit} removefileid={removefileid} setremovefileid={setremovefileid} temp={temp} setTemp={setTemp} setassignment_id={setassignment_id} />
            </tbody>
          </table>
        </div>}
      </div>
      {success &&  <div className="container-fluid blacky">
    <div className="success">
   <div classNam="wrappertick"> <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"> <circle className="checkmark__circle" cx={26} cy={26} r={25} fill="none"/> <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
</svg>
</div>
<h4>Assignment Submitted</h4>
</div>
      </div>}
    </>
  )
}

export default Assignmentreport