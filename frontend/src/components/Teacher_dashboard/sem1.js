import React from 'react'
import Navbar from "./Navbar.js"
import "./sem.css"

function Sem1() {
    return (
        <div className='page'>
            <Navbar />
            <div class="album py-5 bg-light">
                <h1 className='container semheadline'>Semester 1st</h1>
                <div class="container">
                    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                        <div class="col">
                            <div class="card shadow-sm">
                                <div class="card-body">
                                    <h3>Schedule class</h3>
                                </div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="card shadow-sm">
                                <div class="card-body">
                                    <h3>Schedule Test</h3>
                                </div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="card shadow-sm">
                                <div class="card-body">
                                    <h3>Mark Attendence</h3>
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
                                    <h3>Attendence Report</h3>
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