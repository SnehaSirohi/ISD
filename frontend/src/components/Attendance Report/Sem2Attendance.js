import React from 'react'
import { useState,useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./attendance_report.css";

import List from './List';
const Sem2Attendance = ({subjectval,dateval,monthval}) => {
    const[val,setval]=useState("")
    const [student,setstudent]=useState([]);
    const fetchdata=async()=>{
        const response=await fetch("http://localhost:4000/attendancereport/sem2", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            }})
            const json = await response.json()
            console.log(json.data)
              if(monthval)
              {
                let data1=json.data.filter((data)=>data.date.slice(5,7)==monthval)
                setstudent(data1)
                const date = new Date();
                date.setMonth(monthval - 1);

                var month= date.toLocaleString('en-US', {
                  month: 'long',
                });
                setval(month)
              }
              else if(subjectval)
              {
                let data1=json.data.filter((data)=>data.subject==subjectval)
                setstudent(data1)
                setval(subjectval)
              }
              else if(dateval)
              {
                let data1=json.data.filter((data)=>data.date==dateval)
                setstudent(data1)
                setval(dateval)
                 
              }
              else
              {
                setstudent(json.data)
              }
            
      }
      useEffect(()=>{
          
        fetchdata()

      },[])

  return (
   <>
  <div className='Attrep-1'>
     {val? <h1> Attendance Report of {val} </h1> : <h1>Overall Attendance Report of Semester 2</h1>}
  </div>

  <div className='table-2'>
    <table className='table table-striped'>
      <thead className='heading-2'>
        <tr>
          <th>Student</th>
          <th>Attendance Status</th>
          <th>Date</th>
          <th>subject</th>
        </tr>
      </thead>
      <tbody>
      <List student={student} />
      </tbody>
    </table>
  </div>


  <div className="button-2">
        <button type="button" class="btn btn-primary" data-toggle="button" aria-pressed="false" autocomplete="off" >Print</button>
      </div> 

   </>
  )
}

export default Sem2Attendance