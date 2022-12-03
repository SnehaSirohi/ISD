import React from 'react'
import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import jwt from 'jsonwebtoken'
import { useNavigate } from "react-router-dom"
import List from './List'
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';
var XLSX = require("xlsx");
const Sem2filters = () => {
  const navigate = useNavigate();
  const [subject,setsubject]=useState(false)
  const [date,setdate]=useState(false)
  const [month,setmonth]=useState(false)
  const[button,setbutton]=useState(false)
  const[filter,setfilter]=useState("")
  const [subjectval, setsubjectval] = useState("")
  const [dateval, setdateval] = useState("")
  const[monthval,setmonthval]=useState("")
  const[overall,setoverall]=useState(false)
  const [val, setval] = useState("")
  const [student, setstudent] = useState([]);
  const[report,setreport]=useState(false)
  const [UnmeshShukla, setUnmeshShukla] = useState(false)
  const [NitishaAgg, setNitishaAgg] = useState(false)
  const [MKDas, setMKDas] = useState(false)
  const [Sanjeev, setSanjeev] = useState(false)
  console.log("subject value :",subject);
  const fetchdata = async () => {
    const response = await fetch("http://localhost:4000/attendancereport/sem2", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        'x-access-token': localStorage.getItem('token'), //
      }
    })
    const json = await response.json()
    if (json.name == "Unmesh Shukla") {
      setUnmeshShukla(true)
    }
    if (json.name == "Nitisha Aggarwal") {
      setNitishaAgg(true)
    }
    if (json.name == "M.K Das") {
      setMKDas(true)
    }
    if (json.name == "Sanjeev") {
      setSanjeev(true)
    }
    setstudent(json.data)
    if (monthval) {
      let data1 = json.data.filter((data) => data.date.slice(5, 7) == monthval)
      setstudent(data1)
      const date = new Date();
      date.setMonth(monthval - 1);

      var month = date.toLocaleString('en-US', {
        month: 'long',
      });
      setval(month)
    }

    else if (dateval) {
      let data1 = json.data.filter((data) => data.date == dateval)
      setstudent(data1)
      setval(dateval)
    }
     
    else if (subjectval) {
      let data1 = json.data.filter((data) => data.subject == subjectval)
      setstudent(data1)
      setval(subjectval)
    }
    else {
      setstudent(json.data)
    }

  }
  useEffect(()=>{
    fetchdata()
  },[])
  function handlechange(e){
      var val=e.target.value
      setfilter(val)
      
      if(val=="overall")
      {   
          
          setdate(false)
          setmonth(false)
          setsubject(false)
          setbutton(true)
          setoverall(true)
          setreport(false)
          setdateval("")
          setmonthval("")
          setsubjectval("")
      }
      if(val=="date")
      {
          setdate(true)
          setmonth(false)
          setsubject(false)
          setbutton(true)
          setoverall("")
          setmonthval("")
          setsubjectval("")
      }
      if(val=="month")
      {
          setdate(false)
          setmonth(true)
          setsubject(false)
          setbutton(true)
          setoverall("")
          setdateval("")
          setsubjectval("")
      }
      if(val=="subject")
      {
          setdate(false)
          setmonth(false)
          setsubject(true)
          setbutton(true)
          setoverall("")
          setdateval("")
          setmonthval("")
      }
  }
  function Print()
  {
    setreport(true)
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
  }
  const exporttoexcelhandler = () => {
    var wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(student);
    XLSX.utils.book_append_sheet(wb, ws, "MySheet1");
    XLSX.writeFile(wb, "MyExcel.xlsx")
  };

  const exporttopdfhandler = () => {
    const doc = new jsPDF()
    let heading = val ? "Attendance Report of " + val : "Overall Attendance Report of Semester1";
    doc.text(heading, 20, 10)
    autoTable(doc, { html: '#mytable' })
    doc.save('table.pdf')
  };

return (
  <>
   <div className=" mb-3">
        <label className="form-label">Select Filter</label>
        <select
          type="text"
          className="form-control"
          id="filter"
          name="filter"
          value={filter}
          onChange={handlechange}>
          <option value="overall">
            Overall
          </option>
          <option value="date">
            Date
          </option>
          <option value="month">
            Month
          </option>
          <option value="subject">
            Subject
          </option>
        </select>
      </div>
      {date && <form>
<div className="mb-3">
  <label className="form-label">Enter Date</label>
  <input type="date" className="form-control" value={dateval} onChange={(e)=>setdateval(e.target.value)} />
</div>

</form>}
{month &&    <form>
  <div className=" mb-3">
        <label className="form-label">Select Month</label>
        <select
          type="text"
          className="form-control"
          id="month"
          name="month"
          value={monthval}
          onChange={(e) => setmonthval(e.target.value)}>
          <option required>Select Month</option>
            <option value="01">
              January
            </option>
            <option value="02">
             February
            </option>
            <option value="03">
              March
            </option>
            <option value="04">
             April
            </option>
            <option value="05">
             May
            </option>
            <option value="06">
             June
            </option>
        </select>
      </div>
</form>}
{subject && NitishaAgg &&  <form>
  <div className=" mb-3">
        <label className="form-label">Select Subject</label>
        <select
          type="text"
          className="form-control"
          id="subject"
          name="subject"
          value={subjectval}
          onChange={(e) => setsubjectval(e.target.value)}>
        <option>Select Subject</option>
            <option value="Computer Communication and Networks">
              Computer Communication and Networks
            </option>
            <option value="Operating Systems">Operating Systems</option>
          
        </select>
      </div>
</form> }
{subject && UnmeshShukla && <form>
  <div className=" mb-3">
        <label className="form-label">Select Subject</label>
        <select
          type="text"
          className="form-control"
          id="subject"
          name="subject"
          value={subjectval}
          onChange={(e) => setsubjectval(e.target.value)}>
          <option required>Select Subject</option>
            <option value="Database Systems">Database Systems</option>
        </select>
      </div>
</form>}
{subject && MKDas && <form>
  <div className=" mb-3">
        <label className="form-label">Select Subject</label>
        <select
          type="text"
          className="form-control"
          id="subject"
          name="subject"
          value={subjectval}
          onChange={(e) => setsubjectval(e.target.value)}>
          <option>Select Subject</option> 
            <option value="Applied Machine Learning">
              Applied Machine Learning
            </option>
            
        </select>
      </div>
</form>}
{subject && Sanjeev&& <form>
  <div className=" mb-3">
        <label className="form-label">Select Subject</label>
        <select
          type="text"
          className="form-control"
          id="subject"
          name="subject"
          value={subjectval}
          onChange={(e) => setsubjectval(e.target.value)}>
           <option>Select Subject</option>
            <option value="Open Elective-1">Open Elective-1</option>
        </select>
      </div>
</form>}
 
 
  
{button &&  <button type="submit" className="btn btn-primary" onClick={Print}  >Print Attendance</button>}
{report?<h1>Attendance Report Of {val}</h1>:<h1>Overall Attendance Report</h1>}
<div className='table-2'>
        <table className='table table-striped' id='mytable'>
          <thead className='heading-2'>
            <tr>
              <th>Student</th>
              <th>Subject</th>
              <th>Date</th>
              <th>Attendance Status</th>
            </tr>
          </thead>
          <tbody>
            <List student={student} />
          </tbody>
        </table>
      </div>
      <div className='text-center'>
          <button type="button" class="btn btn-primary" id='butn' data-toggle="button" aria-pressed="false" autocomplete="off" onClick={exporttoexcelhandler}>Download in excel</button>
          <button type="button" class="btn btn-primary" id='butn' data-toggle="button" aria-pressed="false" autocomplete="off" onClick={exporttopdfhandler}>Download in pdf</button>
        </div>
  </>
)
}

export default Sem2filters