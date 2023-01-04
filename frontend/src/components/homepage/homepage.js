import React from "react";
import "./homepage.css";
import { Link } from "react-router-dom";
import classopedia from './classopedia.png'
import image1 from './image1.svg'
import image2 from './image2.svg'
const Homepage = () => {
    return (
        <div className="homepage">
            <div className="Clogo">
                <img src={classopedia} className="classopedialogo" ></img>
            </div>

            <img src={image1} className="image1" ></img>
            <img src={image2} className="image2" ></img>
            <div className="mt-4">
                <h3>Choose Your Role</h3>
                <div className="bttnmargin">
                    <Link to="/login"><div className="button bttn-1">Student</div></Link>
                    <Link to="/loginteacher"><div className="button bttn-2">Teacher</div></Link>
                </div>
            </div>

        </div>
    )
}
export default Homepage