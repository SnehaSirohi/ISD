import React, { useState } from 'react'
import { useEffect } from 'react'
import List from './List'
const Notifications = () => {
    const[notification,setnotification]=useState("")
    const fetchdata=async()=>{
        const response = await fetch("http://localhost:4000/assignmentsubmit", {
      
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            }})
            const json = await response.json()
            setnotification(json.data)
    }
        useEffect(() => {
     
            fetchdata();
        }, [])
        
  return (
    <>
      <h1> Notifications</h1>
      {/* <List notification={notification} /> */}
    </>
  )
}



export default Notifications