import React from 'react'
import Navbar from "./Navbar.js"
import { Link } from "react-router-dom";
import "./sem.css"

function Sem1() {
    return (
        <div className='page'>
            <Navbar />
            <div class="album py-5 bg-light">
                <h1 className='container semheadline'>Semester 3rd</h1>
                <div class="container">
                    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                        <div class="col">
                            <div class="card shadow-sm">
                                <div class="card-body">
                                    <h3><Link to='/classschedule/sem3'>Schedule Class</Link></h3>
                                </div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="card shadow-sm">
                                <div class="card-body">
                                    <h3><Link to="/testschedule/sem3">Schedule Test</Link></h3>
                                </div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="card shadow-sm">
                                <div class="card-body">
                                    <h3><Link to="/attendance/sem3">Mark Attendance</Link></h3>
                                </div>
                            </div>
                        </div>

                        <div class="col">
                            <div class="card shadow-sm">
                                <div class="card-body">
                                    <h3>Upload Study Material</h3>
                                </div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="card shadow-sm">
                                <div class="card-body">
                                    <h3>Upload Assignment</h3>
                                </div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="card shadow-sm">
                                <div class="card-body">
                                    <h3><Link to='/attendancereport/sem1'>Attendance Report</Link></h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sem1