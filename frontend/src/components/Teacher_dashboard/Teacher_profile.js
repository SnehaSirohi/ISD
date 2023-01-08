import React, { useEffect, useState } from 'react'
import jwt from 'jsonwebtoken'
import "./teacherprofile2.css"
import Navbar from './Navbar'
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom";
import logo from './image.png'

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';

const Teacher_Profile = ({success, name, email, contact, teacher_id}) => {

    const navigate = useNavigate();
    
    return (
        <>
            <div className="height100vh">
                <Navbar />
                {success ? <><h1 className='Teacherheading'>{name}'s Profile</h1>
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
                                    <h6>{contact}</h6>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className='text-center' id='prof_block'>
                        <button id='butn' class="btn btn-primary" onClick={() => {
                            localStorage.removeItem('token')
                            navigate("/")
                        }}>Logout</button>
                        <Link to="/Teacherdashboard/changepassword"><button id='butn' class="btn btn-primary-1" >Reset Password</button></Link>
                    </div>
                </div></>: <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open
        // onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>}
                {/* <div className='buttons'>
                            <button onClick={() => {
                                localStorage.removeItem('token')
                                navigate("/")
                            }}>Logout</button>
                            <button className="resetpass"><Link to="/Teacherdashboard/changepassword"><div>Reset Password</div></Link></button>
                        </div> */}


            </div>
        </>
    );

}

export default Teacher_Profile