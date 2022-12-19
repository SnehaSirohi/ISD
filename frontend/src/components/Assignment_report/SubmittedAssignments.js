import React, { useEffect } from 'react'
import { useState } from 'react'
import jwt from 'jsonwebtoken'
import { navigate, useNavigate } from "react-router-dom"
import List2 from '../Assignment_report/list2'
import Navbar from '../Teacher_dashboard/Navbar'
const SubmittedAssignments = ({assid}) => {

  const navigate = useNavigate();
  const [submissions,setsubmissions]=useState([])
  const [visible,setVisible]=useState(false)
  const [string,setString]=useState("")
 const fetchdata = async () => {
    const response = await fetch(`https://isd-production.up.railway.app/submissions/${assid}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        'x-access-token': localStorage.getItem('token'), //
       
      }
    })
    const json = await response.json()
    setsubmissions(json.data)
    if (json.data.length != 0) {
      setVisible(true)
    }else{
      setString("No one has submitted the assignment yet")
    }
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
  return (
   <>
   <div className='height100vh'>
  <Navbar />
      {<h1 className='text-center pt-3'>{string}</h1>}

    {visible && <div className='tableblock'>
        <table className='table table-striped' id='mytable'>
          <thead className='heading-2'>
            <tr>
              <th>Name</th>
              <th>Semester</th>
              <th>Date</th>
              <th>Assignment</th>
              <th>Submissions</th>
            </tr>
          </thead>
          <tbody>
            <List2 submissions={submissions} />
          </tbody>
        </table>
      </div>}
      </div>
   </>
  )
}

export default SubmittedAssignments
