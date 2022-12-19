import React, { useState } from 'react'
import { useEffect } from 'react'
import List from './List'
import Navbar from './Navbar'
import jwt from 'jsonwebtoken'
import { useNavigate } from "react-router-dom"

const Notifications = () => {
    const navigate = useNavigate();
    const[notification,setnotification]=useState("")
    const [teacher, setTeacher] = useState("")


    console.log(notification)
    const fetchdata=async()=>{
        const response = await fetch("https://isd-production.up.railway.app/assignmentsubmit", {
      
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              'x-access-token': localStorage.getItem('token'), //
            }})
            const json = await response.json()
            setnotification(json.data.reverse())
            setTeacher(json.name)
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
        },[])
        
  return (
    <>
    <Navbar/>
    <div className="container notification">
     {notification && <List notification={notification} teacher={teacher} />} 
     </div>
    </>
  )
}



export default Notifications