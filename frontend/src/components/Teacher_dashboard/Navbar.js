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
                       <Link to="/teacherNotifications"><i class="fa fa-bell mt-1 fa-2x"></i></Link> 
                        <Link to="/Teacherdashboard/profile"><div className="button"><img src={logo} alt="..." class="profilePic"></img></div></Link>

                    </div>
                </div>
                <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                    <ul className='nav-menu-items' >
                        <li className='navbar-toggle'>
                            < FaIcons.FaCaretLeft size={40} onClick={showSidebar} />
                            <span>Classopedia</span>
                        </li>
                        <li className="nav-text">
                            <AiIcons.AiFillHome color='rgb(0, 104, 74)' />
                            <Link to="/Teacherdashboard"><span>Home</span></Link>
                        </li>
                        <li className="nav-text">
                            <FaIcons.FaUserCircle color='rgb(0, 104, 74)' />
                            <Link to="/Teacherdashboard/profile"><span>Profile</span></Link>
                        </li>
                        <li className="nav-text" onClick={showsemesterhandler} style={{
                            background: sem ? "#ccdddd" : ""
                        }}>
                            <FaIcons.FaPenSquare color='rgb(0, 104, 74)' />
                            <span>Semester</span>
                            <FaIcons.FaCaretDown color = "#0f5132" />
                        </li>
                        <li className="semester " style={{
                            display: sem ? "block" : "none"
                        }}>
                            <Link to="/Teacherdashboard/sem1"><p>1st</p></Link>
                            <Link to="/Teacherdashboard/sem2"><p>2nd</p></Link>
                            <Link to="/Teacherdashboard/sem3"><p>3rd</p></Link>
                            <Link to="/Teacherdashboard/sem4"><p>4th</p></Link>
                        </li>
                        <li className="nav-text">
                            <FaIcons.FaBell color='rgb(0, 104, 74)' />
                            <Link to="/teacherNotifications"><span>Notifications</span></Link>
                        </li>
                        <li className="nav-text" onClick={() => {
                            localStorage.removeItem('token')
                            navigate("/")
                        }}>
                            <FaIcons.FaSignInAlt color='rgb(0, 104, 74)' />
                            <span>Logout</span>
                        </li>
                    </ul>
                </nav>
            </IconContext.Provider>
        </>
    );
}

export default Navbar;