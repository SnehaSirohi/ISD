import React from 'react'
import { useState, useEffect, useRef, useReactToPrint } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import jsPDF from "jspdf";
import "../schedule_report/scheduledclass.css";
import autoTable from 'jspdf-autotable';
import jwt from 'jsonwebtoken'
import { Navigate, useNavigate } from "react-router-dom"
import Navbar from "../Teacher_dashboard/Navbar";
import List from './list';
import { Link } from "react-router-dom";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';

var XLSX = require("xlsx");

const Assignmentreport = ({setassid}) => {
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState([]);
  const [visible, setVisible] = useState(false)
  const [string, setString] = useState("")
  
  const fetchdata = async () => {
    const response = await fetch("https://isd-production.up.railway.app/assignmentreportteacher", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        'x-access-token': localStorage.getItem('token'), //
      }
    })
    const json = await response.json()
    setAssignments(json.data.reverse())
    if (json.data.length != 0) {
      setVisible(true)
      setString("Assignments Posted ")
    }else{
      setString("No Assignments Posted !")
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
  
  function handleclick(e){
    setassid(e.target.value)
    navigate("/Teacherdashboard/submissions")
  }
  return (
    <>
    <div className='height100vh'>
  <Navbar />
      {<h1 className='text-center pt-3'>{string}</h1>}

    {visible ? <div className='tableblock'>
        <table className='table table-striped' id='mytable'>
          <thead className='heading-2'>
            <tr>
              <th>Date</th>
              <th>Professor</th>
              <th>Subject</th>
              <th>Deadline</th>
              <th>Assignment</th>
              <th>Submissions</th>
            </tr>
          </thead>
          <tbody>
            <List assignments={assignments} handleclick={handleclick} />
          </tbody>
        </table>
      </div> : <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open
      >
        <CircularProgress color="inherit" />
      </Backdrop>}
      </div>
    </>
  )
}

export default Assignmentreport