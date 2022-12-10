import React, { useEffect, useState } from 'react'
import jwt from 'jsonwebtoken'
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom";
import Navbar from "./Navbar.js";
import logo from "./image.png"
import "./Teacher_dashboard.css";


const Teacher_Dashboard = (props) => {
    const [totalClasstaken, setTotalClasstaken] = useState([])
    const [totalClassScheduled, setTotalClassScheduled] = useState([])
    const [totalTestScheduled, setTotalTestScheduled] = useState([])
    const [totalAssignments, setTotalAssignments] = useState([])
    const [totalStudymaterial, setTotalStudymaterial] = useState([])
    const navigate = useNavigate();
    const [name, setName] = useState([])
    const [email, setEmail] = useState([])

    async function populatedashboard() {
        const req = await fetch('http://localhost:4000/Teacherdashboard', {
            headers: {
                'x-access-token': localStorage.getItem('token'),

            },
        })

        const json = await req.json()

        console.log(json)
        if (json.status === 'ok') {
            setName(json.name)
            setEmail(json.email)
            setTotalClassScheduled(json.Classes_Scheduled)
            setTotalClasstaken(json.Classes_taken_count)
            setTotalTestScheduled(json.Test_Scheduled)
            setTotalAssignments(json.Assignments_posted)
            setTotalStudymaterial(json.Study_Material_posted)
        }
        else {
            // alert(data.error)
        }

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
            <div className='height100percent'>
                <Navbar />
                <div>
                    <div className="flex dashboardcontent">
                        <div class="col main pt-5  dashboardbackground">
                            <div class="row mb-3 dashblocks">
                                <Link to='/scheduledclassreport'><div class="col-xl-3 col-sm-6 blockcolour">
                                    <h5 class="text-uppercase pt-3">CLASS SCHEDULED</h5>
                                    <h1 class="display-4">{totalClassScheduled}</h1>
                                </div></Link>
                                <Link to='/scheduledtestreport'><div class="col-xl-3 col-sm-6 blockcolour">
                                    <h5 class="text-uppercase pt-3">TEST SCHEDULED</h5>
                                    <h1 class="display-4">{totalTestScheduled}</h1>
                                </div></Link>
                                <Link to='/Teacherdashboard/assignmentreportteacher'><div class="col-xl-3 col-sm-6 blockcolour">
                                    <h5 class="text-uppercase pt-3">ASSIGNMENTS POSTED</h5>
                                    <h1 class="display-4">{totalAssignments}</h1>
                                </div></Link>
                            </div>

                            <div class="row overviewdatacontent">
                                <div class="col-lg-7 col-md-6 col-sm-12 datacontent flex">

                                    <div class="classinfo">
                                        <h5>Total classes Held</h5>
                                        <h5>Total Tests</h5>
                                        <h5>Total Study Material Uploaded</h5>
                                    </div>
                                    <div class="classinfoval">
                                        <h5>{totalClasstaken}</h5>
                                        <h5>{totalTestScheduled}</h5>
                                        <h5>{totalStudymaterial}</h5>
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

export default Teacher_Dashboard

