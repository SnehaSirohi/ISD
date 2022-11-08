import React from "react";
import "./homepage.css";
import { Link } from "react-router-dom";

const Homepage = () =>{
    return (
        <div className="homepage">
            <Link to="/login"><div className="button">Student</div></Link>
            <div className="button">Teacher</div>
        </div>
    )
}
export default Homepage