import React from 'react'
import { useState,navigate } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from 'react-router-dom';
const Sem4filters = ({subjectval,setsubjectval,dateval,setdateval,monthval,setmonthval}) => {
    const [subject,setsubject]=useState(false)
    const [date,setdate]=useState(false)
    const [month,setmonth]=useState(false)
    const[button,setbutton]=useState(false)
    const[filter,setfilter]=useState("")
  
    function handlechange(e){
        var val=e.target.value
        setfilter(val)
        
        if(val=="overall")
        {
            setdate(false)
            setmonth(false)
            setsubject(false)
            setbutton(true)
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
            setmonthval("")
            setsubjectval("")
        }
        if(val=="month")
        {
            setdate(false)
            setmonth(true)
            setsubject(false)
            setbutton(true)
            setdateval("")
            setsubjectval("")
        }
        if(val=="subject")
        {
            setdate(false)
            setmonth(false)
            setsubject(true)
            setbutton(true)
            setdateval("")
            setmonthval("")
        }
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
            <option required>Select filter</option>
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
            <option value="Research Methods in Informatics">
              Research Methods in Informatics
            </option>
            <option value="Internet of Things Systems, Security and Cloud">
              Internet of Things Systems, Security and Cloud
            </option>
            <option value="Dissertation Project">
              Dissertation Project
            </option>
            <option value="Health Informatics">
              Health Informatics
            </option>
          </select>
        </div>
</form>}
   
    
{button &&   <Link to="/attendancereport/sem4"><button type="submit" className="btn btn-primary"  >Print Attendance</button></Link> }

    </>
  )
}

export default Sem4filters