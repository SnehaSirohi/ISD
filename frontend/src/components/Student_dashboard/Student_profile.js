import React, { useEffect, useState } from 'react'
import jwt from 'jsonwebtoken'
import "./Student_profile.css"
import Navbar from './Navbar'
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom";
import logo from './image.png'

const Profile = () => {

    const navigate = useNavigate();
    const [name, setName] = useState([])
    const [rollNum, setRollNum] = useState([])
    const [contactNum, setContactNum] = useState([])
    const [email, setEmail] = useState([])
    const [enrollNum, setEnrollNum] = useState([])

    async function populatedashboard() {
        const req = await fetch('https://isd-production.up.railway.app/dashboard/profile', {
            headers: {
                'x-access-token': localStorage.getItem('token'),

            },
        })

        const json = await req.json()

        console.log(json)
        if (json.status === 'ok') {
            setName(json.name)
            setEmail(json.email)
            setEnrollNum(json.enrollNum)
            setRollNum(json.rollNum)
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
        <div className='height100vh'>
            <Navbar />
            <h1 className='Teacherheading'>{name}'s Profile</h1>
            <div class="emp-profile">
                <div className='pblock'>
                    <form method="post">
                        <div className='photo_block'>
                            <div class="profile-img">
                            <img src={logo} alt="..." class="profilePic"></img>
                            </div>
                            <div class="profile-head">
                                <h2>
                                    {name}
                                </h2>
                                <h4>
                                    {enrollNum}
                                </h4>
                            </div>
                        </div>
                        <div class="teacherInfo">
                            <div className='keys'>
                                <p>DOB </p>
                                <p>Email: </p>
                                <p>Phone: </p>
                            </div>
                            <div className='values'>
                                <p>28/11/2000</p>
                                <p>{email}</p>
                                <p>123 456 7890</p>
                            </div>
                            <div className='teacherinfo2'>
                                <p>DOB </p>
                                <h6>28/11/2000</h6>
                                <p>Email: </p>
                                <h6>{email}</h6>
                                <p>Phone: </p>
                                <h6>{contactNum}</h6>
                            </div>
                        </div>
                    </form>
                </div>
                <div className='text-center' id='prof_block'>
                    <button id='butn' class="btn btn-primary" onClick={() => {
                        localStorage.removeItem('token')
                        navigate("/")
                    }}>Logout</button>
                    <Link to="/dashboard/changepassword"><button id='butn' class="btn btn-primary-1" >Reset Password</button></Link>
                </div>
            </div>
        </div>
    )

}

export default Profile