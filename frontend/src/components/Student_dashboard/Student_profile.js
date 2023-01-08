import React, { useEffect, useState } from 'react'
import jwt from 'jsonwebtoken'
import "./Student_profile.css"
import Navbar from './Navbar'
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom";
import logo from '../Teacher_dashboard/image.png'

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
const Profile = ({visible, stucontactNum, rollNum, enrollNum, stuname, stuemail}) => {
    let navigate = useNavigate()
    
    return (
        <div className='height100vh'>
            <Navbar />
            
           {visible ? <><h1 className='Teacherheading'>{stuname}'s Profile</h1><div class="emp-profile">
                <div className='pblock'>
                    <form method="post">
                        <div className='photo_block'>
                            <div class="profile-img">
                            <img src={logo} alt="..." class="profilePic"></img>
                            </div>
                            <div class="profile-head">
                                <h2>
                                    {stuname}
                                </h2>
                                <h4>
                                    {enrollNum}
                                </h4>
                            </div>
                        </div>
                        <div class="teacherInfo">
                            <div className='keys'>
                                <p>Roll No. </p>
                                <p>Email: </p>
                                <p>Phone: </p>
                            </div>
                            <div className='values'>
                                <p>{rollNum}</p>
                                <p>{stuemail}</p>
                                <p>{stucontactNum}</p>
                            </div>
                            <div className='teacherinfo2'>
                                <p>Roll No. </p>
                                <h6>{rollNum}</h6> 
                                <p>Email: </p>
                                <h6>{stuemail}</h6>
                                <p>Phone: </p>
                                <h6>{stucontactNum}</h6>
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
            </div></> : <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open
        // onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>}
        </div>
    )

}

export default Profile