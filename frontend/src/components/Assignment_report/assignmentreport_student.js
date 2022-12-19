import React from 'react'
import { useState, useEffect, useRef, useReactToPrint } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';
import jwt from 'jsonwebtoken'
import { useNavigate } from "react-router-dom"
import '../Scheduled_Class_List/Scheduledcommon.css';
import './assignment_report.css'
import List from './list';
import Navbar from "../Student_dashboard/Navbar";


var XLSX = require("xlsx");

const Assignmentreport = () => {
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState([]);
  const [visible, setVisible] = useState(false)
  const [string, setString] = useState("")
  const fetchdata = async () => {
    const response = await fetch("https://isd-production.up.railway.app/assignmentreportstudent", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        'x-access-token': localStorage.getItem('token'), //
      }
    })
    const json = await response.json()
        setAssignments(json.data.reverse())
  }

  useEffect(() => {
    if(assignments.length !=0){
      setVisible(true)
      setString("Overall Assignments Posted")
    }else{
      setString(" No Assignment Posted !")
    }
  },[assignments])

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

  const exporttoexcelhandler = () => {
    var wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(assignments);
    XLSX.utils.book_append_sheet(wb, ws, "MySheet1");
    XLSX.writeFile(wb, "MyExcel.xlsx")
  };

  const exporttopdfhandler = () => {
    const doc = new jsPDF()
    doc.text("Overall Assignments Posted", 70, 10)
    autoTable(doc, { html: '#mytable' })
    doc.save('table.pdf')
  };
  return (
    <>
<Navbar />
      {<h1 className='text-center-1'>{string} </h1>}

      {visible && <div className='overflowxauto'>
        <table className='table table-striped overflowxauto' id='mytable-5'>
          <thead className='heading_1'>
            <tr>
              <th>Date</th>
              <th>Professor</th>
              <th>Subject</th>
              <th>Deadline</th>
              <th>Assignment</th>
            </tr>
          </thead>
          <tbody>
            <List assignments={assignments}  />
          </tbody>
        </table>
      </div>}

      {visible && <div className='text-center'>
   <button id='butn' class="btn btn-primary" onClick={exporttoexcelhandler}>Download in excel</button>
   <button id='butn' class="btn btn-primary-1" onClick={exporttopdfhandler}>Download in pdf</button>
   </div>}
    </>
  )
}

export default Assignmentreport