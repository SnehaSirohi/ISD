import React, { useState } from 'react'
import { useEffect } from 'react'
import List from './List'
import Navbar from './Navbar'
const Notifications = () => {
    const[notification,setnotification]=useState("")
    console.log(notification)
    const fetchdata=async()=>{
        const response = await fetch("http://localhost:4000/assignmentsubmit", {
      
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            }})
            const json = await response.json()
            setnotification(json.data.reverse())
    }
        useEffect(() => {
     
            fetchdata();
        },[])
        
  return (
    <>
    <Navbar/>
    <div className="container notification">
     {notification && <List notification={notification} />} 
     </div>
    </>
  )
}



export default Notifications