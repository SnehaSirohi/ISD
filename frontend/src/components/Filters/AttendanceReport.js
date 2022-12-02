import React from 'react'
import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import List from './List'
const AttendanceReport = () => {
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
  const fetchdata = async () => {
    const response = await fetch("http://localhost:4000/attendancereport/sem1", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      }
    })
    const json = await response.json()
    console.log(json.data)
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
    fetchdata();
  }
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
          <option value="07">
            July
          </option>
          <option value="08">
           August
          </option>
          <option value="09">
            September
          </option>
          <option value="10">
          October
          </option>
          <option value="11">
           November
          </option>
          <option value="12">
           December
          </option>
        </select>
      </div>
</form>}
{subject &&   <form>
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
  </>
)
}

export default AttendanceReport