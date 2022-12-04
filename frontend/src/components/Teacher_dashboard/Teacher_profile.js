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
        if (json.status === 'ok') {
            setName(json.name)
            setEmail(json.email)
            setTeacher_id(json.Teacher_id)
            setContactNum(json.contactNum)
        }
        else {
            // alert(data.error)
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            const user = jwt.decode(token)
            if (!user) {
                localStorage.removeItem('token')
                navigate("/");
            } else {
                populatedashboard()
            }
        }
    }, [name], [email])

    return (
        <>
            <div >
                <Navbar />
                <div className='profilebody'>
                    <div className='profileContent'>
                        <div className='profileenroll'>
                            {/* <img src={logo} alt="" class="avatar mt-1"></img> */}
                            <div class="mt-3">
                                <h3>{name}</h3>
                                <h3>Professor ID: {teacher_id || 'ish'}</h3>
                            </div>
                        </div>
                        <div class="mb-2 detailblock">
                            <div class="p-0 mb-2 detailcontent">
                                <div class="col d-flex flex-column position-static details">
                                    <h3 class="mb-3 ">Personal Details</h3>
                                    <h6>Contact no. - {contactNum}</h6>
                                    <h6>Mobile no - xxxxxxxxxx </h6>
                                    <h6>D.O.B - 17/11/2000 </h6>
                                    <h6>Mail ID - {email} </h6>
                                </div>
                            </div>
                        </div>
                        <div className='buttons'>
                            <button  onClick={() => {
                                localStorage.removeItem('token')
                                navigate("/")
                            }}>Logout</button>
                            <button className="resetpass"><Link to="/Teacherdashboard/changepassword"><div>Reset Password</div></Link></button>
                        </div>

                    </div>
                </div>
            </div>

        </>
    );

}

export default Teacher_Profile