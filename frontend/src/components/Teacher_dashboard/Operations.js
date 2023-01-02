import React from 'react'
import {useParams } from 'react-router-dom'
import { useNavigate } from "react-router-dom"
import Navbar from "./Navbar.js";
import "./sem.css"
const Operations = () => {
    const navigate=useNavigate()
    const params=useParams()
    const semester = params.semester



  

  return (
   <>
    <div className='page height100vh'>
            <Navbar />
            <div class="album py-5 text-center">
                <h1 className='container semheadline'>{semester}</h1>
                <div class="container">
                    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                       <div class="col" onClick={()=>navigate(`/Teacherdashboard/scheduleclass/${semester}`)} >
                            <div class="card-body">
                                <h3>Schedule Class</h3>
                            </div>
                        </div>
                        
                     <div class="col" onClick={()=>navigate(`/Teacherdashboard/scheduletest/${semester}`)}>

                            <div class="card-body">
                                <h3>Schedule Test</h3>
                            </div>
                        </div>
                  <div class="col" onClick={()=>navigate(`/Teacherdashboard/attendance/${semester}`)}>
                            <div class="card-body">
                                <h3>Mark Attendance</h3>
                            </div>
                        </div>
                       
                      
                            <div class="col" onClick={()=>navigate(`/Teacherdashboard/upload/studymaterial/${semester}`)}>
                                <div class="card-body">
                                    <h3>Upload Study Material</h3>
                                </div>
                            </div>
                        
                
                            <div class="col" onClick={()=>navigate(`/Teacherdashboard/upload/assignment/${semester}`)}>

                                <div class="card-body">
                                    <h3>Upload Assignment</h3>
                                </div>
                            </div>
                   
                       <div class="col" onClick={()=>navigate(`/Teacherdashboard/filters/${semester}`)}>

                            <div class="card-body">
                                <h3>Attendance Report</h3>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
   </>
  )
}

export default Operations
