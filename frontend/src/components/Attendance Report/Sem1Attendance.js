import React from 'react'
import { useState,useEffect,useRef,useReactToPrint } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
// import { Button } from 'reactstrap';
// import jsPDF from 'jspdf'
import List from './List';
const Sem1Attendance = ({subjectval,dateval,monthval}) => {
 
    const [student,setstudent]=useState([]);
    const fetchdata=async()=>{
        const response=await fetch("http://localhost:4000/attendancereport/sem1", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            }})
            const json = await response.json()
              if(monthval)
              {
                let data1=json.data.filter((data)=>data.date.slice(5,7)==monthval)
                setstudent(data1)
              }
              else if(subjectval)
              {
                let data1=json.data.filter((data)=>data.subject==subjectval)
                setstudent(data1)
              }
              else if(dateval)
              {
                let data1=json.data.filter((data)=>data.date==dateval)
                setstudent(data1)
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


  <h1> Attendance Report of </h1>
  <div classname="main">
    <table classname="table table-bordered">
      <thead>
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

   <button  >Print In pdf</button>
   </>
  )
}

export default Sem1Attendance