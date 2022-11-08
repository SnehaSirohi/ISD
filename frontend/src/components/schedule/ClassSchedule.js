import React from 'react'
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
const ClassSchedule = () => {

    const [subject,setsubject]=useState("")
    const [date,setdate]=useState("")
    const [time,settime]=useState("")
    
    
    async function schedule(e){
        e.preventDefault()
 
         const response=await fetch('http://localhost:4000/scheduleclass',{
             method:'POST',
             headers:{
                 'Content-Type':'application/json',
             },
             body:JSON.stringify({
               subject,
               date,
               time  
             })
         })
 
         const data = await response.json()
        
     }
    
  return (
    <>
    <form onSubmit={schedule}>
  <div className="mb-3">
    <label htmlFor="text" className="form-label">subject</label>
    <input type="text" className="form-control" id="text" aria-describedby="subject" value={subject} onChange={(e)=>setsubject(e.target.value)}/>
  </div>
  <div className="mb-3">
    <label htmlFor="date" className="form-label">Date</label>
    <input type="date" className="form-control" id="date" aria-describedby="date" value={date} onChange={(e)=>setdate(e.target.value)} />
  </div>
  <div className="mb-3">
    <label htmlFor="time" className="form-label">time</label>
    <input type="time" className="form-control" id="time" value={time} onChange={(e)=>settime(e.target.value)}/>
  </div>
  <button type="submit" className="btn btn-primary">Schedule Class</button>
</form>

    </>
  )
}

export default ClassSchedule