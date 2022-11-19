import React, { useEffect, useState } from 'react'
import jwt from 'jsonwebtoken'
import "./Teacher_profile.css"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom";

const Teacher_Profile = () => {

    const navigate = useNavigate();
    const [name, setName] = useState([])
    const [email, setEmail] = useState([])
    const [teacher_id, setTeacher_id] = useState([])
    const [contactNum, setContactNum] = useState([])

    async function populatedashboard() {
        const req = await fetch('http://localhost:4000/Teacherdashboard/profile', {
            headers: {
                'x-access-token': localStorage.getItem('token'),

            },
        })

        const json = await req.json()

        console.log(json)
        if(json.status === 'ok'){
            setName(json.name)
            setEmail(json.email)
            setTeacher_id(json.Teacher_id)
            setContactNum(json.contactNum)
        }
        else{
            // alert(data.error)
        }
    }

    useEffect(() =>{
        const token = localStorage.getItem('token')
        if (token){
            const user = jwt.decode(token)
            if(!user){
                localStorage.removeItem('token')
                navigate("/");
            } else {
                populatedashboard()
            }
        }
    }, [name], [email])

    return(
        <>
         <div >
            <div className='profilebody'>
                 <br /><br />
                 <div className='profileenroll'>
                     {/* <img src={logo} alt="Avatar" class="avatar"></img> */}
                    <div>
                         <h1>{name}</h1>
                         <h1>Professor ID: {teacher_id || 'ish'}</h1>
                     </div>
                 </div>
                 <div className='personaldetails'>
                     <div className='detailone'>
                         <h2>Personal Details :</h2>
                         <h4>Mail ID :{email}</h4>
                         <h4>Mobile no - {contactNum} </h4>
                     </div>
                     {/* <div>
                         <h2>Course Detail</h2>
                         <h4>Semester - III </h4>
                         <h4>Session - 2021 - 2023 </h4>
                         <h4>Class roll no - {rollNum} </h4>
                     </div> */}
                 </div>
             </div>
         </div>
        </>
    );
    
}

export default Teacher_Profile