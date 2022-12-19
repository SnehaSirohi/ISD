import React, { useEffect } from 'react'
import { useState } from 'react'
import List from './/List'
import Navbar from './Navbar'

import "../Admin/Admin Dashboard/Register/registermultiple.css"


import "../Admin/Admin Dashboard/Register/registermultiple.css";

const Classes_taken = () => {
  const [classes, setclasses] = useState([])
  const [professor, setprofessor] = useState("")
  let data2;
  if (professor == "Manish Shailani") {
    data2 = classes.filter((classes) => classes.name == professor)
    console.log(data2);
  }
  else if (professor == "Nitisha Aggarwal") {
    data2 = classes.filter((classes) => classes.name == professor)
    console.log(data2);
  }
  else if (professor == "Sanjeev Singh") {
    data2 = classes.filter((classes) => classes.name == professor)
    console.log(data2);
  }
  else if (professor == "Sunil Kumar") {
    data2 = classes.filter((classes) => classes.name == professor)
    console.log(data2);
  }
  else if (professor == "Unmesh Shukla") {
    data2 = classes.filter((classes) => classes.name == professor)
    console.log(data2);
  }
<<<<<<< HEAD
   const fetchdata = async () => {
    const response = await fetch("https://isd-production.up.railway.app/classestaken", {
=======
  const fetchdata = async () => {
    const response = await fetch("http://localhost:4000/classestaken", {
>>>>>>> e7e0a9e87a71639da70aee3408a6a9268b718718
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      }
    })
    const json = await response.json()
    setclasses(json.data)
    console.log(json.data);
  }
  useEffect(() => {
    fetchdata()
  }, [])
  return (
    <>
      <div className='height100vh'>
        <Navbar />

        <div className=" mb-3" >
          {/* <label className="form-label">Select Filter</label> */}
          <select
            type="text"
            className="form-control-8"
            id="filter"
            name="filter"
            value={professor}
            onChange={(e) => setprofessor(e.target.value)}
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
        {data2 && <> <div class="row overviewdatacontent" >
          <div class="col-lg-7 col-md-6 col-sm-12 datacontent flex" >

            <div class="classtkn">
              <h5>Total classes taken by {professor}</h5>

            </div>
            <div class="classinfoval">
              <h5>{data2.length}</h5>

            </div>
          </div>
        </div> <div className='main overflowxauto'>
            <table className='table table-striped overflowxauto' id='mytable-5'>
              <thead className='heading_1'>
                <tr>
                  <th>Professor</th>
                  <th>Subject</th>
                  <th>Date</th>
                  <th>Semester</th>
                </tr>
              </thead>
              <tbody>
                <List data2={data2} />
              </tbody>
            </table>
          </div> </>}
      </div>
    </>
  )
}

export default Classes_taken
