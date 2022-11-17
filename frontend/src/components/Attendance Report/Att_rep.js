import React from 'react'
import { useState,useEffect } from 'react';
import List from './List';
const Att_rep = () => {
    const [student,setstudent]=useState([]);
    
    const [date,setdate]=useState("")
    console.log(date)
    const fetchdata=async()=>{
        const response=await fetch("http://localhost:4000/attendancereport", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            }})
            const json = await response.json()
            let data1=json.data.filter((data)=> data.date==date)
            setstudent(data1)
            
      }
      useEffect(()=>{
          
        fetchdata()

      },[])

    //   function printattendance(){
    //     return(
    //         <>
    //         </>
    //     )
    //   }
  return (
   <>
   <input type="date" value={date} onChange={(e)=>setdate(e.target.value)}></input>
   <h1> Attendance Report of </h1>
     <div className='main'>
    <table className="table table-bordered">
    <thead>
      <tr>
        <th>Student</th>
        <th>Attendance Status</th>
      </tr>
    </thead>
    <tbody>
     <List student={student} />
    </tbody>
  </table>
    </div>
    {/* <button onClick={printattendance}>Print Attendance</button> */}
   </>
  )
}

export default Att_rep