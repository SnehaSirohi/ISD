import React from 'react'
import { useState,useEffect,useRef,useReactToPrint } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import jsPDF from "jspdf";
import './scheduledclass.css';
import autoTable from 'jspdf-autotable';
import jwt from 'jsonwebtoken'
import { useNavigate } from "react-router-dom"
import List from './list';
var XLSX = require("xlsx");

const Classreport = () => {
    const navigate = useNavigate();
    const [classes, setClasses]=useState([]);
    const fetchdata=async()=>{
        const response=await fetch("http://localhost:4000/scheduledclassreport", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                'x-access-token': localStorage.getItem('token'), //
            }})
            const json = await response.json()
                setClasses(json.data.reverse())

      }
      useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
          const user = jwt.decode(token)
          console.log(user)
          if (!user) {
            localStorage.removeItem('token')
            navigate("/Teacherdashboard");
          } else {
            fetchdata()
    
          }
        }
      }, [])
  
  const exporttoexcelhandler= () =>{
     var wb = XLSX.utils.book_new(),
     ws = XLSX.utils.json_to_sheet(classes);
     XLSX.utils.book_append_sheet(wb,ws,"MySheet1");
     XLSX.writeFile(wb,"MyExcel.xlsx")
  };

  const exporttopdfhandler = () =>{
    const doc = new jsPDF()
    doc.text("Overall Classes Scheduled",70,10)
    autoTable(doc, { html: '#mytable'})
    doc.save('table.pdf')
  };
  return (
   <>

 {<h1 className='text-center'>Overall Scheduled Classes </h1>}
 
  <div className='tableblock'>
    <table className='table table-striped' id='mytable'>
      <thead className='heading-2'>
        <tr>
          <th>Professor</th>
          <th>Subject</th>
          <th>Date</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>
      <List classes={classes} />
      </tbody>
    </table>
  </div>
  <div className='text-center'>
   <button id='butn' class="btn btn-primary" onClick={exporttoexcelhandler}>Download in excel</button>
   <button id='butn' class="btn btn-primary-1" onClick={exporttopdfhandler}>Download in pdf</button>
   </div>
   </>
  )
}

export default Classreport