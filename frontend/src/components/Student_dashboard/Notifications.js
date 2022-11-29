import React, { useEffect, useState } from 'react'
import './notifications.css'
const Notifications = () => {
    const [assignmentnotifications,setassignmentnotifications]=useState([])
    const [classnotifications,setclassnotifications]=useState([])

    // const [testnotifications,settestnotifications]=useState([])
    const fetchdata=async()=>{
        const response1=await fetch("http://localhost:4000/notifications/assignment", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            }})
            const json1 = await response1.json()
            const array1= json1.data.reverse();
            setassignmentnotifications(array1)
        const response2=await fetch("http://localhost:4000/notifications/classes", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            }})
            const json2 = await response2.json()
            console.log(json2);
              const array2= json2.data.reverse();
            setclassnotifications(array2)
        // const response3=await fetch("http://localhost:4000/", {
        //     method: "GET",
        //     headers: {
        //         Accept: "application/json",
        //         "Content-Type": "application/json",
        //     }})
        //     const json = await response1.json()
        }
        useEffect(()=>{
            fetchdata()
        },[])
  return (
    <>
    <h1>Notifications</h1>
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
    </>
  )
}

export default Notifications
