// import React from 'react'
// import { useState, useEffect, useRef, useReactToPrint } from 'react';
// import "bootstrap/dist/css/bootstrap.min.css";
// import jsPDF from "jspdf";
// import autoTable from 'jspdf-autotable';
// import Navbar from "../Teacher_dashboard/Navbar.js";
// import "./attendance_report.css";

// import List from './List';
// var XLSX = require("xlsx");
// const Sem1Attendance = () => {
//   const [val, setval] = useState("")
//   const [student, setstudent] = useState([]);
//   console.log(student);
//   const fetchdata = async () => {
//     const response = await fetch("http://localhost:4000/attendancereport/sem1", {
//       method: "GET",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       }
//     })
//     const json = await response.json()
//     if (dateval) {
//       let data1 = json.data.filter((data) => data.date == dateval)
//       setstudent(data1)
//       setval(dateval)
//     }
//     else if (monthval) {
//       let data1 = json.data.filter((data) => data.date.slice(5, 7) == monthval)
//       setstudent(data1)
//       const date = new Date();
//       date.setMonth(monthval - 1);

//       var month = date.toLocaleString('en-US', {
//         month: 'long',
//       });
//       setval(month)
//     }
//     else if (subjectval) {
//       let data1 = json.data.filter((data) => data.subject == subjectval)
//       setstudent(data1)
//       setval(subjectval)
//     }
//     else {
//       setstudent(json.data)
//     }

//   }
//   useEffect(() => {

//     fetchdata()

//   }, [])

//   const exporttoexcelhandler = () => {
//     var wb = XLSX.utils.book_new(),
//       ws = XLSX.utils.json_to_sheet(student);
//     XLSX.utils.book_append_sheet(wb, ws, "MySheet1");
//     XLSX.writeFile(wb, "MyExcel.xlsx")
//   };

//   const exporttopdfhandler = () => {
//     const doc = new jsPDF()
//     let heading = val ? "Attendance Report of " + val : "Overall Attendance Report of Semester1";
//     doc.text(heading, 20, 10)
//     autoTable(doc, { html: '#mytable' })
//     doc.save('table.pdf')
//   };
//   return (
//     <>
//       <Navbar />
//       <div className='attrep-1'>
//         {val ? <h1 className='attrep-1a'> Attendance Report of {val} </h1> : <h1 className='attrep-1a'>Overall Attendance Report of Semester-1</h1>}
//       </div>

//       <div className='table-2'>
//         <table className='table table-striped' id='mytable'>
//           <thead className='heading-2'>
//             <tr>
//               <th>Student</th>
//               <th>Attendance Status</th>
//               <th>Date</th>
//               <th>subject</th>
//             </tr>
//           </thead>
//           <tbody>
//             <List student={student} />
//           </tbody>
//         </table>
//       </div>
//       <div className='text-center'>
//         <button type="button" class="btn btn-primary" id='butn' data-toggle="button" aria-pressed="false" autocomplete="off" onClick={exporttoexcelhandler}>Download in excel</button>
//         <button type="button" class="btn btn-primary" id='butn' data-toggle="button" aria-pressed="false" autocomplete="off" onClick={exporttopdfhandler}>Download in pdf</button>
//       </div>
//     </>
//   )
// }

// export default Sem1Attendance