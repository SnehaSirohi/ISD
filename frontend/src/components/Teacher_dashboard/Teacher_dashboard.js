import React, { useEffect, useState } from 'react'
import jwt from 'jsonwebtoken'
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom";

const Teacher_Dashboard = () => {

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
        if(json.status === 'ok'){
            setName(json.name)
            setEmail(json.email)
        }
        else{
            // alert(data.error)
        }
    }

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
        <h1>{name}'s Dashboard</h1>
         <Link to="/Teacherdashboard/profile"><div className="button">profile</div></Link>
         <Link to="/Teacherdashboard/changepassword"><div className="button">change password</div></Link>
         <Link to="/classschedule/sem1"><div className="button">Schedule Class sem-1</div></Link>
         <Link to="/testschedule/sem1"><div className="button">test Class sem-1</div></Link>
        <button onClick={()=>{
            localStorage.removeItem('token')
            navigate("/")
        }}>Logout</button>
        </>
    );
    
}

export default Teacher_Dashboard