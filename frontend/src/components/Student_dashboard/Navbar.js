import React, { useEffect, useState } from "react";
import './Navbar.css';
import { useNavigate } from "react-router-dom"
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { IconContext } from 'react-icons';
import logo from './image.png'
import jwt from 'jsonwebtoken'



function Navbar() {
    const navigate = useNavigate();
    const [sidebar, setSidebar] = React.useState(false);
    const [sem, setsem] = React.useState(false);
    const showsemesterhandler = () => setsem(!sem);
    const showSidebar = () => setSidebar(!sidebar);
    const [sem1, setSem1] = useState(false)
    const [sem2, setSem2] = useState(false)
    const [sem3, setSem3] = useState(false)
    const [sem4, setSem4] = useState(false)

    async function populatenavbar() {
        const req = await fetch('http://localhost:4000/dashboard', {
            headers: {
                'x-access-token': localStorage.getItem('token'),

            },
        })

        const json = await req.json()
        if (json.status == "ok") {
            if (json.semester == "Sem-1") {
                setSem1(true)
            }

            else if (json.semester == "Sem-2") {
                setSem2(true)
            }
            else if (json.semester == "Sem-3") {
                setSem3(true)
            }

            else if (json.semester == "Sem-4") {
                setSem4(true)
            }
        }
        console.log(json);
    }

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            const user = jwt.decode(token)
            if (!user) {
                localStorage.removeItem('token')
                navigate("/");
            } else {
                populatenavbar()
            }
        }
    }, [])

    return (
        <>
            <IconContext.Provider value={{ color: '#fff' }}>
                <div className='navbar'>
                    <Link to='#' className='menu-bars'>
                        <FaIcons.FaBars onClick={showSidebar} />
                    </Link>
                    <div className="heading">
                        <i class="fa fa-bell mt-1 fa-2x"></i>
                        <Link to="/dashboard/profile"><div className="button"><img src={logo} alt="..." class="profilePic"></img></div></Link>

                    </div>
                </div>
                <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                    <ul className='nav-menu-items' >
                        <li className='navbar-toggle'>
                            <FaIcons.FaCaretLeft size={40} onClick={showSidebar} />
                            <span>Classopedia</span>
                        </li>
                        <li className="nav-text">
                            <AiIcons.AiFillHome color='rgb(0, 104, 74)' />
                            <span><Link to="/dashboard">Home</Link></span>
                        </li>
                        <li className="nav-text">
                            <FaIcons.FaUserCircle color='rgb(0, 104, 74)' />
                            <span><Link to="/dashboard/profile">Profile</Link></span>
                        </li>
                        <li className="nav-text">
                            <FaIcons.FaRegCalendarCheck color='rgb(0, 104, 74)'/>
                            <Link to='/scheduledclass'><p>Scheduled Classes</p></Link>
                        </li>
                        <li className="nav-text">
                            <FaIcons.FaBookReader color='rgb(0, 104, 74)'/>
                            <Link to='/scheduledtests'><p>Scheduled Tests</p></Link>
                        </li>
                        <li className="nav-text">
                            <FaIcons.FaRegListAlt color='rgb(0, 104, 74)' />
                            <Link to='/assignments'><p>Assignments Posted</p></Link>
                        </li>
                        <li className="nav-text">
                            <FaIcons.FaBook color='rgb(0, 104, 74)'/>
                            <Link to='/studymaterial'><p>Study Materials Posted</p></Link>
                        </li>
                        <li className="nav-text">
                            <FaIcons.FaBook color='rgb(0, 104, 74)'/>
                            <Link to='/attendancereport'><p>Attendance Report</p></Link>
                        </li>
                        <li className="nav-text">
                            <FaIcons.FaSignInAlt color='rgb(0, 104, 74)' />
                            <span onClick={() => {
                                localStorage.removeItem('token')
                                navigate("/")
                            }}>Logout</span>
                        </li>
                    </ul>
                </nav>
            </IconContext.Provider>
        </>
    );
}

export default Navbar;