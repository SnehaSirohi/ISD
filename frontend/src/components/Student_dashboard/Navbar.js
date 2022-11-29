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
                            <span>Subjects</span>
                            <FaIcons.FaCaretDown />
                        </li>
                        <li className="semester" style={{
                            display: sem ? "block" : "none"
                        }}>
                          {sem1 && <>
                            <Link to="/"><p>Algorithms and Data Structure</p></Link>
                            <Link><p>Software Design & Programming</p></Link>
                            <Link><p>Mathematical Foundation of Computing</p></Link>
                            <Link><p>Computer System Architecture</p></Link>
                            </>}

                            {sem2 && <>
                            <Link to="/"><p>Computer Communication and Networks</p></Link>
                            <Link><p>Operating Systems</p></Link>
                            <Link><p>Database Systems</p></Link>
                            <Link><p>Applied Machine Learning</p></Link>
                            </>}

                            {sem3 && <>
                            <Link to="/"><p>Information System Design</p></Link>
                            <Link><p>Cloud Computing</p></Link>
                            <Link><p>Software Engineering</p></Link>
                            <Link><p>IT Planning and Management</p></Link>
                            </>}

                            {sem4 && <>
                            <Link to="/"><p>Internet of Things Systems, Security and Cloud</p></Link>
                            <Link><p>Health Informatics</p></Link>
                            <Link><p>Dissertation Project</p></Link>
                            <Link><p>Research Methods in Informatics</p></Link>
                            </>}
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