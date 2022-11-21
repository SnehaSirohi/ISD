// import React from 'react'
// import { useState,navigate } from 'react';
// import "bootstrap/dist/css/bootstrap.min.css";
// import { Link } from 'react-router-dom';
// const Sem2filters = ({subjectval2,setsubjectval2,dateval2,setdateval2,monthval2,setmonthval2}) => {
//     const [subject,setsubject]=useState(false)
//     const [date,setdate]=useState(false)
//     const [month,setmonth]=useState(false)
//     const[button,setbutton]=useState(false)
//     const[overall,setoverall]=useState(false)
//     const[filter,setfilter]=useState("")
  
//     function handlechange(e){
//         var val=e.target.value
//         setfilter(val)
        
//         if(val=="overall")
//         {
//             setdate(false)
//             setmonth(false)
//             setsubject(false)
//             setoverall(true)
//             setbutton(true)
//         }
//         if(val=="date")
//         {
//             setdate(true)
//             setmonth(false)
//             setsubject(false)
//             setoverall(false)
//             setbutton(true)
//         }
//         if(val=="month")
//         {
//             setdate(false)
//             setmonth(true)
//             setsubject(false)
//             setoverall(false)
//             setbutton(true)
//         }
//         if(val=="subject")
//         {
//             setdate(false)
//             setmonth(false)
//             setsubject(true)
//             setoverall(false)
//             setbutton(true)
//         }
//     }
//   return (
//     <>
//      <div className=" mb-3">
//           <label className="form-label">Select Filter</label>
//           <select
//             type="text"
//             className="form-control"
//             id="filter"
//             name="filter"
//             value={filter}
//             onChange={handlechange}>
//             <option required>Select filter</option>
//             <option value="overall">
//               Overall
//             </option>
//             <option value="date">
//               Date
//             </option>
//             <option value="month">
//               Month
//             </option>
//             <option value="subject">
//               Subject
//             </option>
//           </select>
//         </div>
//   {subject &&   <form>
//     <div className=" mb-3">
//           <label className="form-label">Select Subject</label>
//           <select
//             type="text"
//             className="form-control"
//             id="subject"
//             name="subject"
//             value={subjectval2}
//             onChange={(e) => setsubjectval2(e.target.value)}>
//             <option>Select Subject</option>
//             <option value="Computer Communication and Networks">
//               Computer Communication and Networks
//             </option>
//             <option value="Database Systems">Database Systems</option>
//             <option value="Operating Systems">Operating Systems</option>
//             <option value="Applied Machine Learning">
//               Applied Machine Learning
//             </option>
//             <option value="Open Elective-1">Open Elective-1</option>
//           </select>
//         </div>
// </form>}
//     {date && <form>
//   <div className="mb-3">
//     <label className="form-label">Enter Date</label>
//     <input type="date" className="form-control" value={dateval2} onChange={(e)=>setdateval2(e.target.value)} />
//   </div>

// </form>}
//     {month &&    <form>
//     <div className=" mb-3">
//           <label className="form-label">Select Subject</label>
//           <select
//             type="text"
//             className="form-control"
//             id="subject"
//             name="subject"
//             value={monthval2}
//             onChange={(e) => setmonthval2(e.target.value)}>
//             <option required>Select Month</option>
//             <option value="01">
//                January
//             </option>
//             <option value="02">
//              February
//             </option>
//             <option value="03">
//              March
//             </option>
//             <option value="04">
//             April
//             </option>
//             <option value="05">
//              May
//             </option>
//             <option value="06">
//              June
//             </option>
//           </select>
//         </div>
// </form>}
// {button &&   <Link to="/attendancereport/sem2"><button type="submit" className="btn btn-primary"  >Print Attendance</button></Link> }

//     </>
//   )
// }

// export default Sem2filters