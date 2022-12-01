import React from 'react'
import { useState,useEffect,useRef,useReactToPrint } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';
import jwt from 'jsonwebtoken'
import { useNavigate } from "react-router-dom"
import List from '../list.js';
var XLSX = require("xlsx");

const Classreport = () => {
    const navigate = useNavigate();
    const [tests,setTests]=useState([]);
    const newdate= new Date()
    const monthval= newdate.getMonth()+1;
    const day =newdate.getDate()
    const [subject, setSubject] = useState("")
    const fetchdata=async()=>{
        const response=await fetch("http://localhost:4000/testschedule", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                'x-access-token': localStorage.getItem('token'), //
            }})
            const json = await response.json()
          
            let data = json.data.filter((data)=>{
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
      }

      async function subjectupdate(e) {
        e.preventDefault();
    
        console.log(subject)
        fetchdata()
    
      }

      useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
          const user = jwt.decode(token)
          console.log(user)
          if (!user) {
            localStorage.removeItem('token')
            navigate("/Teacherdashboard");
          } else {
            // fetchdata()
    
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

 {<h1>Scheduled Tests </h1>}
 <div><label className="form-label mt-2">Select Subject</label>
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
  </div>
  <div classname="main">
    <table classname="table table-bordered" id='mytable'>
      <thead>
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
  </div>

   <button onClick={exporttoexcelhandler}>Download in excel</button>
   <button onClick={exporttopdfhandler}>Download in pdf</button>
   </>
  )
}

export default Classreport