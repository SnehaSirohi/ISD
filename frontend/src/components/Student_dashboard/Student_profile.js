import React, { useEffect, useState } from 'react'
import jwt from 'jsonwebtoken'
import "./Student_profile.css"
import Navbar from './Navbar'
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom";

const Profile = () => {

    const navigate = useNavigate();
    const [name, setName] = useState([])
    const [rollNum, setRollNum] = useState([])
    const [contactNum, setContactNum] = useState([])
    const [email, setEmail] = useState([])
    const [enrollNum, setEnrollNum] = useState([])

    async function populatedashboard() {
        const req = await fetch('http://localhost:4000/dashboard/profile', {
            headers: {
                'x-access-token': localStorage.getItem('token'),

            },
        })

        const json = await req.json()

        console.log(json)
        if(json.status === 'ok'){
            setName(json.name)
            setEmail(json.email)
            setEnrollNum(json.enrollNum)
            setRollNum(json.rollNum)
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

    return (
        <>
        <Navbar/>
            <h1 className='Teacherheading'>Student Profile</h1>
            <div class="emp-profile">
                <div>
                    <form method="post">
                        <div className='photo_block'>
                                <div class="profile-img">
                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog" alt="" />
                                </div>
                            <div class="profile-head">
                                <h2>
                                    Abhishek Tyagi
                                </h2>
                                <h4>
                                   Enroll. no.
                                </h4>
                            </div>
                        </div>
                        <div class="teacherInfo">
                            <div className='keys'>
                                <div>
                                    <label>User Id: </label>
                                </div>
                                <div>
                                    <label>DOB </label>
                                </div>
                                <div>
                                    <label>Email: </label>
                                </div>
                                <div>
                                    <label>Phone: </label>
                                </div>
                                <div>
                                    <label>Semester: </label>
                                </div>
                            </div>
                            <div className='values'>
                                <div>
                                    <p>Abhishek_tyagi</p>
                                </div>
                                <div>
                                    <p>17/11/2000</p>
                                </div>
                                <div>
                                    <p>tyagiabhi@gmail.com</p>
                                </div>

                                <div>
                                    <p>123 756 7890</p>
                                </div>
                                <div>
                                    <p>3rd</p>
                                </div>

                            </div>
                        </div>
                        
                    </form>
                </div>

            </div>

            
            <div className='text-center pt-5' id='prof_block'>
                                 <button id='butn' class="btn btn-primary" >Logout</button>
                                 <button id='butn' class="btn btn-primary-1" >Reset Password</button>
                         </div>
        </>
    )
    
}

export default Profile