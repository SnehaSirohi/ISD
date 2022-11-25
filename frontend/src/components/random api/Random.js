import React, { useState } from "react";
const Random=()=>{
    const [date,setdate]=useState("")
    const[time,settime]=useState("")
    const[message,setmessage]=useState("")
    async function send(e){
        const response= await fetch("http://localhost:4000/random",{
            method:"POST",
            headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body:JSON.stringify({
        date,
        time,
      }),
        });
        const json = await response.json()
        setmessage(json.message)
        // document.getElementById("value").innerHTML=message
    }
    return(
        <>
        <div>
            <input type="date" value={date} onChange={(e)=>setdate(e.target.value)} />
            <input type="time" value={time} onChange={(e)=>settime(e.target.value)}/>
            <button onClick={send} >submit here</button>
            {message && alert(message)}
        </div>
        </>
    )
}
export default Random;