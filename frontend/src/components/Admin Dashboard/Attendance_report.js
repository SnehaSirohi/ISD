import React from 'react'
import Navbar from "./Navbar.js"
import { Link } from "react-router-dom";
// import "./sem.css"

function Attendance_report() {
    return (
        <div className='page'>
            <Navbar />
            <div class="album py-5 bg-light text-center">
                <div class="container">
                    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-2 g-3">
                        <Link to='/admindashboard/Sem1/attendance'><div class="col">
                            <div class="card-body">
                                <h3>Sem 1</h3>
                            </div>
                        </div>
                        </Link>
                        <Link to="/admindashboard/Sem2/attendance"><div class="col">

                            <div class="card-body">
                                <h3>Sem 2</h3>
                            </div>
                        </div>
                        </Link>
                        <Link to="/admindashboard/Sem3/attendance"> <div class="col">
                            <div class="card-body">
                                <h3>Sem 3</h3>
                            </div>
                        </div>
                        </Link>
                        <Link to="//admindashboard/Sem4/attendance">
                            <div class="col">
                                <div class="card-body">
                                    <h3>Sem 4</h3>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Attendance_report