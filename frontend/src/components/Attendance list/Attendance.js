import React, { useState,useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './attendance.css'
import List from './List';
import data from './data';
const Attendance = () => {
 
    const [students,setstudents]=useState(null)
    const fetchdata=async()=>{
        const response=await fetch("http://localhost:4000/attendance", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                }})
        const json = await response.json()
        console.log(json)
        setstudents(json)
       
        
      
      }
      useEffect(()=>{
        fetchdata()
      },[])

  return (
    <>
    <div className='main'>
    <table className="table table-bordered">
    <thead>
      <tr>
        <th>Student</th>
        <th>Attendance</th>
      </tr>
    </thead>
    <tbody>
<List students={students}/>
    </tbody>
  </table>
    </div>
      
    </>
  )
}

export default Attendance