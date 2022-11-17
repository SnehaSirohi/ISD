import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import { useState } from 'react'
const Sem_1 = () => {
    const [subject,setsubject]=useState("")
    const [date,setdate]=useState("")
    const [time,settime]=useState("")
    const sem="Sem-1"
    
    
    async function schedule(e){
        e.preventDefault()
 
         const response=await fetch('http://localhost:4000/scheduletest',{
             method:'POST',
             headers:{
                 'Content-Type':'application/json',
             },
             body:JSON.stringify({
               subject,
               sem,
               date,
               time  
             })
         })
 
         const data = await response.json()
        
     }

  return (
    <>
        <form onSubmit={schedule}>
        <div className=" mb-3">
      <label className="form-label">Select Subject</label>
                <select
                  type="text"
                  className="form-control"
                  id="subject"
                  name="subject"
                  value={subject}
                  onChange={(e) => setsubject(e.target.value)}
                >
                  <option>Select Subject</option>
                  <option value="Software Design & Programming">Software Design & Programming</option>
                  <option value="Algorithms And Data Structure">Algorithms and Data Structure</option>
                  <option value="Computer System Architecture">Computer System Architecture</option>
                  <option value="Mathematical Foundation Of Computing">Mathematical Foundation of Computing</option>
                </select>
              </div>
  <div className="mb-3">
    <label htmlFor="date" className="form-label">Date</label>
    <input type="date" className="form-control" id="date" aria-describedby="date" value={date} onChange={(e)=>setdate(e.target.value)} />
  </div>
  <div className="mb-3">
    <label htmlFor="time" className="form-label">time</label>
    <input type="time" className="form-control" id="time" value={time} onChange={(e)=>settime(e.target.value)}/>
  </div>
  <button type="submit" className="btn btn-primary">Schedule Test</button>
</form>
    </>
  )
}



export default Sem_1