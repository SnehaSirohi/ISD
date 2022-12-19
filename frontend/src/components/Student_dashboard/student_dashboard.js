import React, { useEffect, useState } from 'react'
import jwt from 'jsonwebtoken'
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom";
import Navbar from "./Navbar.js";
import "./student_dashboard.css";
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';

const Dashboard = (props) => {
    const [totalclassesheld, setTotalclassesheld] = useState([])
    const [totalClasstaken, setTotalClasstaken] = useState([])
    const [totalClassScheduled, setTotalClassScheduled] = useState([])
    const [totalTestScheduled, setTotalTestScheduled] = useState([])
    const [assignments, setAssignments] = useState([])
    let attendancepercentage
    const navigate = useNavigate();
    const [name, setName] = useState([])
    const [email, setEmail] = useState([])

    async function populatedashboard() {
        const req = await fetch('http://localhost:4000/dashboard', {
            headers: {
                'x-access-token': localStorage.getItem('token'),

            },
        })

        const json = await req.json()

        // console.log(json)
        if (json.status === 'ok') {
            setName(json.name)
            setEmail(json.email)
            setTotalclassesheld(json.Classes_held)
            setTotalClassScheduled(json.Classes_Scheduled)
            setTotalClasstaken(json.Classes_taken_count)
            setTotalTestScheduled(json.Test_Scheduled)
            setAssignments(json.Assignment_posted)

        }
        else {
            // alert(data.error)
        }
    }

    attendancepercentage = ((totalClasstaken / totalclassesheld) * 100).toFixed(2)
    // console.log(attendancepercentage)
    if (attendancepercentage < 50) {
        document.getElementById("ap").style.backgroundColor = 'red'
        document.getElementById("ap").style.color = 'white'
        document.getElementById("ap").innerHTML = `${attendancepercentage}❕`
    }
    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            const user = jwt.decode(token)
            if (!user) {
                localStorage.removeItem('token')
                navigate("/");
            } else {
                populatedashboard()
            }
        }
    }, [name], [email])

    return (
        <>
            <div className='height100vh'>
                <Navbar />
                <div>
                    <div className="flex dashboardcontent">
                        <div class="col main pt-5  dashboardbackground">

                            <div class="row mb-3 dashblocks">
                                <Link to='/classschedule'><div class="col-xl-3 col-sm-6 blockcolour">
                                    <h5 class="text-uppercase pt-3">CLASS SCHEDULED</h5>
                                    <h1 class="display-4">{totalClassScheduled}</h1>
                                </div></Link>
                                <Link to='/testschedule'><div class="col-xl-3 col-sm-6 blockcolour">
                                    <h5 class="text-uppercase pt-3">TEST SCHEDULED</h5>
                                    <h1 class="display-4">{totalTestScheduled}</h1>
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
                                            <h5>{totalClasstaken}</h5>
                                        </div>
                                    </div>
                                    <div class="classinfo">
                                        <div className='classinfokey'>
                                            <h5>Total Tests</h5>
                                        </div>
                                        <div className='classinfoval'>
                                            <h5>{totalTestScheduled}</h5>
                                        </div>
                                    </div>
                                    <div class="classinfo">
                                        <div className='classinfokey'>
                                            <h5>Assignments submitted</h5>
                                        </div>
                                        <div className='classinfoval'>
                                            <h5>{assignments}</h5>
                                        </div>
                                    </div>
                                    <div class="classinfo">
                                        <div className='classinfokey'>
                                            <h5>Attendance %</h5>
                                        </div>
                                        <div className='classinfoval'>
                                            <h5 id='ap'>{attendancepercentage} %</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="profilecontent"
                            style={{
                                display: props.show ? "block" : "none"
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