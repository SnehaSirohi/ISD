import React, { useEffect, useState } from 'react'
import jwt from 'jsonwebtoken'
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom";
import Navbar from "./Navbar.js";
import "./student_dashboard.css";

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

        console.log(json)
        if(json.status === 'ok'){
            setName(json.name)
            setEmail(json.email)
            setTotalclassesheld(json.Classes_held)
            setTotalClassScheduled(json.Classes_Scheduled)
            setTotalClasstaken(json.Classes_taken_count)
            setTotalTestScheduled(json.Test_Scheduled)
            setAssignments(json.assignments)
        }
        else{
            // alert(data.error)
        }
    }

    attendancepercentage = (totalClasstaken/totalclassesheld)*100
    console.log(attendancepercentage)

    useEffect(() =>{
        const token = localStorage.getItem('token')
        if (token){
            const user = jwt.decode(token)
            if(!user){
                localStorage.removeItem('token')
                navigate("/");
            } else {
                populatedashboard()
            }
        }
    }, [name], [email])

    return(
        <>
            <Navbar />
            <div>
                <div className="flex dashboardcontent">
                <div class="col main pt-5  dashboardbackground">
            <div class="row mb-3 dashblocks">
                <div class="col-xl-3 col-sm-6 blockcolour">
                    <div>
                        <Link to='/classschedule'><h5 class="text-uppercase">CLASSES SCHEDULED</h5></Link>
                        <h1 class="display-4">{totalClassScheduled}</h1>
                    </div>
                </div>
                <div class="col-xl-3 col-sm-6 blockcolour">
                    <div>
                    <Link to='/testschedule'><h5 class="text-uppercase">TESTS SCHEDULED</h5></Link>
                        <h1 class="display-4">{totalTestScheduled}</h1>
                    </div>

                </div>
                <div class="col-xl-3 col-sm-6 blockcolour">
                    <div>
                    <Link to='/'><h5 class="text-uppercase">ASSIGNMENTS</h5></Link>
                        <h1 class="display-4">{assignments}</h1>
                    </div>
                </div>
            </div>

            <div class="row overviewdatacontent">
                <div class="col-lg-7 col-md-6 col-sm-12 datacontent flex">
                    <div class="classinfo">
                        <h5>Total classes Held</h5>
                        <h5>Total classes Taken</h5>
                        <h5>Total Tests</h5>
                        <h5>Assignment submitted</h5>
                        <h5>Attendance %</h5>
                    </div>
                    <div class="classinfoval">
                        <h5>{totalclassesheld}</h5>
                        <h5>{totalClasstaken}</h5>
                        <h5>{totalTestScheduled}</h5>
                        <h5>18</h5>
                        <h5>{attendancepercentage} %</h5>
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
        </>
    );
    
}

export default Dashboard