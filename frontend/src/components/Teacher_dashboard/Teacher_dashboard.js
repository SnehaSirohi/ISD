import React, { useEffect, useState } from 'react'
import jwt from 'jsonwebtoken'
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom";
import Navbar from "./Navbar.js";
import Dashboardcontent from "./Teacher_dashboard_content.js";
import logo from "./image.png"
import "./Teacher_dashboard.css";
// import Base from "../Base.jsx"
import Sidebar from "./sidebar.js";


const Teacher_Dashboard = (props) => {

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
            <Navbar />
            <div>
                <div className="flex dashboardcontent">
                    <Dashboardcontent />
                    <div className="profilecontent"
                        style={{
                            display: props.show ? "block" : "none"
                        }}>
                        <br /><br />
                        <div >
                            <img src={logo} alt="Avatar" class="Avatar"></img>
                            <div className="enrollmentcontent">
                                <h1>ABHISHEK TYAGI</h1>
                                <h1>ENROLLMENT N0 xxxxxxxxxxxxxx</h1>
                            </div>
                        </div>
                        <div>
                            <br />
                            <div className='detailcontent'>
                                <h2>Personal Detail :</h2>

                                <h4>Mail ID - abhishek.tyagi@iic.ac.in </h4>
                                <h4>Mobile no - xxxxxxxxxx </h4>
                                <h4>D.O.B - 17/11/2000 </h4>

                                <h2>Course Detail</h2>

                                <h4>Semester - III </h4>
                                <h4>Session - 2021 - 2023 </h4>
                                <h4>Class roll no - 21/1402 </h4>
                                <h4>Exam Rollno - xxxxxxxxxx </h4>
                            </div>
                        </div>

                    </div>
                </div>
            </div >
            <h1>{name}'s Dashboard</h1>
            <Link to="/Teacherdashboard/profile"><div className="button">profile</div></Link>
            <Link to="/Teacherdashboard/changepassword"><div className="button">change password</div></Link>
            <Link to="/classschedule/sem1"><div className="button">Schedule Class sem-1</div></Link>
            <Link to="/testschedule/sem1"><div className="button">test Class sem-1</div></Link>
            <button onClick={() => {
                localStorage.removeItem('token')
                navigate("/")
            }}>Logout</button>
        </>
    );

}

export default Teacher_Dashboard



// import React from "react";
// import Navbar from "./navbar.js";
// import Dashboardcontent from "./dashboardcontent.js";
// import logo from "./image.png"
// import "./Teacher_dashboard.css";
// import Base from "../Base.jsx"
// import Sidebar from "./sidebar.js";

// const Dashboard = (props) => {
//     return (
//         <>
//             <Navbar />
//             <div>
//                 <div className="flex dashboardcontent">
//                     <Dashboardcontent />
//                     <div className="profilecontent"
//                         style={{
//                             display: props.show ? "block" : "none"
//                         }}>
//                         <br /><br />
//                         <div >
//                             <img src={logo} alt="Avatar" class="Avatar"></img>
//                             <div className="enrollmentcontent">
//                                 <h1>ABHISHEK TYAGI</h1>
//                                 <h1>ENROLLMENT N0 xxxxxxxxxxxxxx</h1>
//                             </div>
//                         </div>
//                         <div>
//                             <br />
//                             <div className='detailcontent'>
//                                 <h2>Personal Detail :</h2>

//                                 <h4>Mail ID - abhishek.tyagi@iic.ac.in </h4>
//                                 <h4>Mobile no - xxxxxxxxxx </h4>
//                                 <h4>D.O.B - 17/11/2000 </h4>

//                                 <h2>Course Detail</h2>

//                                 <h4>Semester - III </h4>
//                                 <h4>Session - 2021 - 2023 </h4>
//                                 <h4>Class roll no - 21/1402 </h4>
//                                 <h4>Exam Rollno - xxxxxxxxxx </h4>
//                             </div>
//                         </div>

//                     </div>
//                 </div>
//             </div >
//         </>
//     )
// }

// export default Dashboard