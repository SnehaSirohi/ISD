import React from 'react'
import { useState,useEffect,useRef,useReactToPrint } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';
import jwt from 'jsonwebtoken'
import { useNavigate } from "react-router-dom"
import List from '../list';
import Navbar from "../../Student_dashboard/Navbar";

var XLSX = require("xlsx");

const Assignmentreport = () => {
    const navigate = useNavigate();
    const [assignments,setAssignments]=useState([]);
    const [subject, setSubject] = useState("")
    const [sem1, setSem1] = useState(false)
    const [sem2, setSem2] = useState(false)
    const [sem3, setSem3] = useState(false)
    const [sem4, setSem4] = useState(false)
    const [report, setReport] = useState({})

    const fetchdata=async()=>{
        const response=await fetch("http://localhost:4000/assignmentreportstudent", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                'x-access-token': localStorage.getItem('token'), //
            }})
            const json = await response.json()
            setReport(json)

      }

      async function subjectupdate(e) {
        e.preventDefault();
        console.log(subject)
        console.log(report)

        let data = report.data.filter((data) => {
          if(data.subject == subject)
          {
            return data
          }
        })
        console.log(data)

            setAssignments(data.reverse())
    
      }

      useEffect(() =>{
        if(report.sem == 'Sem-1')
            {
                setSem1(true)
                console.log("This is sem1",sem1)
                
            }

            else if(report.sem == "Sem-2")
            {
                setSem2(true)
                console.log(sem2)
            }
            else if(report.sem == "Sem-3")
            {
                setSem3(true)
                console.log(sem3)
            }
            
            else if(report.sem == "Sem-4")
            {
                setSem4(true)
                console.log(sem4)
            }
          
      },[report])

      useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
          const user = jwt.decode(token)
          console.log(user)
          if (!user) {
            localStorage.removeItem('token')
            navigate("/dashboard");
          } else {
            fetchdata()
          }
        }
      }, [])
  
  const exporttoexcelhandler= () =>{
     var wb = XLSX.utils.book_new(),
     ws = XLSX.utils.json_to_sheet(assignments);
     XLSX.utils.book_append_sheet(wb,ws,"MySheet1");
     XLSX.writeFile(wb,"MyExcel.xlsx")
  };

  const exporttopdfhandler = () =>{
    const doc = new jsPDF()
    doc.text("Assignments Posted",70,10)
    autoTable(doc, { html: '#mytable'})
    doc.save('table.pdf')
  };
  return (
   <>
<Navbar />
 {<h1>Assignments Posted </h1>}
 {sem1 && <div>
  <form onSubmit={subjectupdate}>
    <select
                type="text"
                className="form-control"
                id="subject"
                name="subject"
                value={subject}
                required
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
              <button type="submit" className="btn btn-primary submit-btn" >
              Submit
            </button>
    </form>
  </div>}
  {sem2 && <div>
    <form onSubmit={subjectupdate}>
    <select
                type="text"
                className="form-control"
                id="subject"
                name="subject"
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
              <button type="submit" className="btn btn-primary submit-btn" >
              Submit
            </button>
    </form>
  </div>}
  {sem3 && <div>
    <form onSubmit={subjectupdate}>
    <select
                type="text"
                className="form-control"
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
              <button type="submit" className="btn btn-primary submit-btn" >
              Submit
            </button>
    </form>
  </div>}
  {sem4 && <div>
    <form onSubmit={subjectupdate}>
    <select
                type="text"
                className="form-control"
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
              <button type="submit" className="btn btn-primary submit-btn" >
              Submit
            </button>
    </form>
  </div>}
  <div classname="main">
    <table classname="table table-bordered" id='mytable'>
      <thead>
        <tr>
          <th>Date</th>
            <th>Professor</th>
            <th>Subject</th>
            <th>Deadline</th>
            <th>Assignment</th>
        </tr>
      </thead>
      <tbody>
      <List assignments={assignments} />
      </tbody>
    </table>
  </div>

   <button onClick={exporttoexcelhandler}>Download in excel</button>
   <button onClick={exporttopdfhandler}>Download in pdf</button>
   </>
  )
}

export default Assignmentreport