import React, { useEffect, useState } from 'react'
import jwt from 'jsonwebtoken'
import "./Teacher_profile.css"
import Navbar from './Navbar'
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
            <Navbar />
            <div className='profilebody'>
                <h2>{name}'s Profile</h2>
                <div className='profileContent'>
                    <div className='profileenroll'>
                        {/* <img src={logo} alt="" class="avatar mt-1"></img> */}
                        <div class="mt-2">
                            <h3>{name}</h3>
                            <h3>Professor ID: {teacher_id || 'ish'}</h3>
                        </div>
                    </div>
                    <div class="row mb-2 mr-0 detailblock">
                        <div class="col-md-6 p-0 mb-2 detailcontent">
                            <div class="col d-flex flex-column position-static details">
                                <h3 class="mb-0">Personal Details</h3>
                                <h6>Contact no. - {contactNum}</h6>
                                <h6>Mobile no - xxxxxxxxxx </h6>
                                <h6>D.O.B - 17/11/2000 </h6>
                                <h6>Mail ID - {email} </h6>
                            </div>
                        </div>
                        <div class="col-md-6 p-0 detailcontent">
                            <div class="col d-flex flex-column position-static details">
                                <h3 class="mb-0">Course Details</h3>
                                {/* <h6>Semester - III </h6>
                                <h6>Session - 2021 - 2023 </h6>
                                <h6>Class roll no - 21/1402 </h6>
                                <h6>Exam Rollno - xxxxxxxxxx </h6> */}
                            </div>
                        </div>
                    </div>
                    <div className='buttons'>
                    <button onClick={() => {
                        localStorage.removeItem('token')
                        navigate("/")
                        }}>Logout</button>
                        <button><Link to="/Teacherdashboard/changepassword"><div className="button">Reset Password</div></Link></button> 
                    </div>

                </div>
            </div>
        </div>

        </>
    );
    
}

export default Teacher_Profile