import React, { useEffect, useState } from 'react'
import jwt from 'jsonwebtoken'
import { useNavigate } from "react-router-dom"

const Dashboard = () => {

    const navigate = useNavigate();
    const [name, setName] = useState([])

    async function populatedashboard() {
        const req = await fetch('http://localhost:4000/dashboard', {
            headers: {
                'x-access-token': localStorage.getItem('token'),

            },
        })

        const json = await req.json()

        console.log(json)
        if(json.status === 'ok'){
            setName(json.name)
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
    }, [name])

    return <h1>Hi {name || 'No name found' }</h1>
}

export default Dashboard