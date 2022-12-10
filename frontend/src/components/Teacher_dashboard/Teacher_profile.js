import React, { useEffect, useState } from 'react'
import jwt from 'jsonwebtoken'
import "./Teacher_profile.css"
import Navbar from './Navbar'
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom";
import logo from './image.png'

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
            <Navbar />
            <h1 className='Teacherheading'>Teacher Profile</h1>
            <div class="emp-profile">
                <div className='pblock'>
                    <form method="post">
                        <div className='photo_block'>
                            <div class="profile-img">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog" alt="" />
                            </div>
                            <div class="profile-head">
                                <h2>
                                   {name}
                                </h2>
                                <h4>
                                    {teacher_id}
                                </h4>
                            </div>
                        </div>
                        <div class="teacherInfo">
                            <div className='keys'>
                                <p>User Id: </p>
                                <p>DOB </p>
                                <p>Email: </p>
                                <p>Phone: </p>
                            </div>
                            <div className='values'>
                                <p> {teacher_id}</p>
                                <p>28/11/2000</p>
                                <p>{email}</p>
                                <p>123 456 7890</p>
                            </div>
                            <div className='teacherinfo2'>
                                <p>User Id: </p>
                                <h6>{teacher_id}</h6>
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
                    <button id='butn' class="btn btn-primary"  onClick={() => {
                                localStorage.removeItem('token')
                                navigate("/")
                            }}>Logout</button>
                     <Link to="/Teacherdashboard/changepassword"><button id='butn' class="btn btn-primary-1" >Reset Password</button></Link>
                </div>
    </div>
                        {/* <div className='buttons'>
                            <button onClick={() => {
                                localStorage.removeItem('token')
                                navigate("/")
                            }}>Logout</button>
                            <button className="resetpass"><Link to="/Teacherdashboard/changepassword"><div>Reset Password</div></Link></button>
                        </div> */}

                 

        </>
    );

}

export default Teacher_Profile