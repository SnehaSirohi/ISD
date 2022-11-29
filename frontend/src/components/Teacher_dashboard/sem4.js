import React from 'react'
import Navbar from "./Navbar.js"
import { Link } from "react-router-dom";
import "./sem.css"

function Sem1() {
    return (
        <div className='page'>
            <Navbar />
            <div class="album py-5 bg-light">
                <h1 className='container semheadline'>Semester 4th</h1>
                <div class="container">
                    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                       <Link to='/classschedule/sem4'> <div class="col">
                            <div class="card shadow-sm">
                                <div class="card-body">
                                    <h3>Schedule Class</h3>
                                </div>
                            </div>
                        </div>
                        </Link>
                        <Link to="/testschedule/sem4">
                        <div class="col">
                            <div class="card shadow-sm">
                                <div class="card-body">
                                    <h3>Schedule Test</h3>
                                </div>
                            </div>
                        </div>
                        </Link>
                        <Link to="/attendance/sem4">
                        <div class="col">
                            <div class="card shadow-sm">
                                <div class="card-body">
                                    <h3>Mark Attendance</h3>
                                </div>
                            </div>
                        </div>
                        </Link>
                        <div class="col">
                            <div class="card shadow-sm">
                                <div class="card-body">
                                    <h3>Upload Study Material</h3>
                                </div>
                            </div>
                        </div>
                         <Link to="/UploadAssignment/sem4">
                        <div class="col">
                            <div class="card shadow-sm">
                                <div class="card-body">
                                    <h3>Upload Assignment</h3>
                                </div>
                            </div>
                        </div>
                         </Link>
                        <Link to='/filters/sem4'>
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