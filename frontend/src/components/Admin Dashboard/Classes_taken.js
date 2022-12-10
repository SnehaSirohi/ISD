import React, { useEffect } from 'react'
import { useState } from 'react'
import List from './/List'
import Navbar from './Navbar'
const Classes_taken = () => {
  const[classes,setclasses]=useState([])
  const[professor,setprofessor]=useState("")
  let data2;
  if(professor=="Manish Shailani")
  {
     data2 = classes.filter((classes)=>classes.name==professor)
     console.log(data2);
  }
  else if(professor=="Nitisha Aggarwal")
  {
     data2 = classes.filter((classes)=>classes.name==professor)
     console.log(data2);
  }
  else if(professor=="Sanjeev Singh")
  {
     data2 = classes.filter((classes)=>classes.name==professor)
     console.log(data2);
  }
  else if(professor=="Sunil Kumar")
  {
     data2 = classes.filter((classes)=>classes.name==professor)
     console.log(data2);
  }
  else if(professor=="Unmesh Shukla")
  {
     data2 = classes.filter((classes)=>classes.name==professor)
     console.log(data2);
  }
   const fetchdata = async () => {
    const response = await fetch("http://localhost:4000/classestaken", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        'x-access-token': localStorage.getItem('token'), //
      }
    })
    const json = await response.json()
    setclasses(json.data)
}
useEffect(()=>{
   fetchdata()
},[])
  return (
    <>
    <Navbar/>
    {data2 && <h1>Total classes taken by {professor} : {data2.length}</h1>}
    <div className=" mb-3" >
        {/* <label className="form-label">Select Filter</label> */}
        <select
          type="text"
          className="form-control-8"
          id="filter"
          name="filter"
          value={professor}
          onChange={(e)=>setprofessor(e.target.value)}
          >
         
          <option>
            Select Professor
          </option>
          <option value="Manish Shailani">
            Manish Shailani
          </option>
          <option value="Nitisha Aggarwal">
            Nitisha Aggarwal
          </option>
          <option value="Sanjeev Singh">
            Sanjeev Singh
          </option>
          <option value="Sunil Kumar">
            Sunil Kumar 
          </option>
          <option value="Unmesh Shukla">
            Unmesh Shukla
          </option>
        </select>
      </div>
      {data2 && <div classname="main">
        <table className='table table-striped' id='mytable-5'>
          <thead className='heading_1'>
            <tr>
              <th>Professor</th>
              <th>Subject</th>
              <th>Date</th>
              <th>Semester</th>        
            </tr>
          </thead>
          <tbody>
            <List data2={data2}  />
          </tbody>
        </table>
      </div> }
    </>
  )
}

export default Classes_taken
