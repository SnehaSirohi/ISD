import React, { useEffect, useState } from 'react'
import './notifications.css'
import Navbar from './Navbar'
const Notifications = () => {
    const [assignmentnotifications,setassignmentnotifications]=useState([])
    const [classnotifications,setclassnotifications]=useState([])
    const [testnotifications,settestnotifications]=useState([])
    const [studymaterial,setstudymaterial]=useState([])

    // const [testnotifications,settestnotifications]=useState([])
    const fetchdata=async()=>{
        const response1=await fetch("https://isd-production.up.railway.app/notifications/assignment", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            }})
            const json1 = await response1.json()
            const array1= json1.data.reverse();
            setassignmentnotifications(array1)
        const response2=await fetch("https://isd-production.up.railway.app/notifications/classes", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            }})
            const json2 = await response2.json()
            console.log(json2);
              const array2= json2.data.reverse();
            setclassnotifications(array2)
        const response3=await fetch("https://isd-production.up.railway.app/notifications/tests", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            }})
            const json3 = await response3.json()
            const array3= json3.data.reverse();
            settestnotifications(array3)
        }
        useEffect(()=>{
            fetchdata()
        },[])
  return (
    <>
    <Navbar/>
    <div className='"container notification"'>
     {assignmentnotifications.map((notification)=>{
        const {teacher,subject,date} = notification
         return(
            <>
            <div className='container noti'>
                <h4>{teacher} has posted an assignment of {subject}</h4>
                <p>{date}</p>
            </div>
            </>
         )
     })}
     {classnotifications.map((notification)=>{
        const {name,subject,date} = notification
         return(
            <>
            <div className='container noti'>
                <h4>{name} has scheduled a class of {subject} on {date}</h4>
                <p>{date}</p>
            </div>
            </>
         )
     })}
     {testnotifications.map((notification)=>{
        const {name,subject,date} = notification
         return(
            <>
            <div className='container noti'>
                <h4>{name} has scheduled a test of {subject} on {date}</h4>
                <p>{date}</p>
            </div>
            </>
         )
     })}
    </div>
    
    </>
  )
}

export default Notifications
