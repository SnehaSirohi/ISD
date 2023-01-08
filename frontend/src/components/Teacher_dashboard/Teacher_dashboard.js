import React, { useEffect, useState } from 'react'
import jwt from 'jsonwebtoken'
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom";
import Navbar from "./Navbar.js";
import logo from "./image.png"
import "./Teacher_dashboard.css";
import Loader from '../Loader/Loader.js';


const Teacher_Dashboard = ({success, totalClasstaken, totalClassScheduled, totalTestScheduled, totalAssignments, totalStudymaterial}) => {

    return (
        <>
            <div className='height100percent'>
                <Navbar />
                <div>
                    {!success && <Loader />}
                    <div className="flex dashboardcontent">
                        <div class="col main pt-5  dashboardbackground">
                            <div class="row mb-3 dashblockteacher">
                                <Link to='/Teacherdashboard/report/scheduledclassreport'><div class="col-xl-3 col-sm-6 blockcolour">
                                    <h5 class="text-uppercase pt-3">CLASS SCHEDULED</h5>
                                    <h1 class="display-4">{totalClassScheduled}</h1>
                                </div></Link>
                                <Link to='/Teacherdashboard/report/scheduledtestreport'><div class="col-xl-3 col-sm-6 blockcolour">
                                    <h5 class="text-uppercase pt-3">TEST SCHEDULED</h5>
                                    <h1 class="display-4">{totalTestScheduled}</h1>
                                </div></Link>
                                <Link to='/Teacherdashboard/assignmentreportteacher'><div class="col-xl-3 col-sm-6 blockcolour">
                                    <h5 class="text-uppercase pt-3">ASSIGNMENTS POSTED</h5>
                                    <h1 class="display-4">{totalAssignments}</h1>
                                </div></Link>
                                <Link to='/Teacherdashboard/studymaterial'><div class="col-xl-3 col-sm-6 blockcolour">
                                    <h5 class="text-uppercase pt-3">STUDY MATERIAL POSTED</h5>
                                    <h1 class="display-4">{totalStudymaterial}</h1>
                                </div></Link>

                            </div>

                            <div class="row overviewdatacontent">
                                <div class="col-lg-7 col-md-6 col-sm-12 datacontent ">

                                    <div class="classinfo">
                                        <div class="classinfokey">
                                            <h5>Total classes Held</h5>
                                        </div>
                                        <div class="classinfoval">
                                            <h5>{totalClasstaken}</h5>
                                        </div>
                                    </div>
                                    <div class="classinfo">
                                        <div class="classinfokey">
                                            <h5>Total Tests</h5>
                                        </div>
                                        <div class="classinfoval">
                                            <h5>{totalTestScheduled}</h5>
                                        </div>
                                    </div>
                                    <div class="classinfo">
                                        <div class="classinfokey">
                                            <h5>Total Study Material Uploaded</h5>
                                        </div>
                                        <div class="classinfoval">
                                            <h5>{totalStudymaterial}</h5>
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

export default Teacher_Dashboard

