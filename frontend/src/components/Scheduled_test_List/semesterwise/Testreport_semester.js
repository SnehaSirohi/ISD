import React from 'react'
import { useState,useEffect,useRef,useReactToPrint } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';
import jwt from 'jsonwebtoken'
import { useNavigate } from "react-router-dom"
import List from '../list.js';
import "../../Scheduled_Class_List/Scheduledcommon.css";
import Navbar from "../../Student_dashboard/Navbar";
var XLSX = require("xlsx");

const Testreport = () => {
    const navigate = useNavigate();
    const [tests,setTests]=useState([]);
    const newdate= new Date()
    const monthval= newdate.getMonth()+1;
    const day =newdate.getDate()
    const [subject, setSubject] = useState("")
    const [sem1, setSem1] = useState(false)
    const [sem2, setSem2] = useState(false)
    const [sem3, setSem3] = useState(false)
    const [sem4, setSem4] = useState(false)
    const [report, setReport] = useState({})
    const [visible, setVisible] = useState(false)
    const [string, setString] = useState("")

    const fetchdata=async()=>{
        const response=await fetch("http://localhost:4000/testschedule", {
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
        setVisible(false)
        setString("")
        e.preventDefault();
        console.log(report)
        let data = report.data.filter((data)=>{
          if(data.date.slice(5,7)==monthval && data.date.slice(8,10)>=day)
          {
              return data
          }
          else if(data.date.slice(5,7)>monthval)
          {
            return data
          }
        })
        let data2 = data.filter((data) => {
          if(data.subject == subject)
          {
            return data
          }
        })
        console.log(data2)

            setTests(data2.reverse())
            if(data2.length != 0)
            {
              setVisible(true)
            }
            else{
              setString("No Tests are scheduled !")

            }
    
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
     ws = XLSX.utils.json_to_sheet(tests);
     XLSX.utils.book_append_sheet(wb,ws,"MySheet1");
     XLSX.writeFile(wb,"MyExcel.xlsx")
  };

  const exporttopdfhandler = () =>{
    const doc = new jsPDF()
    doc.text("Tests Scheduled",70,10)
    autoTable(doc, { html: '#mytable'})
    doc.save('table.pdf')
  };
  return (
   <>
    <div className='height100vh'>
<Navbar />
 {<h1 className='text-center-1'>Scheduled Tests </h1>}
 <div className='rep_1 '>
 {sem1 && <div className='classrepcontainer'>
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
              <button type="submit" className="btn btn-primary submit-btn" id='btn-12' >
              Search
            </button>
    </form>
  </div>}
  {sem2 && <div className='classrepcontainer'>
    <form onSubmit={subjectupdate}>
    <select
                type="text"
              className="form-control shadow-none"
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
              <button type="submit" className="btn btn-primary submit-btn" id='btn-12' >
              Search
            </button>
    </form>
  </div>}
  {sem3 && <div className='classrepcontainer'>
    <form onSubmit={subjectupdate}>
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
    <form onSubmit={subjectupdate}>
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
              <button type="submit" className="btn btn-primary submit-btn" id='btn-12' >
              Search
            </button>
    </form>
  </div>}
  </div>
  <div  className='nothing_block'>{string}</div>
 {visible && <div className='main overflowxauto'>
    <table className='table table-striped overflowxauto' id='mytable-1'>
      <thead className='heading_1'>
        <tr>
          <th>Professor</th>
          <th>Subject</th>
          <th>Date</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>
      <List tests={tests} />
      </tbody>
    </table>
  </div>}

{visible &&  <div className='text-center button_block8'>
   <button id='butn' class="btn btn-primary" onClick={exporttoexcelhandler}>Download in excel</button>
   <button id='butn' class="btn btn-primary-1" onClick={exporttopdfhandler}>Download in pdf</button>
   </div>}
   </div>
   </>
  )
}

export default Testreport