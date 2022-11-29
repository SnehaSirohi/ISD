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
        if(json.status == "ok")
        {
            if(json.semester == "Sem-1")
            {
                setSem1(true)
            }

            else if(json.semester == "Sem-2")
            {
                setSem2(true)
            }
            else if(json.semester == "Sem-3")
            {
                setSem3(true)
            }
            
            else if(json.semester == "Sem-4")
            {
                setSem4(true)
            }
        }
        console.log(json);
    }

    useEffect(() =>{
        const token = localStorage.getItem('token')
        if (token){
            const user = jwt.decode(token)
            if(!user){
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
                            <AiIcons.AiFillHome />
                            <span><Link to="/dashboard">Home</Link></span>
                        </li>
                        <li className="nav-text">
                            <FaIcons.FaUserCircle />
                            <span><Link to="/dashboard/profile">Profile</Link></span>
                        </li>
                        <li className="nav-text" onClick={showsemesterhandler} style={{
                            background: sem ? "#2BB0A8" : ""
                        }}>
                            <FaIcons.FaPenSquare />
                            <span>Semester</span>
                            <FaIcons.FaCaretDown />
                        </li>
                        <li className="semester" style={{
                            display: sem ? "block" : "none"
                        }}>
                          {/* {sem1 && <div><label className="form-label">Select Subject</label>
                            <select
                            type="text"
                            className="form-control"
                            id="subject"
                            name="subject"
                            value={subject}
                            required
                            onChange={(e) => setsubject(e.target.value)}>
                            <option required>Select Subject</option>
                            <option value="Algorithms And Data Structure">
                                Algorithms and Data Structure
                            </option>
                            </select></div>} */}
                        </li>
                        <li className="nav-text">
                            <FaIcons.FaRegSun />
                            <span>Setting</span>
                        </li>
                        <li className="nav-text">
                            <FaIcons.FaRegQuestionCircle />
                            <span>FAQ</span>
                        </li>
                        <li className="nav-text">
                            <FaIcons.FaSignInAlt />
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