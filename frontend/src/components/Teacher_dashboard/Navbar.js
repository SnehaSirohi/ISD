import React from "react";
import './Navbar.css';
import { useNavigate } from "react-router-dom"
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { IconContext } from 'react-icons';
import logo from './image.png'


function Navbar() {
    const navigate = useNavigate();
    const [sidebar, setSidebar] = React.useState(false);
    const [sem, setsem] = React.useState(false);
    const showsemesterhandler = () => setsem(!sem);
    const showSidebar = () => setSidebar(!sidebar);


    return (
        <>
            <IconContext.Provider value={{ color: '#fff' }}>
                <div className='navbar'>
                    <Link to='#' className='menu-bars'>
                        <FaIcons.FaBars onClick={showSidebar} />
                    </Link>
                    <div className="heading">
                        <i class="fa fa-bell mt-1 fa-2x"></i>
                        <Link to="/Teacherdashboard/profile"><div className="button"><img src={logo} alt="..." class="profilePic"></img></div></Link>

                    </div>
                </div>
                <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                    <ul className='nav-menu-items' >
                        <li className='navbar-toggle'>
                            < FaIcons.FaCaretLeft size={40} onClick={showSidebar} />
                            <span>Classopedia</span>
                        </li>
                        <li className="nav-text ">
                            <AiIcons.AiFillHome />
                            <Link to="/Teacherdashboard"><span>Home</span></Link>
                        </li>
                        <li className="nav-text">
                            <FaIcons.FaUserCircle />
                            <Link to="/Teacherdashboard/profile"><span>Profile</span></Link>
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
                            <Link to = "/Teacherdashboard/sem1"><p>1st</p></Link>
                            <Link to = "/Teacherdashboard/sem2"><p>2nd</p></Link>
                            <Link to = "/Teacherdashboard/sem3"><p>3rd</p></Link>
                            <Link to = "/Teacherdashboard/sem4"><p>4th</p></Link>
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