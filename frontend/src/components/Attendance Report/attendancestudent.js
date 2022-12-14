import React from 'react'
import { useState, useEffect, useRef, useReactToPrint } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';
import jwt from 'jsonwebtoken'
import { useNavigate } from "react-router-dom"
import './attendance_report.css'
import List from './list2';
import Navbar from "../Student_dashboard/Navbar";
import Sem1Subjects from '../Subjects/Sem1Subjects';
import Sem2Subjects from '../Subjects/Sem2Subjects';
import Sem3Subjects from '../Subjects/Sem3Subjects';
import Sem4Subjects from '../Subjects/Sem4Subjects';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
var XLSX = require("xlsx");

const Attendancereport = () => {
  const navigate = useNavigate();
  const [student, setstudent] = useState([]);
  const [attendmaterial, setAttendmaterial] = useState([]);
  var [string, setString] = useState("Overall Attendance Report")
  var [string2, setString2] = useState("")
  const [sem1, setSem1] = useState(false)
  const [sem2, setSem2] = useState(false)
  const [sem3, setSem3] = useState(false)
  const [sem4, setSem4] = useState(false)
  const [subject, setSubject] = useState("")
  const [semester, setSemester] = useState("")
  const [visible, setVisible] = useState(false)
  const [show, setshow] = useState(false)

  const fetchdata = async () => {
    const response = await fetch("https://isd-production.up.railway.app/dashboard", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        'x-access-token': localStorage.getItem('token'), //
      }
    })
    const json = await response.json()
    setVisible(true)
    setshow(true)
    setSemester(json.semester)
    setstudent(json.attend.reverse())
    setAttendmaterial(json.attend)
  }

  async function subjectupdate(e) {
    setshow(false)
    e.preventDefault();
    console.log(student)
    if (subject != "overall")
      setString("Subject-wise Attendance Report : " + subject)

    let data = student.filter((data) => {
      if (data.subject == subject) {
        return data
      }
    })
    console.log(data)

    setAttendmaterial(data)
    if (data.length != 0) {
      setVisible(true)
      setshow(true)
    } else {
      setString2("No Attendance Report Available")
    }
    if (subject == "overall") {
      setAttendmaterial(student)
      setVisible(true)
      setshow(true)
      setString("Overall Attendance Report")
    }

  }
  useEffect(() => {
    if (semester == 'Sem-1') {
      setSem1(true)
      console.log("This is sem1", sem1)

    }

    else if (semester == "Sem-2") {
      setSem2(true)
      console.log(sem2)
    }
    else if (semester == "Sem-3") {
      setSem3(true)
      console.log(sem3)
    }

    else if (semester == "Sem-4") {
      setSem4(true)
      console.log(sem4)
    }

  }, [student])

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

  console.log(attendmaterial);

  const exporttoexcelhandler = () => {
    var wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(attendmaterial);
    XLSX.utils.book_append_sheet(wb, ws, "MySheet1");
    XLSX.writeFile(wb, "MyExcel.xlsx")
  };

  const exporttopdfhandler = () => {
    const doc = new jsPDF()
    doc.text("Overall Attendance", 70, 10)
    autoTable(doc, { html: '#mytable' })
    doc.save('table.pdf')
  };

  return (
    <>
      <div className='height100vh'>
        <Navbar />
        {<h3 className='text-center' id='string-12'>{string}</h3>}
        <div className='rep_1 '>
          {sem1 && <div className='classrepcontainer'>
            <form className='repform1' onSubmit={subjectupdate}>
              <select
                type="text"
                className="form-control shadow-none"
                id="subject1"
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
            <form className='repform1' onSubmit={subjectupdate}>
              <select
                type="text"
                className="form-control shadow-none"
                id="subject1"
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
            <form className='repform1' onSubmit={subjectupdate}>
              <select
                type="text"
                className="form-control shadow-none"
                id="subject1"
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
                id="subject1"
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
        <div className='nothing_block'>{string2}</div>
        <br></br>
        {show && <div className='overflowxauto'>
          <table className='table table-striped overflowxauto' id='mytable-2'>
            <thead className='heading-2'>
              <tr>

                <th>subject</th>
                <th>Date</th>
                <th>Attendance Status</th>
              </tr>
            </thead>
            <tbody>
              <List attendmaterial={attendmaterial} />
            </tbody>
          </table>
        </div>} 
        {!visible && <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open
        // onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>}

        {show && <div className='text-center  button_block8'>
          <button id='butn' class="btn btn-primary" onClick={exporttoexcelhandler}>Download in excel</button>
          <button id='butn' class="btn btn-primary-1" onClick={exporttopdfhandler}>Download in pdf</button>
        </div>}
      </div>
    </>
  )
}

export default Attendancereport