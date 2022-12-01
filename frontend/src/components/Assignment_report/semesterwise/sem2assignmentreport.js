import React from 'react'
import { useState, useEffect, useRef, useReactToPrint } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';
import jwt from 'jsonwebtoken'
import { useNavigate } from "react-router-dom"
import List from '../list';
var XLSX = require("xlsx");

const Classreport = () => {
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState([]);
  const newdate = new Date()
  const monthval = newdate.getMonth() + 1;
  const day = newdate.getDate()
  const [subject, setSubject] = useState("")
  const fetchdata = async () => {
    const response = await fetch("http://localhost:4000/assignmentreportstudent", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        'x-access-token': localStorage.getItem('token'), //
      }
    })
    const json = await response.json()

    let data = json.data.filter((data) => {
      if (data.subject == subject) {
        return data
      }
    })
    console.log(data)

    setAssignments(data.reverse())
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
        navigate("/dashboard");
      } else {
        // fetchdata()

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
    doc.text("Assignments Posted", 70, 10)
    autoTable(doc, { html: '#mytable' })
    doc.save('table.pdf')
  };
  return (
    <>

      {<h1>Assignments Posted </h1>}
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
      </div>
      <div classname="main">
        <table classname="table table-bordered" id='mytable'>
          <thead>
            <tr>
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

export default Classreport