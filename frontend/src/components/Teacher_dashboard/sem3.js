import React from 'react'
import Navbar from "./Navbar.js"
import { Link } from "react-router-dom";
import "./sem.css"

function Sem1() {
    return (
        <div className='page height100vh'>
            <Navbar />
            <div class="album py-5 bg-light text-center">
                <h1 className='container semheadline'>Semester 3rd</h1>
                <div class="container">
                    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                        <Link to='/Teacherdashboard/sem3/classschedule'><div class="col">
                            <div class="card shadow-sm">
                                <div class="card-body">
                                    <h3>Schedule Class</h3>
                                </div>
                            </div>
                        </div>
                        </Link>
                        <Link to="/Teacherdashboard/sem3/testschedule">
                        <div class="col">
                            <div class="card shadow-sm">
                                <div class="card-body">
                                    <h3>Schedule Test</h3>
                                </div>
                            </div>
                        </div>
                        </Link>
                        <Link to="/Teacherdashboard/sem3/attendance">
                        <div class="col">
                            <div class="card shadow-sm">
                                <div class="card-body">
                                    <h3>Mark Attendance</h3>
                                </div>
                            </div>
                        </div>
                        </Link>
                        <Link to="/Teacherdashboard/sem3/studymaterial" >
                        <div class="col">
                            <div class="card shadow-sm">
                                <div class="card-body">
                                    <h3>Upload Study Material</h3>
                                </div>
                            </div>
                        </div>
                        </Link>
                         <Link to="/Teacherdashboard/sem3/assignment">
                        <div class="col">
                            <div class="card shadow-sm">
                                <div class="card-body">
                                    <h3>Upload Assignment</h3>
                                </div>
                            </div>
                        </div>
                         </Link>
                        <Link to='/Teacherdashboard/filters/sem3'>
                        <div class="col">
                            <div class="card shadow-sm">
                                <div class="card-body">
                                    <h3>Attendance Report</h3>
                                </div>
                            </div>
                        </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sem1