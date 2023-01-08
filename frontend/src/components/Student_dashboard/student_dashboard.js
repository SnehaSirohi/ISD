import React, { useEffect, useState } from 'react'
import jwt from 'jsonwebtoken'
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom";
import Navbar from "./Navbar.js";
import "./student_dashboard.css";
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import Loader from '../Loader/Loader.js';
const Dashboard = ({visible, assignment_submitted, totalclassesheld, totalClasstakenStudent, totalClassScheduledStudent, totalTestScheduledStudent, assignments}) => {
    
    let attendancepercentage
    attendancepercentage = ((totalClasstakenStudent / totalclassesheld) * 100).toFixed(2)
    console.log(attendancepercentage)
    useEffect(()=>{
        if (attendancepercentage < 50) {
            document.getElementById("ap").style.backgroundColor = 'red'
            document.getElementById("ap").style.color = 'white'
            document.getElementById("ap").innerHTML = `${attendancepercentage} % ❕`
        }
    },[attendancepercentage])
    

    return (
        <>
            <div className='height100vh'>
                <Navbar />
                {!visible && <Loader />}
                <div>
                    <div className="flex dashboardcontent">
                        <div class="col main pt-5  dashboardbackground">

                            <div class="row mb-3 dashblocks">
                                <Link to='/classschedule'><div class="col-xl-3 col-sm-6 blockcolour">
                                    <h5 class="text-uppercase pt-3">CLASS SCHEDULED</h5>
                                    <h1 class="display-4">{totalClassScheduledStudent}</h1>
                                </div></Link>
                                <Link to='/testschedule'><div class="col-xl-3 col-sm-6 blockcolour">
                                    <h5 class="text-uppercase pt-3">TEST SCHEDULED</h5>
                                    <h1 class="display-4">{totalTestScheduledStudent}</h1>
                                </div></Link>
                                <Link to='/assignmentreportstudent'><div class="col-xl-3 col-sm-6 blockcolour">
                                    <h5 class="text-uppercase pt-3">ASSIGNMENTS</h5>
                                    <h1 class="display-4">{assignments}</h1>
                                </div></Link>
                            </div>
                            <div class="row overviewdatacontent">
                                <div class="col-lg-7 col-md-6 col-sm-12 datacontent">
                                    <div class="classinfo">
                                        <div className='classinfokey'>
                                            <h5>Total classes Held</h5>
                                        </div>
                                        <div className='classinfoval'>
                                            <h5>{totalclassesheld}</h5>
                                        </div>
                                    </div>
                                    <div class="classinfo">
                                        <div className='classinfokey'>
                                            <h5>Total classes Taken</h5>
                                        </div>
                                        <div className='classinfoval'>
                                            <h5>{totalClasstakenStudent}</h5>
                                        </div>
                                    </div>
                                    <div class="classinfo">
                                        <div className='classinfokey'>
                                            <h5>Total Tests</h5>
                                        </div>
                                        <div className='classinfoval'>
                                            <h5>{totalTestScheduledStudent}</h5>
                                        </div>
                                    </div>
                                    <div class="classinfo">
                                        <div className='classinfokey'>
                                            <h5>Assignments submitted</h5>
                                        </div>
                                        <div className='classinfoval'>
                                            <h5>{assignment_submitted}</h5>
                                        </div>
                                    </div>
                                    <div class="classinfo">
                                        <div className='classinfokey'>
                                            <h5>Attendance %</h5>
                                        </div>
                                        <div className='classinfoval' id='ap'>
                                            <h5 >{attendancepercentage} %</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="profilecontent"
                            style={{
                                // display: props.show ? "block" : "none"
                            }}>
                            <br /><br />

                        </div>
                    </div>
                </div >
            </div>
        </>
    );

}

export default Dashboard