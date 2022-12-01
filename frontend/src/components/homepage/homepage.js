import React from "react";
import "./homepage.css";
import { Link } from "react-router-dom";
import classopedia from './classopedia.png'
import image1 from './image1.png'
import image2 from './image2.png'
const Homepage = () =>{
    return (
        <div className="homepage">
            <div className="Clogo">
                <img src={classopedia} className="classopedialogo" ></img>
            </div>
            {/* <div  >
                <img src={image1} className="image1" ></img>
            </div>
            <div  >
                <img src={image2} className="image2" ></img>
            </div> */}
            <Link to="/login"><div className="button">Student</div></Link>
            <Link to="/loginteacher"><div className="button">Teacher</div></Link>
        </div>
    )
}
export default Homepage