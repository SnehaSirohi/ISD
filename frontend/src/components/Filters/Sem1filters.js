import React from 'react'
import { useState,navigate } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from 'react-router-dom';
const Sem1filters = ({subjectval,setsubjectval,dateval,setdateval,monthval,setmonthval}) => {
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
            <option value="Software Design & Programming">
              Software Design & Programming
            </option>
            <option value="Algorithms And Data Structure">
              Algorithms and Data Structure
            </option>
            <option value="Computer System Architecture">
              Computer System Architecture
            </option>
            <option value="Mathematical Foundation Of Computing">
              Mathematical Foundation of Computing
            </option>
          </select>
        </div>
</form>}
   
    
{button &&   <Link to="/attendancereport/sem1"><button type="submit" className="btn btn-primary"  >Print Attendance</button></Link> }

    </>
  )
}

export default Sem1filters