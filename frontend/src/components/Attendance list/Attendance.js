import React, { useState,useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './attendance.css'
import List from './List';
import data from './data';
const Attendance = () => {
 
    const [students,setstudents]=useState(data)
    const [present,setpresent]=useState("")
    const [absent,setabsent]=useState("")

    console.log(present,absent)
    // const fetchdata=async()=>{
    //     const response=await fetch("http://localhost:4000/attendance", {
    //             method: "GET",
    //             headers: {
    //                 Accept: "application/json",
    //                 "Content-Type": "application/json",
    //             }})
    //     const json = await response.json()
    //     console.log(json)
    //     setstudents(json)
       
        
      
    //   }
    //   useEffect(()=>{
    //     fetchdata()
    //   },[])

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
<List students={students} present={present} setpresent={setpresent} absent={absent} setabsent={setabsent} />
    </tbody>
  </table>
    </div>
      
    </>
  )
}

export default Attendance