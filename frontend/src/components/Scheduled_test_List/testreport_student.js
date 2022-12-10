import React from 'react'
import { useState, useEffect, useRef, useReactToPrint } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import jsPDF from "jspdf";
import './scheduletest.css';
import '../Student_dashboard/Navbar';
import autoTable from 'jspdf-autotable';
import jwt from 'jsonwebtoken'
import { useNavigate } from "react-router-dom"
import List from './list';
import Navbar from '../Student_dashboard/Navbar';
var XLSX = require("xlsx");

const Testreport = () => {
  const navigate = useNavigate();
  const [tests, setTests] = useState([]);
  const newdate = new Date()
  const monthval = newdate.getMonth() + 1;
  const day = newdate.getDate()
  const fetchdata = async () => {
    const response = await fetch("http://localhost:4000/testschedule", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        'x-access-token': localStorage.getItem('token'), //
      }
    })
    const json = await response.json()
    let data = json.data.filter((data) => {
      if (data.date.slice(5, 7) == monthval && data.date.slice(8, 10) >= day) {
        return data
      }
      else if (data.date.slice(5, 7) > monthval) {
        return data
      }
    })

    setTests(data.reverse())

  }
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
      ws = XLSX.utils.json_to_sheet(tests);
    XLSX.utils.book_append_sheet(wb, ws, "MySheet1");
    XLSX.writeFile(wb, "MyExcel.xlsx")
  };

  const exporttopdfhandler = () => {
    const doc = new jsPDF()
    doc.text("Overall Tests Scheduled", 70, 10)
    autoTable(doc, { html: '#mytable' })
    doc.save('table.pdf')
  };
  return (
    <>
     <div className='height100vh'>
      <Navbar />

      {<h1 className='text-center'>Overall Tests Scheduled </h1>}

      <div className='tableblock overflowxauto'>
        <table className='table table-striped overflow' id='mytable'>
          <thead className='heading-2'>
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
      <div className='text-center'>
        <button id='butn' class="btn btn-primary" onClick={exporttoexcelhandler}>Download in excel</button>
        <button id='butn' class="btn btn-primary-1" onClick={exporttopdfhandler}>Download in pdf</button>
      </div>
      </div>
    </>
  )
}

export default Testreport