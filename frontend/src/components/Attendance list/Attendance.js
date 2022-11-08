import React, { useState,useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './attendance.css'
import List from './List';
import data from './data';
const Attendance = () => {
 
    const [students,setstudents]=useState([])
    const[status,setstatus]=useState({})

    const fetchdata=async()=>{
        const response=await fetch("http://localhost:4000/attendance", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                }})
        const json = await response.json()
        console.log(json.data)
        setstudents(json.data)
       
        
      
      }
      useEffect(()=>{

        fetchdata()
      },[])

     async function Submit(e)
      {
        e.preventDefault();
        const response = await fetch("http://localhost:4000/attendancereport",{
          method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",

        },
        body:JSON.stringify(
          status
        )
      })


      }
  return (
    <>
    <div className='main'>
    <table className="table table-bordered">
    <thead>
      <tr>
        <th>Student</th>
        <th>Present</th>
        <th>Absent</th>
      </tr>
    </thead>
    <tbody>
<List students={students}  status={status} setstatus={setstatus} />
    </tbody>
  </table>
    </div>
    <button onClick={Submit}>Submit</button>
      
    </>
  )
}

export default Attendance