import React from 'react'
import { useState, useEffect, useRef, useReactToPrint } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import jsPDF from "jspdf";
import "../Scheduled_Class_List/scheduledclass.css";
import autoTable from 'jspdf-autotable';
import jwt from 'jsonwebtoken'
import { useNavigate } from "react-router-dom"
import Navbar from "../Teacher_dashboard/Navbar";

import List from './list';
var XLSX = require("xlsx");

const Assignmentreport = () => {
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState([]);
  const [visible, setVisible] = useState(false)
  const [string, setString] = useState("")
  const fetchdata = async () => {
    const response = await fetch("http://localhost:4000/assignmentreportteacher", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        'x-access-token': localStorage.getItem('token'), //
      }
    })
    const json = await response.json()
    setAssignments(json.data.reverse())
    if (json.data.length != 0) {
      setVisible(true)
      setString("Assignments Posted ")
    }else{
      setString("No Assignments Posted !")
    }
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
    <div className='height100vh'>
  <Navbar />
      {<h1 className='text-center pt-3'>{string}</h1>}

    {visible && <div className='tableblock'>
        <table className='table table-striped' id='mytable'>
          <thead className='heading-2'>
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
      </div>}
      {/* {visible && <div className='text-center'>
        <button type="button" class="btn btn-primary" id='butn' data-toggle="button" aria-pressed="false" autocomplete="off" onClick={exporttoexcelhandler}>Download in excel</button>
        <button type="button" class="btn btn-primary-1" id='butn' data-toggle="button" aria-pressed="false" autocomplete="off" onClick={exporttopdfhandler}>Download in pdf</button>
      </div>} */}
      </div>
    </>
  )
}

export default Assignmentreport